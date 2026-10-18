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
- Presentar cada comando con una explicación breve inmediatamente debajo y, cuando aporten valor, variantes relevantes con sus propias explicaciones; mantener aparte la explicación ampliada de la función. Reutilizar las notas compartidas y evitar variantes innecesarias.
- Linux siempre primero: introducción, encabezados, etiquetas, ejemplos y explicaciones. En comparaciones, Linux a la izquierda y Windows CMD a la derecha.
- Agrupar comandos distintos que resuelven una función comparable, sin repetir explicaciones ni presentarlos como equivalentes exactos cuando no lo sean.
- Si el comando y su comportamiento son suficientemente equivalentes, mostrarlo una sola vez con la etiqueta «Ambos S.O.».
- Los comandos exclusivos se muestran una sola vez con su sistema, sin inventar equivalencias.
- Mantener las etiquetas: Linux en verde, Windows CMD en azul y Ambos S.O. con el estilo existente; Cisco IOS se identifica por separado cuando corresponda.
- Las etiquetas de finalidad son opcionales e independientes del sistema. Utilizar solo «Consultar» para mostrar información sin modificarla (también información general y ayuda), «Diagnosticar» para comprobar el funcionamiento de una red o investigar problemas y «Configurar» para modificar la configuración de red o de dispositivos.
- Las operaciones cotidianas de navegación, gestión de archivos y limpieza de pantalla no necesitan etiqueta de finalidad; no clasificarlas como «Configurar». La ausencia de etiqueta no implica que la operación sea inocua o no produzca cambios.
- Las tres etiquetas de finalidad usan el mismo estilo de píldora compacta con borde fino, fondo suave y texto legible en amarillo/naranja, independientemente de su contenido; reutilizar la clase compartida.
- Reutilizar las clases compartidas de filas por funciones del CSS; no duplicar estilos por bloque o etapa.

## Cisco IOS

- Respetar el modo de ejecución de cada comando y diferenciar las consultas y verificaciones de las operaciones de configuración.
- Mostrar el indicador de terminal correspondiente en cada línea de las secuencias y explicar las transiciones de modo; no presentar secuencias incompletas que puedan confundir.
- Mantener el glosario rápido Cisco IOS independiente de la biblioteca ampliada y conservar su URL y contenido.

## Demostraciones de terminal

- Las demostraciones muestran resultados simulados y son de solo lectura; nunca ejecutan comandos reales.
- Mantener una animación breve y respetar la preferencia de movimiento reducido; cada sistema utiliza su propio aspecto y prompt.
- Separar los datos de las demostraciones de la lógica reutilizable y conservar la accesibilidad del diálogo y del teclado.
- La descripción breve del modal procede de la nota de la ficha del comando concreto que lo abre; no duplicarla manualmente en los datos de la demostración. Cada variante y cada función conserva su propia nota.

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

## Configuración de red del equipo

- Diferenciar consulta, cambios temporales y configuración persistente.
- Para Linux, explicar que `ip` cambia el estado en ejecución y que `nmcli` administra perfiles solo si se usa NetworkManager; no presentar una solución universal para todas las distribuciones.
- Cuando una función ofrezca alternativas temporales y permanentes, identificarlas con rótulos textuales neutros «Temporal» y «Permanente», sin añadir colores de clasificación.
- Para Windows CMD, usar comandos `netsh` e `ipconfig` y advertir cuando se necesitan permisos de administrador.
- Señalar cuándo una operación puede cortar la conectividad; usar nombres de interfaces y perfiles como ejemplos sustituibles.
