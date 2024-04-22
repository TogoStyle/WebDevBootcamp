// Declaración de variables y arrays para almacenar el patrón del juego, colores de los botones y patrón de selección del usuario.

var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
// Variable booleana para verificar si se ha presionado la tecla A.
var hasKeyBeenPressed = new Boolean(0);

// Función para generar el siguiente elemento del patrón del juego.
function nextSequence(){
  // Limpiar el patrón de selección del usuario.
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*3)+1;
    var randomChosenColour = buttonColours[randomNumber];
     // Agregar el color aleatorio al patrón del juego.
     gamePattern.push(randomChosenColour);

     // Mostrar animación de parpadeo para el color seleccionado.
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

// switch (randomChosenColour) {
//     case "red":
//         var redSound = new Audio("sounds/red.mp3");
//         redSound.play();
//         break;

//     case "blue":
//         var blueSound = new Audio("sounds/blue.mp3");
//         blueSound.play();
//         break;

//     case "green":
//         var greenSound = new Audio('sounds/green.mp3');
//         greenSound.play();
//         break;

//     case "yellow":
//         var yellowSound = new Audio('sounds/yellow.mp3');
//         yellowSound.play();s
//         break;

//     default:
//         console.log('Error');

        
// }
playSound(randomChosenColour);
 // Aumentar el nivel del juego y actualizar el título del nivel.
level ++;
$("#level-title").text("Level " + level)

}

// Controlador de evento para el clic en los botones.
$(".btn").click(function(){  
                            //
// Esto es un fragmento de código en jQuery. $(this) se refiere al elemento actual en el que se está trabajando, y .attr("id") está recuperando el valor del atributo "id" de ese elemento. En resumen, $(this).attr("id") devuelve el ID del elemento en el que se está ejecutando el código jQuery. Por ejemplo, si se ejecuta dentro de un evento click en un botón con el ID "miBoton", devolverá "miBoton". 
    var userChosenColour = $(this).attr("id");
        // Agregar el color seleccionado al patrón de selección del usuario.
    userClickedPattern.push(userChosenColour);
        // Reproducir el sonido asociado al color seleccionado.
    playSound(userChosenColour);
        // Animar el botón seleccionado.
    animatePress(userChosenColour);
        // Verificar la respuesta del usuario hasta la última selección realizada.
    checkAnswer(userClickedPattern.length-1);
    }); 


    // Función para reproducir el sonido asociado a un color.
function playSound (color){
    var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// Función para animar el botón presionado.
function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100)
  
}
// Evento que se ejecuta cuando se presiona la tecla A una sola vez.
$(document).ready(()=>{
  $(document).
  keypress(function (event) {
  let key = (event.keyCode ? 
             event.keyCode : 
             event.which);
  let character = String.
  fromCharCode(key)
          // Si la tecla presionada es 'a' y no se ha presionado antes.
  if(character == "a" && hasKeyBeenPressed == 0){
                // Mostrar el título del nivel y generar el siguiente elemento del patrón del juego.
    $("#level-title").text("Level " + level);
    nextSequence();
                // Cambiar el estado de la tecla presionada.
    hasKeyBeenPressed = 1;
  }
});
});

// Función para verificar la respuesta del usuario.
function checkAnswer(currentLevel){
      // Si la respuesta del usuario coincide con el patrón del juego hasta el nivel actual.
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
            // Si el usuario ha completado el patrón del juego hasta el nivel actual.
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
       // Generar el siguiente elemento del patrón del juego después de un segundo.
        nextSequence();
      }, 1000)
    }
  } else{
            // Si la respuesta del usuario es incorrecta.
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
            // Animar el fondo del cuerpo para indicar error.
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200)
            // Actualizar el título del nivel para indicar fin del juego.
    $("#level-title").text("Game Over, Any Key to Restart");
            // Evento para reiniciar el juego cuando se presiona cualquier tecla.
    $(document).ready(()=>{
      $(document).
      keypress(function () {
        startOver();
  });
  });
    
  }
}
// Función para reiniciar el juego.
function startOver(){
      // Reiniciar el nivel, el patrón del juego y el estado de la tecla presionada.
  level = 0;
  $("#level-title").text();
  gamePattern = [];
  hasKeyBeenPressed = 0;
}