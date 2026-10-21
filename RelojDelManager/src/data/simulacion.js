import { useEffect, useState } from 'react';

const limitar = (v, min, max) => Math.max(min, Math.min(max, v));
const LIMITE_PITCHEOS = 105;

const BULLPEN_INICIAL = [
  { id: 'r1', nombre: 'Diaz', rol: 'Cerrador', disponibilidad: 92 },
  { id: 'r2', nombre: 'Soto', rol: 'Preparador', disponibilidad: 70 },
  { id: 'r3', nombre: 'Ramirez', rol: 'Largo', disponibilidad: 48 },
  { id: 'r4', nombre: 'Kim', rol: 'Zurdo', disponibilidad: 20 },
];

const estadoInicial = {
  entrada: 6,
  mitad: 'BAJA',
  probVictoria: 54,
  marcador: { local: 3, visita: 2 },
  pitcher: { nombre: 'Cole', pitcheos: 78, fatiga: 68 },
  bullpen: BULLPEN_INICIAL,
};

function calcularFatiga(pitcheos) {
  const base = (pitcheos / LIMITE_PITCHEOS) * 100;
  return limitar(Math.round(base + (Math.random() * 6 - 3)), 0, 100);
}

function siguienteEstado(prev) {
  // 1) Probabilidad de victoria: caminata aleatoria
  const delta = (Math.random() - 0.5) * 12;
  const probVictoria = limitar(Math.round(prev.probVictoria + delta), 3, 97);

  // 2) Avance de media entrada (35% de probabilidad por tick)
  let { entrada, mitad } = prev;
  if (Math.random() < 0.35) {
    if (mitad === 'ALTA') {
      mitad = 'BAJA';
    } else {
      mitad = 'ALTA';
      entrada = entrada >= 9 ? 1 : entrada + 1;
    }
  }

  // 3) Pitcher: sube el conteo de pitcheos y la fatiga
  let pitcheos = prev.pitcher.pitcheos + Math.floor(3 + Math.random() * 7);
  let nombre = prev.pitcher.nombre;

  // 4) Bullpen: los relevistas descansan y se recuperan poco a poco
  let bullpen = prev.bullpen.map((r) => ({
    ...r,
    disponibilidad: limitar(r.disponibilidad + Math.round(Math.random() * 4), 0, 100),
  }));

  // 5) Cambio de pitcher automatico al pasar el limite
  if (pitcheos >= LIMITE_PITCHEOS) {
    const mejor = [...bullpen].sort((a, b) => b.disponibilidad - a.disponibilidad)[0];
    nombre = mejor.nombre;
    pitcheos = 0;
    bullpen = bullpen.map((r) =>
      r.id === mejor.id
        ? { ...r, nombre: prev.pitcher.nombre, rol: 'Abridor', disponibilidad: 10 }
        : r
    );
  }

  return {
    ...prev,
    entrada,
    mitad,
    probVictoria,
    pitcher: { nombre, pitcheos, fatiga: calcularFatiga(pitcheos) },
    bullpen,
  };
}

export function useSimulacionJuego(intervaloMs = 3000) {
  const [estado, setEstado] = useState(estadoInicial);

  useEffect(() => {
    const id = setInterval(() => setEstado((prev) => siguienteEstado(prev)), intervaloMs);
    return () => clearInterval(id);
  }, [intervaloMs]);

  return estado;
}
