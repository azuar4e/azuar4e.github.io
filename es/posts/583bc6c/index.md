# Mi Primer Post


<!--more-->

# TDL

Proyecto universitario de la asignatura [Traductores de Lenguajes](https://dlsiis.fi.upm.es/traductores/index.html). La parte del **Procesador de lenguajes**, que es el encargado de verificar que el fichero fuente no tiene errores, está escrito en java, hecho por Xiaoyuan Xu, Yuliang Wang y Caijie Wu, a excepción todo lo involucrado en la **generación de código intermedio**, y adaptado a **maven** por nosotros.

Implementacion de un **traductor de lenguajes** sobre un procesador de lenguajes facilitado por la asignatura. El traductor genera, en base a un archivo de codigo escrito en [Lenguaje Boreal](https://dlsiis.fi.upm.es/traductores/IntroBoreal.html), un archivo con el **codigo intermedio** en el formato de un [fichero de cuartetos](https://dlsiis.fi.upm.es/traductores/Documentos/formato_fichero_cuartetos.pdf). A parte de este, se **generan los archivos del procesador** (tabla de simbolos, parse, errores y tokens). A continuación, el generador de código objeto, en base al fichero de cuartetos, genera un archivo `.ens` en lenguaje [ENS2001](https://dlsiis.fi.upm.es/traductores/Documentos/ENS2001.pdf).


Para descargar la libreria del procesador es necesario ejecutar el siguiente comando para que se instale en el repositoro local de maven:

```powershell
mvn install:install-file -Dfile=".\lib\ts-lib.jar" -DgroupId=tslib -DartifactId=ts-lib -Dversion="1.0" -Dpackaging=jar
```


Para ejecutar el procesador es necesario ejecutar el siguiente comando:

```powershell
java -jar .\target\tdl-1.0-SNAPSHOT-jar-with-dependencies.jar .\ruta\al\ficheroBoreal.txt
```


Para ejecutar el traductor, desde la carpeta gco/, ejecutamos el comando:

```shell
python _gco.py ../tdl/src/test/resources/ficheroboreal.txt
```

Esto nos generará todos los archivos del procesador, el fichero `cuartetos.txt` y el fichero `codobj.ens`. Para ejecutar el `.ens` debemos descargarnos el ensamblador, facilitado en la sección de herramientas, ensamblarlo y ejecutarlo.


---

### Herramientas

Tanto el procesador de lenguajes como los ensambladores simbólicos para ensamblar el código objeto (ENS2001) se encuentran en el siguiente enlace:

👉 https://dlsiis.fi.upm.es/traductores/Herramientas.html

---

> Autor: [Angel Azuara Eizaguirre](https://www.linkedin.com/in/angel-azuara/)  
> URL: https://azuar4e.github.io/es/posts/583bc6c/  

