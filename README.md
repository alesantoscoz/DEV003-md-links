# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Instalación](#3-instalación)
* [4. Comandos](#4-comandos)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

## 2. Resumen del proyecto

`mdLinks` es una librería creada con NodeJS que permite verificar los status de las URL que se encuentren en un archivo `Markdown`.

Esta librería nos es de utilidad para verificar el contenido de la documentación que querramos añadir a nuestros proyectos como enlaces repetidos, rotos o válidos.

## 3. Instalación

Instalar con npm:

```npm i md-links-asc ```

## 4. Comandos

Se debe acceder a la terminal y ejecutar el comando:

```md-links``` o ```md-links --h```

Este primer comando nos mostrará las indicaciones a seguir para ejecutar el programa y las opciones que existen.

#### Ejemplo:

```
$ md-links --h
Bienvenido a tu librería mdLinks
*********************************
mdLinks es una librería que te permite verificar los status de las URL en tus archivos .md .  

Primero introduce la ruta del archivo o folder para que podamos leerlo y extraer los links.   

Seguido a ello, puedes usar los siguientes comandos:

--validate o --v:               Te daremos un arreglo con los status de los links.
--stats o --s:                  Te brindaremos las estadísticas de los links totales y unicos.
--validate --stats o --v --s:   Te brindaremos las estadísticas de los links rotos.
```

El segundo paso sería llamar a la librería con una ruta que se quiera analizar:
```md-links ./ruta-a-evaluar.md```

Sólo colocando la ruta obtendremos un arreglo de objetos con las propiedades:

* `HREF` : URL encontrada
* `TEXT` : Texto que aparecía dentro del link
* `FILE`: Ruta del archivo donde se encontró el link

#### Ejemplo:
```
$ md-links ./carpeta/ejemplo/txt-prueba.md
***************************************************************************
HREF  : https://es.wikipedia.org/wiki/
TEXT  : Enlace Wikipedia
FILE  : C:\Users\51940\Desktop\LABORATORIA\PROYECTO_4\DEV003-md-links\carpeta\ejemplo\txt-prueba.md
***************************************************************************
HREF  : https://es.wikipedia.org/wiki/Interstellar
TEXT  : Pelicula interestellar
FILE  : C:\Users\51940\Desktop\LABORATORIA\PROYECTO_4\DEV003-md-links\carpeta\ejemplo\txt-prueba.md
***************************************************************************
HREF  : https://es.javascript.info/primise-basics
TEXT  : JavaScript
FILE  : C:\Users\51940\Desktop\LABORATORIA\PROYECTO_4\DEV003-md-links\carpeta\ejemplo\txt-prueba.md
***************************************************************************
HREF  : https://es.javascript.info/primise-basics
TEXT  : JavaScript duplicado
FILE  : C:\Users\51940\Desktop\LABORATORIA\PROYECTO_4\DEV003-md-links\carpeta\ejemplo\txt-prueba.md
```
### Options

Dentro de las opciones encontramos `--validate` o `--v`.
Esta opción nos permite validar los status de los links y devolver un arreglo con lo siguiente:

* `HREF` : URL encontrada
* `TEXT` : Texto que aparecía dentro del link
* `FILE`: Ruta del archivo donde se encontró el link
* `STATUS`: Respuesta status HTTP
* `OK`: Mensaje `ok` en caso se tenga éxito o `fail` en caso de fallar

#### Ejemplo:
```
$ md-links ./carpeta/ejemplo/txt-prueba.md --v
***************************************************************************
HREF: https://es.wikipedia.org/wiki/
TEXT   : Enlace Wikipedia
FILE   : C:\Users\51940\Desktop\LABORATORIA\PROYECTO_4\DEV003-md-links\carpeta\ejemplo\txt-prueba.md
STATUS : 200
OK     : ok
***************************************************************************
HREF: https://es.wikipedia.org/wiki/Interstellar
TEXT   : Pelicula interestellar
FILE   : C:\Users\51940\Desktop\LABORATORIA\PROYECTO_4\DEV003-md-links\carpeta\ejemplo\txt-prueba.md
STATUS : 200
OK     : ok
***************************************************************************
HREF: https://es.javascript.info/primise-basics
TEXT   : JavaScript
FILE   : C:\Users\51940\Desktop\LABORATORIA\PROYECTO_4\DEV003-md-links\carpeta\ejemplo\txt-prueba.md
STATUS : 404
OK     : fail
***************************************************************************
HREF: https://es.javascript.info/primise-basics
TEXT   : JavaScript duplicado
FILE   : C:\Users\51940\Desktop\LABORATORIA\PROYECTO_4\DEV003-md-links\carpeta\ejemplo\txt-prueba.md
STATUS : 404
OK     : fail
```
Otra de las opciones es `--stats` o `--s`.
Esta opción nos permite obtener estadísticas de los links totales y los links únicos

#### Ejemplo:
```
$ md-links ./carpeta/ejemplo/txt-prueba.md --s
Total: 4
Unique: 3
```

Por último, tenemos la opción `--validate --stats` o `--v --s`.
Esta opción nos brinda estadísticas incluyendo los links rotos que se encontraron

#### Ejemplo:
```
$ md-links ./carpeta/ejemplo/txt-prueba.md --v --s
Total: 4
Unique: 3
Broken: 2
```

### Errores

El programa indicará si hay algún error como una ruta inválida, un archivo sin extensión md o un archivo que no contiene links.

#### Ejemplo:

```
$ md-links ./carpeta/ejemplo/este-archivo-no-existe.md
La ruta ingresada no existe
```

```
$ md-links ./carpeta/txt-prueba.txt
No se encontraron archivos con extensión md
```

```
$ md-links ./carpeta/ejemplo/hola.md
No existen links en el archivo
```


