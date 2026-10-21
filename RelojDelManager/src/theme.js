export const colores = {
  fondo: '#000000',
  texto: '#FFFFFF',
  textoSuave: '#9AA0A6',
  pista: '#1E1E1E',
  verde: '#34D17B',
  ambar: '#F5B73B',
  rojo: '#F25555',
};

// Para valores donde "alto = bueno" (probabilidad de victoria, disponibilidad)
export function colorBueno(valor) {
  if (valor >= 60) return colores.verde;
  if (valor >= 40) return colores.ambar;
  return colores.rojo;
}

// Para valores donde "alto = malo" (fatiga)
export function colorFatiga(valor) {
  if (valor < 50) return colores.verde;
  if (valor < 75) return colores.ambar;
  return colores.rojo;
}
