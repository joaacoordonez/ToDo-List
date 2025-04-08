let tareas = [];
let ingreso = document.getElementById("ingreso");

const agregar = ( ) => {
    if (ingreso.value !== "") {
        tareas.push({
            texto: ingreso.value,
            estado: false,
            fechaTachado: null,
            fechaCreacion: Date.now()
        })
        ingreso.value = "";
        mostrar();
    } 
};

const mostrar = () => {
    let lista = document.getElementById("lista")
    lista.innerHTML = ""
        tareas.forEach((t, id) =>  {
            let estaCheck = t.estado ? "checked" : "";
            let fechaC = new Date(t.fechaCreacion).toLocaleString();
            let fechaT = t.fechaTachado ? new Date(t.fechaTachado).toLocaleString() : "-";
            lista.innerHTML += `
            <li id="tarea">
                <div id="contenido-tarea">
                    <h3 style="text-decoration: ${t.estado ? "line-through" : "none"}" id="textoTarea">${t.texto}</h3>
                    <input type="checkbox" id="checkbox-${id}" onchange="marcar(${id})" ${estaCheck}>   
                </div>
                <p>Creado: ${fechaC}</p>
                <p>Tachado: ${fechaT}</p>
                <button id="eliminar" onclick="eliminar(${id})">Eliminar</button>
            </li>`
        })        
};

const marcar = (id) => {
    tareas[id].estado = !tareas[id].estado;
    tareas[id].fechaTachado = tareas[id].estado ? Date.now() : null;
    mostrar();
};
    
const eliminar = (id) => {
    let confirmar = confirm("¿Está seguro de eliminar la tarea?");
    if (confirmar) {
        tareas.splice(id, 1);
        mostrar();
    }
};

const CalculoMasRapido = () => {
    let tareaMasRapido = null;
    let masRapido = null;

    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].fechaTachado !== null) {
            let rapidez = tareas[i].fechaTachado - tareas[i].fechaCreacion;

            if (masRapido === null || rapidez < masRapido) {
                masRapido = rapidez;
                tareaMasRapido = tareas[i];
            }
        }
    }

    if (tareaMasRapido) {
        let segundos = masRapido / 1000;
        alert(`${tareaMasRapido.texto} fue la tarea más rápida en ser realizada, tardó ${segundos} segundos.`);
    } else {
        alert("No hay ninguna tarea realizada todavía.");
    }
};