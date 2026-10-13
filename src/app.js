// src/app.js
import { initFirebase } from './firebase.js';
import { loadState, saveState, initialState } from './state.js';

const state = loadState() || initialState();

function renderHeaderSyncStatus() {
  const el = document.getElementById('syncStatus');
  if (el) el.textContent = '💾 Local uniquement (module séparé actif)';
}

export function bootstrap() {
  renderHeaderSyncStatus();
  initFirebase();
  console.log('App bootstrapped', state);
}

document.addEventListener('DOMContentLoaded', bootstrap);
