import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useTamanoReloj } from './src/hooks/useTamanoReloj';
import { useSimulacionJuego } from './src/data/simulacion';
import PantallaProbabilidad from './src/components/PantallaProbabilidad';
import PantallaFatiga from './src/components/PantallaFatiga';
import { colores } from './src/theme';

const TOTAL_PAGINAS = 2;

export default function App() {
  const { tamano, esReloj } = useTamanoReloj();
  const juego = useSimulacionJuego(3000);
  const [pagina, setPagina] = useState(0);
  const scrollRef = useRef(null);

  const onFinScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    setPagina(Math.round(x / tamano));
  };

  // En un reloj real ocupa toda la pantalla; en telefono/web se dibuja un "marco" redondo.
  const marco = esReloj
    ? { width: tamano, height: tamano }
    : {
        width: tamano,
        height: tamano,
        borderRadius: tamano / 2,
        borderWidth: 4,
        borderColor: '#2a2a2a',
        overflow: 'hidden',
      };

  return (
    <View style={styles.raiz}>
      <StatusBar hidden />
      <View style={[styles.marco, marco]}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onFinScroll}
          style={{ width: tamano, height: tamano }}
        >
          <View style={{ width: tamano, height: tamano }}>
            <PantallaProbabilidad juego={juego} tamano={tamano} />
          </View>
          <View style={{ width: tamano, height: tamano }}>
            <PantallaFatiga juego={juego} tamano={tamano} />
          </View>
        </ScrollView>

        <View style={styles.puntos} pointerEvents="none">
          {Array.from({ length: TOTAL_PAGINAS }).map((_, i) => (
            <View
              key={i}
              style={[styles.punto, i === pagina && styles.puntoActivo]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marco: {
    backgroundColor: colores.fondo,
  },
  puntos: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  punto: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#444',
    marginHorizontal: 3,
  },
  puntoActivo: {
    backgroundColor: '#fff',
  },
});
