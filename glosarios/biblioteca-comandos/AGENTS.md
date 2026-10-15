# Biblioteca de comandos

Estas normas se aplican exclusivamente a esta carpeta y sus subcarpetas.

## Finalidad y arquitectura

Biblioteca de consulta para Redes Locales de 1.º de SMX, complementaria a Moodle.
- Usar HTML, CSS y JavaScript plano; sin frameworks, compiladores, backend ni instalación.
- Cada etapa tiene una URL propia y permanente, accesible directamente como archivo HTML o desde alojamiento estático.
- Conservar la estructura de niveles, el menú global, la página activa y los enlaces de retorno.
- Mantener las etapas pendientes como presentaciones mínimas con «Próximamente», sin enlaces rotos.
- Limitar los cambios a la biblioteca. No modificar recursos externos a esta carpeta.

## Diseño por funciones

- Mantener la identidad visual existente: fondo cálido, superficies blancas, bordes discretos, títulos y comandos azules y tipografía monoespaciada para los comandos.
- Usar filas compactas dentro de cada bloque, siguiendo la etapa 1; evitar tarjetas grandes por comando.
- Cada fila representa una función: título de la tarea, comandos con etiquetas, explicación común, «Fíjate en» cuando ayude a interpretar el resultado y diferencias solo cuando aporten valor.
- Linux siempre primero: introducción, encabezados, etiquetas, ejemplos y explicaciones. En comparaciones, Linux a la izquierda y Windows CMD a la derecha.
- Agrupar comandos distintos que resuelven una función comparable, sin repetir explicaciones ni presentarlos como equivalentes exactos cuando no lo sean.
- Si el comando y su comportamiento son suficientemente equivalentes, mostrarlo una sola vez con la etiqueta «Ambos».
- Los comandos exclusivos se muestran una sola vez con su sistema, sin inventar equivalencias.
- Mantener las etiquetas: Linux en verde, Windows CMD en azul y Ambos con el estilo existente.
- Reutilizar las clases compartidas de filas por funciones del CSS; no duplicar estilos por bloque o etapa.

## Contenido y ejemplos

- Redactar el contenido didáctico en castellano, con nivel adecuado para alumnado que empieza primero de SMX.
- Enseñar primero qué se quiere hacer y después cómo hacerlo y qué resultado observar.
- Mantener explicaciones breves, técnicamente correctas y comprensibles.
- Distinguir Linux, Windows CMD y, si se incorpora en el futuro, PowerShell como entornos diferentes.
- Utilizar ejemplos realistas con nombres ficticios; indicar archivos y carpetas que deben existir.
- Explicar diferencias relevantes de comportamiento, salida, rutas y sobrescritura; no atribuir opciones de un sistema a otro.
- No añadir comandos solo para ampliar el listado. Evitar borrados recursivos y operaciones destructivas avanzadas en la etapa inicial.

## Mantenimiento y comprobaciones

- Conservar la navegación de las etapas y sus anclas internas.
- No modificar, mover, renombrar ni sobrescribir el glosario Cisco IOS original ni sus archivos; debe conservar su URL y funcionamiento.
- No añadir funcionalidades ajenas a la consulta: simuladores, evaluación, progreso o autenticación requieren una petición expresa.
- Evitar duplicación innecesaria de CSS y JavaScript y dependencias externas.
- Después de cada ampliación, comprobar enlaces relativos y anclas, clasificación por sistema, sintaxis, condiciones de los ejemplos y comportamiento documentado.
- Revisar visualmente la presentación compacta y el orden Linux/Windows; si no se dispone de navegador, informar de esa limitación.
