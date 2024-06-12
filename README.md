# Boogle

## Introducción

Bienvenidos a **Boogle**, un emocionante juego de palabras en el que los jugadores intentan encontrar tantas palabras como puedan en una cuadrícula de 16 casillas (4x4) que contienen letras de forma aleatoria, dentro de un límite de tiempo establecido.

Este proyecto fue desarrollado por **Gisela Dieguez** y **Agustin Ricardo** para la materia **Desarrollo y arquitectura web** de 4to año en la Universidad Abierta Interamericana (UAI).

## Reglas del Juego

- El juego comienza al ordenarse las letras en la cuadrícula, momento que coincide con el inicio del temporizador (que puede setearse a 1, 2 o 3 minutos).
- Las palabras deben cumplir con los siguientes criterios:
  - Tener al menos tres letras.
  - Cada letra después de la primera debe ser vecina horizontal, vertical o diagonal de la anterior.
  - Ninguna casilla de letras individual se puede utilizar más de una vez en una palabra.
  - Se permiten múltiples formas de la misma palabra, como formas singulares y plurales y otras derivaciones.
  - No se aceptan nombres propios, artículos ni pronombres.
  - Se permiten palabras dentro de palabras, como “casa” y “casamiento”.

El jugador debe ir guardando cada palabra que encuentra para generar una puntuación, hasta que finalice el tiempo de juego. Las palabras ingresadas deben ser palabras reales, de lo contrario, habrá una penalización.

## Características

### Requerimientos Obligatorios

- Código prolijo y estricto (HTML5, CSS3 y ES5).
- Consistencia en comentarios, commits y estilos de código.
- Responsividad y estética del juego y la web (usando Flexbox).
- No deberá tener código bloqueante (alert). Utilizar modales en lugar de alert.
- Juego completamente funcional para un jugador, debiendo ingresar el nombre del jugador al iniciar la partida (validando como mínimo 3 letras para el nombre).
- El juego debe contar con un temporizador.
- Feedback al usuario cuando el tiempo se acabe.
- Puntaje por cada palabra encontrada (lógica para validación de palabras).
- Penalización por palabras incorrectas.
- No permitir el agregado de palabras ya encontradas o con menos de 3 letras.
- Las letras seleccionables deben ser contiguas a la última letra seleccionada, sin haber sido seleccionada previamente en esa misma palabra.
- Visualización de la palabra formada cerca del tablero.
- Sección de listado de palabras encontradas.
- Página de Contacto con formulario (nombre, mail, mensaje) que al enviar abra la herramienta de envío de emails predeterminada del sistema operativo.
- Validaciones del formulario de contacto (nombre alfanumérico, mail válido, mensaje con más de 5 caracteres).
- Link a la página de Github del código del juego, abriéndose en una nueva pestaña.

### Requerimientos Deseados

- Colores diferentes para las letras seleccionadas y un borde diferente para la última seleccionada.
- Colores diferentes para las letras seleccionables a continuación.
- Múltiples opciones de temporizador (select con 3 opciones).
- Temporizador con un color diferente cuando el tiempo está por terminar (últimos 10 segundos) o reproducir un sonido de alerta.
- Puntuación en tiempo real a medida que se adivinan o erran palabras.
- Guardar resultados de cada partida usando LocalStorage, registrando el nombre, puntaje, fecha y hora.
- Botón para mostrar un popup (modal) con la lista de partidas, jugadores, puntajes y fechas, ordenados por puntaje.
- Opción de ordenar el ranking por fecha o puntaje.

## Enlaces

- [Link al juego](https://wordtwist.puzzlebaron.com/gameover.php)
- [Repositorio en GitHub](https://github.com/Tp-final-DAW/boggle)