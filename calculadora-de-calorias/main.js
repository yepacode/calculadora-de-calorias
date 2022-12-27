const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();

    calcularCalorias();
})

function calcularCalorias() {
    aparecerResultado();

    const nom = document.querySelector('#nombre').value;
    const TipoDeDocumento= document.querySelector('#TipoDeDocumento').value;
    const NumeroDeDocumento = document.querySelector('#NumeroDeDocumento').value;
    const edad = document.querySelector('#edad').value;
    const peso = document.querySelector('#peso').value;
    const altura = document.querySelector('#altura').value;
    const genero = document.querySelector('input[name="genero"]:checked');
    const actividad = document.querySelector('#actividad').value;


   
    // const totalCalorias = document.querySelector('#total-calorias');

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }

    if ( !(edad && peso && altura) ) {
        mostrarMensajeDeError('Por favor asegúrese de llenar todos los campos');
        return;
    } else if (edad < 15 || edad > 80) {
        mostrarMensajeDeError('La edad ingresada no es permitida');
        return;
    }
    
    let calculoCalorias;
    if (genero.id === 'hombre') {
        //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
        calculoCalorias = actividad * ((multiplicadorTMB.peso * peso) +
                                             (multiplicadorTMB.altura * altura) -
                                             (multiplicadorTMB.edad * edad)) + 5;
    } else {
        //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
        calculoCalorias = actividad * ((multiplicadorTMB.peso * peso) +
                                             (multiplicadorTMB.altura * altura) -
                                             (multiplicadorTMB.edad * edad)) -161
    }
    
    // totalCalorias = `${Math.floor(calculoCalorias)} kcal`;
    
    if(edad>=15 && edad <=29 ){
        var msj= "joven";
    }else if(edad>=30 && edad <= 59){
        var msj= "adulto"
    }else if(edad >= 60){
        var msj= "adulto mayor"
    }else{
        var msj= "invalido"
    }

    

    resultado.innerHTML = `
        <div class=" card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Descripción</h5>
            <div class="mb-3 w-100">
            <h1> "El paciente ${nom} identificado con ${TipoDeDocumento}
            NO.${NumeroDeDocumento}, requiere un total de ${Math.floor(calculoCalorias)} kcal
            para el sostenimiento de su TBM"  </h1> 
            <input class="form-control text-center" value="${msj}" style="font-size: 2rem" disabled>
            </div>
        </div>
    `
    nom = null;
    TipoDeDocumento.value = null;
    NumeroDeDocumento.value = null;
    peso.value = null;
    altura.value = null;
    edad.value = null;
    actividad.value = null;
    

}


function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}