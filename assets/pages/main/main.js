$( document ).ready(function() {
    initHandlers();
});

const initHandlers = () => {
    $(document.body).on("click", '.tutorial-1 .lower-tutorial-text', function() { 
        showNextTutorialStep();
    });
    $(document.body).on("click", '.tutorial-2 .lower-tutorial-text', function() { 
        finishTutorial();
    });
    $(document.body).on("click", ".menu-icon", function() {
        $(".main-content, .menu-icon").addClass("hidden");
        $(".menu, .back-icon").removeClass("hidden");
    })
    $(document.body).on("click", ".back-icon", function() {
        $(".main-content, .menu-icon").removeClass("hidden");
        $(".menu, .back-icon").addClass("hidden");
    })
}

const showNextTutorialStep = () => {
    $(".tutorial-2").removeClass("hidden");
    $(".tutorial-1").addClass("hidden");
}

const finishTutorial = () => {
    $(".main, .camera-icon").removeClass("tutorial");
    $(".tutorial-2").addClass("hidden");
}

