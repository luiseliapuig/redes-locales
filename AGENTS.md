# AGENTS.md

## Contexto del proyecto

Este repositorio contiene materiales y herramientas web para el módulo de Redes locales de Formación Profesional.

Los recursos se utilizan durante las clases y se enlazan principalmente desde Moodle.

El usuario final es alumnado, por lo que la interfaz debe ser clara, directa y resistente a errores de uso.

## Arquitectura

Todo lo construido en este repositorio debe funcionar directamente en un navegador utilizando tecnologías web estándar:

- HTML
- CSS
- JavaScript

Por defecto:

- no utilizar frameworks;
- no introducir procesos de compilación;
- no requerir Node.js para ejecutar las piezas;
- no añadir dependencias salvo que exista una razón clara;
- no introducir backend;
- no requerir instalación para utilizar los recursos.

Una pieza debe poder abrirse y funcionar como contenido web estático.

## Estructura

Las herramientas interactivas se almacenan en:

`/herramientas/`

Los materiales y páginas de apoyo se almacenan en:

`/materiales/`

Cada pieza debe tener su propio directorio cuando necesite varios archivos.

Ejemplo:

    herramientas/
    └── subnetting/
        ├── index.html
        ├── style.css
        └── app.js

No es obligatorio separar HTML, CSS y JavaScript cuando una pieza pequeña resulte más clara y mantenible en un único archivo.

## Índice obligatorio

La raíz contiene un `index.html` que funciona como mapa general del proyecto.

Cada vez que se cree una nueva herramienta o material, debe añadirse también al índice.

Una tarea no se considera completamente integrada en el repositorio si el nuevo recurso no aparece en `index.html`.

## Criterios de desarrollo

Priorizar siempre:

1. Corrección técnica.
2. Claridad pedagógica.
3. Simplicidad de uso.
4. Código legible y mantenible.
5. Consistencia con las piezas existentes.

Evitar complejidad que no aporte valor docente.

Las interfaces están destinadas a alumnado. Las acciones principales deben ser evidentes y no deben existir controles, opciones o información que generen ruido innecesario.

## Modificaciones

Antes de modificar una pieza existente:

1. revisar su funcionamiento actual;
2. comprender su finalidad pedagógica;
3. conservar aquello que ya funciona;
4. realizar cambios concretos y justificados.

No rediseñar ni refactorizar partes ajenas a la tarea solicitada sin una razón necesaria.

Cuando se corrija un cálculo o comportamiento, separar cuando sea razonable la lógica de cálculo de la interfaz y comprobarla con casos conocidos.

## Idioma

Los recursos destinados al alumnado estarán normalmente en catalán.

Los nombres técnicos, variables y estructura interna del código pueden utilizar inglés o el criterio ya establecido en el proyecto.

Mantener la terminología utilizada en el resto del curso.