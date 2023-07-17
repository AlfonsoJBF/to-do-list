import { useEffect, useState } from "react"

export default function Deseo({ texto, completed, id, onChange, onClean }) {
    const [done, setDone] = useState(completed);
  
    useEffect(() => {
      setDone(completed);
    }, [completed]);
  
    function handleChange() {
      setDone(!done);
      if (typeof onChange === 'function') {
        onChange(id);
      }
    }
  
    return (
      <label htmlFor={`wish${id}`} className={done ? 'deseo--completado' : 'deseo'}>
        <input type="checkbox" id={`wish${id}`} onChange={handleChange} checked={done} />
        {texto}
      </label>
    );
  }