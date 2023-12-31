// 1. Tengo que traer los elementos con los que voy a trabajar, básicamente es Definir las variables de los elementos. 

// Defino el nombre de una constante ( que se la doy ahora, el nombre que yo quiqero) y traigo del document el elemento con .queryselector  y dentro de (el nombre de la clase que tengo en HTML)

const taskInput = document.querySelector (".input-text"); // primero el input, donde voy a escribir la terea De aquí voy a sacar el valor. La clase ya la tengo definida en el HTML. Ceo una nueva const.
const addForm = document.querySelector (".add-form"); //  luego voy a agarrar al formulario, ya que el btn se comporta dentro del form como un submit. 
const tasksContainer = document.querySelector (".tasks-list"); // Dónde voy a imprimir las tareas? por eso traigo del HTML el espacio donde quiero imprimir las tareas. 
const deleteAllBtn = document.querySelector (".deleteAll-btn"); // por último agarro el btn de deleteAll, ya que es otra funcionalidad que voy a tener. 

//2.¿Dónde voy a guardar las tareas que se vayan agregando? tengo que guardar cada una de las tareas en un Array. ya que necesito guardar los datos. 

let tasklist = JSON.parse(localStorage.getItem("tasks")) || []; // con let y no const porque va a ir variando y modificandose a medida de sumar tareas. // 

//11. ANTES: let tasklist = []; AHORA Tengo que traerme del Local Storage los datos, por eso el .parse que lo transforma en objeto = el Array que yo tenga va a ser igual a los datos del LocalStorage, en el caso de que no tenga nada || vacío.

//10. Crear una function para el local storage, la cual deberé aplicar a cada una de las otras fuctions: ej: la de borrar tareas, la de borrar una sola tarea. 

const saveLocalStorage = () => { 
    localStorage.setItem("tasks", JSON.stringify(tasklist)); // si yo le paso como parametro sólo el nombre de "tasklist" no funciona por que el Local Storage SOLO lee strings
}; // hasta acá tengo las tareas guardadas en el Local Storage pero al recargar la pag no las renderiza. quiero guardar la lista de tareas con el nombre "tasks"




// 4.1 Template html - Después de la primer funcion addTask, Crear la segunda fucnión para renderizar - con function generadora. 
// por un lado tenemos el HTML y por el otro la funcion que mapeaba. 

const createTask = (task) => { // creo la funcion de crear tarea y al task nname y al ID que va a tener esa tarea ingresada. Con el Spred Operator definí a la tarea como objeto y le di un id.
    return `<li>
     ${task.name}<img
      class="delete-btn"
      src="./img/delete.svg"
      alt="boton de borrar"
      data-id="${task.id}"
    />
    </li>`;
};

// 5° funcion para renderizar
const renderTaskList = () =>{ // agarro el comntenedor y deentro del UL le voy a cambiar el inner HTML .  
    tasksContainer.innerHTML = tasklist.map(task => createTask (task)).join(""); //Voy a agarrar mi array de tarea y voy a mapear una tarea, y de donde viene esa tarea? de la const addTask. JOIN para que no muestre los espacios
} // 


// 6° Validaciones de tarea

const isValidTask = (taskName) =>{  // por parametro recibe la funcion que ya cree "taskName"
    let isValid = true; // para hacer un manejador

    if(!taskName.length){ // si no tiene largo no entres pero si está vacío imprimí esto:
        alert ("Por favor, ingresa una tarea.");
        isValid = false;
    } else if (tasklist.some (task => task.name.toLowerCase() === taskName.toLowerCase()) // utilizamos Some, "si alguna tarea es igual al task name en minusculas es RE igual a la tarea que estemos pasando en minuscolas"
    ){
        alert ("Uppps! ya existe esa tarea.");
        isValid = false;
    }
    return isValid; // devuelve un Boolean. 
} 



//4° PRIMERA función inicializadora, capturar el valor de un input. 
const addTask = (e) => { 
    e.preventDefault(); // PRIMERO NECESITO cortar con el comportamiento por defecto de un formulario, cada vez que apreto enviar se refresca la página. con e.preventDefault lo soluciono.
    const taskName = taskInput.value.trim(); //me traigo el valor que se ingresa en el input. /// Cuadno sale un error en Value es que no está encontrando el elemento, hay un error de tipeo. un Trim para que no haya espacios
   
    if (isValidTask (taskName)){ // me llamo a la funcion validadora, si es tru va a guardar las tareas en el array y las va a renderizar, si es falso no hace nada. 
        tasklist = [... tasklist , { name: taskName, id: Date.now()}]; // Si el campo no está vacio, agarra el array (tasklist), hacemos un spred operator para que mguarde los valres antiguos y también los nuevos. Y que la guarde en éste formato de objeto y now. En consola voy viendo todo. 
        renderTaskList(); // llamo aquí dentro la function que cree para que imprima las tareas en pantalla. 
        addForm.reset(); // para que se borre el input cuando paso la tarea, es algo estético que queda lindo. 
        toggleDeleteAllButton(); // tengo que validar para que no aparezca el btn 
        saveLocalStorage ();
    
    
        //console.log (tasklist);
    }
};

// 8° para que no aparezca el btn "remove all" cuando no hay task´s

const toggleDeleteAllButton = () => {
    if( !tasklist.length){
        deleteAllBtn.classList.add ("hidden");
        return;
    }
    deleteAllBtn.classList.remove ("hidden");
}

// 9° hacer funcional el btn de Remove All

const removeAll = () =>{
    tasklist = [];
    renderTaskList();
    toggleDeleteAllButton(); // tengo que volver a validar SIEMPRE
    saveLocalStorage ();
} 




 
// 7° remover tarea individualmente

const removeTask = (e) =>{
    if (!e.target.classList.contains("delete-btn")) return; // Si lo que estoy clickeando NO (!) contiene la clase "delete-btn" NO HAGAS NADA. 
    // console.log(e.target.dataset.id); //para saber qué estoy ckliqueando, paso como parametro e. 

    //LA MAYORIA de las veces se borra con un filter
    const filterId = Number( e.target.dataset.id);  // Voy a borrar desde el dataset, el numero ID, pero como es un array lo tengo que convertir a number
    //console.log (filterId);

    tasklist = tasklist.filter (task => task.id !== filterId ); // por cada tarea agarra el task id y filtra todas las que NO SEAN el filter ID. 
    renderTaskList();
    toggleDeleteAllButton();
    saveLocalStorage ();
    
}

// 3° necesito una FUNCTION INICIALIZADORA y dentro de ella voy a poner TODOS los iniciadores de evento, es decir todas las FUNCIONALIDADES. 
//Lo ideal es ir agregando los eventos de a poco, para saber en qué estoy trabajando y finalizar cada tarea. 
// lo tengo que tener abajo, porque al utilizar funcion flecha me pisaría las otras const. 

const init = () =>{
    document.addEventListener ("DOMContentLoaded", renderTaskList); // Es lo último pero lo pongo al principio. Cuando cargue la pág quiero que me imprima la function renderTaskList
    addForm.addEventListener ( "submit", addTask); // PRIMERO  quiero llamar al formulario, voy a capturar cada input donde se van a sumar las tareas. 
    tasksContainer.addEventListener ("click" , removeTask); // para remover cada tarea
    document.addEventListener ("DOMContentLoaded", toggleDeleteAllButton); // para que al iniciar la pag no aparezca el btn de borrar todo
    deleteAllBtn.addEventListener ("click", removeAll); // escuchador de evento para el btn de remove all. 
    


};
init (); // Después de crear la primera automáticamente NECESITO inicializarla con éste comando. sino NADA funciona. 