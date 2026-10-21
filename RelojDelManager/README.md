# El Reloj del Manager

App de smartwatch para fans del beisbol (React Native + Expo).

## Pantallas (desliza horizontalmente)
1. Anillo de Probabilidad de Victoria (animado).
2. Fatiga del pitcher actual (barra de energia) vs disponibilidad del bullpen.

Los datos son simulados (`src/data/simulacion.js`) y cambian cada 3 segundos.

## Inicio rapido
```bash
npm install
npx expo install --fix      # alinea versiones con tu SDK de Expo
npx expo start --web        # vista previa rapida en el navegador (marco circular de 240px)
```

## Wear OS (emulador de Android Studio)
Expo Go no existe para Wear OS, se necesita una build de desarrollo:
```bash
npx expo prebuild --platform android
npx expo run:android        # con el emulador Wear OS ya abierto
```

## Nota sobre watchOS
React Native/Expo no tienen target de watchOS. En el simulador de iOS la app
corre como app de iPhone y el marco circular emula el tamano del reloj.
