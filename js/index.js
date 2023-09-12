var cardHomeArray = ["#home-intro", "#home-samples", "#home-contact"]
var cardHomeCurrentIndex = 0;
var scrolled = false;
var allowScrollJS = false;

// This is the init function for anything you need to set up when the 
// window first opens
$(function(){
    toggleHomeWindowScroll();
})

$(window).on("resize", function(){
    toggleHomeWindowScroll();
});

$(document).on("wheel", function(event){
    if(!scrolled && allowScrollJS){
        scrolled = true;
        homeWindowScroll(1);
        console.log(event);
        setTimeout(function () { scrolled = false; }, 100);
    }
});

function homeWindowScroll(inc){
    cardHomeCurrentIndex += inc;
    if(cardHomeCurrentIndex >= cardHomeArray.length){
        cardHomeCurrentIndex = 0;
    }
    else if(cardHomeCurrentIndex < 0){
        cardHomeCurrentIndex = cardHomeArray.length - 1;
    }

    for(var crd = 0; crd < cardHomeArray.length; crd++){
        var card = $(cardHomeArray[crd]);
        if(crd === cardHomeCurrentIndex){
            if(card.hasClass("home-card-hide")){
                card.removeClass("home-card-hide");
            }
            card.addClass("home-card-show");
        }else{
            if(!card.hasClass("home-card-hide")){
                card.addClass("home-card-hide");
            }
            if(card.hasClass("home-card-show")){
                card.removeClass("home-card-show");
            }
        }
        console.log(card);
    }
}

function toggleHomeWindowScroll(){
    if(window.innerWidth > 1100){
        if(!allowScrollJS){
            cardHomeCurrentIndex=0;
            homeWindowScroll(0);
            allowScrollJS = true;
        }
    }
    else{
        if(allowScrollJS){
            resetHomeWindowScroll();
            allowScrollJS = false;
        }
    }
}

function resetHomeWindowScroll(){
    for(var crd = 0; crd < cardHomeArray.length; crd++){
        var card = $(cardHomeArray[crd]);
        if(card.hasClass("home-card-hide")){
            card.removeClass("home-card-hide");
        }
        if(card.hasClass("home-card-show")){
            card.removeClass("home-card-show");
        }
        console.log(card);
    }
}

