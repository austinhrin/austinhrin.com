var debugLogging = false;

function addTagsLoop(jsonData, parentId, idNum, idFilter) {
    idNum = idNum.toString();
    if (debugLogging == true) {
        console.log('idNum: "' + idNum + '"');
    }
    for (var key in jsonData) {
        var newTag = document.createElement(jsonData[key].tagName);

        var tagAttrArray = ['className', 'id', 'innerHTML', 'type', 'onClick', 'contenteditable', 'title', 'style'];

        var attrVal = '';
        var newParentId = false;
        for (var tag in tagAttrArray) {
            if (jsonData[key].hasOwnProperty(tagAttrArray[tag])) {
                if (tagAttrArray[tag] == 'id') {
                    // check to see if id includes idFilter
                    if (jsonData[key][tagAttrArray[tag]].indexOf(idFilter) > -1 && tagAttrArray[tag] == 'id') {
                        attrVal = jsonData[key][tagAttrArray[tag]];
                        attrVal = attrVal.split(idFilter).join(idFilter + idNum);
                        newParentId = attrVal;
                        if (attrVal !== (idFilter + idNum)) {
                            // attrVal = attrVal + idNum;
                        }
                    } else if (tagAttrArray[tag] == 'id') {
                        attrVal = jsonData[key][tagAttrArray[tag]] + idNum;
                        newParentId = attrVal;
                    } else {
                        attrVal = jsonData[key][tagAttrArray[tag]] + idNum;
                    }
                } else if (jsonData[key][tagAttrArray[tag]].indexOf(idFilter) > -1 && tagAttrArray[tag] == 'onClick') {
                    attrVal = jsonData[key][tagAttrArray[tag]];
                    attrVal.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                    attrVal = attrVal.split(idFilter).join(idFilter + idNum);
                } else if (tagAttrArray[tag] === 'innerHTML' && jsonData[key]['id'] === 'titletext') {
                    // add number to title of program
                    attrVal = jsonData[key][tagAttrArray[tag]] + ' ' + idNum;
                } else {
                    attrVal = jsonData[key][tagAttrArray[tag]];
                }

                if (tagAttrArray[tag] === 'onClick') {
                    // add onclick function to element
                    newTag.setAttribute("onclick",attrVal);
                    if (debugLogging == true) {
                        console.log("onClick: " + attrVal);
                    }
                } else if (tagAttrArray[tag] === 'contenteditable') {
                    // for some reason this does not work in with newTag[tagAttrArray[tag]]????
                    newTag.contentEditable = attrVal;
                } else {
                    newTag[tagAttrArray[tag]] = attrVal;
                }

            };
        };

        if (debugLogging == true) {
            console.log('parent ID: ' + parentId + ', new tag: ' + jsonData[key].tagName);
        }
        if (parentId !== false) {
            // if (parentId === idFilter) {
            // FIX THIS???? does this do anything or just break stuff????? LOL
            // parentId = attrVal.replace(idFilter, idFilter + idNum);
            // }
            if (debugLogging == true) {
                console.log(parentId);
            }
            document.getElementById(parentId).appendChild(newTag);
        } else {
            document.body.appendChild(newTag);
        }

        if (newParentId === false) {
            newParentId = parentId;
        }
        // document.body.appendChild(newTag);
        // if (debugLogging == true) {console.log('parent ID: ' + newParentId + ' new tag: ' + jsonData[key].tagName);}
        if (jsonData[key].hasOwnProperty('children')) {
            addTagsLoop(jsonData[key].children, newParentId, idNum, idFilter);
        }
    }
}

