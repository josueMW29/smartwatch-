import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colores, colorBueno } from '../theme';

/**
 * Anillo de "Probabilidad de Victoria".
 * value: 0-100. Se anima suavemente cada vez que cambia.
 */
export default function AnilloProbabilidad({ value, size }) {
  const grosor = size * 0.11;
  const radio = (size - grosor) / 2;
  const circunferencia = 2 * Math.PI * radio;

  const anim = useRef(new Animated.Value(value)).current;
  const [mostrado, setMostrado] = useState(value);

  useEffect(() => {
    const id = anim.addListener(({ value: v }) => setMostrado(v));
    return () => anim.removeListener(id);
  }, [anim]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const offset = circunferencia * (1 - mostrado / 100);
  const color = colorBueno(mostrado);
  const centro = size / 2;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={centro + ', ' + centro}>
          <Circle
            cx={centro}
            cy={centro}
            r={radio}
            stroke={colores.pista}
            strokeWidth={grosor}
            fill="none"
          />
          <Circle
            cx={centro}
            cy={centro}
            r={radio}
            stroke={color}
            strokeWidth={grosor}
            strokeLinecap="round"
            strokeDasharray={circunferencia}
            strokeDashoffset={offset}
            fill="none"
          />
        </G>
      </Svg>
      <View style={[StyleSheet.absoluteFill, styles.centro]}>
        <Text style={[styles.valor, { fontSize: size * 0.24, color }]}>
          {Math.round(mostrado)}%
        </Text>
        <Text style={[styles.etiqueta, { fontSize: size * 0.07 }]}>PROB. VICTORIA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: { alignItems: 'center', justifyContent: 'center' },
  valor: { fontWeight: '800' },
  etiqueta: { color: colores.textoSuave, fontWeight: '600', marginTop: 2 },
});
