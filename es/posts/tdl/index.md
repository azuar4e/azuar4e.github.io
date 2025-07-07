# Traductor De Lenguajes


<!--more-->

## Introducción

Este es un proyecto universitario para la asignatura [Traductores de Lenguajes](https://dlsiis.fi.upm.es/traductores/index.html). El traductor genera, a partir de un archivo de código escrito en el [Lenguaje Boreal](https://dlsiis.fi.upm.es/traductores/IntroBoreal.html), un archivo `.ens` con el **código objeto** del programa, en lenguaje [ENS2001](https://dlsiis.fi.upm.es/traductores/Documentos/ENS2001.pdf).

El proyecto se divide en **dos partes principales**:

- **Procesador de Lenguajes**, escrito en *Java*, proporcionado por la asignatura y extendido por nosotros.
- **Traductor de Lenguajes**, desarrollado desde cero en *Python*.


## Información adicional

En esta sección se detallan los pasos necesarios para instalar dependencias, compilar el proyecto y ejecutar cada componente.


## Procesador de Lenguajes

El procesador de lenguajes es el responsable de validar que un fichero fuente no tenga errores de tipo **léxico**, **sintáctico** o **semántico**.  

Este módulo se divide en **tres etapas**:

### Analizador léxico

Para los **errores léxicos**, utilizamos un **autómata** que divide todo el contenido del programa en **tokens**.  
Un token puede ser cualquier cosa: un `for`, un `;`, el nombre de una variable, etc.

Un error léxico ocurre cuando se recibe un símbolo inesperado.
Por ejemplo, después de una asignación se espera una cadena, número, etc.; si en su lugar aparece un `;`, se consideraría un error léxico.

### Analizador sintáctico

Para los **errores sintácticos**, se analizan las estructuras del lenguaje mediante reglas gramaticales. Estos errores aparecen cuando la secuencia de tokens no sigue la sintaxis esperada. Aquí entra los conceptos de **first** y **follow**. Para explicarlos, mostramos un fragmento de una grámatica:

```
Producciones = {
Pprima -> P
P -> B P
P -> F P
P -> lambda
B -> var T id Bprima ;
B -> S
B -> if ( E ) W
B -> lambda
W -> id Sprima
W -> output E ;
W -> input id ;
W -> return X ;
W -> Begin C End J
J -> else Begin C End
J -> lambda
Bprima -> = E
Bprima -> lambda
S -> id Sprima
S -> output E ;
S -> input id ;
S -> return X ;
Sprima -> = E ;
Sprima -> ( L ) ;
...
}
```


Primero hay que entender que un **terminal** es un símbolo que aparece tal cual en el lenguaje final, como `;`, `if`, `var`, etc.  
Un **no terminal**, en cambio, representa una regla o grupo de reglas, como `T`, `B`, `P`, etc.

---

El conjunto **first** de una regla son todos los terminales por los que puede comenzar.  
Por ejemplo, en el caso de `W` en la gramática anterior, su `first(W)` sería: `id`, `output`, `input`, `return`, `Begin`.

El conjunto **follow** de un no terminal son los terminales que pueden aparecer **inmediatamente después** de él en alguna derivación.  
Por ejemplo, si evaluamos `X`, su `follow(X)` podría ser `;`, si siempre va seguido por ese símbolo.

Además, si una regla puede derivar en **lambda** (vacío), entonces su `follow` también incluye lo que podría venir después de esa posición en la producción.  
Por ejemplo, como `P -> B P` y `P -> lambda`, `follow(B)` incluiría lo que sigue a `P`, e incluso `$` (fin de entrada).

---

Volviendo a los errores sintácticos, se producen cuando el símbolo actual **no pertenece al conjunto first** de la regla esperada.  
Si, por ejemplo, se espera una producción de `W` y el siguiente token es `if` (que no está en `first(W)`), se trata de un **error sintáctico**.

_(Ejemplo típico: un `else` sin un `if`, o una expresión mal cerrada)._

### Analizador semántico

Para los **errores semánticos**, utilizamos **acciones semánticas**, en las que se definen cosas como la herencia de atributos, inserciones en la tabla de símbolos, y validaciones de tipos.

Por ejemplo, en una regla como `W → output E ;`, podríamos tener una acción semántica del estilo `{ W.tipo := E.tipo }`, que asigna a `W` el tipo de `E`.  
En el código, esto se reflejaría evaluando ese caso y actualizando la pila de atributos.

Un error semántico típico sería que el tipo heredado no coincida con el esperado.


## Traductor de lenguajes

El traductor genera, en base a un archivo de codigo escrito en [Lenguaje Boreal](https://dlsiis.fi.upm.es/traductores/IntroBoreal.html), un archivo con el **codigo intermedio** en el formato de un [fichero de cuartetos](https://dlsiis.fi.upm.es/traductores/Documentos/formato_fichero_cuartetos.pdf). A parte de este, se **generan los archivos del procesador** (tabla de simbolos, parse, errores y tokens). A continuación, el generador de código objeto, en base al fichero de cuartetos, genera un archivo `.ens` en lenguaje [ENS2001](https://dlsiis.fi.upm.es/traductores/Documentos/ENS2001.pdf).


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

## Herramientas

Tanto el procesador de lenguajes como los ensambladores simbólicos para ensamblar el código objeto (ENS2001) se encuentran en el siguiente enlace:

>👉 https://dlsiis.fi.upm.es/traductores/Herramientas.html

---

> Autor: [Angel Azuara Eizaguirre](https://www.linkedin.com/in/angel-azuara/)  
> URL: https://azuar4e.github.io/es/posts/tdl/  

