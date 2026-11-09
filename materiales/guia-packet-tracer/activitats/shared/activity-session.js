(() => {
  const dbName = 'xarxes-activities';
  const openDb = () => new Promise((resolve, reject) => { const request = indexedDB.open(dbName, 1); request.onupgradeneeded = () => request.result.createObjectStore('sessions', { keyPath: 'id' }); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
  const read = async id => { const db = await openDb(); return new Promise((resolve, reject) => { const request = db.transaction('sessions').objectStore('sessions').get(id); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); }); };
  const write = async value => { const db = await openDb(); return new Promise((resolve, reject) => { const request = db.transaction('sessions', 'readwrite').objectStore('sessions').put(value); request.onsuccess = () => resolve(); request.onerror = () => reject(request.error); }); };
  const remove = async id => { const db = await openDb(); return new Promise((resolve, reject) => { const request = db.transaction('sessions', 'readwrite').objectStore('sessions').delete(id); request.onsuccess = () => resolve(); request.onerror = () => reject(request.error); }); };
  window.setupActivitySession = async ({ id, title, questions, evidence }) => {
    const header = document.querySelector('[data-student-name]');
    const status = document.querySelector('[data-save-status]');
    const dialog = document.createElement('dialog');
    dialog.className = 'activity-welcome';
    dialog.innerHTML = `<form method="dialog"><p class="activity-kicker">${id} · ${title}</p><div class="session-message" role="status"></div><div class="session-new" hidden><h2>Comença l'activitat</h2><p>Escriu el teu nom i cognoms per començar.</p><label>Nom i cognoms<input required name="student" autocomplete="name"></label><p class="session-actions"><button value="new" class="session-primary" disabled>Comença l'activitat</button></p></div><div class="session-existing" hidden><h2>Recupera el teu treball</h2><p class="saved-work"></p><button value="continue" type="button" class="session-primary">Continua el treball</button><button value="replace" type="button">Comença una activitat nova</button></div></form>`;
    document.body.append(dialog);
    const form = dialog.querySelector('form'), input = form.elements.student, start = form.querySelector('[value="new"]'), existing = form.querySelector('.session-existing');
    let state = null; let timer;
    const collect = () => ({ id, student: input.value.trim(), responses: Object.fromEntries(questions.map(key => [key, document.querySelector(`textarea[aria-label="Resposta ${key}"]`)?.value || ''])), evidence: Object.fromEntries(evidence.map(key => { const image = document.querySelector(`[data-evidence="${key}"] .evidence-preview`); return [key, image && !image.hidden ? image.src : '']; })), updatedAt: Date.now() });
    const restore = saved => { input.value = saved.student || ''; header.textContent = saved.student || ''; questions.forEach(key => { const field = document.querySelector(`textarea[aria-label="Resposta ${key}"]`); if (field) field.value = saved.responses?.[key] || ''; }); evidence.forEach(key => { const card = document.querySelector(`[data-evidence="${key}"]`), image = card?.querySelector('.evidence-preview'); if (image && saved.evidence?.[key]) { image.src = saved.evidence[key]; image.hidden = false; card.querySelector('.evidence-remove').hidden = false; } }); };
    const save = () => { clearTimeout(timer); timer = setTimeout(async () => { try { state = collect(); await write(state); status.textContent = 'Desat automàticament'; } catch { status.textContent = 'No s’ha pogut desar'; } }, 350); };
    input.addEventListener('input', () => { start.disabled = !input.value.trim(); });
    const newSession = form.querySelector('.session-new'); const message = form.querySelector('.session-message');
    const setMode = mode => { newSession.hidden = mode !== 'new'; existing.hidden = mode !== 'existing'; if (mode === 'new') { input.value = ''; start.disabled = true; setTimeout(() => input.focus(), 0); } };
    try { const saved = await read(id); if (saved && saved.id === id && typeof saved.student === 'string' && saved.student.trim()) { state = saved; form.querySelector('.saved-work').textContent = `Hi ha un treball desat a nom de ${state.student}.`; setMode('existing'); } else setMode('new'); } catch { message.textContent = 'No s’ha pogut recuperar cap treball desat. Pots començar una activitat nova.'; setMode('new'); }
    form.addEventListener('click', async event => {
      if (event.target.value === 'continue' && state) { restore(state); dialog.close('continue'); }
      if (event.target.value === 'replace') { if (confirm('El treball anterior se substituirà quan comencis la nova activitat. Vols continuar?')) setMode('new'); }
    });
    dialog.addEventListener('close', () => { if (dialog.returnValue === 'continue' && state) restore(state); else if (dialog.returnValue === 'new') { header.textContent = input.value.trim(); save(); } });
    document.addEventListener('input', event => { if (event.target.matches('textarea')) save(); });
    document.addEventListener('activity:evidencechange', save);
    dialog.showModal();
  };
})();
