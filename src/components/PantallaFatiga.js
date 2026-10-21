import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BarraEnergia from './BarraEnergia';
import { colores, colorBueno, colorFatiga } from '../theme';

export default function PantallaFatiga({ juego, tamano }) {
  const { pitcher, bullpen } = juego;
  const anchoBarra = tamano * 0.62;
  const energia = 100 - pitcher.fatiga;
  const necesitaCambio = pitcher.fatiga >= 75;

  const relevistas = [...bullpen]
    .sort((a, b) => b.disponibilidad - a.disponibilidad)
    .slice(0, 3);

  return (
    <View style={[styles.contenedor, { width: tamano, height: tamano }]}>
      <Text style={[styles.titulo, { fontSize: tamano * 0.065 }]}>PITCHER ACTUAL</Text>
      <Text style={[styles.nombre, { fontSize: tamano * 0.1 }]}>
        {pitcher.nombre} {'\u00B7'} {pitcher.pitcheos}P
      </Text>

      <BarraEnergia
        porcentaje={energia}
        color={colorFatiga(pitcher.fatiga)}
        ancho={anchoBarra}
        alto={tamano * 0.05}
      />
      <Text style={[styles.sub, { fontSize: tamano * 0.06, color: colorFatiga(pitcher.fatiga) }]}>
        {necesitaCambio ? 'CAMBIO RECOMENDADO' : 'Energia ' + energia + '%'}
      </Text>

      <Text style={[styles.titulo, { fontSize: tamano * 0.06, marginTop: tamano * 0.04 }]}>
        BULLPEN
      </Text>
      {relevistas.map((r) => (
        <View key={r.id} style={styles.fila}>
          <Text style={[styles.relevista, { fontSize: tamano * 0.06, width: tamano * 0.2 }]}>
            {r.nombre.slice(0, 6)}
          </Text>
          <BarraEnergia
            porcentaje={r.disponibilidad}
            color={colorBueno(r.disponibilidad)}
            ancho={tamano * 0.34}
            alto={tamano * 0.035}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { alignItems: 'center', justifyContent: 'center', paddingBottom: 10 },
  titulo: { color: colores.textoSuave, fontWeight: '700', letterSpacing: 0.8 },
  nombre: { color: colores.texto, fontWeight: '800', marginBottom: 6 },
  sub: { fontWeight: '700', marginTop: 4 },
  fila: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  relevista: { color: colores.texto, fontWeight: '600' },
});
