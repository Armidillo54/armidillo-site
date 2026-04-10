/**
 * OLN One-Click Approval Proxy
 * Cloudflare Pages Function — /api/approve
 *
 * Receives a GET request from the report email "Approve" button,
 * triggers the GitHub Actions approve.yml workflow via the GitHub API,
 * then returns a clean confirmation page.
 *
 * Required environment variables (set in Cloudflare Pages → Settings → Environment variables):
 *   GH_PAT          — GitHub Personal Access Token with workflow scope
 *   APPROVE_SECRET  — A random string used to prevent unauthorized triggers
 *
 * URL format (embedded in email buttons):
 *   https://muskokaenergystorage.ca/api/approve
 *     ?s=<secret>
 *     &site=<lcs|mds|mes|armidillo>
 *     &type=<fix|blog-now|blog-schedule|seo|indexing-fix>
 *     &id=<action_id>
 *     &p=<base64-encoded prompt>
 *     &date=<YYYY-MM-DD>   (optional, for blog-schedule only)
 */

export async function onRequestGet(context) {
  const { request, env } = context;
  const url    = new URL(request.url);
  const params = url.searchParams;

  // ── Security: validate secret ──
  const secret = params.get('s') || '';
  if (!env.APPROVE_SECRET || secret !== env.APPROVE_SECRET) {
    return htmlResponse(400, '❌ Invalid or missing approval token.', 'red');
  }

  // ── Parse parameters ──
  const site         = params.get('site')  || '';
  const actionType   = params.get('type')  || 'fix';
  const actionId     = params.get('id')    || `${site}-${actionType}-${Date.now()}`;
  const scheduleDate = params.get('date')  || '';

  // prompt is base64-encoded to survive URL encoding in email clients
  let prompt = '';
  const rawP = params.get('p') || '';
  try {
    prompt = rawP ? atob(rawP) : '';
  } catch {
    prompt = decodeURIComponent(rawP);
  }

  if (!site || !prompt) {
    return htmlResponse(400, '❌ Missing required parameters (site or prompt).', 'red');
  }

  // ── Validate site ──
  const validSites = ['lcs', 'mds', 'mes', 'armidillo'];
  if (!validSites.includes(site)) {
    return htmlResponse(400, `❌ Unknown site: ${escapeHtml(site)}`, 'red');
  }

  // ── Trigger GitHub Actions workflow_dispatch ──
  const GH_REPO = 'Armidillo54/ontario-lead-networks';
  const GH_PAT  = env.GH_PAT;

  if (!GH_PAT) {
    return htmlResponse(500, '❌ GitHub token not configured.', 'red');
  }

  const dispatchPayload = {
    ref: 'main',
    inputs: {
      action_id:     actionId,
      prompt:        prompt,
      site:          site,
      action_type:   actionType,
      schedule_date: scheduleDate,
    },
  };

  let ghStatus;
  try {
    const ghRes = await fetch(
      `https://api.github.com/repos/${GH_REPO}/actions/workflows/approve.yml/dispatches`,
      {
        method:  'POST',
        headers: {
          'Accept':               'application/vnd.github+json',
          'Authorization':        `Bearer ${GH_PAT}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type':         'application/json',
          'User-Agent':           'OLN-Approve-Proxy/1.0',
        },
        body: JSON.stringify(dispatchPayload),
      }
    );
    ghStatus = ghRes.status;
  } catch (err) {
    return htmlResponse(502, `❌ GitHub API error: ${escapeHtml(err.message)}`, 'red');
  }

  // GitHub returns 204 No Content on success
  if (ghStatus === 204) {
    const siteLabel  = siteNames[site] || site.toUpperCase();
    const typeLabel  = actionLabels[actionType] || actionType;
    const ghActionsUrl = `https://github.com/${GH_REPO}/actions/workflows/approve.yml`;

    return htmlResponse(200, null, 'green', `
      <h2 style="color:#16A34A;margin:0 0 8px;">✅ Approved — GitHub is on it</h2>
      <p style="color:#374151;margin:0 0 16px;">
        <strong>${escapeHtml(siteLabel)}</strong> · ${escapeHtml(typeLabel)}
      </p>
      <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:16px;text-align:left;margin-bottom:20px;">
        <p style="margin:0 0 6px;font-size:14px;color:#166534;"><strong>What happens next:</strong></p>
        <ol style="margin:0;padding-left:20px;font-size:13px;color:#166534;line-height:1.8;">
          <li>GitHub Actions picks up the job (usually starts within 30 seconds)</li>
          <li>OpenAI GPT-4o researches and implements the fix</li>
          <li>Changes are committed to the repo</li>
          <li>Site deploys to Cloudflare Pages automatically</li>
          <li>You receive a confirmation email when complete</li>
        </ol>
      </div>
      <a href="${ghActionsUrl}" 
         style="display:inline-block;background:#1E1B4B;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">
        Watch it run on GitHub →
      </a>
      <p style="margin:16px 0 0;font-size:12px;color:#9CA3AF;">Action ID: ${escapeHtml(actionId)}</p>
    `);
  }

  // Non-204 response from GitHub
  const errMsg = ghStatus === 401
    ? 'GitHub token is invalid or expired (401). Update GH_PAT in Cloudflare Pages environment variables.'
    : ghStatus === 404
    ? 'Workflow not found (404). Ensure approve.yml exists in the repo.'
    : ghStatus === 422
    ? 'Workflow dispatch rejected (422). Check that approve.yml has workflow_dispatch trigger.'
    : `GitHub returned HTTP ${ghStatus}.`;

  return htmlResponse(502, `❌ ${errMsg}`, 'red');
}

// ── Also handle POST (some email clients convert GET links) ──
export async function onRequestPost(context) {
  return onRequestGet(context);
}

// ── Helpers ──

const siteNames = {
  lcs:       'Lake Country Septic',
  mds:       'Muskoka Dock Services',
  mes:       'Muskoka Energy Storage',
  armidillo: 'Armidillo.com',
};

const actionLabels = {
  'fix':            'Auto-Fix',
  'blog-now':       'Blog Post — Publish Now',
  'blog-schedule':  'Blog Post — Scheduled',
  'seo':            'SEO Update',
  'indexing-fix':   'Indexing Fix',
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function htmlResponse(status, errorMsg, color, bodyHtml) {
  const content = bodyHtml || `
    <h2 style="color:${color === 'red' ? '#DC2626' : '#16A34A'};margin:0 0 8px;">
      ${escapeHtml(errorMsg || '')}
    </h2>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>OLN Approval${status === 200 ? ' ✅' : ' ❌'}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0; padding: 40px 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #F3F4F6; min-height: 100vh;
      display: flex; align-items: flex-start; justify-content: center;
    }
    .card {
      background: #fff; border-radius: 12px; padding: 36px;
      max-width: 520px; width: 100%;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      text-align: center;
    }
    .logo {
      font-size: 12px; font-weight: 700; letter-spacing: 2px;
      text-transform: uppercase; color: #6B7280; margin-bottom: 24px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">Ontario Lead Networks</div>
    ${content}
  </div>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}
