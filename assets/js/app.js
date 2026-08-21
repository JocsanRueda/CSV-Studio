import { TEXTS } from './config.js';
import { $, applyTexts, escapeHtml } from './modules/dom.js';
import { mergeUniqueCsv, formatBytes, downloadBlob } from './modules/files.js';
import { cleanCsv } from './modules/csv.js';
import { initTheme, initCursorGlow } from './modules/effects.js';

const state={files:[]};
applyTexts(TEXTS); initTheme($('themeBtn')); initCursorGlow($('cursorGlow'));
function render(){ $('count').textContent=state.files.length; $('cleanBtn').disabled=!state.files.length; $('clearBtn').disabled=!state.files.length; $('empty').classList.toggle('hidden',!!state.files.length); $('fileList').classList.toggle('hidden',!state.files.length); $('fileList').innerHTML=state.files.map((file,index)=>`<article class="animate-rise flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700"><div class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-200 text-xs font-black text-slate-800 dark:bg-slate-800 dark:text-slate-200">${TEXTS.csvBadge}</div><div class="min-w-0 flex-1"><p class="truncate text-sm font-bold" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</p><p class="text-xs text-slate-500">${formatBytes(file.size,TEXTS)}</p></div><button data-remove="${index}" class="rounded-lg p-2 text-slate-400 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-sky-950" aria-label="${TEXTS.removeFile} ${escapeHtml(file.name)}">✕</button></article>`).join(''); document.querySelectorAll('[data-remove]').forEach(button=>button.addEventListener('click',()=>{state.files.splice(Number(button.dataset.remove),1);render()})); }
function addFiles(files){state.files=mergeUniqueCsv(state.files,files);$('fileInput').value='';$('summary').classList.add('hidden');render()}
$('fileInput').addEventListener('change',e=>addFiles([...e.target.files]));
['dragenter','dragover'].forEach(name=>$('dropzone').addEventListener(name,e=>{e.preventDefault();$('dropzone').classList.add('border-sky-500','bg-slate-100')}));
['dragleave','drop'].forEach(name=>$('dropzone').addEventListener(name,e=>{e.preventDefault();$('dropzone').classList.remove('border-sky-500','bg-slate-100')}));
$('dropzone').addEventListener('drop',e=>addFiles([...e.dataTransfer.files]));
$('clearBtn').addEventListener('click',()=>{state.files=[];$('summary').classList.add('hidden');render()});
$('cleanBtn').addEventListener('click',async()=>{const button=$('cleanBtn'),original=button.textContent;button.disabled=true;button.textContent=TEXTS.processing;let ok=0,removed=0;const errors=[];const zip=new JSZip();try{for(const file of state.files){try{const result=await cleanCsv(file,{removeOptionalColumn:$('removePyGuid').checked});zip.file(result.name,result.csv);ok++;removed+=result.removed}catch(error){errors.push(`${file.name}: ${error.message}`)}}if(ok===1){const item=Object.values(zip.files)[0];downloadBlob(await item.async('blob'),item.name)}else if(ok>1){downloadBlob(await zip.generateAsync({type:'blob'}),TEXTS.zipName)}$('summary').innerHTML=`<strong>${ok} ${ok===1?TEXTS.processedOne:TEXTS.processedMany}</strong><br>${removed} ${removed===1?TEXTS.removedOne:TEXTS.removedMany}.${errors.length?`<br><span class="text-sky-600">${escapeHtml(errors.join(' · '))}</span>`:''}`;$('summary').classList.remove('hidden')}finally{button.textContent=original;button.disabled=!state.files.length}});
render();
