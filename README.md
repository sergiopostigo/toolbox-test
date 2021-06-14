![alt text](https://files.toolboxtve.com/wp-content/uploads/2018/06/28172724/logo-stycky.png) 

# Toolbox Test

En este repositorio podrán encontrar el desarrollo de la prueba de conocimientos de Toolbox. En las siguientes líneas incluyo información sobre cómo utilizarla y además el detalle de como fue desarrollada paso a paso. Espero sea de su agrado.

## Uso
Clonar el repositorio. Será necesario contar con Node versión 12 en el sistema.

### API

Abrir la ventana de comandos dentro de la carpeta toolbox-api dentro de Backend y ejecutar el comando de inicio:
```bash
npm start
```
Con ello, abremos iniciado la API que estará lista para recibir las llamadas del Frontend en el puerto 3000 del localhost.

#### Tests

Utilizando Mocha + Chai + Supertest se implementaron 3 pruebas de validación:

1. Si se hace un request a la API con un query parameter text cuyo contenido tiene un valor palíndromo, debe responder con un json que contiene {"text" : (query parameter escrito de derecha a izquierda), "palindrome : "true" }

2. Si se hace un request a la API con un query parameter text cuyo contenido no tiene un valor palíndromo, debe responder con un json que contiene {"text" : (query parameter escrito de derecha a izquierda), "palindrome : "false" }

3. Si se hace un request a la API sin query parameters, debe responder con un json que contiene {"error":"no text"}

Para realizar esos tests, detener la API (Ctrl-C) y ejecutar el comando:
```bash
npm test
```

### Frontend

Abrir la ventana de comandos dentro de la carpeta toolbox-interfaz dentro de Frontend y ejecutar el comando de inicio:
```bash
npm start
```
Se abrirá una aplicación web en el navegador que utilizará el puerto 9000 del localhost. Ya podemos interactuar con nuestra interfaz y probar las funcionalidades solicitadas

#### Tests

Utilizando Jest se implementó una prueba unitaria para validar el correcto renderizado de la interfaz. Para realizar la prueba, detener la aplicación web (Ctrl-C) y ejecutar el comando:
```bash
npm test
```


## Uso de funcionalidades opcionales
Opcionalmente, se solicitaron algunas funcionalidades que podian abordarse de manera opcional. Estas han sido desarrolladas y se presentan a continuación:

### API
#### Flag palindrome
Si se envía al endpoint de la API un query parameter palíndroma, es decir que se lee igual de izquierda a derecha o viceversa, este deberá responder con un flag de palindrome: true. En caso la palabra no sea palíndroma, el endpoint deberá responder un un flag de palindrome: false. Esto ha sido implementado y para comprobarlo, con el API corriendo, escribir en el navegador:

http://localhost:3000/iecho?text=ojo

Veremos que recibimos una respuesta que incluye el flag de palindrome : true, ya que la palabara "ojo" se lee igual en ambos sentidos.

Por el contrario se escribimos en el navegador:

http://localhost:3000/iecho?text=test

Veremos que recibimos una respuesta que incluye el flag de palindrome : false, ya que la palabra "test" no se lee igual en ambos sentidos.

#### Standar JS
El código está escrito utilizando estilo de Standard JS. Para poder verificarlo, podemos ejecutar el comando de revisión de estilo:
```bash
npx standard
```
Veremos que no se presentan errores de estilo.

### Frontend
#### Redux
Como se puede verificar en el código, el proyecto incluye el uso de Redux. Se utilizó para guardar en un estado accesible en todo el proyecto un arreglo que contiene todos los textos de las respuestas de la API.
Verificar su uso en:




