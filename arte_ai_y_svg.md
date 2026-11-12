# Por que el prototipo usa SVG (y no .ai directo ni PNG)
## Infeccion: Escape del Carmen - Sprint 3

## El dato importante

Un navegador (Chrome, Edge, Firefox) **no puede mostrar archivos `.ai`**.
El `.ai` es un formato propio de Adobe Illustrator: sirve como **archivo fuente
editable**, pero no se puede poner dentro de una pagina web.

Para llevar nuestro arte vectorial a la WebApp hay dos caminos:

| Formato | Vectorial / editable | Lo lee el navegador | Lo usamos? |
|---|---|---|---|
| **.ai** (Illustrator) | Si | **No** | Como FUENTE (se guarda en el repo) |
| **SVG** | **Si** (vectores) | **Si** | **Si, en el juego** |
| PNG | No (son pixeles) | Si | No (lo pedimos evitar) |

## Que hicimos

Exportamos **cada `.ai` a `.svg`**. El SVG mantiene los **vectores** (no son
pixeles como el PNG), se puede abrir y editar, y ademas el navegador lo muestra.
Asi el prototipo usa **nuestro arte real** (el de los `.ai`), **sin PNG**.

En la carpeta del juego:

```
webapp/assets/
  personajes/   -> los personajes en .svg  (USADOS por el juego)
  fondos/       -> los fondos en .svg       (USADOS por el juego)
  _fuente_ai/   -> los .ai originales        (FUENTE editable, para seguir trabajando)
```

> O sea: el juego carga los **SVG** (que salieron de los `.ai`), y guardamos los
> `.ai` al lado como fuente. No se usa ningun PNG como recurso del juego.

## Como se regenera un SVG si editan un .ai

Cuando Santino cambie un `.ai` en Illustrator, exporta de nuevo asi:

1. En Illustrator, abri el `.ai`.
2. **Archivo > Exportar > Exportar como...**
3. En "Tipo" elegí **SVG (svg)** y toca **Exportar**.
4. En las opciones de SVG: Estilos = **Atributos de presentacion**,
   Imagenes = **Conservar**, y tilda **Minimizar**. Toca **Aceptar**.
5. Reemplaza el `.svg` viejo en `webapp/assets/personajes` o `/fondos` con el
   mismo nombre.

Listo: el juego toma el arte nuevo sin tocar el codigo.

## Nota de alcance

El SVG del prototipo es el arte provisorio del Sprint 3. Se puede seguir puliendo
en Illustrator; mientras el nombre del archivo no cambie, el juego lo usa solo.
