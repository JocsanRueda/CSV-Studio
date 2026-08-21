export const $ = id => document.getElementById(id);
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function applyTexts(texts){ document.title=texts.pageTitle; document.querySelectorAll('[data-i18n]').forEach(el=>{const value=texts[el.dataset.i18n];if(value!==undefined)el.textContent=value}); document.querySelectorAll('[data-i18n-aria]').forEach(el=>{const value=texts[el.dataset.i18nAria];if(value!==undefined)el.setAttribute('aria-label',value)}); }
