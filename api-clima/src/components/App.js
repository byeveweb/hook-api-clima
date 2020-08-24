import React, { useState, useEffect } from 'react';
import Header from './header/Header'
import Formulario from './clima/Formulario'
import Clima from './clima/Clima'
import Error from './error/error'


import './App.css';

function App() {
  const [busqueda, setBusqueda] = useState({
    pais: '',
    ciudad: ''
  })

  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState({})
  const [error, setError] = useState(false)

  //Extract

  const { pais, ciudad } = busqueda

  //Update Detecte
  useEffect(() => {
    const consultarApi = async () => {
      if (consultar) {
        const appId = '858e39b3504faad2ca073cbc5b86fbe5'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}, ${pais}&appid=${appId}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setResultado(resultado)
        setConsultar(false)


        if (resultado.cod === '404') {
          setError(true)
        } else {
          setError(false)
        }
      }

    }

    consultarApi()

    //eslint-disable-next-line
  }, [consultar])


  //Uploada conditional component
  let component
  if (error) {
    component = <Error mensaje="no existe la ciudad" />
  } else {
    component = <Clima
      resultado={resultado} />
  }


  return (
    <>
      <Header
        titulo='clima reac App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar} />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default App;
