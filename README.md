# Cinéphoria Mobile
___

Application mobile destiné à afficher la liste des réservations de l'utilisateur.

### Documentation

- [Documentation technique.pdf](https://github.com/user-attachments/files/25327038/Documentation.technique.pdf)
- [Documentation de gestion de projet.pdf](https://github.com/user-attachments/files/25327035/Documentation.de.gestion.de.projet.pdf)
- [Manuel d'utilisation.pdf](https://github.com/user-attachments/files/25327039/Manuel.d.utilisation.pdf)
- [Charte graphique.pdf](https://github.com/user-attachments/files/25327027/Charte.graphique.pdf)

## Installation

### Pré-requis
- [Angular](https://angular.dev/) `npm install -g @angular/cli`
- [Ionic](https://ionicframework.com/) `npm install -g @ionic/cli`
- [Node.js](https://nodejs.org/)

### Librairies

Lancez la commande suivante :

```bash
npm install
```

### Variables d'environnement

Vous aurez besoin de modifier les différentes variables d'environnement du fichier `environment.ts` pour connecter 
l'application mobile aux différents microservices.

## Déploiement

Lancez la commande suivante pour lancer l'application mobile **Cinéphoria Mobile** :

```bash
ionic serve
```

L'application mobile est désormais disponible en local.

## Build et génération de l'APK

### :warning: Il est nécessaire que Android Studio (avec Android SDK) soit installé sur votre ordinateur pour procéder
### à la génération de l'APK.

Pour générer les fichiers nécessaires à la création de l'APK, lancez la commande suivante :

```bash
ionic build
```

ou

```bash
ng build
```

Un dossier `www` apparaît à la racine du projet.


Pour ajouter et synchroniser avec Android, lancez les commandes suivantes :

```bash
npx cap add android
```

et

```bash
npx cap sync android
```

Rendez-vous dans le dossier `android` depuis Android Studio :

* `Build`
* `Generate App Bundles or APKs`
* `Generate APK`.

Un APK est désormais disponible dans `android/app/build/outputs/apk`.

Désormais, vous pouvez tester l'APK avec votre smartphone Android !
