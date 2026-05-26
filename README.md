# FactQuiz

Quiz interactif Vrai/Faux sur les fake news et idées reçues. Développé avec Next.js 15, TypeScript et Tailwind CSS en 2spi.
EMI Nothing2hide

---

## Prérequis

| Outil | Version minimale |
|-------|-----------------|
| Node.js | 18.18.0 |
| npm | 9.0.0 |
| Git | 2.x |

Je recommande l'installation avec NVM :
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
export NVM_DIR="$HOME/.nvm"
nvm ls-remote
nvm install --lts
```

Vérifier les versions installées :

```bash
node --version
npm --version
git --version
```

---

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/fo0n2h/FactQuiz.git
cd FactQuiz

# Installer les dépendances
npm install
```

---

## Lancement en développement

```bash
npm run dev
```

L'application écoute sur **http://localhost:3000**.

---

## Déploiement en production

### 1. Build

```bash
npm run build
```

### 2. Démarrage

```bash
npm start
```

Par défaut, Next.js écoute sur le port **3000**.

Pour changer le port :

```bash
npm start -- -p 8080
```

Ou via variable d'environnement :

```bash
PORT=8080 npm start
```

---

## Lancement automatique avec PM2 (recommandé)

```bash
# Installer PM2 globalement
npm install -g pm2

# Démarrer l'application
pm2 start npm --name "factquiz" -- start

# Démarrer sur un port personnalisé
PORT=3000 pm2 start npm --name "factquiz" -- start

# Activer le démarrage automatique au boot
pm2 startup
pm2 save
```

Commandes utiles PM2 :

```bash
pm2 status          # état des processus
pm2 logs factquiz   # logs en temps réel
pm2 restart factquiz
pm2 stop factquiz
```

---

## Configuration Reverse Proxy

### Nginx

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Avec HTTPS (Certbot) :

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d votre-domaine.com
```

### Apache (mod_proxy)

```apache
<VirtualHost *:80>
    ServerName votre-domaine.com

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    RequestHeader set X-Forwarded-Proto "http"
</VirtualHost>
```

---

## Ports utilisés

| Service | Port par défaut | Configurable |
|---------|----------------|--------------|
| Next.js (dev) | 3000 | `npm run dev -- -p <PORT>` |
| Next.js (prod) | 3000 | `PORT=<PORT> npm start` |

> Si vous utilisez un reverse proxy, seul le port 3000 (ou celui que vous choisissez) doit être accessible en interne. Le reverse proxy expose lui-même les ports 80/443 vers l'extérieur.

Ouvrir le port si pas de reverse proxy :

```bash
# UFW
ufw allow 3000/tcp
```

---

## Structure du projet

```
FactQuiz/
├── data/
│   └── questions.json        # Questions Vrai/Faux (modifiable)
├── src/
│   ├── app/
│   │   ├── page.tsx          # Page d'accueil
│   │   ├── quiz/page.tsx     # Quiz interactif
│   │   └── resultats/page.tsx# Score et récapitulatif
│   └── types/
│       └── question.ts       # Types TypeScript
├── package.json
└── next.config.ts
```

---

## Ajouter ou modifier des questions

Éditez le fichier `data/questions.json` :

```json
{
  "id": 13,
  "affirmation": "Votre affirmation ici.",
  "reponse": true,
  "explication": "Explication affichée après la réponse.",
  "categorie": "Science"
}
```

Catégories disponibles : `Santé`, `Science`, `Histoire`, `Nature`, `Technologie` — ou créez les vôtres.

Relancer le build après modification :

```bash
npm run build && pm2 restart factquiz
```
