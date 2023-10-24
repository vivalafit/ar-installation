$(document).ready(function() {
    hardResetPage();
    initHandlers();
});

const hardResetPage = () => {
    window.addEventListener( "pageshow", function ( event ) {
        var historyTraversal = 
        event.persisted || (
            typeof window.performance != "undefined" && 
            window.performance.getEntriesByType("navigation")[0].type === "back_forward"
        );
        if (historyTraversal) {
            window.location.reload();
        }
    });
}

const initHandlers = () => {
    $(document.body).on("click", '.tutorial-1 .lower-tutorial-text', function() { 
        showNextTutorialStep();
    });
    $(document.body).on("click", '.tutorial-2 .lower-tutorial-text', function() { 
        finishTutorial();
    });
}

const showNextTutorialStep = () => {
    $(".tutorial-2").removeClass("hidden");
    $(".tutorial-1").addClass("hidden");
}

const finishTutorial = () => {
    $(".main, .camera-icon").removeClass("tutorial");
    $(".tutorial-2").addClass("hidden");
}

