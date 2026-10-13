const STORAGE_KEY = 'edt_state_v1';

export function loadState(key = STORAGE_KEY) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('loadState error', e);
    return null;
  }
}

export function saveState(state, key = STORAGE_KEY) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.warn('saveState error', e);
  }
}

export const DEFAULT_ANNEE = '2026-2027';

export function initialState() {
  return {
    anneeActuelle: DEFAULT_ANNEE,
    annees: [DEFAULT_ANNEE],
    ecoles: [
      { id: 'general', nom: 'Le Général', zone: 'Plateau' },
      { id: 'elnasr', nom: 'El Nasr', zone: 'Plateau' },
      { id: 'estloko', nom: 'Est Loko', zone: 'Marcory' }
    ],
    jours: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    creneaux: ['07h30-08h25', '08h25-09h20', '09h20-10h15', '10h15-11h10'],
    salles: {
      general: [{ nom: 'SALLE A(50)', exclureAuto: false }],
      elnasr: [{ nom: 'Salle 4(37)', exclureAuto: false }],
      estloko: [{ nom: 'SALLE (1AS)', exclureAuto: false }]
    },
    profs: [],
    donnees: {}
  };
}
