import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './../error/error'


const Formulario = ({ busqueda, setBusqueda, setConsultar }) => {


    //Create State Error
    const [error, setError] = useState(false)

    //Extract Date
    const { pais, ciudad } = busqueda

    //Read and send the dates to State
    const handleChange = e => {
        //update statue object
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }


    //Submit function
    const handleSubmit = e => {
        e.preventDefault()

        //Validation
        if (ciudad.trim() === '' || pais.trim() === '') {
            setError(true)
            return
        }

        setError(false)

        //Add principal component
        setConsultar(true)

    }

    return (
        <>
            <form
                onSubmit={handleSubmit}>

                {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}

                <div className="input-field col s12">
                    <input
                        type="text"
                        name="ciudad"
                        id="ciudad"
                        value={ciudad}
                        onChange={handleChange}

                    />
                    <label htmlFor="ciudad">Ciudad: </label>
                </div>

                <div className="input-field col s12">
                    <select
                        name="pais"
                        id="pais"
                        value={pais}
                        onChange={handleChange}
                    >
                        <option value="">-- Seleccione un país --</option>
                        <option value="US">Estados Unidos</option>
                        <option value="MX">México</option>
                        <option value="AR">Argentina</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="ES">España</option>
                        <option value="PE">Perú</option>
                    </select>
                    <label htmlFor="pais">País: </label>
                </div>

                <div className="input-field col s12">
                    <input
                        type="submit"
                        value="Buscar Clima"
                        className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    />
                </div>
            </form>
        </>
    );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    setBusqueda: PropTypes.func.isRequired,
    setConsultar: PropTypes.func.isRequired

}
export default Formulario;