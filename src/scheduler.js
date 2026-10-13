export function conflitsEvenement(e1, e2) {
  if (!e1 || !e2) return false;
  return e1.jour === e2.jour && e1.creneau === e2.creneau;
}

export function detecterConflitsPourListe(e, liste) {
  return liste.filter(x => conflitsEvenement(e, x));
}
