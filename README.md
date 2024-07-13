Spotify Clone Project

Este es un clon del reproductor de Spotify construido utilizando React, Redux Toolkit, Tailwind CSS y Spotify-web-api-js.

Requisitos Previos
Node.js y npm instalados en tu máquina.
Una cuenta de desarrollador de Spotify y una aplicación de Spotify registrada para obtener las credenciales de la API.


Clona el repositorio en tu máquina local.


git clone https://github.com/tu-usuario/clone-spotify.git
cd spotify-clone
Instala las dependencias del proyecto.


npm install
Crea un archivo .env en la raíz del proyecto y agrega tus credenciales de Spotify.
plaintext

REACT_APP_SPOTIFY_CLIENT_ID=tu_spotify_client_id
REACT_APP_SPOTIFY_REDIRECT_URI=tu_redirect_uri
Configuración de Tailwind CSS
Este proyecto utiliza Tailwind CSS para los estilos. Asegúrate de tener Tailwind CSS configurado correctamente en tu proyecto.

Instala Tailwind CSS.


npm install -D tailwindcss
npx tailwindcss init
Configura tailwind.config.js.
js

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
Importa Tailwind CSS en tu archivo src/index.css.
css

@tailwind base;
@tailwind components;
@tailwind utilities;
Configuración de Spotify API
Instala spotify-web-api-js.


npm install spotify-web-api-js
Configura Spotify API en tu proyecto.
js

import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();
spotify.setAccessToken(your_access_token);
Uso de Redux Toolkit
Configura Redux Toolkit.


npm install @reduxjs/toolkit react-redux