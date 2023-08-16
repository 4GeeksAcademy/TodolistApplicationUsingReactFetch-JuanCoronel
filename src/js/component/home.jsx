import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [addTask, setAddTask] = useState("");
  const [todoList, setTodoList] = useState([]);


  async function crearUsuario() {
    try {
      let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/juanocoronel", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([]),
      });
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error); // Si hay un error, muestra el mensaje de error
    }
  } 


  useEffect(() => {
    crearUsuario(); //  función para crear el usuario al cargar el componente
    fetchTasks(); //  función para obtener las tareas al cargar el componente
  }, []);

  
  // funcion para obtener las tareas desde una API externa
  const fetchTasks = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/juanocoronel");
      const data = await response.json(); // respuesta a formato JSON
      setTodoList(data); 
    } catch (error) {
      console.log(error); 
    }
  };
  
  // obtener las tareas al cargar el componente
  useEffect(() => {
    fetchTasks(); // llamar a la función fetchTasks para obtener las tareas
  }, []);

  // Manejar cambios en el input de la nueva tarea
  const handleInput = (event) => {
    setAddTask(event.target.value); // Actualizar el estado de la tarea
  };

  // Agregar una tarea y sincronizar con la API
  const addTaskAndSync = async (event) => {
    if (event.key === "Enter" && addTask.trim() !== "") {
      const newTask = {
        label: addTask,
        done: false,
      };
      const updatedTodoList = [...todoList, newTask];
      setTodoList(updatedTodoList);
      setAddTask("");

      try {
        // actualizar la lista de tareas en la API usando una solicitud PUT
        await fetch("https://playground.4geeks.com/apis/fake/todos/user/juanocoronel", {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTodoList),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Eliminar una tarea y sincronizar con la API
  const removeTaskAndSync = async (index) => {
    const updatedTodoList = todoList.filter((_, i) => index !== i);
    setTodoList(updatedTodoList);

    try {
      await fetch("https://playground.4geeks.com/apis/fake/todos/user/juanocoronel", {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodoList),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // eliminar  las tareas y sincronizar con la API
  const deleteAllTasksAndSync = async () => {
    try {
      //solicitud DELETE para eliminar todas las tareas en la API
      await fetch("https://playground.4geeks.com/apis/fake/todos/user/juanocoronel", {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
      });
      setTodoList([]); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="text-center w-50 mx-auto">
        <h1 className="h1 text-center text-white p-4"> <strong><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-card-checklist" viewBox="0 0 16 16">
  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
  <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
</svg> LISTA DE TAREAS AGOSTO</strong></h1>
       
       
        <input
          type="text"
          className="form-control"
          value={addTask}
          onChange={handleInput}
          onKeyDown={addTaskAndSync}
          placeholder="Agregar una nueva tarea a la lista de este mes"
        />
        

        <ul className="list-group">
        {todoList.map(({ label }, index) => (
  <li className="list-group-item list-group-item-secondary pt-2" key={index}>
    {label}
    <button
      className={`btn btn-danger float-end mx-auto ${todoList.length === 0 && "disabled"}`}
      id="deleteAll"
      onClick={deleteAllTasksAndSync}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg>
    </button>
  </li>
))}
       
          <li className="list-group-item">
            {todoList.length === 0 ? (
              <div className="center-div border border-danger bg-danger text-light w-50 m-3 p-2 mb-4">
                ¡Ninguna tarea agregada para este mes!
              </div>
            ) : (
              `${todoList.length} items left`
            )}
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default TodoList;