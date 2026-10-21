import React from 'react';
import { View } from 'react-native';
import { colores } from '../theme';

/**
 * Barra horizontal de energia.
 * porcentaje: 0-100, color: color de relleno
 */
export default function BarraEnergia({ porcentaje, color, ancho, alto = 10 }) {
  const p = Math.max(0, Math.min(100, porcentaje));
  return (
    <View
      style={{
        width: ancho,
        height: alto,
        borderRadius: alto / 2,
        backgroundColor: colores.pista,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: (ancho * p) / 100,
          height: alto,
          borderRadius: alto / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
}
