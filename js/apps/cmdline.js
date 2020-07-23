var cmdJSON = [{
    'tagName': 'div',
    'id': 'cmdline',
    'className': 'cmdline',
    'onClick': 'focusApp("cmdline", "cmdlineinput");',
    'children': [{
        'tagName': 'div',
        'id': 'cmdlinetitlebar',
        'className': 'cmdlinetitlebar',
        'children': [{
            'tagName': 'span',
            'id': 'titletext',
            'className': 'titletext',
            'innerHTML': 'Command Prompt'
        }, {
            'tagName': 'ul',
            'id': 'listItems',
            'children': [{
                'tagName': 'li',
                'id': 'listItem1_',
                'children': [{
                    'tagName': 'button',
                    'type': 'button',
                    'onClick': 'minimize("cmdline", "cmdlinetask");',
                    'innerHTML': '_'
                }]
            }, {
                'tagName': 'li',
                'id': 'listItem2_',
                'children': [{
                    'tagName': 'button',
                    'type': 'button',
                    'onClick': 'maximize("cmdline", "cmdlineinput");',
                    'innerHTML': '[]'
                }]
            }, {
                'tagName': 'li',
                'id': 'listItem3_',
                'children': [{
                    'tagName': 'button',
                    'type': 'button',
                    'onClick': 'exit("cmdline", "cmdlinetask");',
                    'innerHTML': 'X'
                }]
            }]
        }]
    }, {
        'tagName': 'div',
        'id': 'cmdlinetextdiv',
        'className': 'cmdlinetextdiv',
        'children': [{
            'tagName': 'span',
            'id': 'cmdlinetext',
            'className': 'cmdlinetext',
            'innerHTML': ''
        }, {
            'tagName': 'span',
            'id': 'cmdlineinput',
            'className': 'cmdlineinput',
            'contenteditable': 'true',
            'innerHTML': ''
        }, {
            'tagName': 'span',
            'id': 'blinking-cursor',
            'className': 'blinking-cursor',
            'innerHTML': '_'
        }]
    }, {
        'tagName': 'div',
        'id': 'cmdlineBottom',
        'className': 'cmdlineBottom'
    }]
}];


var starttext = "C:\\Desktop>Austin Hrin.bat\nRunning Austin Hrin.bat...\n\nHello, my name is Austin Hrin.\n\nI am a Full Stack Web Developer located in Pinellas County Florida.\n\n\nType one of the commands listed below for more information.\nAvailable commands:\nabout\ncontact\nC:\\Desktop>";

var abouttext = "About me\n";
var contactText = "LinkedIn:\nwww.linkedin.com/in/austinhrin\nmore coming soon!\n";
var typingspeed = 50;
var numCMDlineWindows = 0;

function about(cmdline, cmdlineInput) {
    var cmdlineElem = document.getElementById(cmdline);
    var cmdlineInputElem = document.getElementById(cmdlineInput);
    cmdlineInputElem.innerHTML = "";
    cmdlineElem.innerHTML += "about";
    cmdlineElem.appendChild(document.createElement("br"));
    commandline(abouttext, cmdline);
    setTimeout(function() {
        cmdlineElem.innerHTML += "C:\\Desktop>";
    }, typingspeed * abouttext.length);
}

function contact(cmdline, cmdlineInput) {
    var cmdlineElem = document.getElementById(cmdline);
    var cmdlineInputElem = document.getElementById(cmdlineInput);
    cmdlineInputElem.innerHTML = "";
    cmdlineElem.innerHTML += "contact";
    cmdlineElem.appendChild(document.createElement("br"));
    commandline(contactText, cmdline);
    setTimeout(function() {
        cmdlineElem.innerHTML += "C:\\Desktop>";
    }, typingspeed * contactText.length);
}

function commandline(text, cmdline) {
    for (var x = 0; x < text.length; x++) {
        var character = text.charAt(x);
        addchar(x, character, cmdline);
    }
}

function addchar(n, character, cmdline) {
    var cmdlineElem = document.getElementById(cmdline);
    setTimeout(function() {
        cmdlineElem.innerHTML += character;
        //if there is a new line in text then add a line break
        if (character == "\n") {
            cmdlineElem.appendChild(document.createElement("br"));
        }
    }, typingspeed * n);
}

function newCMDline() {
    // get number of current commandlines
    var cmdlineNum = numCMDlineWindows;
    if (numCMDlineWindows == 0) {
        cmdlineNum = '';
        numCMDlineWindows = numCMDlineWindows + 1;
    } else {
        numCMDlineWindows = numCMDlineWindows + 1;
    }

}

function newCMD() {
    numCMDlineWindows = numCMDlineWindows + 1;
    if (numCMDlineWindows <= 1) {
        var cmdNum = '';
        addTagsLoop(cmdJSON, 'programsContainer', cmdNum, 'cmdline');
    } else {
        var cmdNum = numCMDlineWindows;
        addTagsLoop(cmdJSON, 'programsContainer', cmdNum, 'cmdline');
    }

    var cmdAppElemId = 'cmdline' + cmdNum.toString();
    var cmdLineText = 'cmdline' + cmdNum.toString() + 'text';
    var cmdLineInput = 'cmdline' + cmdNum.toString() + 'input';
    var cmdLineInputElem = document.getElementById(cmdLineInput);

    cmdLineInputElem.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            //cmdLineInputElem.click();
            if (cmdLineInputElem.innerHTML.indexOf('about') > -1) {
                about(cmdLineText, cmdLineInput);
            } else if (cmdLineInputElem.innerHTML.indexOf('contact') > -1) {
                contact(cmdLineText, cmdLineInput);
            }
        }
    });
    cmdLineInputElem.focus();
    // add initial text to command prompt
    commandline(starttext, cmdLineText);
    // Make the DIV element resizeable. Function located in main.js
    resizeElem(document.getElementById(cmdAppElemId));
    // Make the DIV element draggagle. Function located in main.js
    dragElement(document.getElementById(cmdAppElemId));

    // create program in the taskbar at the bottom of the window
    // <button id="cmdlinetask" onclick="bringUpWindow('cmdline', 'cmdlinetask');">Command Prompt</button>
    var task = document.createElement('button');
    task.innerHTML = 'Command Prompt ' + cmdNum.toString();
    task.id = 'cmdline' + cmdNum.toString() + 'task';
    task.onclick = function() {
        bringUpWindow('cmdline' + cmdNum.toString(), 'cmdline' + cmdNum.toString() + 'task');
    };
    document.getElementById('programs').appendChild(task);
}