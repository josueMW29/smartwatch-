from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# Permitir que la app de Expo se conecte sin problemas de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Variables globales de la simulación
estado_partido = {
    "runs_nyy": 4,
    "runs_bos": 2,
    "inning": "7th",
    "outs": 2,
    "bolas": 3,
    "strikes": 2,
    "b1_ocupada": True,
    "b2_ocupada": False,
    "b3_ocupada": False,
    "bateador": "JUDGE",
    "pitcher": "COLE"
}

@app.get("/estado")
def obtener_estado():
    # Aquí puedes agregar tu lógica real para avanzar el juego.
    # Por ahora, solo simula un pequeño cambio aleatorio en las estadísticas cada vez que se consulta:
    estado_partido["bolas"] = random.randint(0, 3)
    estado_partido["strikes"] = random.randint(0, 2)
    estado_partido["outs"] = random.randint(0, 2)
    
    return estado_partido

# Para correrlo usa en tu terminal: uvicorn crear_reloj_del_manager:app --reload