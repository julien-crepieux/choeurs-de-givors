# Les Chœurs de Givors — site internet

Site vitrine statique (HTML/CSS/JS, sans dépendance ni étape de build) pour la chorale **Les Chœurs de Givors**.

## Aperçu local

Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

## Mettre à jour l'agenda

Tous les événements sont dans **`assets/js/events.js`**. Pour ajouter un concert, copiez un bloc `{ ... }` et modifiez les champs
(date, titre, lieu, ville, heure, tarif, lien, affiche…). Le site classe automatiquement les événements « à venir » et « passés »,
affiche le prochain rendez-vous sur la page d'accueil et propose un bouton « Ajouter à mon agenda » (.ics).

Pour utiliser une vraie affiche à la place de l'illustration générée, déposez l'image dans `assets/img/` et indiquez
`image: "assets/img/mon-affiche.jpg"`.

## Mettre à jour la galerie photo

Déposez la photo (idéalement 1600 px de large maximum) dans `assets/img/photos/`, puis ajoutez une ligne dans
**`assets/js/photos.js`** avec sa légende et sa catégorie (`concerts`, `opera`, `repetitions`, `convivialite`).

## Structure

```
index.html            page unique (accueil, chœur, agenda, histoire, répertoire, recrutement, contact)
assets/css/style.css  styles
assets/js/events.js   données de l'agenda (à éditer)
assets/js/photos.js   galerie photo (à éditer)
assets/img/photos/    photos du chœur (issues de choeursdegivors.fr)
assets/audio/         enregistrements du chœur (mp3)
assets/js/script.js   rendu de l'agenda, menu, animations
assets/img/           favicon et images
```

## Mise en ligne

Le site peut être hébergé tel quel sur n'importe quel hébergement statique (GitHub Pages, Netlify, OVH…).
Avec GitHub Pages : *Settings → Pages → Deploy from branch*.

## À vérifier avec l'association

Les informations ont été rassemblées à partir de sources publiques ; certaines divergent et sont à confirmer :
- date exacte du concert de Ternay (juin 2026) ;
- orthographe des noms du bureau (écrits en majuscules sur le site actuel) ;
- la photo « pierre-vallin-direction.jpg » représente bien Pierre Vallin.
