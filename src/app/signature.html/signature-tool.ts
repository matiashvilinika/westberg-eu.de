// Standalone HTML for the internal email-signature builder served at /signature.html.
// Kept verbatim (plain HTML/CSS/JS, no React) so the markup that gets pasted into
// Gmail/Outlook is exactly what is authored here. Access is gated in ./route.ts.

export const SIGNATURE_TOOL_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>West Berg Europe — Email Signature</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0; background: #EFF1F4; color: #102542;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px; line-height: 1.5; -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 980px; margin: 0 auto; padding: 40px 24px 80px; }
  header { margin-bottom: 32px; }
  .eyebrow { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #7C8A9C; }
  h1 { font-size: 20px; font-weight: 700; letter-spacing: -0.01em; margin: 6px 0 0; }
  .grid { display: grid; grid-template-columns: 310px 1fr; gap: 28px; align-items: start; }
  @media (max-width: 820px) { .grid { grid-template-columns: 1fr; } }

  .panel { background: #fff; padding: 22px; }
  .panel h2 { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #7C8A9C; margin: 0 0 16px; font-weight: 600; }
  label { display: block; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #7C8A9C; margin: 14px 0 4px; }
  label:first-of-type { margin-top: 0; }
  input[type=text] {
    width: 100%; padding: 7px 8px; border: 1px solid #DDE2E8; border-radius: 0;
    font: inherit; font-size: 12px; background: #FBFCFD; color: #102542;
  }
  input[type=text]:focus { outline: 2px solid #102542; outline-offset: -1px; }
  .check { display: flex; align-items: flex-start; gap: 8px; margin-top: 20px; }
  .check label { margin: 0; text-transform: none; letter-spacing: 0; font-size: 12px; color: #102542; line-height: 1.4; }
  .subtle { font-size: 11px; color: #7C8A9C; margin-top: 6px; }

  .stage { background: #fff; padding: 30px; }
  .stage + .stage { margin-top: 20px; }
  .stage-label { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #7C8A9C; margin-bottom: 20px; }

  .btnrow { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 24px; }
  button {
    font: inherit; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 9px 14px; border: 1px solid #102542; background: #102542; color: #fff; cursor: pointer; border-radius: 0;
  }
  button.ghost { background: #fff; color: #102542; }
  button:hover { opacity: 0.85; }
  button:focus-visible { outline: 2px solid #102542; outline-offset: 2px; }
  .flash { font-size: 11px; color: #7C8A9C; align-self: center; }

  pre {
    background: #102542; color: #DDE4EE; padding: 16px; overflow: auto;
    font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace; font-size: 11px; line-height: 1.6;
    margin: 0; white-space: pre-wrap; word-break: break-all; max-height: 300px;
  }
  .notes { margin-top: 36px; padding-top: 24px; }
  .notes h3 { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #7C8A9C; margin: 0 0 10px; }
  .notes ul { margin: 0 0 20px; padding-left: 18px; }
  .notes li { margin-bottom: 7px; color: #3D4C60; }
  .notes strong { color: #102542; }
  code { background: #E4E8EE; padding: 1px 4px; font-size: 11px; }
</style>
</head>
<body>
<div class="wrap">

  <header>
    <div class="eyebrow">West Berg Europe W.B.E. GmbH</div>
    <h1>Email signature</h1>
  </header>

  <div class="grid">
    <div class="panel">
      <h2>Fields</h2>
      <label for="f-name">Name</label>
      <input type="text" id="f-name" value="" placeholder="Vorname Nachname">
      <label for="f-role">Role</label>
      <input type="text" id="f-role" value="" placeholder="e.g. Project Manager — Digital &amp; Business Development">
      <label for="f-mobile">Mobile</label>
      <input type="text" id="f-mobile" value="" placeholder="+49 …">
      <label for="f-email">Email</label>
      <input type="text" id="f-email" value="" placeholder="vorname.nachname@westberg.eu">
      <label for="f-web">Website</label>
      <input type="text" id="f-web" value="westberg.eu">
      <label for="f-office">Bürostandort</label>
      <input type="text" id="f-office" value="Bessemerstr. 82, 1 South · D-12103 Berlin">
      <label for="f-care">Kundenbetreuung</label>
      <input type="text" id="f-care" value="+49 151 62600982">
      <label for="f-gf">Geschäftsführer</label>
      <input type="text" id="f-gf" value="" placeholder="Vor- und Nachname(n)">
      <div class="subtle">Required by §35a GmbHG. Leave empty to omit — see notes.</div>

      <div class="check">
        <input type="checkbox" id="f-legal" checked>
        <label for="f-legal">Include register &amp; tax block</label>
      </div>
      <div class="check">
        <input type="checkbox" id="f-hosted">
        <label for="f-hosted">Use hosted logo URL instead of embedded image</label>
      </div>
      <label for="f-logourl">Logo URL</label>
      <input type="text" id="f-logourl" value="https://www.westberg-eu.de/images/logo/westberg-logo-email@2x.png">
    </div>

    <div>
      <div class="stage">
        <div class="stage-label">Full signature — new messages</div>
        <div id="preview-full"></div>
        <div class="btnrow">
          <button data-copy="full">Copy formatted</button>
          <button class="ghost" data-source="full">Copy HTML</button>
          <span class="flash" id="flash-full"></span>
        </div>
      </div>

      <div class="stage">
        <div class="stage-label">Short signature — replies &amp; forwards</div>
        <div id="preview-short"></div>
        <div class="btnrow">
          <button data-copy="short">Copy formatted</button>
          <button class="ghost" data-source="short">Copy HTML</button>
          <span class="flash" id="flash-short"></span>
        </div>
      </div>

      <div class="stage">
        <div class="stage-label">HTML source — full</div>
        <pre id="code-full"></pre>
      </div>
    </div>
  </div>

  <div class="notes">
    <h3>Installing</h3>
    <ul>
      <li><strong>Gmail / Google Workspace:</strong> Settings → See all settings → Signature. Use <em>Copy formatted</em> — Gmail uploads the pasted logo to its own servers, so it survives. Set signature defaults: full for new mail, short for replies.</li>
      <li><strong>Outlook desktop:</strong> File → Options → Mail → Signatures. <em>Copy formatted</em> embeds the logo as an inline attachment.</li>
      <li><strong>Apple Mail:</strong> paste, then untick "Always match my default message font".</li>
      <li><strong>Mobile apps:</strong> they strip HTML. Use plain text: name, role, company, mobile, website.</li>
    </ul>

    <h3>The logo</h3>
    <ul>
      <li>SVG doesn't work in email — Outlook and Gmail both refuse it. The signature uses a PNG at 380px rendered down to 190px so it stays sharp on retina screens.</li>
      <li>By default the PNG is embedded as a data URI, which is what makes <em>Copy formatted</em> work from this page. Gmail strips data URIs from <em>received</em> mail, so tick the hosted-URL box for the more robust setup — the identical PNG is served from <code>www.westberg-eu.de/images/logo/westberg-logo-email@2x.png</code>. Use the <code>www.</code> form: the bare domain redirects, and Outlook is unreliable at following redirects for images.</li>
      <li><code>width</code> and <code>height</code> are set as HTML attributes as well as CSS, because Outlook ignores CSS sizing on images.</li>
      <li>The <code>alt</code> text reads "West Berg Europe W.B.E. GmbH", so the company name is still legible when images are blocked. That's also why there's no separate company name line — the logo carries it.</li>
    </ul>

    <h3>Before you send</h3>
    <ul>
      <li><strong>Geschäftsführer is missing.</strong> §35a GmbHG requires every managing director to be named on business emails, alongside the register court and HRB number. You have the rest. Get the names from Rati and fill the field — an incomplete block is the part that gets fined, not a missing one.</li>
      <li>Kundenbetreuung is the company line, your mobile is separate. Worth keeping both: private sellers respond to a direct number.</li>
      <li>Register and Bürostandort are both Berlin, while the operating base is Motorworld Cologne. The signature follows the legal record, so it stays Berlin — but that gap is exactly the findability problem the GBP work is fixing, and it's worth raising with Rati whether the Cologne address should appear anywhere in outbound mail.</li>
    </ul>
  </div>
</div>

<script>
(function () {
  var LOGO_B64 = "data:image/png;base64,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";

  var F = {};
  ['name','role','mobile','email','web','office','care','gf','legal','hosted','logourl'].forEach(function (k) {
    F[k] = document.getElementById('f-' + k);
  });

  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function tel(s) { return String(s).replace(/[^\\d+]/g, ''); }
  function url(s) { return /^https?:\\/\\//i.test(s) ? s : 'https://' + s.replace(/^\\/+/, ''); }

  var SANS = 'Arial, Helvetica, sans-serif';
  var INK = '#102542';
  var GREY = '#7C8A9C';
  var FAINT = '#96A2B2';

  function link(href, text) {
    return '<a href="' + href + '" style="color:' + INK + ';text-decoration:none;">' + text + '</a>';
  }

  function logo(w) {
    var src = F.hosted.checked ? esc(F.logourl.value) : LOGO_B64;
    var h = Math.round(w * 78 / 380);
    return '<img src="' + src + '" width="' + w + '" height="' + h + '" alt="West Berg Europe W.B.E. GmbH" ' +
           'style="display:block;width:' + w + 'px;height:' + h + 'px;border:0;outline:none;text-decoration:none;">';
  }

  function row(label, value) {
    return '<tr>' +
      '<td valign="top" width="16" style="width:16px;padding:0 0 3px 0;font-family:' + SANS + ';font-size:10px;line-height:17px;color:' + GREY + ';">' + label + '</td>' +
      '<td valign="top" style="padding:0 0 3px 0;font-family:' + SANS + ';font-size:12px;line-height:17px;color:' + INK + ';">' + value + '</td>' +
    '</tr>';
  }

  function legalBlock() {
    if (!F.legal.checked) return '';
    var gf = F.gf.value.trim();
    var l1 = 'West Berg Europe W.B.E. GmbH · Sitz: Berlin' + (gf ? ' · Geschäftsführer: ' + esc(gf) : '');
    return '<tr><td colspan="2" style="padding:14px 0 0 0;font-family:' + SANS + ';font-size:10px;line-height:15px;color:' + FAINT + ';">' +
      l1 + '<br>' +
      'Amtsgericht Charlottenburg (Berlin) HRB 248481 B · EUID DEF1103R.HRB248481B<br>' +
      'USt-IdNr. DE361406222 · Steuernummer 29/566/30139' +
    '</td></tr>';
  }

  function buildFull() {
    var v = {
      name: esc(F.name.value), role: esc(F.role.value), mobile: esc(F.mobile.value),
      email: esc(F.email.value), web: esc(F.web.value), office: esc(F.office.value),
      care: esc(F.care.value)
    };
    return '' +
'<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">' +
  '<tr><td style="padding:0 0 14px 0;">' + logo(190) + '</td></tr>' +
  '<tr><td>' +
    '<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">' +
      '<tr><td colspan="2" style="font-family:' + SANS + ';font-size:15px;line-height:20px;font-weight:bold;color:' + INK + ';">' + v.name + '</td></tr>' +
      '<tr><td colspan="2" style="padding:2px 0 12px 0;font-family:' + SANS + ';font-size:12px;line-height:17px;color:' + GREY + ';">' + v.role + '</td></tr>' +
      row('M', link('tel:' + tel(F.mobile.value), v.mobile)) +
      row('E', link('mailto:' + F.email.value, v.email)) +
      row('W', link(url(F.web.value), v.web)) +
      '<tr><td colspan="2" style="padding:12px 0 0 0;font-family:' + SANS + ';font-size:11px;line-height:16px;color:' + GREY + ';">' +
        '<span style="color:' + FAINT + ';">Bürostandort</span>&nbsp; ' + v.office + '<br>' +
        '<span style="color:' + FAINT + ';">Kundenbetreuung</span>&nbsp; ' + link('tel:' + tel(F.care.value), v.care) +
      '</td></tr>' +
      legalBlock() +
    '</table>' +
  '</td></tr>' +
'</table>';
  }

  function buildShort() {
    var v = { name: esc(F.name.value), mobile: esc(F.mobile.value), email: esc(F.email.value) };
    return '' +
'<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">' +
  '<tr><td style="padding:0 0 9px 0;">' + logo(140) + '</td></tr>' +
  '<tr><td style="font-family:' + SANS + ';font-size:12px;line-height:18px;color:' + GREY + ';">' +
    '<span style="color:' + INK + ';font-weight:bold;">' + v.name + '</span><br>' +
    link('tel:' + tel(F.mobile.value), v.mobile) + ' · ' + link('mailto:' + F.email.value, v.email) +
  '</td></tr>' +
'</table>';
  }

  var current = { full: '', short: '' };

  function render() {
    current.full = buildFull();
    current.short = buildShort();
    document.getElementById('preview-full').innerHTML = current.full;
    document.getElementById('preview-short').innerHTML = current.short;
    var shown = current.full.replace(/src="data:image\\/png;base64,[^"]+"/, 'src="data:image/png;base64,…"');
    document.getElementById('code-full').textContent = shown.replace(/<tr>/g, '\\n<tr>').replace(/<\\/table>/g, '\\n</table>').trim();
  }

  Object.keys(F).forEach(function (k) {
    F[k].addEventListener('input', render);
    F[k].addEventListener('change', render);
  });

  function flash(which, msg) {
    var el = document.getElementById('flash-' + which);
    el.textContent = msg;
    setTimeout(function () { el.textContent = ''; }, 2400);
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var which = btn.getAttribute('data-copy');
      var node = document.getElementById('preview-' + which);
      try {
        var range = document.createRange();
        range.selectNodeContents(node);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        var ok = document.execCommand('copy');
        sel.removeAllRanges();
        flash(which, ok ? 'Copied — paste into your signature box.' : 'Select the block above and copy manually.');
      } catch (e) {
        flash(which, 'Select the block above and copy manually.');
      }
    });
  });

  document.querySelectorAll('[data-source]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var which = btn.getAttribute('data-source');
      var text = current[which];
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { flash(which, 'HTML copied.'); },
          function () { fallback(text, which); }
        );
      } else { fallback(text, which); }
    });
  });

  function fallback(text, which) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); flash(which, 'HTML copied.'); }
    catch (e) { flash(which, 'Copy failed — use Copy formatted.'); }
    document.body.removeChild(ta);
  }

  render();
})();
</script>
</body>
</html>
`;
