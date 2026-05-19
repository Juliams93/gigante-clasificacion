# Desplegar API en Render.com

## Paso 1: Crear cuenta en Render

1. Ve a https://render.com
2. Click en "Sign up"
3. Usa Google, GitHub o crea cuenta con email

## Paso 2: Conectar GitHub

1. En Render dashboard, ve a "Git Repositories"
2. Click "Connect" y selecciona tu repositorio: `gigante-clasificacion`
3. Dale permisos necesarios

## Paso 3: Crear Web Service

1. Dashboard → "New +" → "Web Service"
2. Selecciona el repositorio `gigante-clasificacion`
3. Llena los valores:

| Campo             | Valor                                          |
| ----------------- | ---------------------------------------------- |
| **Name**          | `gigante-results-api`                          |
| **Runtime**       | Node                                           |
| **Build Command** | `npm install`                                  |
| **Start Command** | `cd sync-script && npm install && npm run api` |
| **Plan**          | Free                                           |

## Paso 4: Agregar Variables de Entorno

En la sección "Environment Variables", agrega:

```
RESULTS_SOURCE = mysql
MYSQL_HOST = www.fenixflight.es
MYSQL_PORT = 3306
MYSQL_USER = fenixfli_julia
MYSQL_PASS = Lechucita
MYSQL_DB = fenixfli_resultados
MYSQL_TABLES = cicloturista,cicloturistag,especial,parejas,parejasG
API_PORT = 10000
```

## Paso 5: Deploy

1. Click "Create Web Service"
2. Render empezará el deploy (toma ~2-3 minutos)
3. Espera hasta que vea ✅ "Your service is live"

## Paso 6: Obtener URL

Una vez desplegado:

1. Copia la URL que aparece (algo como: `https://gigante-results-api.onrender.com`)
2. La API estará en: `https://gigante-results-api.onrender.com/api/runners`

## Paso 7: Actualizar Frontend

Si la URL es diferente a `https://gigante-results-api.onrender.com`:

1. En Vercel, ve a Settings → Environment Variables
2. Agrega: `VITE_RESULTS_API_URL = https://tu-url-de-render.onrender.com/api/runners`
3. Vercel redesplegará automáticamente

## Verificar que funciona

Abre en el navegador:

```
https://tu-url-de-render.onrender.com/health
```

Debería devolver:

```json
{ "ok": true, "source": "mysql", "time": "2026-05-19T12:30:00.000Z" }
```

¡Listo! 🎉 La clasificación ahora cargará datos EN DIRECTO desde tu MySQL.
