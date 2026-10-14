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

## Structure

```
index.html            page unique (accueil, chœur, agenda, histoire, répertoire, recrutement, contact)
assets/css/style.css  styles
assets/js/events.js   données de l'agenda (à éditer)
assets/js/script.js   rendu de l'agenda, menu, animations
assets/img/           favicon et images
```

## Mise en ligne

Le site peut être hébergé tel quel sur n'importe quel hébergement statique (GitHub Pages, Netlify, OVH…).
Avec GitHub Pages : *Settings → Pages → Deploy from branch*.

## À vérifier avec l'association

Les informations ont été rassemblées à partir de sources publiques ; certaines divergent et sont à confirmer :
- horaires de répétition (20h–22h30 sur le site actuel, 20h30–22h sur la page recrutement) ;
- lieu exact du récital du 7 juin 2026 (Mornant ou Givors) ;
- numéro de téléphone de contact.
