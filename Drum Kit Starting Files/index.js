// Esta línea cuenta cuántos elementos HTML tienen la clase "drum" en el documento y almacena ese número en numberOfDrumButtons.
var numberOfDrumButtons = document.querySelectorAll(".drum").length;

// Este bucle for itera sobre cada uno de los elementos HTML con la clase "drum" y les añade un "escuchador de eventos" para el evento de clic.
for(var i = 0; i< numberOfDrumButtons; i++){
    // Aquí se selecciona cada elemento con la clase "drum" uno por uno y se le añade un evento de clic. Cuando se hace clic en uno de estos elementos, se ejecuta la función anónima proporcionada.
    document.querySelectorAll(".drum")[i].addEventListener("click", function(){

        // Dentro de la función de clic, se obtiene el contenido HTML del elemento que fue clicado.
        var buttonInnerHTML = this.innerHTML;
        // Se llama a la función makeSound con el contenido HTML del botón clicado como argumento.
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });
}

// Este código añade un "escuchador de eventos" para el evento de presionar una tecla en todo el documento. Cuando se presiona una tecla, se ejecuta la función anónima proporcionada, pasando el evento como argumento.
document.addEventListener("keydown", function(event){
    // Dentro de la función de tecla presionada, se llama a la función makeSound con la tecla presionada como argumento.
    makeSound(event.key);
    buttonAnimation(event.key);
});
    

// Esta es la función que toma la tecla o el contenido HTML como entrada y reproduce el sonido correspondiente. Utiliza un switch para determinar qué sonido reproducir según la tecla o el contenido HTML proporcionado.
function makeSound(key) { 

    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
        tom1.play();
            break;
    
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
        tom2.play();
            break;

        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
        tom3.play();
        break;

        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
        tom4.play();
        break;

        case "j":
            var snare = new Audio("sounds/snare.mp3");
        snare.play();
        break;

        case "k":
            var crash = new Audio("sounds/crash.mp3");
        crash.play();
        break;

        case "l":
            var kick = new Audio("sounds/kick-bass.mp3");
        kick.play();
        break;

        default:
    }
}

function buttonAnimation(currentKey){
var activeButton = document.querySelector("." +currentKey);
activeButton.classList.add("pressed");
setTimeout(function(){
    activeButton.classList.remove("pressed");
},100)
}

 