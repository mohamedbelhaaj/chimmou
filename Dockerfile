# Utilisez la version de Node.js avec npm (plus complète que alpine pour le dev)
FROM node:22

WORKDIR /app

# Copie des fichiers package pour installer les dépendances
COPY package*.json ./

# Installation de toutes les dépendances (y compris devDependencies)
RUN npm install

# Copie de tous les fichiers sources
COPY . .

# Exposition du port utilisé par le serveur de dev Angular
EXPOSE 4200

# Commande pour lancer le serveur de développement
CMD ["npm", "start"]