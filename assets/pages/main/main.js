$( document ).ready(function() {
    initHandlers();
});

const initHandlers = () => {
    $(document.body).on("click", '.lower-tutorial-text.tutorial-1', function() { 
        showNextTutorialStep();
    });
    $(document.body).on("click", '.lower-tutorial-text.tutorial-2', function() { 
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
    $(".tutorial-1").hide();
    $(".tutorial-2").show();
}

const finishTutorial = () => {
    $(".main, .camera-icon").removeClass("tutorial");
    $(".upper-tutorial-text, .lower-tutorial-text, .tutorial-2").hide();
    $(".camera-icon").show();
}

