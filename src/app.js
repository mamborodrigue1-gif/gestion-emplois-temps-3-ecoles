import { initFirebase } from './firebase.js';
import { loadState, initialState } from './state.js';
import { uid } from './utils.js';
import { conflitsEvenement } from './scheduler.js';

const state = loadState() || initialState();

function renderHeaderSyncStatus() {
  const el = document.getElementById('syncStatus');
  if (el) el.textContent = '💾 Local (refactor safe)';
}

function renderMinimalDashboard() {
  const app = document.getElementById('app');
  if (!app) return;

  app.style.display = 'block';
  app.innerHTML = `
    <div class="card">
      <h2>Refactor safe �� Aperçu</h2>
      <div class="row">
        <div>Écoles : <strong>${state.ecoles.length}</strong></div>
        <div>Créneaux : <strong>${state.creneaux.length}</strong></div>
        <div>Profs : <strong>${state.profs.length}</strong></div>
      </div>
      <div class="row" style="margin-top:12px;">
        <button class="btn" id="btnDump">Télécharger l'état (JSON)</button>
        <button class="btn ghost" id="btnAddSample">Ajouter évènement test</button>
      </div>
      <div id="conflictReport" style="margin-top:10px;"></div>
    </div>
  `;

  document.getElementById('btnDump').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edt-state.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('btnAddSample').addEventListener('click', () => {
    const ev1 = {
      id: uid('ev'),
      jour: state.jours[0],
      creneau: state.creneaux[0],
      profId: 'p1',
      salle: 'SALLE A'
    };
    const ev2 = {
      id: uid('ev'),
      jour: state.jours[0],
      creneau: state.creneaux[0],
      profId: 'p2',
      salle: 'SALLE B'
    };

    const conflicts = conflitsEvenement(ev1, ev2)
      ? ['Conflit détecté (même jour & créneau)']
      : ['Aucun conflit'];

    document.getElementById('conflictReport').innerHTML =
      '<div class="msg ok">' + conflicts.join('<br>') + '</div>';
  });
}

export function bootstrap() {
  renderHeaderSyncStatus();
  initFirebase();
  renderMinimalDashboard();
  console.log('App bootstrapped (refactor safe)', state);
}

document.addEventListener('DOMContentLoaded', bootstrap);
