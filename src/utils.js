export function uid(prefix = 'id') {
  return prefix + '_' + Math.random().toString(36).slice(2, 9);
}

export function mkSalles(names) {
  return names.map(n => ({ nom: n, exclureAuto: false }));
}

export function toutesDispoParDefaut() {
  const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const creneaux = ['07h30-08h25', '08h25-09h20', '09h20-10h15', '10h15-11h10', '11h10-12h05'];
  const d = {};

  jours.forEach(j => {
    creneaux.forEach(c => {
      d[j + '|' + c] = true;
    });
  });

  return d;
}
