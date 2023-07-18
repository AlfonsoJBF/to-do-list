import { useState, useEffect } from 'react';
import Deseo from './componentes/deseo';
import './App.css';

const deseosInicial = [];

function App() {
  const [nuevoDeseo, setNuevoDeseo] = useState('');
  const [deseos, setDeseos] = useState(deseosInicial);

  // Cargar los deseos guardados en localStorage al iniciar la aplicación
  useEffect(() => {
    const storedDeseos = JSON.parse(localStorage.getItem('deseosGuardados'));
    if (storedDeseos) {
      setDeseos(storedDeseos);
    }
  }, []);

  // Guardar los deseos en localStorage cada vez que se actualicen
  useEffect(() => {
    localStorage.setItem('deseosGuardados', JSON.stringify(deseos));
  }, [deseos]);

  function handleChange(event) {
    setNuevoDeseo(event.target.value);
  }

  function agregarDeseo() {
    if (nuevoDeseo.trim() !== '') {
      const nuevoDeseoObj = { text: nuevoDeseo, done: false };
      setDeseos([nuevoDeseoObj, ...deseos]);
      setNuevoDeseo('');
    }
  }

  function handleWishes(index) {
    const updatedDeseos = [...deseos];
    updatedDeseos[index].done = !updatedDeseos[index].done;
    setDeseos(updatedDeseos);
  }

  function handleCleanWishes() {
    const deseosNoCompletados = deseos.filter((deseo) => !deseo.done);
    setDeseos(deseosNoCompletados);
  }

  return (
    <div className='app'>
      <h1>Lista de Deseos</h1>

      <fieldset>
        <legend>Nuevo Deseo:</legend>
        <input
          type="text"
          placeholder="Introduce tu nuevo deseo"
          value={nuevoDeseo}
          onChange={handleChange}
        />
        <button onClick={agregarDeseo}>Agregar</button>
      </fieldset>

      <div className='deseos__container'>
        {deseos.map((deseo, index) => (
          <Deseo
            texto={deseo.text}
            key={index}
            completed={deseo.done}
            id={index}
            onChange={() => handleWishes(index)}
            onClean={handleCleanWishes}
          />
        ))}
      </div>
      
      <button onClick={handleCleanWishes}>Limpiar Completados</button>

      <p>Desarrollado por <strong>{'<Alfonso JBF />'}</strong></p>
    </div>
  );
}

export default App;