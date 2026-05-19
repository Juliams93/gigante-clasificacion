# Despliegue simple: Render + Vercel

## Qué hace cada parte

- **Vercel** sirve la web.
- **Render** sirve la API de resultados.
- La web llama a Render con `VITE_RESULTS_API_URL`.

## Opción más simple

Usa el backend en modo `csv-url`.

### 1) Sube la API a Render

- Crea un nuevo **Web Service** usando este repo.
- Render leerá `render.yaml`.
- La app de API está en `sync-script`.

### 2) Variables de entorno en Render

Configura estas variables:

- `RESULTS_SOURCE=csv-url`
- `CSV_URL=https://.../resultados.csv`
- `API_KEY=una_clave_larga_y_privada`

Si usas una URL pública de GitHub, el CSV debe ser accesible por `raw.githubusercontent.com`.

### 3) Copia la URL pública de Render

Render te dará una URL parecida a:

- `https://gigante-results-api.onrender.com`

### 4) Configura Vercel

En Vercel añade:

- `VITE_RESULTS_API_URL=https://gigante-results-api.onrender.com/api/runners`
- `VITE_RESULTS_API_KEY=la_misma_clave_que_en_Render`

### 5) Despliega de nuevo en Vercel

Después del cambio, la web quedará apuntando a la API pública y ya no dependerá de tu ordenador.

## Si quieres datos en tiempo real

Entonces necesitas otra fuente que alimente el CSV o una base de datos en la nube. Para empezar, `csv-url` es la vía más simple.
