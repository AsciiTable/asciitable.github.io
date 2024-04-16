/* HOMEPAGE SCROLLING EFFECT VARS */
var cardHomeArray = ["#home-intro", "#home-samples", "#home-contact"];
var cardHomeCurrentIndex = 0;
var scrolled = false;
var allowScrollJS = true;
var scrollAnimDuration = 400;
var pageNumberText = $("#page-number");

/* SCROLL TOOLTIP VARS */
var scrollTipShown = false;
var scrolledFirst = false;
var waitScrollTip = 4500;
var scrollTip = "#scroll-tip";
var scrollTipGif = $(scrollTip);
var scrollTooltipTimeout = setTimeout(function () {
    scrollTipGif.attr("class", "long-elements fade-show");
    scrollTipShown = true;
}, waitScrollTip);

// vars for screen size behaviors
// var medScreen = window.matchMedia("(max-width: 1100px)");
// var largeScreen = window.matchMedia("(min-width: 1750px)");

// This is the init function for anything you need to set up when the
// window first opens
$(function(){
    pageNumberText.text((cardHomeCurrentIndex+1) + "/" + cardHomeArray.length);
    toggleHomeWindowScroll();
})

// Events to handle when the window is resized
$(window).on("resize", function(){
    // Checks window size to enable/disable Homepage Scrolling
    toggleHomeWindowScroll();
});

// Events to handle when the scroll wheel is used
$(document).on("wheel", function(event){
    // If the current page is the Homepage, handle scrolling JS
    if(this.title === "Homepage | Jessica Wei"){
        homeScroll(event.originalEvent.wheelDeltaY, true);

        /* SCROLL TOOLTIP BEHAVIOR */
        // If the user has scrolled before the tooltip was shown,
        // then flag that it happened and clear the timeout
        if(!scrolledFirst && !scrollTipShown){
            scrolledFirst = true;
            clearTimeout(scrollTooltipTimeout);
        }
        // Otherwise, if the tooltip was shown, then hide the
        // tooltip and flag it as not showing
        if(scrollTipShown){
            scrollTipGif.attr("class", "fade-hide hide");
            scrollTipShown = false;
        }
        /* SCROLL TOOLTIP BEHAVIOR END */
    }
});

$(document).on("keydown", function(event){
  // If the current page is the Homepage, handle scrolling JS
  if(this.title === "Homepage | Jessica Wei"){
    switch(event.key){
      case "ArrowDown":
        homeScroll(-1, true);
        break;
      case "ArrowUp":
        homeScroll(1, true);
        break;
      case "ArrowLeft":
        homeScroll(1, false);
        break;
      case "ArrowRight":
        homeScroll(-1, false);
        break;
      default:
        break;
    }
  }
});

function homeScroll(direction){
  if(!scrolled && allowScrollJS){
      scrolled = true;
      if(direction > 0){
        direction = -1;
      }else if(direction < 0){
        direction = 1;
      }
      homeWindowScroll(direction);
      setTimeout(function () { scrolled = false; }, scrollAnimDuration);
  }
}

function homeWindowScroll(inc, isVertical){
    cardHomeCurrentIndex += inc;
    if(cardHomeCurrentIndex >= cardHomeArray.length){
        cardHomeCurrentIndex = 0;
    }
    else if(cardHomeCurrentIndex < 0){
        cardHomeCurrentIndex = cardHomeArray.length - 1;
    }
    // Get the new card (nCard) to show and the card to hide (hCard)
    var nCard = $(cardHomeArray[cardHomeCurrentIndex]);
    var hCard = nCard;
    pageNumberText.text((cardHomeCurrentIndex+1) + "/" + cardHomeArray.length);
    for(var crd = 0; crd < cardHomeArray.length; crd++){
        var card = $(cardHomeArray[crd]);
        if(crd === cardHomeCurrentIndex){
            nCard = card;
        }else{
            if(card.hasClass("home-card-show")){
                hCard = card;
            }
        }
    }
    if(inc != 0){
        // Animate, hide, then show cards
        if(hCard.hasClass("home-card-show")){
            if(inc < 0){ hCard.addClass("slide-down-out"); }
            else{ hCard.addClass("slide-up-out"); }
            setTimeout(function () {
                if(!hCard.hasClass("home-card-hide")){
                    hCard.addClass("home-card-hide");
                }
                if(inc < 0){ hCard.removeClass("slide-down-out"); }
                else{ hCard.removeClass("slide-up-out"); }
                hCard.removeClass("home-card-show");

            }, scrollAnimDuration-50);
        }
        if(nCard.hasClass("home-card-hide")){
            nCard.removeClass("home-card-hide");
        }
        nCard.addClass("home-card-show");
    }
}

function toggleHomeWindowScroll(){
    if(window.innerWidth > 1100){
        if(!allowScrollJS){
            resetHomeWindowScroll(true);
            cardHomeCurrentIndex=0;
            homeWindowScroll(0);
            allowScrollJS = true;
        }
    }
    else{
        if(allowScrollJS){
            resetHomeWindowScroll(false);
            allowScrollJS = false;
        }
    }
}

function resetHomeWindowScroll(needsClass){
    /* SCROLL TOOLTIP BEHAVIOR */
    // Reset all scroll tip timers
    clearTimeout(scrollTooltipTimeout);
    scrollTipShown = false;
    scrolledFirst = false;
    scrollTipGif.attr("class", "hide");
    /* SCROLL TOOLTIP BEHAVIOR END */

    if(needsClass){
        resetHomeWindowScroll(false);
        $(cardHomeArray[0]).addClass("home-card-show");
        $(cardHomeArray[1]).addClass("home-card-hide");
        $(cardHomeArray[2]).addClass("home-card-hide");
        /* SCROLL TOOLTIP BEHAVIOR */
        scrollTooltipTimeout = setTimeout(function () {
            scrollTipGif.attr("class", "long-elements fade-show");
            scrollTipShown = true;
        }, waitScrollTip);
        /* SCROLL TOOLTIP BEHAVIOR END */
    }else{
        for(var crd = 0; crd < cardHomeArray.length; crd++){
            var card = $(cardHomeArray[crd]);
            if(card.hasClass("home-card-hide")){
                card.removeClass("home-card-hide");
            }
            if(card.hasClass("home-card-show")){
                card.removeClass("home-card-show");
            }
        }
    }
}
