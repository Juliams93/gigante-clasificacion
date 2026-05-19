# 🚀 DESPLEGAR EN RENDER (5 MINUTOS)

## 1. Ve a Render.com
```
https://render.com
```

## 2. Haz sign up con GitHub
- Click "Sign Up" 
- Selecciona "Continue with GitHub"
- Dale acceso al repositorio

## 3. Crea Web Service
- Dashboard → Click "+" → "Web Service"
- Selecciona: `gigante-clasificacion`
- Click "Connect"

## 4. Configura el servicio
```
Name: gigante-results-api
Environment: Node
Region: Frankfurt (o Europe)
Branch: main
Build Command: npm install
Start Command: cd sync-script && npm install && npm run api
Plan: Free
```

## 5. Environment Variables
Haz click en "Add Environment Variable" para cada una:

| KEY | VALUE |
|-----|-------|
| RESULTS_SOURCE | mysql |
| MYSQL_HOST | www.fenixflight.es |
| MYSQL_PORT | 3306 |
| MYSQL_USER | fenixfli_julia |
| MYSQL_PASS | Lechucita |
| MYSQL_DB | fenixfli_resultados |
| MYSQL_TABLES | cicloturista,cicloturistag,especial,parejas,parejasG |

## 6. Deploy
- Click "Create Web Service"
- Espera 2-3 minutos
- Cuando veas ✅ "Your service is live", copia la URL

## 7. Tu API estará en:
```
https://tu-servicio.onrender.com/api/runners
```

## 8. Actualiza Frontend
En Vercel Settings → Environment Variables:
```
VITE_RESULTS_API_URL = https://tu-servicio.onrender.com/api/runners
```

Vercel redesplegará automáticamente ✅

## ¿Cómo saber si funciona?
Abre en el navegador:
```
https://tu-servicio.onrender.com/health
```
Debería mostrar datos JSON con tus 362 corredores.
