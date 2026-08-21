import { TEXTS } from './config.js';
import { $, applyTexts, escapeHtml } from './modules/dom.js';
import { mergeUniqueCsv, formatBytes, downloadBlob } from './modules/files.js';
import { cleanCsv } from './modules/csv.js';
import { initTheme, initCursorGlow } from './modules/effects.js';

const state = { files: [], lastZip: null, lastSingle: null };
applyTexts(TEXTS);
initTheme($('themeBtn'));
initCursorGlow($('cursorGlow'));

function buildFileItem(file, index) {
  return `
    <article id="file-item-${index}" class="animate-rise relative overflow-hidden flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
      <div class="file-progress-bar absolute inset-0 z-0 w-0 bg-sky-500/10 dark:bg-sky-400/10 transition-none rounded-lg pointer-events-none" aria-hidden="true"></div>
      <div class="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-200 text-xs font-black text-slate-800 dark:bg-slate-800 dark:text-slate-200">${TEXTS.csvBadge}</div>
      <div class="relative z-10 min-w-0 flex-1">
        <p class="truncate text-sm font-bold" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</p>
        <p class="text-xs text-slate-500">${formatBytes(file.size, TEXTS)}</p>
      </div>
      <button data-remove="${index}" class="relative z-10 rounded-lg p-2 text-slate-400 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-950" aria-label="${TEXTS.removeFile} ${escapeHtml(file.name)}">✕</button>
    </article>`;
}

function render() {
  $('count').textContent = state.files.length;
  $('cleanBtn').disabled = !state.files.length;
  $('clearBtn').disabled = !state.files.length;
  $('empty').classList.toggle('hidden', !!state.files.length);
  $('fileList').classList.toggle('hidden', !state.files.length);
  $('fileList').innerHTML = state.files.map(buildFileItem).join('');
  $('downloadBtn').classList.add('hidden');
  state.lastZip = null;
  state.lastSingle = null;
  document.querySelectorAll('[data-remove]').forEach(btn =>
    btn.addEventListener('click', () => { state.files.splice(Number(btn.dataset.remove), 1); render(); })
  );
}

function setFileProgress(index, pct) {
  const bar = document.querySelector(`#file-item-${index} .file-progress-bar`);
  if (!bar) return;
  bar.style.transition = pct > 0 ? 'width 0.4s cubic-bezier(0.4,0,0.2,1)' : 'none';
  bar.style.width = `${pct}%`;
  if (pct >= 100) {
    bar.style.backgroundColor = 'rgba(34,197,94,0.15)';
  }
}

function addFiles(files) {
  state.files = mergeUniqueCsv(state.files, files);
  $('fileInput').value = '';
  $('summary').classList.add('hidden');
  render();
}

$('fileInput').addEventListener('change', e => addFiles([...e.target.files]));
['dragenter', 'dragover'].forEach(name => $('dropzone').addEventListener(name, e => { e.preventDefault(); $('dropzone').classList.add('border-sky-500', 'bg-slate-100'); }));
['dragleave', 'drop'].forEach(name => $('dropzone').addEventListener(name, e => { e.preventDefault(); $('dropzone').classList.remove('border-sky-500', 'bg-slate-100'); }));
$('dropzone').addEventListener('drop', e => addFiles([...e.dataTransfer.files]));

$('clearBtn').addEventListener('click', () => { state.files = []; $('summary').classList.add('hidden'); $('downloadBtn').classList.add('hidden'); render(); });

$('downloadBtn').addEventListener('click', async () => {
  if (state.lastSingle) {
    downloadBlob(state.lastSingle.blob, state.lastSingle.name);
  } else if (state.lastZip) {
    downloadBlob(await state.lastZip.zip.generateAsync({ type: 'blob' }), TEXTS.zipName);
  }
});

$('cleanBtn').addEventListener('click', async () => {
  const button = $('cleanBtn');
  const original = button.textContent;
  button.disabled = true;
  $('clearBtn').disabled = true;
  $('downloadBtn').classList.add('hidden');
  button.textContent = TEXTS.processing;

  const removeOptionalColumns = {
    pyGUID: $('removePyGuid').checked,
    pyLabel: $('removePyLabel').checked,
    pyBoolFlag: $('removePyBoolFlag').checked,
  };

  let ok = 0, removed = 0;
  const errors = [];
  const zip = new JSZip();

  try {
    for (let i = 0; i < state.files.length; i++) {
      const file = state.files[i];
      setFileProgress(i, 10);
      try {
        const result = await cleanCsv(file, { removeOptionalColumns });
        setFileProgress(i, 80);
        zip.file(result.name, result.csv);
        ok++;
        removed += result.removed;
        await new Promise(r => setTimeout(r, 120));
        setFileProgress(i, 100);
      } catch (error) {
        errors.push(`${file.name}: ${error.message}`);
        setFileProgress(i, 100);
      }
    }

    if (ok === 1) {
      const item = Object.values(zip.files)[0];
      const blob = await item.async('blob');
      state.lastSingle = { blob, name: item.name };
      state.lastZip = null;
    } else if (ok > 1) {
      state.lastSingle = null;
      state.lastZip = { zip };
    }

    if (ok > 0) {
      $('downloadBtn').classList.remove('hidden');
    }

    $('summary').innerHTML = `<strong>${ok} ${ok === 1 ? TEXTS.processedOne : TEXTS.processedMany}</strong><br>${removed} ${removed === 1 ? TEXTS.removedOne : TEXTS.removedMany}.${errors.length ? `<br><span class="text-sky-600">${escapeHtml(errors.join(' · '))}</span>` : ''}`;
    $('summary').classList.remove('hidden');
  } finally {
    button.textContent = original;
    button.disabled = !state.files.length;
    $('clearBtn').disabled = !state.files.length;
  }
});

render();
