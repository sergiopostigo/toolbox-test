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
