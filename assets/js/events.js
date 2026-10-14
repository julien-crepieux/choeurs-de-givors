/*
 * Agenda des Chœurs de Givors
 * ---------------------------------------------------------------
 * Pour ajouter un événement, copiez un bloc { ... } et modifiez-le.
 * Le site classe automatiquement les événements « à venir » et « passés »
 * selon la date du jour.
 *
 *  date     : "AAAA-MM-JJ"           (obligatoire)
 *  endDate  : "AAAA-MM-JJ"           (facultatif, pour plusieurs jours)
 *  time     : "17h00"                (facultatif)
 *  title    : titre de l'événement
 *  type     : "concert" | "opera" | "recital" | "festif"   (couleur de la carte)
 *  place    : lieu
 *  city     : ville
 *  text     : courte description
 *  price    : tarif (facultatif)
 *  link     : lien billetterie / infos (facultatif)
 *  image    : chemin d'une affiche, ex. "assets/img/affiche.jpg" (facultatif)
 *  toConfirm: true si l'info reste à confirmer
 */
window.CHOEURS_EVENTS = [
  {
    date: "2026-09-27",
    time: "17h00",
    title: "Concert solidaire",
    type: "concert",
    place: "Église Saint-Nicolas",
    city: "Givors",
    text: "Concert organisé par le Collectif Accueil Migrants du Pays Mornantais."
  },
  {
    date: "2026-06-07",
    title: "Concert récital avec piano",
    type: "recital",
    place: "",
    city: "Mornant",
    text: "Un programme intimiste : le chœur accompagné au piano.",
    price: "18 €",
    toConfirm: true
  },
  {
    date: "2025-12-13",
    endDate: "2025-12-14",
    title: "Gracchus Babeuf ou la Conjuration des Égaux",
    type: "opera",
    place: "Théâtre de Givors",
    city: "Givors",
    text: "Création de l'opéra de Pierre Vallin, livret de Sylvie Truche, avec solistes, la Chorale Populaire de Lyon et l'orchestre Jeu de cordes."
  },
  {
    date: "2025-06-15",
    title: "Best of du cinquantenaire",
    type: "festif",
    place: "",
    city: "Givors",
    text: "Dernière date de la tournée des 50 ans : un florilège de notre répertoire."
  },
  {
    date: "2025-06-14",
    title: "Best of du cinquantenaire",
    type: "festif",
    place: "",
    city: "Ampuis",
    text: "50 ans de chant choral en un concert."
  },
  {
    date: "2025-06-13",
    title: "Best of du cinquantenaire",
    type: "festif",
    place: "",
    city: "Mornant",
    text: "Ouverture de la tournée d'été des 50 ans."
  },
  {
    date: "2025-04-18",
    title: "Best of du cinquantenaire",
    type: "festif",
    place: "",
    city: "Communay",
    text: "Premier concert de l'année anniversaire."
  }
];
