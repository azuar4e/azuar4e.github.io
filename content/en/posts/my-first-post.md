---
title: My First Post
subtitle:
date: 2025-06-17T12:30:24+02:00
slug: 583bc6c
draft: false
# author:
#   name:
#   link:
#   email:
#   avatar:
# description:
# keywords:
# license:
# comment: false
# weight: 0
# tags:
#   - draft
# categories:
#   - draft
# hiddenFromHomePage: false
# hiddenFromSearch: false
# hiddenFromRelated: false
# hiddenFromFeed: false
# summary:
# resources:
#   - name: featured-image
#     src: featured-image.jpg
#   - name: featured-image-preview
#     src: featured-image-preview.jpg
# toc: true
# math: false
# lightgallery: false
# password:
# message:
# repost:
#   enable: true
#   url:

# See details front matter: https://fixit.lruihao.cn/documentation/content-management/introduction/#front-matter
---

<!--more-->

# TDL

University project for the course [Language Translators](https://dlsiis.fi.upm.es/traductores/index.html). The **language processor** part — responsible for verifying that the source file is error-free — is written in Java by Xiaoyuan Xu, Yuliang Wang, and Caijie Wu, except for everything related to **intermediate code generation**, which we developed and adapted to **Maven**.

This is an implementation of a **language translator** built on top of the processor provided by the course. The translator takes a source file written in [Boreal Language](https://dlsiis.fi.upm.es/traductores/IntroBoreal.html) and generates an output with the **intermediate code** in the format of a [quadruples file](https://dlsiis.fi.upm.es/traductores/Documentos/formato_fichero_cuartetos.pdf). In addition, it produces the processor files (symbol table, parse, errors, and tokens). Then, the object code generator takes the quadruples file and produces a `.ens` file in [ENS2001 language](https://dlsiis.fi.upm.es/traductores/Documentos/ENS2001.pdf).

To install the processor library into the local Maven repository, run:

```powershell
mvn install:install-file -Dfile=".\lib\ts-lib.jar" -DgroupId=tslib -DartifactId=ts-lib -Dversion="1.0" -Dpackaging=jar
```

To execute the processor:

```powershell
java -jar ./target/tdl-1.0-SNAPSHOT-jar-with-dependencies.jar ./path/to/borealFile.txt
```

To run the translator, navigate to the gco/ folder and run:

```shell
python _gco.py ../tdl/src/test/resources/ficheroboreal.txt
```

This will generate the processor outputs, ``cuartetos.txt`` (quadruples), and the final object code ``codobj.ens``. To execute the ``.ens`` file, you need to download the symbolic assembler, assemble the code, and run it using the ENS2001 virtual machine provided by the course.

![image](https://github.com/user-attachments/assets/fd1847b4-8939-49d7-a02b-44e4a0d7d814)


## Tools

Both the language processor and the symbolic assembler to compile the ENS2001 object code can be downloaded here:

👉 https://dlsiis.fi.upm.es/traductores/Herramientas.html