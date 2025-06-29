# E-commerce de Glaces et Boissons

Un site e-commerce moderne pour une boutique de glaces et boissons rafraîchissantes, développé avec Next.js, Tailwind CSS et Framer Motion.

## Fonctionnalités

- Design moderne et responsive inspiré par spylt.com
- Animations fluides avec Framer Motion
- Catalogue de produits avec filtrage par catégorie
- API locale avec authentification simulée
- Pages : Accueil, Produits, À propos, Contact

## Technologies utilisées

- **Next.js 14** avec App Router
- **TypeScript** pour un typage statique
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **Zod** pour la validation des données
- **Google Maps API** pour la carte de localisation

## Structure du projet

```
/src
  /app
    /api
      /products
        route.ts       # API pour les produits avec auth simulée
    /about
      page.tsx        # Page À propos
    /contact
      page.tsx        # Page Contact avec formulaire et carte
    /products
      page.tsx        # Page Catalogue de produits
    globals.css       # Styles globaux
    layout.tsx        # Layout principal avec Navbar et Footer
    page.tsx          # Page d'accueil
  /components
    Footer.tsx        # Composant Footer
    Navbar.tsx        # Composant Navbar
  /data
    products.json     # Données des produits
/public
  # Images et assets statiques
```

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## API

L'API locale simule un backend avec authentification :

- `GET /api/products` - Récupérer tous les produits
- `GET /api/products?category=glaces` - Filtrer par catégorie
- `GET /api/products?id=1` - Récupérer un produit spécifique
- `POST /api/products/login` - Authentification (simulée)
- `POST /api/products` - Ajouter un produit (auth admin requise)
- `PUT /api/products/:id` - Mettre à jour un produit (auth admin requise)
- `DELETE /api/products/:id` - Supprimer un produit (auth admin requise)

### Identifiants de test

- Admin: `admin / admin123`
- Utilisateur: `user / user123`

## Personnalisation

### Thème

Les couleurs et polices sont configurées dans `tailwind.config.js` :

```js
theme: {
  extend: {
    colors: {
      background: '#FFFFFF',
      text: '#333333',
      accent: '#FF6B6B',
      button: '#FF8E8E',
      card: '#F9F9F9',
    },
    fontFamily: {
      sans: ['var(--font-geist-sans)'],
      mono: ['var(--font-geist-mono)'],
    },
  },
},
```

### Produits

Modifiez le fichier `src/data/products.json` pour ajouter, modifier ou supprimer des produits.

## Migration vers une base de données

Le projet est conçu pour faciliter la migration vers une base de données comme PostgreSQL ou Supabase :

1. Créez un schéma de base de données correspondant à la structure des produits
2. Modifiez les fonctions API dans `src/app/api/products/route.ts` pour utiliser la base de données
3. Ajoutez des fonctions d'authentification réelles

## Déploiement

Le moyen le plus simple de déployer votre application Next.js est d'utiliser la [plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) des créateurs de Next.js.

Consultez la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.
