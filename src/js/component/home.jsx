import React, { useState } from "react";

const Home = () => {
  const [tareas, setTareas] = useState([]);   // va a almacenar la tareas
  const [nuevaTarea, setNuevaTarea] = useState(""); // va almacenar lo que ponga en las nuevas tareas

  const listaNuevaTarea = (event) => {
    setNuevaTarea(event.target.value); // va actulizar estado de la nueva tarea
	console.log(listaNuevaTarea)       // event.target.value obtiene el valor actual del campo de entrada y lo guarda en nuevaTarea.
  };

  const agregarTarea = () => {
    if (nuevaTarea.trim() !== "") {
      setTareas([...tareas, nuevaTarea]);  // verifica que nueva tarea no este sin nada
      setNuevaTarea("");                  // se agrega a la lista de tareas
	  console.log(agregarTarea)
    }
  };

  const eliminarTarea = (indice) => {
    const tareasActualizadas = tareas.filter((_, i) => i !== indice);
    setTareas(tareasActualizadas);       // va a servir para cuando quieramos eliminar la tarea con un click
	console.log(eliminarTarea)
  };

  return (
    <div className="container">
    <div className="text-center w-50 mx-auto">
      <h1 className="h1 text-center text-white p-4"> <strong><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
  <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
</svg> LISTA DE TAREAS AGOSTO</strong></h1>
	   <input
        type="text"
        value={nuevaTarea}
        onChange={listaNuevaTarea}
        onKeyDown={(event) => event.key === "Enter" && agregarTarea()}  //  cuando se presiona una tecla en el campo. La tecla Enter, se llama a la función agregarTarea.
        placeholder="Agregar una nueva tarea a la lista"
        className="form-control"
      />
      <ul className="list-group">
        {tareas.length === 0 ? (
         
<div className="center-div border border-danger bg-danger text-light w-50 m-3 p-2 mb-4"> ¡Ninguna tarea agregada para este mes!</div>
        ) : (
          tareas.map((tarea, indice) => (
            <li className="list-group-item list-group-item-secondary pt-2" key={indice}>
              {tarea}
              <button className="btn btn-danger float-end" onClick={() => eliminarTarea(indice)}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
</svg></button>
            </li>
          ))
        )}
      </ul>
     
    </div>
   
    </div>
  );
};

export default Home;
