import { useWindowDimensions } from 'react-native';

const TAMANO_MARCO_DEV = 240; // tamano del "reloj virtual" en telefono / navegador
const UMBRAL_RELOJ = 340;     // por debajo de esto asumimos pantalla de reloj real

export function useTamanoReloj() {
  const { width, height } = useWindowDimensions();
  const lado = Math.min(width, height);
  const esReloj = lado <= UMBRAL_RELOJ;
  return {
    esReloj,
    tamano: esReloj ? lado : TAMANO_MARCO_DEV,
  };
}
