# Día de carrera: Web en Vercel + Backend local

## Arquitectura para el día de la carrera

- **Vercel**: Sirve la web pública
- **Tu PC**: Corre la API local con los datos de MySQL
- **ngrok**: Expone tu PC a Internet con URL fija

## Antes del día de la carrera

### 1) Verificar ngrok está instalado

```bash
which ngrok
```

Si no aparece, instala con:

```bash
brew install ngrok/ngrok/ngrok
```

### 2) Crear cuenta en ngrok

- Ve a https://dashboard.ngrok.com
- Crea cuenta gratuita
- Copia tu auth token

### 3) Configurar ngrok localmente

```bash
ngrok config add-authtoken tu_token_aqui
```

Este token habilita URLs fijas.

## El día de la carrera

### Paso 1: Arranca la API local

```bash
cd /Users/julia/Downloads/webff/sync-script
npm run api
```

Verás: `API server running on port 8787`

### Paso 2: Arranca ngrok (en otra terminal)

```bash
ngrok http --url=delegate-bagginess-massive.ngrok-free.dev 8787
```

Verás: `forwarding to http://localhost:8787`

### Paso 3: Abre la web en Vercel

La URL pública es: **https://vercel-url-aqui** (la que configuraste en Vercel)

La web automáticamente llama a `https://delegate-bagginess-massive.ngrok-free.dev/api/runners`

## Si no funciona

1. Comprueba que MySQL está corriendo
2. Verifica que `RESULTS_SOURCE=mysql` en `sync-script/.env`
3. Si ngrok falla, genera una URL nueva en https://dashboard.ngrok.com y actualiza Vercel

## Automatizar todo (opcional)

Crea un script que corra ambos comandos a la vez (próximamente).
