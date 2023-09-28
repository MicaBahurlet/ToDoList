// 1. Tengo que traer los elementos con los que voy a trabajar. Dewfinir las variables de los elementos. 

// Defino el nombre de una constante y traigo del document el elemento con .queryselector  y dentro de (el nombre de la clase que tengo en HTML)

const taskInput = document.querySelector ("ìnput-text"); // primero el input, donde voy a escribir la terea De aquí voy a sacar el valor. La clase ya la tengo definida en el HTML. Ceo una nueva const.
const addForm = document.querySelector (".add-form"); //  luego voy a agarrar al formulario, ya que el btn se comporta dentro del form como un submit. 
const taskContainer = document.querySelector (".task-list"); // Dónde voy a imprimir las tareas? por eso traigo del HTML el espacio donde quiero imprimir las tareas. 
const deleteAllBtn = document.querySelector (".deleteAll-btn"); // por último agarro el btn de deleteAll, ya que es otra funcionalidad que voy a tener. 

//2.¿Dónde voy a guardar las tareas que se vayan agregando? tengo que guardar cada una de las tareas en un Array. ya que necesito guardar los datos. 

let tasklist = []; // con let y no const porque va a ir variando y modificandose a medida de sumar tareas. 


//PRIMERA función inicializadora, capturar el valor de un input. 
const addTask = (e) => { 
    e.preventDefault(); // NECESITO cortar con el comportamiento por defecto de un formulario, cada vez que apreto enviar se refresca la página. con e.preventDefault lo soluciono.
    const taskName = taskInput.value.trim(); //me traigo el valor que se ingresa en el input. /// ME SALE UN ERROR GRANDE EN LA CONSOLA, CON EL "VALUE"
    if (taskName === " "){
        alert ("Llena el campo");
    }
    tasklist = [... tasklist , { name: taskName, id: Date.now()}];



    console.log (tasklist);
};


// 3. necesito una FUNCTION INICIALIZADORA y dentro de ella voy a poner TODOS los iniciadores de evento, es decir todas las FUNCIONALIDADES. 

const init = () =>{
    addForm.addEventListener ( "submit", addTask); // primero quiero llamar al formulario, donde se van a sumar las tareas. 



};
init (); // NECESITO inicializarla con éste comando. sino NADA funciona. 