var startMenuJson = [{
    'tagName': 'button',
    'type': 'button',
    'onClick': 'newCMD("starttext");',
    'innerHTML': 'Austin Hrin.bat'
}, {
    'tagName': 'br'
}, {
    'tagName': 'button',
    'type': 'button',
    'onClick': 'newCMD("abouttext");',
    'innerHTML': 'About.exe'
}, {
    'tagName': 'br'
}, {
    'tagName': 'button',
    'type': 'button',
    'style': 'display: none;',
    'onClick': 'newCMD("linksText");',
    'innerHTML': 'Links.exe'
}, {
    'tagName': 'br'
}];


// addTagsLoop(startMenuJson, 'startmenu', 0, 'startmenu');