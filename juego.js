
let cartas = [
    'img/ajolote.jpeg', 'img/ajolote.jpeg',
    'img/capi.jpeg', 'img/capi.jpeg',
    'img/delfin.jpeg', 'img/delfin.jpeg',
    'img/dino.jpeg', 'img/dino.jpeg',
    'img/gato.jpeg', 'img/gato.jpeg',
    'img/pollo.jpeg', 'img/pollo.jpeg',
];
let cartasSeleccionadas = []
let cartasSeleccionadasId = []
let aciertos = 0
let movimientos = 0
let bloquearVolteada = false
let tiempoInicio
let intervaloTiempo
const tiempoLimite = 50
const tiempoMostrarCartas = 3000
function mezclarCartas(cartas) {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]]
    }
    return cartas;
}

function voltear(id) {
    const carta = document.getElementById(id)
    if (!bloquearVolteada && cartasSeleccionadas.length < 2 && !carta.classList.contains('volteada')) {
        carta.innerHTML = `<img src="${cartas[id]}" alt="Carta ${id}">`
        carta.classList.add('volteada')
        cartasSeleccionadas.push(cartas[id])
        cartasSeleccionadasId.push(id)
        if (cartasSeleccionadas.length === 2) {
            movimientos++
            document.querySelectorAll('.estadisticas')[2].textContent = `Movimientos: ${movimientos}`;
            bloquearVolteada = true
            setTimeout(comprobarPar, 1000)
        }
    }
}
function comprobarPar() {
    const [carta1, carta2] = cartasSeleccionadas
    const [id1, id2] = cartasSeleccionadasId
    if (carta1 === carta2) {
        aciertos++
        document.querySelectorAll('.estadisticas')[0].textContent = `Aciertos: ${aciertos}`
        const carta1Element = document.getElementById(id1)
        const carta2Element = document.getElementById(id2)
        carta1Element.classList.add('bloqueada')
        carta2Element.classList.add('bloqueada')
        cartasSeleccionadas = []
        cartasSeleccionadasId = []
        bloquearVolteada = false
        if (aciertos === 6) {
            clearInterval(intervaloTiempo)
            alert(`¡Felicidades! Ganaste el juego.`)
        }
    } else {
        const carta1Element = document.getElementById(id1)
        const carta2Element = document.getElementById(id2)
        setTimeout(() => {
            carta1Element.innerHTML = ''
            carta2Element.innerHTML = ''
            carta1Element.classList.remove('volteada')
            carta2Element.classList.remove('volteada')
            cartasSeleccionadas = []
            cartasSeleccionadasId = []
            bloquearVolteada = false
        }, 1000);
    }
}
function reiniciarJuego() {
    cartasSeleccionadas = []
    cartasSeleccionadasId = []
    aciertos = 0
    movimientos = 0
    bloquearVolteada = false
    const tablero = document.querySelector('.seccion1 table')
    const botones = tablero.getElementsByTagName('button')
    for (let i = 0; i < botones.length; i++) {
        botones[i].innerHTML = ''
        botones[i].classList.remove('volteada')
        botones[i].classList.remove('bloqueada')
    }
    clearInterval(intervaloTiempo);
    document.querySelectorAll('.estadisticas')[0].textContent = `Aciertos: ${aciertos}`
    document.querySelectorAll('.estadisticas')[2].textContent = `Movimientos: ${movimientos}`
    iniciarJuego()
}
function iniciarJuego() {
    const tablero = document.querySelector('.seccion1 table')
    const botones = tablero.getElementsByTagName('button')
    const cartasMezcladas = mezclarCartas(cartas)
    for (let i = 0; i < botones.length; i++) {
        botones[i].id = i
        botones[i].onclick = function () { voltear(this.id); }
    }

    for (let i = 0; i < botones.length; i++) {
        botones[i].innerHTML = `<img src="${cartas[i]}" alt="Carta ${i}">`
        botones[i].classList.add('volteada')
    }
    setTimeout(() => {

        for (let i = 0; i < botones.length; i++) {
            botones[i].innerHTML = '';
            botones[i].classList.remove('volteada')
        }
        tiempoInicio = new Date().getTime()
        intervaloTiempo = setInterval(actualizarTiempo, 1000)
        setTimeout(() => {
            clearInterval(intervaloTiempo)
            if (aciertos < 6) {
                alert(`¡Lo siento! Se acabó el tiempo.`)
            }
        }, tiempoLimite * 1000)
    }, tiempoMostrarCartas)
}
function actualizarTiempo() {
    const tiempoActual = new Date().getTime()
    const tiempoTranscurrido = Math.floor((tiempoActual - tiempoInicio) / 1000)
    document.querySelectorAll('.estadisticas')[1].textContent = `Tiempo: ${tiempoTranscurrido} segundos`
}
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego)
iniciarJuego();
