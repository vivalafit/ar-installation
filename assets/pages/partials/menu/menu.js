$(document).ready(function() {
    initMenuHandlers();
});

const initMenuHandlers = () => {
    $(document.body).on("click", ".menu-icon", function() {
        $(".main-content, .menu-icon").addClass("hidden");
        $(".menu, .back-icon").removeClass("hidden");
    })
    $(document.body).on("click", ".back-icon", function() {
        $(".main-content, .menu-icon").removeClass("hidden");
        $(".menu, .back-icon").addClass("hidden");
    })
}
