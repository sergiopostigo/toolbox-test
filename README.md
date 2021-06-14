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

[toolbox-test/Frontend/toolbox-interfaz/src/redux/](https://github.com/sergiopostigo/toolbox-test/tree/master/Frontend/toolbox-interfaz/src/redux)

[toolbox-test/Frontend/toolbox-interfaz/src/App.js ](https://github.com/sergiopostigo/toolbox-test/blob/master/Frontend/toolbox-interfaz/src/App.js)

[toolbox-test/Frontend/toolbox-interfaz/src/components/TextList/TextList.js](https://github.com/sergiopostigo/toolbox-test/blob/master/Frontend/toolbox-interfaz/src/components/TextList/TextList.js)

#### Test unitarios con Jest
Utilizando Jest se implementó una prueba unitaria para validar el correcto renderizado de la interfaz. Para realizar la prueba, detener la aplicación web (Ctrl-C) y ejecutar el comando:
```bash
npm test
```

## Desarrollo
En este apartado se describirá paso a paso la conceptualización y desarrollo de la API y el Frontend del proyecto.

### API

Con Node.js versión 12 instalado (específicamente en el proyecto se uso la versión 12.22.1)

Creamos una carpeta para la aplicación, la cual llamaremos toolbox-api

Abrimos una ventana de comandos o terminal en dicha ubicación

Creamos el archivo que controlará los paquetes, dependencias y metadata de la aplicación (package.json)  con el comando:
```bash
npm init
```
(Le damos enter a todas las opciones que solicita, excepto entry point, allí escribimos: app.js)

Ahora creamos el entry point de la aplicación:
Dentro de la carpeta toolbox-api, creamos un archivo llamado app.js. Dentro de este archivo y a modo de prueba escribimos:
```js
console.log("Hola Toolbox")
```

Para resetear automáticamente la aplicación cada vez que algún archivo cambie, utilizaremos la herramienta nodemonitor:
```bash
npm install nodemon
```

Y en package.json configuramos el comando de inicio de la aplicacion para que incluya nodemonitor:
```json
...  
"scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```

Ahora damos inicio a la aplicación con el comando:
```bash
npm start
```

En la terminal veremos que se mostrara el mensaje "Hola Toolbox", esto quiere decir que hemos configurado correctamente el servidor. Si cambiamos el texto "Hola Toolbox" en app.js y  guardamos, veremos que en la terminal la aplicación se resetea automáticamente e imprime el nuevo texto, gracias a nodemonitor.

Ahora que ya tenemos preparada nuestra aplicación de Node.js, montaremos encima un server framework para construir la API: Express.js. 

Ahora, dentro de app.js importamos el modulo de express y configuramos el puerto a utilizar para conectarse al servidor. En este caso, utilizaremos el puerto 3000:

```js
const express = require('express'); 
const app = express() 
app.listen(3000, ()=>{ 
    console.log('El servidor está corriendo en  http://localhost:3000') 
})
```

Si abrimos la dirección en el navegador veremos un mensaje "Cannot GET", esto por que no hemos definido aún ninguna ruta o endpoint en el servidor para un GET request. Lo hacemos así:
```js
const express = require('express'); 
const app = express() 

/** 
 *  Endpoint
 */
app.get('/iecho', (req,res) =>{ 
    res.send('Hola esta es la API de Toolbox!') 
})
app.listen(3000, ()=>{  
    console.log('El servidor está corriendo en  http://localhost:3000')  
})
```
Como vemos, añadimos una ruta o endpoint app.get. Si accedemos a la URL http://localhost:3000/iecho ahora veremos el teto: "Hola esta es la API de Toolbox!"

Ahora, configuraremos el route method para que consuma un query parameter con el nombre "text". Para probar su correcto funcionamiento, hacemos que la respuesta del servidor sea el parámetro enviado:
```js
const express = require('express'); 
const app = express()

/** 
 *  Endpoint
 */ 
app.get('/iecho', (req,res) =>{ 
    res.send(req.query.text) 
})
app.listen(3000, ()=>{ 
    console.log('El servidor está corriendo en  http://localhost:3000') 
})
```
Ahora si accedemos a la URL   http://localhost:3000/iecho?text=test , veremos que se imprime la palabra "test" en el navegador.

Necesitamos ahora que, en caso se envíe el query parameter text, la API provea una respuesta 200 con un json que contenga dicho el valor del query parameter text pero invertido o escrito de derecha a izquierda { "text": (query parameter invertido) }. Además, en caso el query parameter enviado tenga un valor palíndromo, este deberá responder con un flag con el nombre palindrome que sea true o false, según sea el caso: { "text": (query parameter invertido), "palindrome" : (true o false} 

Y en caso no se envíe el query parameter text, la API deberá proveer una respuesta 400 y un json que que indique: "error": "no text". 
```js
const express = require('express') 
const app = express() 
/** 
 *  Endpoint 
 */ 
app.get('/iecho', (req, res) => { 
  if (req.query.text) { 
    const text = req.query.text.split('').reverse().join('') 
    // Analizamos si es o no un palíndromo 
    if (req.query.text === text) { 
      return res.status(200).json({ 
        text: text, 
        palindrome: true 
      }) 
    } else { 
      return res.status(200).json({ 
        text: text, 
        palindrome: false 
      }) 
    } 
  } else { 
    return res.status(400).json({ 
      error: 'no text' 
    }) 
  } 
}) 
app.listen(3000, () => { 
  console.log('El servidor está corriendo en http://localhost:3000') 
})
```

Cuando  mas adelante empecemos a hacer llamadas desde el Frontend al Backend/API, deberá ser necesario que configuremos el CORS, que por defecto, bloqueará todas las peticiones externas. Instalamos una libreria para ello:
```bash
npm install cors
```

Importamos la librería en app.js y definimos los permisos (usaremos *, que significa que estará abierta para cualquier URL):
```js
const express = require('express')
const app = express()
const cors = require('cors')

/**
 *  Permisos CORS
 */
 app.use(cors())
 app.options('*', cors())

/**
 *  Endpoint
 */
app.get('/iecho', (req, res) => {
  if (req.query.text) {
    const text = req.query.text.split('').reverse().join('')
    // Analizamos si es o no un palíndromo
    if (req.query.text === text) {
      return res.status(200).json({
        text: text,
        palindrome: true
      })
    } else {
      return res.status(200).json({
        text: text,
        palindrome: false
      })
    }
  } else {
    return res.status(400).json({
      error: 'no text'
    })
  }
})
app.listen(3000, () => {
  console.log('El servidor está corriendo en http://localhost:3000')
})
```

Ahora, para realizar el testeo de validación de la API utilizaremos Mocha + Chai + Supertest
```bash
npm install mocha chai supertest
```
Dentro de la carpeta del proyecto creamos una subcarpeta con el nombre "tests" y dentro creamos un archivo llamado api.test.js

Dentro desarrollaremos 3 validaciones:

1. Si se envía un query parameter text cuyo contenido tiene un valor palíndromo, debe responder con un json que  contiene {"text" : (query parameter escrito de derecha a izquierda), "palindrome : "true" }

2. Si se envía un query parameter text cuyo contenido no tiene un valor palíndromo, debe responder con un json que contiene {"text" : (query parameter escrito de derecha a izquierda), "palindrome : "false" }

3. Si se envía una URL con sin query parameters, debe responder con un json que contiene {"error":"no text"}
