// any code that should be run at script load is below this line
window.onload = function() {
    // start clock
    getTime();
    // create start menu
    addTagsLoop(startMenuJson, 'startmenu', false, false);
    // create initial command prompt
    newCMD();
};