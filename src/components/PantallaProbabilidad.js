import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnilloProbabilidad from './AnilloProbabilidad';
import { colores } from '../theme';

export default function PantallaProbabilidad({ juego, tamano }) {
  const { entrada, mitad, marcador, probVictoria } = juego;
  const anillo = tamano * 0.78;

  return (
    <View style={[styles.contenedor, { width: tamano, height: tamano }]}>
      <Text style={[styles.cabecera, { fontSize: tamano * 0.075 }]}>
        {mitad === 'ALTA' ? '\u25B2' : '\u25BC'} {entrada} {'\u00B7'} {marcador.visita}-{marcador.local}
      </Text>
      <AnilloProbabilidad value={probVictoria} size={anillo} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { alignItems: 'center', justifyContent: 'center' },
  cabecera: {
    color: colores.texto,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
});
