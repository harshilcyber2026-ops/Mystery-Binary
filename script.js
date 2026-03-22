/* ═══════════════════════════════════════════════════
   FlagVault CTF — Mystery Binary
   Challenge: strings mystery.bin | grep FlagVault
   Flag: FlagVault{str1ngs_4r3_p0w3rful}
   ═══════════════════════════════════════════════════ */
'use strict';

/* ── djb2 hash so flag isn't stored in plain text ── */
function djb2(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++)
    h = (((h << 5) + h) + s.charCodeAt(i)) >>> 0;
  return h;
}
const CORRECT = djb2("FlagVault{str1ngs_4r3_p0w3rful}");

/* ── Flag submission ── */
function checkFlag() {
  const inp = document.getElementById('flagInput');
  const res = document.getElementById('flagResult');
  if (!inp || !res) return;

  let raw = inp.value.trim();
  let full = raw.startsWith('FlagVault{')
    ? (raw.endsWith('}') ? raw : raw + '}')
    : 'FlagVault{' + raw.replace(/}$/, '') + '}';

  res.className   = 'submit-result';
  res.style.display = 'none';
  inp.classList.remove('shake');

  if (djb2(full) === CORRECT) {
    inp.style.borderColor = 'var(--accent)';
    inp.style.boxShadow   = '0 0 0 2px rgba(0,232,200,.18), 0 0 14px rgba(0,232,200,.12)';
    res.className = 'submit-result correct';
    res.innerHTML = '✓ &nbsp;<strong>Flag accepted!</strong> — strings is a powerful forensics tool. Challenge solved!<br>'
      + '<span style="font-size:.72rem;color:var(--text-dim);display:block;margin-top:.3rem">+200 points awarded</span>';
    res.style.display = 'block';
    incrementSolves();
  } else {
    inp.style.borderColor = 'var(--accent2)';
    inp.style.boxShadow   = '0 0 0 2px rgba(255,45,107,.18)';
    void inp.offsetWidth;
    inp.classList.add('shake');
    setTimeout(() => inp.classList.remove('shake'), 400);
    res.className = 'submit-result incorrect';
    res.innerHTML = '✗ &nbsp;<strong>Incorrect flag.</strong> — Run <code>strings mystery.bin | grep FlagVault</code> and copy the exact output.';
    res.style.display = 'block';
  }
}

/* ── Clear ── */
function clearInput() {
  const inp = document.getElementById('flagInput');
  const res = document.getElementById('flagResult');
  if (inp) { inp.value = ''; inp.style.borderColor = ''; inp.style.boxShadow = ''; inp.focus(); }
  if (res) { res.style.display = 'none'; res.className = 'submit-result'; }
}

/* ── Hint toggle ── */
function toggleHint(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

/* ── Solve counter ── */
let solves = 178;
function incrementSolves() {
  solves++;
  const el = document.getElementById('solveCount');
  if (el) el.textContent = solves;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const f = document.getElementById('progFill');
    if (f) f.style.width = '68%';
  }, 500);
  const inp = document.getElementById('flagInput');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkFlag(); });
});
