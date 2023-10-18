var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var x=0;
var start=false;
function nextSequence(){
    x++;
    $("#level-title").text("Level "+x);
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    soundgen(randomChosenColour);
}
function soundgen(rcc){
    switch(rcc){
        case "red":
            var audio=new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "blue":
            var audio=new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "green":
            var audio=new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "yellow":
            var audio=new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        default:
            var audio=new Audio("sounds/wrong.mp3");
            audio.play();
            break;
    }
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function startOver(){
    x=0;
    gamePattern=[];
    start=false;
}
function checkAnswer(cl){        
    if(gamePattern[cl]===userClickedPattern[cl]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){nextSequence();},1000);
        }
    }else {
        soundgen("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to start");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
$(document).on("keypress",function(){
    if(!start){
        $("#level-title").text("Level "+x);
        nextSequence();
        start=true;
    }
});
$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    soundgen(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