function getTime() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    if (debugLogging == true) {
        console.log('current hours: ' + currentHours.toString());
    }
    if (debugLogging == true) {
        console.log('current minutes: ' + currentMinutes.toString());
    }

    if (currentHours > 12) {
        var hours = (currentHours - 12).toString();
        var ampm = "PM";
    } else if (currentHours == 12) {
        var hours = currentHours.toString();
        var ampm = "PM";
    } else if (currentHours == 0) {
        var hours = 12;
        var ampm = "AM";
    } else {
        var hours = currentHours.toString();
        var ampm = "AM";
    }
    if (debugLogging == true) {
        console.log('hours after converting from military time: ' + hours.toString());
    }

    if (currentMinutes < 10) {
        var minutes = "0" + currentMinutes.toString();
    } else {
        var minutes = currentMinutes.toString();
    }
    if (debugLogging == true) {
        console.log('minutes after checking to see if it needs a 0: ' + minutes.toString());
    }

    var currentTimeString = hours.toString() + ":" + minutes.toString() + " " + ampm
    document.getElementById("time").innerHTML = currentTimeString;

    setTimeout(getTime, 30000)
}


function startmenu() {
    var border = document.getElementById("startmenubutton").style.border;
    if (border.indexOf("inset") != -1) {
        document.getElementById("startmenubutton").style.border = "outset #fff 2px";
        //hide startmenu
        document.getElementById("startmenu").style.display = "none";
    } else {
        document.getElementById("startmenubutton").style.border = "inset #fff 2px";
        //show startmenu
        document.getElementById("startmenu").style.display = "block";
    }
}


function minimize(elementId, taskBarId) {
    // elementId is the main window of the program that you want to minimize
    // taskBarId is the id of the element in the task bar related to the program you want to minimize.

    // change opacity of element to minimize to 0 so it disappears
    document.getElementById(elementId).style.opacity = "0";
    // change border style to outset
    console.log(taskBarId);
    document.getElementById(taskBarId).style.borderStyle = "outset";

    //disable clickable buttons on window.
    //document.getElementById("myBtn").disabled = true;
    //document.getElementsByTagName('button')
    //var buttons = document.getElementById(elementId).getElementsByTagName("a");

    //get button tags in window
    var buttons = document.getElementById(elementId).getElementsByTagName("button");
    //console.log(buttons);
    //document.getElementById(elementId).getElementsByTagName("a").className = "inactiveLink";
    //for (x in buttons) {
    //	x.className = "inactiveLink";
    //	console.log(x);
    //}

    //disable button tags
    for (var i = 0; i < buttons.length; i++) {
        //buttons2[i].className = "inactiveLink";
        buttons[i].disabled = true;
        /*if (buttons[i].style.visibility === "hidden") {
        	buttons[i].style.visibility = "visible";
        } else {
        	buttons[i].style.visibility = "hidden";
        	//buttons[i].className = "inactiveLink";
        }*/
    }
}

function bringUpWindow(elementId, taskBarId, focusElementId) {
    // elementId is the main window of the program that you want to bring up
    // taskBarId is the id of the element in the task bar related to the program you want to bring up
    // focusElementId is the element you want in focus while maximizing/going back to the original size.

    // change opacity of element to minimize to 1 so it appears
    document.getElementById(elementId).style.opacity = "1";
    // change border style to inset
    document.getElementById(taskBarId).style.borderStyle = "inset";

    //get button tags in window
    var buttons = document.getElementById(elementId).getElementsByTagName("button");

    //disable button tags
    for (var i = 0; i < buttons.length; i++) {
        //buttons2[i].className = "inactiveLink";
        buttons[i].disabled = false;
        /*if (buttons[i].style.visibility === "hidden") {
        	buttons[i].style.visibility = "visible";
        } else {
        	buttons[i].style.visibility = "hidden";
        	//buttons[i].className = "inactiveLink";
        }*/
    }

    // focus the element passed to the function.
    document.getElementById(focusElementId).focus();
}

function exit(elementId, taskBarId) {
    // exit (elementId, taskBarId)
    // elementId is the main window of the program that you want to close
    // taskBarId is the id of the element in the task bar related to the program you want to close.

    // close the program
    var elementProgram = document.getElementById(elementId);
    elementProgram.parentNode.removeChild(elementProgram);

    // remove the program from the task bar
    var elementTask = document.getElementById(taskBarId);
    elementTask.parentNode.removeChild(elementTask);

    if (elementId.indexOf('cmdline') > -1) {
        numCMDlineWindows = numCMDlineWindows - 1;
    }
}

