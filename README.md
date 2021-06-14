![alt text](https://files.toolboxtve.com/wp-content/uploads/2018/06/28172724/logo-stycky.png) 

# Toolbox Test

En este repositorio encontrarán mi solución de la prueba de conocimientos de Toolbox. En las siguientes líneas incluyo información sobre cómo utilizarla y además el detalle de como fue desarrollada paso a paso. Espero sea de su agrado.

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

Entonces, dentro de api.test.js:

Importamos los módulos de supertest y chai
```js
const request = require('supertest')
const expect = require('chai').expect;
```

Importamos el módulo de app.js (para ello deberemos generar un export en app.js)
```js
const app = require('../app.js')
```

Al final de app.js:
```js
...
module.exports = app
```

Regresamos a api.test.js y configuramos las 3 validaciones:
```js
/** 
 *  Testeo de endpoint 
 */ 
describe("/GET /iecho?text=test", () => { 
    it('responde con un json que contiene {"text" : (query parameter escrito de derecha a izquierda), "palindrome : "true" }, si se envía un request con un query parameter text cuyo contenido tiene un valor palíndromo ', async () =>{ 
        const query_parameter = "ioi" 
        const response = await request(app).get('/iecho?text=' + query_parameter) 
        expect(response.status).to.eql(200); 
        expect(response.body.text).to.eql(query_parameter.split("").reverse().join("")) 
        expect(response.body.palindrome).to.eql(true) 
    }); 
    it('responde con un json que contiene {"text" : (query parameter escrito de derecha a izquierda), "palindrome : "false" }, si se envía un request con un query parameter text cuyo contenido no tiene un valor palíndromo ', async () =>{ 
        const query_parameter = "test" 
        const response = await request(app).get('/iecho?text=' + query_parameter) 
        expect(response.status).to.eql(200); 
        expect(response.body.text).to.eql(query_parameter.split("").reverse().join("")) 
        expect(response.body.palindrome).to.eql(false) 
    }); 
    it('responde con un json que contiene {"error" : "no text"}, si se envía un request sin query parameters', async () =>{ 
        request(app).get('/iecho') 
        const response = await request(app).get('/iecho') 
        expect(response.status).to.eql(400); 
        expect(response.body).to.eql({error : "no text"}) 
    }); 
})
```

Finalmente api.test.js queda como:
```js
const request = require('supertest') 
const expect = require('chai').expect; 
const app = require('../app.js') 
/** 
 *  Testeo de endpoint 
 */ 
describe("/GET /iecho?text=test", () => { 
    it('responde con un json que contiene {"text" : (query parameter escrito de derecha a izquierda), "palindrome : "true" }, si se envía un request con un query parameter text cuyo contenido tiene un valor palíndromo ', async () =>{ 
        const query_parameter = "ioi" 
        const response = await request(app).get('/iecho?text=' + query_parameter) 
        expect(response.status).to.eql(200); 
        expect(response.body.text).to.eql(query_parameter.split("").reverse().join("")) 
        expect(response.body.palindrome).to.eql(true) 
    }); 
    it('responde con un json que contiene {"text" : (query parameter escrito de derecha a izquierda), "palindrome : "false" }, si se envía un request con un query parameter text cuyo contenido no tiene un valor palíndromo ', async () =>{ 
        const query_parameter = "test" 
        const response = await request(app).get('/iecho?text=' + query_parameter) 
        expect(response.status).to.eql(200); 
        expect(response.body.text).to.eql(query_parameter.split("").reverse().join("")) 
        expect(response.body.palindrome).to.eql(false) 
    }); 
    it('responde con un json que contiene {"error" : "no text"}, si se envía un request sin query parameters', async () =>{ 
        request(app).get('/iecho') 
        const response = await request(app).get('/iecho') 
        expect(response.status).to.eql(400); 
        expect(response.body).to.eql({error : "no text"}) 
    }); 
})
```

Ahora, para correr el archivo de validaciones con mocha mediante el comando npm test, haremos una configuración en el archivo package.json:
```json
{
... 
"scripts": {
    "start": "nodemon app.js",
    "test": "mocha tests/api.test.js --exit"
  },
...
}
```
(--exit servirá para que, al terminar las validaciones, se cierre el proceso de mocha automáticamente)

Finalmente, si queremos que el código esté en el estilo Standard JS, instalamos el módulo correspondiente de manera local:
```bash
npm install standard --save-dev
```

Y luego lo corremos para ver que partes del código pueden estilizarse:
```bash
npx standard
```

Realizamos las correcciones sugeridas en el terminal. En el caso de los métodos "describe" e "it" que standard js indicará que están indefinidos, deberemos configurarlos como variables globales, de tal manera que el análisis, standard js no los interprete como errados. Entonces, en package.json:
```json
{
...  
"standard": {
    "globals": [
      "describe",
      "it"
    ]
  },
...
}
```

Finalmente, si corremos nuevamente el análisis de standard js con el siguiente comando: 
```bash
npx standard
```
Veremos que ya no se presentan errores de estilo.

Y con esto concluimos la API

### Frontend

Primero nos posicionamos en la carpeta que almacenará el proyecto.

Luego, en la terminal ejecutamos el comando para crear el boilerplate o plantilla de desarrollo que incluirá la estructura de carpetas y archivos de la aplicación en React. Llamaremos al proyecto "toolbox-interfaz":
```bash
npx create-react-app toolbox-interfaz
```

Veremos que se crea una carpeta raiz con una serie de subcarpetas y archivos que nos permitirán desarrollar nuestra aplicación en React.  Es importante mencionar que el comando create-react-app configura automáticamente **Webpack** y Babel en la aplicación, de modo que ya no tenemos que instalarlos y configurarlos manualmente.

Dentro de la carpeta raíz crearemos un archivo llamado .env que servirá para almacenar variables de entorno. Dentro del archivo escribimos:
```js
PORT = 9000
```
Eso es necesario porque, por defecto, React utiliza el puerto 3000 para correr la aplicación, pero como ya usamos ese puerto para el Backend, definimos el puerto 9000. Dado que el nombre de variable PORT ya esta reservado para el puerto, no hará falta ninguna otra configuración.

Por otro lado, dentro de la carpeta src crearemos una subcarpeta llamada components, que almacenará los componentes de la aplicación

Para desarrollar la interfaz, utilizaremos el framework de frontend Bootstrap:
```bash
npm install react-bootstrap bootstrap@4.6.0
```

Modificamos el archivo App.js e importamos el archivo de estilos css de bootstrap:
```js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    </div>
  );
}
export default App;
```

La interfaz que se solicita es la siguiente:

![alt text](https://i.ibb.co/JnK7nQ8/1.png) 

La idea es que cada vez que se escriba un texto y se envíe con el botón "Send", se realice un request a nuestra API y esta responda con el texto invertido. En caso se presione el botón "Send" sin haber escrito ningún texto, nuestra API deberá responder con "no text", como vimos anteriormente. En ambos casos, la respuesta deberá imprimirse en la zona de "Results:", desplazando hacia abajo respuestas anteriores.

Si bien la interfaz tiene pocos elementos, será conveniente crear un componente que contenga la lista de textos que se vayan imprimiendo. Lo demás podemos mantenerlo en App.js

![alt text](https://i.ibb.co/R2FfCkn/2.png) 

Dentro de la carpeta components, creamos el componente TextList. Este componente (resaltado en la imagen superior) deberá consumir la lista de textos recibidos desde la API e imprimirlos. Por lo tanto, una forma de abordar esto podría ser utilizar Redux para crear un estado que contenga un arreglo con todos los textos y pueda ser accesible desde TextList. Evidentemente, cada vez que presionemos el botón y recibamos una respuesta de la API con un texto, este deberá ser agregado al arreglo. Esto último lo haremos en App.js.

Entonces, lo primero que haremos es instalar Redux y React-Redux:
```bash
npm install redux react-redux
```

Luego, dentro de la carpeta src creamos una subcarpeta llamada redux. Dentro creamos otras carpetas llamadas store, actions y reducers.

Dentro de la carpeta reducers crearemos un archivo llamado textList.js . Un reducer es esencialmente una entidad que nos permite crear un estado, definir su valor inicial e implementar todos los cambios/eventos a los cuales podría ser sometido o usado el estado. En nuestro caso, crearemos un reducer para el arreglo de textos y además definiremos dos posibles cambios/eventos  los cuales podría someterse:

1. 'NUEVO_TEXTO' : En caso el usuario escriba un texto y presione el botón, la API responderá con el texto invertido. Esta texto invertido deberá agregarse al estado con el arreglo.

2. 'SIN_TEXTO' : En caso el usuario no escriba ningún texto y presione el botón, la API responderá con un texto de "no text", el cual deberá agregarse al estado con el arreglo.

```js
const textListReducer = (state = [], action) => {
    switch (action.type) {
        case 'NUEVO_TEXTO':
            return [action.text, ...state]
        case 'SIN_TEXTO':
            return [action.error, ...state]
        default:
            return state
    }
}
export default textListReducer
```

Es importante mencionar que inicialmente el estado será un arreglo vacío, como lo definimos en el código.

Como vemos en el código, el flag que le indicará al reducer a que cambio/evento someter al estado será el objeto action por medio del atributo type. Además, el objeto action traerá consigo otros atributos de acuerdo al cambio/evento que se vaya a dar. Por ejemplo, si se da el cambio/evento 'NUEVO_TEXTO', action deberá traer un atributo text, que será el que contenga el texto a agregar al arreglo. O por ejemplo, si se da el cambio/evento 'SIN_TEXTO', action deberá traer un atributo error, que será el que contenga el texto "no text" a agregar al arreglo.

Como vimos, los reducers generán algún evento o cambio con el estado del arreglo de acuerdo a lo que hagamos en la interfaz. La entidad que se encarga de tomar las peticiones de la interfaz y enviarlas a un reducer se llama action. Una action es esencialmente una función que devuelve un objeto con el tipo de cambio/evento al que debe someterse un estado. En nuestro caso, habrán dos actions, aquella que realice la petición  'NUEVO_TEXTO' y la otra de 'SIN_TEXTO'.  Además, estas actions deberán contener adicionalmente los atributos text y error respectivamente. Entonces, dentro de la carpeta actions, creamos un archivo index.js y dentro implementamos las dos actions:
```js
export const add_text = (text) => { 
    return { 
        type: 'NUEVO_TEXTO', 
        text: text 
    } 
} 
export const no_text = (error) => { 
    return { 
        type: 'SIN_TEXTO', 
        error: error 
    } 
}
```

Hasta el momento tenemos implementados:
* el reducer que nos permite crear el estado del arreglo de textos y todos los cambios/eventos a los que podría ser sometido
* las actions que nos permiten comunicarle al reducer qué cambio/evento realizar con el estado

Finalmente, deberemos crear una entidad que almacene todos los reducers del proyecto y a la cual se pueda acceder para consumir los estados desde cualquier componente. Dicha entidad se llama store. Hay una función que nos permite crear un store llamada createStore() que recibe solo un argumento. Si en nuestro proyecto tuviéramos varios reducers, tendríamos que combinarlos en un solo objeto para poder utilizarlo como argumento en createStore(). Y si bien en nuestro proyecto tenemos un solo reducer que podríamos colocar directamente como argumento en createStore(), es una buena práctica crear un objeto que incluya ese reducer, por si en el futuro creamos más reducers podamos añadirlos a ese objeto. Para ello dentro de reducers creamos el archivo index.js y allí creamos el objeto que combine todos los reducers (en nuestro caso, un solo reducer):
```js
import textListReducer from './textList'
import {combineReducers} from 'redux'
const allReducers = combineReducers({
    textList : textListReducer
})
export default allReducers
```

Bien, ahora crearemos el store. Para ello, dentro de la carpeta store, creamos un archivo index.js y dentro:
```js
import { createStore } from 'redux'
import allReducers from '../reducers'
const store = createStore(allReducers)
export default store
```
Como vemos, importamos el objeto allReducers que contiene todos los reducers del proyecto y con ello creamos el store

Ahora, para poder acceder a los estados de store en cualquier parte del proyecto, vamos al archivo index.js dentro de la carpeta src y lo modificamos de la siguiente manera:
```js
import React from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css'; 
import App from './App'; 
//Redux 
import store from './redux/store' 
import { Provider } from 'react-redux' 
ReactDOM.render( 
    <Provider store={store}> 
      <App /> 
    </Provider>,  
    document.getElementById('root') 
);
```

Como vemos, App que es el componente raíz del proyecto está contenido dentro del componente Provider, al cual además se le da como atributo la entidad store. De esta manera, se puede acceder a los estados de store desde el componente App y cualquier subcomponente de este. 

Pasamos ahora a crear el componente TextList que, como mencionamos antes, se encargará de imprimir en la interfaz la lista de textos. Esta lista de textos está almacenada como arreglo en un estado de store, por lo tanto, para acceder a este utilizaremos la función useSelector de react-redux y le indicaremos que estado consumir. Por otro lado, utilizaremos el componente Card de react-bootstrap para que contenga cada uno de los textos del arreglo. Se imprimirá un Card por cada texto dentro del arreglo:

```js
import React from 'react'
import { Card } from 'react-bootstrap'

// Redux
import { useSelector } from 'react-redux'
function TextList() {
    const textList = useSelector(state => state.textList )
    return (
        <div className="row justify-content-center pb-5">
            <div className="col-8 pb-5">
                {
                    textList.map((text, index) =>
                        <Card className="my-2" key={index}>
                            <Card.Body className='p-2'>{text}</Card.Body>
                        </Card>
                    )
                }
            </div>
        </div>
    )
}
export default TextList
```

Luego, pasamos a programar el componente App.js. Aquí estableceremos la comunicación con la API. La idea es que cuando el usuario de click a un botón, se haga un API call cuya respuesta sea utilizada para cambiar el estado del arreglo de textos lo cual deberá modificar lo impreso por el componente TextList, el cual importaremos. Para ello, creamos un formulario con los componentes de bootstap Form.Control que no es más que un input de texto y Button que será el botón que nos permita hacer el submit del formulario (Form).  Obviamente, deberemos crear un evento onSubmit que llamará la función encargada de hacer el API Call y modificar el estado del arreglo de textos. Para modificar el estado utilizaremos la función useDispatch que nos permite seleccionar que action debe realizar el reducer del estado correspondiente. Entonces:
```js
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import React, { useState } from 'react' 
import { Navbar, Form, Button } from 'react-bootstrap' 
import TextList from './components/TextList/TextList' 
// Redux 
import { useDispatch } from 'react-redux' 
import { add_text, no_text } from './redux/actions' 
function App() { 
  // Variable para almacenar el texto tipeado por el usuario 
  const [textInput, setTextInput] = useState('') 
  // Función para seleccionar un action de Redux 
  const dispatch = useDispatch() 
  // Función que se activará cuando se presione el botón Submit 
  const handleSend = async (event) => { 
    // Para evitar que la página haga un refresh al hacer submit de formulario 
    event.preventDefault(); 
    //Api Call 
    fetch(`http://localhost:3000/iecho?text=${textInput}`) 
    .then(response => response.json()) 
    .then(data => { 
      if(data.text){ 
        dispatch(add_text(data.text)) 
      }else{ 
        dispatch(no_text(data.error)) 
      } 
      setTextInput('') 
    }); 
  } 
  return ( 
    <div className="App"> 
      <div className="bg-light pb-5 min-vh-100"> 
        <Navbar className="bg-danger justify-content-center py-3"> 
          <Form inline onSubmit={handleSend} className="w-100  w-md-50 justify-content-center"> 
            <Form.Control 
              type="text" 
              placeholder="Insert Text" 
              className="mr-4 w-50" 
              value={textInput} 
              onChange={e => setTextInput(e.target.value)} 
            /> 
            <Button type="submit" className="px-3 px-md-5" >Send</Button> 
          </Form> 
        </Navbar> 
        <div className="container bg-white text-left pb-5"> 
          <div className="row justify-content-center pt-5 mt-5"> 
            <div className="col-11"> 
              <h3>Results:</h3> 
            </div> 
          </div> 
          <TextList/> 
        </div> 
      </div> 
    </div> 
  ); 
} 
export default App;
```

Si iniciamos el servidor de la API y la aplicación de frontend (npm start), veremos que el proyecto ya esta funcionando correctamente.

Si se desea realizar tests unitarios para el frontend, podemos hacerlo con Jest y React Testing Library, que vienen incluidos automáticamente cuando se crea el proyecto con create-react-app. Implementaremos un test que verifique si los elementos del componente raiz App se renderizan correctamente, para ello utilizaremos el matcher de Jest  toBeInTheDocument(). Elegiremos 3 elementos a verificar:

* El renderizado del texto "Results:"
* El renderizado del botón "Send" 
* El  rendrizado del textbox con el placeholder "Insert Text"

Implementamos este test en el archivo App.test.js en src que se incluyó automáticamente al crear el proyecto. Lo modificamos de la siguiente manera:
```js
import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import App from './App'

describe("Tests del componente App", () => {
  test("renderiza el componente App", () => {
    render(<App/>);
    expect(screen.getByText(/Results:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Send'})).toBeInTheDocument()
    expect(screen.getByRole('textbox', {placeholder: 'Insert Text'})).toBeInTheDocument()
  });
})
```

Para realizar el esteo ejecutamos el comando:
```bash
npm test
```

Con esto hemos concluido el Frontend


