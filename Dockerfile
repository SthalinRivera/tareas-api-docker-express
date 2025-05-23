# Imagen base
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./
COPY tailwind.config.js ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir CSS
RUN npm run build-css

# Exponer el puerto de la app
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "index.js"]