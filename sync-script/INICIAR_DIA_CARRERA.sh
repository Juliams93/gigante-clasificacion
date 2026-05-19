#!/bin/bash

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}═══════════════════════════════════════════════${NC}"
echo -e "${YELLOW}  INICIAR DÍA DE CARRERA - LA GIGANTE${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════════${NC}"

# Verificar que estamos en el directorio correcto
if [ ! -f "api-results-server.js" ]; then
  echo -e "${RED}❌ Error: ejecuta este script desde sync-script/${NC}"
  echo "   cd /Users/julia/Downloads/webff/sync-script"
  exit 1
fi

# Verificar que Node está instalado
if ! command -v node &> /dev/null; then
  echo -e "${RED}❌ Node no está instalado${NC}"
  exit 1
fi

# Verificar que ngrok está instalado
if ! command -v ngrok &> /dev/null; then
  echo -e "${RED}❌ ngrok no está instalado${NC}"
  echo "   brew install ngrok/ngrok/ngrok"
  exit 1
fi

echo -e "\n${GREEN}✓ Dependencias OK${NC}"

# Terminal 1: API local
echo -e "\n${YELLOW}[1/2] Iniciando API local en puerto 8787...${NC}"
npm run api &
API_PID=$!

# Esperar a que la API esté lista
sleep 3

# Verificar que la API está corriendo
if ! curl -s http://localhost:8787/health > /dev/null 2>&1; then
  echo -e "${RED}❌ La API no arrancó. Revisa MySQL y .env${NC}"
  kill $API_PID 2>/dev/null
  exit 1
fi

echo -e "${GREEN}✓ API corriendo en http://localhost:8787${NC}"

# Terminal 2: ngrok
echo -e "\n${YELLOW}[2/2] Iniciando ngrok con URL fija...${NC}"
echo -e "${YELLOW}   Exposiendo puerto 8787 a Internet${NC}"

ngrok http --url=delegate-bagginess-massive.ngrok-free.dev 8787 &
NGROK_PID=$!

# Esperar a que ngrok esté listo
sleep 3

echo -e "${GREEN}✓ ngrok activo${NC}"

# Output final
echo -e "\n${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ Todo listo para la carrera${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"

echo -e "\n${YELLOW}URL pública (compartir con los cronometradores):${NC}"
echo -e "  ${GREEN}https://delegate-bagginess-massive.ngrok-free.dev/api/runners${NC}"

echo -e "\n${YELLOW}URL de la clasificación (Vercel):${NC}"
echo -e "  ${GREEN}https://tu-vercel-url.vercel.app${NC}"

echo -e "\n${YELLOW}Para parar todo, presiona Ctrl+C${NC}"

# Función para limpiar al salir
cleanup() {
  echo -e "\n${YELLOW}Parando servicios...${NC}"
  kill $API_PID 2>/dev/null
  kill $NGROK_PID 2>/dev/null
  echo -e "${GREEN}✓ Servicios detenidos${NC}"
}

trap cleanup EXIT

# Mantener abiertos los procesos
wait