function maximize(elementId, focusElementId) {
    // maximize(elementId)
    // elementId is the main window of the program that you want to maximize
    // focusElementId is the element you want in focus while maximizing/going back to the original size.

    // get element
    var elementProgram = document.getElementById(elementId);

    // check to see if program is maximized already
    if (elementProgram.style.width != "100%") {
        // mazimize program
        elementProgram.style = 'position: absolute; top: 0; bottom: 0; right: 0; left: 0; margin: 0; width: 100%; height: 100%;';
    } else {
        // unmaximize program
        elementProgram.style = "";

    }

    // focus the element passed to the function.
    document.getElementById(focusElementId).focus();

}

function focusApp(elemId, inputElemId) {
    if (debugLogging == true) {
        console.log('focusing app ' + elemId);
    }
    // unfocus all app windows
    var programsContainer = document.getElementById('programsContainer');
    var applications = programsContainer.querySelectorAll('.program');
    applications.forEach(function(app) {
        unfocusApp(app.id);
    });
    // focus app
    var elem = document.getElementById(elemId);
    elem.style.zIndex = '9999';
    var inputElem = document.getElementById(inputElemId);
    inputElem.focus();
}

function unfocusApp(elemId) {
    var elem = document.getElementById(elemId);
    elem.style.zIndex = '1';
}

// start of drag element code
// https://www.w3schools.com/howto/howto_js_draggable.asp

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0,
        windowWidth = 0,
        windowHeight = 0;
    if (document.getElementById(elmnt.id + "titlebar")) {
        /* if present, the titlebar is where you move the DIV from:*/
        document.getElementById(elmnt.id + "titlebar").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;

        // get width and height of the browser window
        windowWidth = window.innerWidth || root.clientWidth || body.clientWidth;
        windowHeight = window.innerHeight || root.clientHeight || body.clientHeight;
        // cursor goes off screen don't move program off screen
        if (pos3 >= windowWidth - 2) {
            if (debugLogging == true) {
                console.log('cursor too far right');
            }
            elmnt.style.left = (elmnt.offsetLeft - 25) + "px";
            closeDragElement();
        } else if (pos4 >= windowHeight - 25) {
            if (debugLogging == true) {
                console.log('cursor too far down');
            }
            elmnt.style.top = (elmnt.offsetTop - 25) + "px";
            closeDragElement();
        } else if (pos3 <= 2) {
            if (debugLogging == true) {
                console.log('cursor too far left');
            }
            elmnt.style.left = (elmnt.offsetLeft + 25) + "px";
            closeDragElement();
        } else if (pos4 <= 2) {
            if (debugLogging == true) {
                console.log('cursor too far up');
            }
            elmnt.style.top = (elmnt.offsetTop + 25) + "px";
            closeDragElement();
        } else {
            if (debugLogging == true) {
                console.log('cursor on screen here are the positions: ' + 'pos1: ' + pos1 + ' pos2: ' + pos2 + ' pos3: ' + pos3 + ' pos4: ' + pos4);
            }
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            pos3 = e.clientX;
            pos4 = e.clientY;
        }
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// end of drag element code

// start of drag to resize window
function resizeElem(elemToResize) {
    elemToResize.className = elemToResize.className + ' resizable';
    var resizer = document.createElement('div');
    resizer.className = 'resizer';
    elemToResize.appendChild(resizer);
    resizer.addEventListener('mousedown', initDrag, false);

    var startX, startY, startWidth, startHeight;

    function initDrag(e) {
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(elemToResize).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(elemToResize).height, 10);
        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);
    }

    function doDrag(e) {
        elemToResize.style.width = (startWidth + e.clientX - startX) + 'px';
        elemToResize.style.height = (startHeight + e.clientY - startY) + 'px';
        if (debugLogging == true) {
            console.log(startWidth, e, startX, elemToResize.style.width);
        }
    }

    function stopDrag(e) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
}

// end of drag to resize window