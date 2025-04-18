let listaTareas = []

const agregarTarea = () => {

    const timestamp = Date.now()
    const fechaActual = new Date(timestamp)

    let tareaIngresada = document.getElementById("tareaIngresada").value

    if(tareaIngresada != "") {
        listaTareas.push({
            tarea: tareaIngresada,
            tachado: false,
            fechaCreado: fechaActual,
            fechaTachado: ""
        })
    }

    mostrarTareas()
}

const mostrarTareas = () => {

    let contenedorDeTareas = document.getElementById("contenedorDeTareas")
    contenedorDeTareas.innerHTML = ""

    listaTareas.forEach((t, i) => {

        contenedorDeTareas = document.getElementById("contenedorDeTareas").innerHTML += `
        <div class="tarea-texto">
            <input type="checkbox" value="${i}" class="checkbox" onchange="tacharTarea(this)" ${t.tachado ? "checked" : ""}>
            <div class="contenido-tarea">
                <p id="tarea${i}" class="tarea-nombre ${t.tachado ? "tarea-completa" : "tarea-no-completa"}">${t.tarea}</p>
                <p class="fechaCreacion">Fecha de creacion:${t.fechaCreado}</p>
                <p class="fechaTachado" id="fechaTachado${i}">Fecha de tachado: ${t.tachado ? t.fechaTachado : "No fue tachado"}</p>
            </div>
        </div>
        `
    })
}

const tacharTarea = (checkbox) => {

    const timestamp = Date.now()
    const fechaActual = new Date(timestamp)

    let tarea = listaTareas[checkbox.value]
    const textoTarea = document.getElementById(`tarea${checkbox.value}`)
    const textoTareaTachado = document.getElementById(`fechaTachado${checkbox.value}`)

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
        textoTareaTachado.innerHTML = "Fecha de tachado: No fue tachado"
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
        tareaMasRapida.innerHTML = `<div class="tarea-texto">Tarea mas rapido en realizarse: "${tareaBuscada.tarea}" <div/>`
    }
    else {
        tareaMasRapida.innerHTML = `<div class="tarea-texto"> No se tacho ninguna tarea <div/>`
    }
}


