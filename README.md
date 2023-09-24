# Sveltekit + Amplify + Clean Architecture

En este proyecto trato de seguir los principios de Clean Architecture, para ello he creado una estructura de carpetas que se adapta al principio.
Los módulos están la carpeta "features" y cada módulo está dividido en domain, infrastructure y application, hay un directorio `src/features/_TEMPLATE` que sirve de plantilla para crear nuevos módulos.

## Disclaimer

Este proyecto está en desarrollo, no es un proyecto de producción, es un proyecto de aprendizaje.

## Instalando Amplify

Ejecuta el siguiente comando para crear un nuevo proyecto de Amplify:

```bash
# debes tener instalado amplify cli y aws cli configurado
amplify init
```

## Ejecutar el proyecto

Primero instala las dependencias con el comando `npm install` (`pnpm install` o `yarn`), y corre ejecuta el script dev:

```bash
npm run dev

# abre una ventana de navegador con el proyecto automáticamente
npm run dev -- --open
```

## Building

PAra construir la app para producción:

```bash
npm run build
```
