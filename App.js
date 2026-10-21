import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  // Estado inicial esperando los datos de Python
  const [partido, setPartido] = useState({
    runs_nyy: 0, runs_bos: 0, inning: "1st",
    outs: 0, bolas: 0, strikes: 0,
    b1_ocupada: false, b2_ocupada: false, b3_ocupada: false,
    bateador: "-", pitcher: "-"
  });

  useEffect(() => {
    // Consulta a FastAPI cada 2 segundos
    const intervalo = setInterval(() => {
      fetch('http://127.0.0.1:8000/estado') 
        .then(response => response.json())
        .then(data => setPartido(data))
        .catch(error => console.log("Error de conexión:", error));
    }, 2000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.smartwatchScreen}>
        <Text style={styles.widgetTopLeft}>🔋 91%</Text>
        <Text style={styles.widgetTopRight}>87% 🛜</Text>

        <Image 
          source={require('./Major-League-Baseball-MLB-Logo-1991-500x281.webp')} 
          style={styles.logo} 
          resizeMode="contain"
        />

        {/* Marcador Dinámico */}
        <View style={styles.scoreboard}>
          <View style={styles.team}>
            <Text style={styles.teamName}>NYY</Text>
            <Text style={styles.teamScore}>{partido.runs_nyy}</Text>
          </View>
          <View style={styles.inning}>
            <Text style={styles.inningText}>{partido.inning} ⚾</Text>
          </View>
          <View style={styles.team}>
            <Text style={styles.teamName}>BOS</Text>
            <Text style={styles.teamScore}>{partido.runs_bos}</Text>
          </View>
        </View>

        {/* Diamante Dinámico */}
        <View style={styles.diamondContainer}>
          <View style={[styles.base, styles.base1, partido.b1_ocupada && styles.baseActive]} />
          <View style={[styles.base, styles.base2, partido.b2_ocupada && styles.baseActive]} />
          <View style={[styles.base, styles.base3, partido.b3_ocupada && styles.baseActive]} />
          <View style={[styles.base, styles.baseHome]} />
        </View>

        {/* Outs y Cuenta Dinámicos */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>OUTS</Text>
            <View style={styles.outsRow}>
              <View style={[styles.circle, partido.outs >= 1 && styles.circleFilled]} />
              <View style={[styles.circle, partido.outs >= 2 && styles.circleFilled]} />
              <View style={[styles.circle, partido.outs === 3 && styles.circleFilled]} />
            </View>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>COUNT</Text>
            <Text style={styles.countText}>{partido.bolas}-{partido.strikes}</Text>
          </View>
        </View>

        {/* Jugadores Dinámicos */}
        <View style={styles.playersInfo}>
          <Text style={styles.playerLabel}>BATEANDO: <Text style={styles.playerHighlight}>{partido.bateador}</Text></Text>
          <Text style={styles.playerLabel}>PITCHER: <Text style={styles.playerHighlight}>{partido.pitcher}</Text></Text>
        </View>
      </View>
    </View>
  );
}

// Los estilos son exactamente los mismos del mensaje anterior, con la adición de baseActive
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' },
  smartwatchScreen: { width: 320, height: 380, backgroundColor: '#0b162c', borderRadius: 50, borderWidth: 10, borderColor: '#333', alignItems: 'center', paddingTop: 30, position: 'relative', overflow: 'hidden' },
  widgetTopLeft: { position: 'absolute', top: 25, left: 25, fontSize: 10, color: '#888', transform: [{ rotate: '-30deg' }] },
  widgetTopRight: { position: 'absolute', top: 25, right: 25, fontSize: 10, color: '#888', transform: [{ rotate: '30deg' }] },
  logo: { height: 30, width: 60 },
  scoreboard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', marginTop: 15 },
  team: { alignItems: 'center' },
  teamName: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  teamScore: { fontSize: 38, fontWeight: 'bold', color: '#fff', marginTop: 5 },
  inning: { justifyContent: 'center', alignItems: 'center' },
  inningText: { fontSize: 14, fontWeight: 'bold', color: '#ddd' },
  diamondContainer: { width: 50, height: 50, marginTop: 15, borderWidth: 2, borderColor: '#555', transform: [{ rotate: '45deg' }], position: 'relative' },
  base: { width: 10, height: 10, backgroundColor: '#333', position: 'absolute', borderRadius: 2 },
  base1: { bottom: -6, right: -6 },
  base2: { top: -6, right: -6 },
  base3: { top: -6, left: -6 },
  baseHome: { bottom: -6, left: -6, borderRadius: 5 },
  baseActive: { backgroundColor: '#ffcc00', shadowColor: '#ffcc00', shadowOpacity: 0.8, shadowRadius: 5 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '75%', marginTop: 25 },
  statBox: { alignItems: 'center' },
  statTitle: { fontSize: 10, color: '#aaa', marginBottom: 5, letterSpacing: 1 },
  outsRow: { flexDirection: 'row', gap: 5 },
  circle: { width: 10, height: 10, borderRadius: 5, borderWidth: 1, borderColor: '#d32f2f' },
  circleFilled: { backgroundColor: '#d32f2f' },
  countText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  playersInfo: { backgroundColor: '#1a2a42', borderColor: '#2a4a72', borderWidth: 1, borderRadius: 10, width: '85%', paddingVertical: 8, marginTop: 15, alignItems: 'center' },
  playerLabel: { fontSize: 11, color: '#a0b4c8', fontWeight: 'bold', marginVertical: 2 },
  playerHighlight: { color: '#fff' }
});