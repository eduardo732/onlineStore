# Título del Proyecto

Online store 

## Comenzando 🚀

Proyecto full stack, node-mysql-html,css,js
El backend fue realizado con Typescript.


### Instalación 🔧

Para correr la aplicación localmente, se debe tener instalado npm y node.
luego ir a ./public/index.js y cambiar las url para fetch.
entrar a la raiz del proyecto y ejecutar npm run dev.

En la raiz del proyecto se identifican los siguientes archivos y carpetas:

- dist : Carpeta donde se traducen los archivos typescript a javascript
- node_modules: archivos pertenecientes a las dependencias utilizadas de npm.
- public: Carpeta donde se encuentra desarrollado el Frontend
- src: Carpeta donde se encuentra desarrollado el Backend
- Lo demás son archivos de configuración.

### Explicación 🔧

    En /public se encuentra el Frontend hecho con html css y javascript.
    De aquí lo importante en recalcar es el archivo /public/js/index.js.
    Es en donde se encuentra la lógica del Front.

    Por otro lado en la carpeta /src se encuentra el backend en la cual se distingue lo siguiente:
    - config: Se definen las variables de entorno.
    - controllers: Controladores utilizados para manejar los datos de la base de datos.
    -loaders: Clases que definen el servidor y la conexion con la base de datos.
    - models: Modelos representativos a las tablas de la base de datos.
    - routes: Rutas definidas para la api.
    - test: Testing end to end.
    - index: archivo principal.

## Ejecutando las pruebas ⚙️

Para ejecutar las pruebas adecuadamente escribir en la terminal
- npm run test /src/test

### Analice las pruebas end-to-end 🔩

Se ejecutan pruebas para comprobar el éxito de las rutas.

## Construido con 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [NODE](https://nodejs.dev/) - El framework web usado para el back


## Autores ✒️

* **Eduardo Fuentes**  - [eduardo732](https://github.com/eduardo732) - (https://www.linkedin.com/in/eduardofuentesreyes/)

