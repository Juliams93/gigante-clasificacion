# 🏔️ Instrucciones para el día de carrera

## Qué necesitas tener abierto

Necesitas abrir **3 cosas** antes de que empiece la carrera:

---

## PASO 1 — Arranca la API de resultados

Abre una terminal y ejecuta:

```
cd sync-script
npm run api
```

✅ Debes ver: `API server running on port 8787`

---

## PASO 2 — Crea el túnel a internet

Abre **otra terminal** (sin cerrar la anterior) y ejecuta:

```
ngrok http --url=delegate-bagginess-massive.ngrok-free.dev 8787
```

Espera unos segundos hasta que veas `Session Status: online`.

✅ La URL pública es siempre la misma: `https://delegate-bagginess-massive.ngrok-free.dev`
(No necesitas copiar nada ni tocar Vercel)

---

## ⚠️ Importante

- **No cierres las terminales** del paso 1 y 2 durante la carrera
- Si se cierra el túnel, vuelve a ejecutar solo el comando del paso 2
- La URL es fija, **no necesitas cambiar nada en Vercel**

---

## 🆘 Si algo falla

- Comprueba que la API del paso 1 sigue corriendo
- Comprueba que MySQL del chip timing está encendido
- Vuelve a ejecutar `cloudflared tunnel --url http://localhost:8787`
