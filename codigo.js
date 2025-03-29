let listaTareas = []
let ultimoNumeroTarea = 0

const agregarTarea = () => {

    const timestamp = Date.now()
    const fechaActual = new Date(timestamp)

    let tareaIngresada = document.getElementById("tareaIngresada").value

    if(tareaIngresada != "") {
        listaTareas.push({
            tarea: tareaIngresada,
            tachado: false,
            numeroTarea: ultimoNumeroTarea++,
            fechaCreado: fechaActual,
            fechaTachado: ""
        })
    }

    mostrarTareas()
}

const mostrarTareas = () => {

    let contenedorDeTareas = document.getElementById("contenedorDeTareas")
    contenedorDeTareas.innerHTML = ""

    listaTareas.forEach(t => {

        contenedorDeTareas = document.getElementById("contenedorDeTareas").innerHTML += `
        <div class="tarea-texto"> 
            <p id="tarea${t.numeroTarea}" class="tarea-nombre ${t.tachado ? "tarea-completa" : "tarea-no-completa"}">${t.tarea}</p>
            <p class="fechaCreacion">Fecha de creacion:${t.fechaCreado}<p/>
            <p class="fechaTachado" id="fechaTachado${t.numeroTarea}">Fecha de tachado: ${t.tachado ? t.fechaTachado : "No fue tachado"}<p/>
        </div>

        <input type="checkbox" value="${t.numeroTarea}" class="checkbox" onchange="tacharTarea(this)" ${t.tachado ? "checked" : ""}>
        `
    })
}

const tacharTarea = (tachado) => {

    const timestamp = Date.now()
    const fechaActual = new Date(timestamp)

    let tarea = listaTareas.find(t => t.numeroTarea == tachado.value)
    const textoTarea = document.getElementById(`tarea${tarea.numeroTarea}`)
    const textoTareaTachado = document.getElementById(`fechaTachado${tarea.numeroTarea}`)

    if (tarea.tachado == false) {
        tarea.tachado = true
        tarea.fechaTachado = fechaActual
        textoTarea.classList.add("tarea-completa")
        textoTareaTachado.innerHTML = `Fecha de tachado: ${tarea.fechaTachado}`
    }
    else {
        tarea.tachado = false
        tarea.fechaTachado = ""
        textoTarea.classList.remove("tarea-completa")
        textoTareaTachado.innerHTML = "No fue tachado"
    }
    
}

const botonBorrar = () => {
    listaTareas = []
    mostrarTareas()
}

const mostrarMasRapido = () => {
    let tareaMasRapida = document.getElementById("tareaMasRapida")
    let tareaBuscada = ""

    for(let i = 0; i < listaTareas.length; i++){
        if((listaTareas[i].fechaTachado != "") && (tareaBuscada === "" || listaTareas[i].fechaTachado.getTime() < tareaBuscada.fechaTachado.getTime())) {
            tareaBuscada = listaTareas[i]
        }
    }

    if (tareaBuscada != "") {
        tareaMasRapida.innerHTML = `<div class="tarea-texto"> ${tareaBuscada.tarea} <div/>`
    }
    else {
        tareaMasRapida.innerHTML = `<div class="tarea-texto"> No se tacho ninguna tarea <div/>`
    }
}


