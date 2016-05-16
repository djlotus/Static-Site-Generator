// - - - - - - - - - - - - - - - - - - - -
// Set Variables
// - - - - - - - - - - - - - - - - - - - -

var tabCollection =                 document.querySelectorAll("[data-tab]"), // create collection of tab elements
    panelCollection =               document.querySelectorAll("[data-panel]"), // create collection of panel elements

    tabs =							[], // create empty array for tabs collection
    panels =						[]; // create empty array for panels collection


// Convert collections to objects; need loop because IE8 does not support Array.prototype.slice.call :(
for (i = 0; i < tabCollection.length; i++) {
   tabs.push(tabCollection[i]);
}
for (i = 0; i < panelCollection.length; i++) {
   panels.push(panelCollection[i]);
}

var controlMargin =                 panels[0].scrollHeight,
    panelMargin =                   tabs[0].scrollHeight;

var totalTabs =						tabs.length, // total number of tabs
    tabObjects =					[]; // create empty array for tab objects

var attrTab =						"data-tab", //  set shorthand for tab attribute
    attrPanel =						"data-panel"; // set shorthand for panel attribute

var control =                       document.getElementById("tabs"); // get tabs container

// Set initial margin on tabs
control.style.marginBottom = controlMargin + "px";


// Hide all but first panel initially. No JS will display all panels. :)
for (var i = 1; i < panels.length; i++) {
   panels[i].setAttribute(attrPanel, "");
}


// - - - - - - - - - - - - - - - - - - - -
// Functions
// - - - - - - - - - - - - - - - - - - - -

// Add tab objects to array
function addTabObjects() {
   tabObjects.push ({
      name: name,
      state: state,
      panelID: panelID,
      panelEl: panelEl,
      panelHeight: panelHeight,
      tabNumber: tabNumber,
      current: element,
      previous: previous,
      next: next,
      icon: icon
   });
};

// Set initial state of tabs
function setTabState() {
   for (var i = 0; i <= tabObjects.length - 1; i++) { // for each tab

      var thisTab = tabObjects[i];

      if (thisTab.tabNumber === 1) { // if the first tab
         thisTab.state = "active"; // set state to "active"
      };
      // apply states to elements		
      if (thisTab.state === "active") { // if state is active
         thisTab.current.setAttribute(attrTab, "active"); // set attribute to active
         thisTab.panelEl.setAttribute(attrPanel, "active");
         thisTab.icon = "minus";
      } else {
         thisTab.current.setAttribute(attrTab, ""); // set attribute to active
         thisTab.panelEl.setAttribute(attrPanel, "");
         thisTab.icon = "plus";
      };
      setIcon();
   };
};

// set previous elements
function setPreviousSiblings(el, att, state) { 
   var siblings = []; // create empty array for sibling elements
   if (document.previousElementSibling) { // if broswer supports previousElementSibling
      while (el = el.previousElementSibling.nodeName == "LI") { // while current element has a previous element
         siblings.push(el); // push current previous element to array
      };
   } else { // if sad browser :(
      while (el = el.previousSibling) { // while current element has a previous sibling (anytype)
         if (el.nodeType === 1 && el.nodeName == "LI") { // once that sibling is element type
            siblings.push(el); // push current previous element to array
         }
      }
   };

   for (var i = 0; i <= siblings.length - 1; i++) { // for each element in array
      siblings[i].setAttribute(att, state); // set attribute to "passive"
   };
   return siblings; //return updated array
};

// set next elements
function setNextSiblings(el, att, state) { 
   var siblings = []; // create empty array for sibling elements
   if (document.nextElementSibling) {
      while (el = el.nextElementSibling.nodeName == "LI") { // while current element has a previous element
         siblings.push(el); // push current previous element to array
      }; 
   } else { // if sad browser :(
      while (el = el.nextSibling) { // while current element has a next sibling
         if (el.nodeType === 1 && el.nodeName == "LI") { // if that sibling is element type
            siblings.push(el); // push current next element to array
         }
      }
   };

   for (var i = 0; i <= siblings.length - 1; i++) { // for each element in array
      siblings[i].setAttribute(att, state); // set attribute to "passive"
   };
   //	console.log(siblings); // debug
   return siblings; //return updated array
};

// assign object based on value of "panelID"
function showPanel(arr, value) {
   var controlMargin,
       activePanelObject, // set variable for object
       activePanel; // set variable for panel
   for (var i = 0; i <= arr.length - 1; i++) { // for each object in array
      if (arr[i].panelID == value) { // if the value of "panelID" is equal to the value of value of the "aria-controls" attribute of the clicked button
         activePanelObject = arr[i]; // var activePanelObject is equal to the current object
         activePanel = activePanelObject.panelEl; // var activePanel is equal to the value of the current object's "panelEL" property
         activePanel.setAttribute(attrPanel, "active"); // set the value of the attribute to "active"
         activePanel.setAttribute("aria-hidden", "false"); // expose panel to AT
         controlMargin = activePanel.scrollHeight;
//         console.log(controlMargin);
         control.style.marginBottom = controlMargin + "px";
      };
   };
};

// reset panel visibility
function resetPanels() {
   for (var i = 0; i <= tabObjects.length - 1; i++) {
      tabObjects[i].panelEl.setAttribute(attrPanel, ""); // remove value from attribute - hide panels
      tabObjects[i].panelEl.setAttribute("aria-hidden", "true"); // hide panel from AT
   }
};

function setIcon() {
   for (var i = 0; i < tabCollection.length; i++) {
      if (tabObjects[i].icon === "plus") {
         tabCollection[i].setAttribute("class", "icon-plus");
      } else if (tabObjects[i].icon === "minus") {
         tabCollection[i].setAttribute("class", "icon-minus");
      }
   }
}

// - - - - - - - - - - - - - - - - - - -
// Create Tab Objects
// - - - - - - - - - - - - - - - - - - - 

for (var i = 0; i <= tabs.length - 1; i++) { // for each tab element
   var name = tabs[i].getAttribute("id"), // example: "tab1-title"
       state = null, // example: "active"
       panelID = tabs[i].getAttribute("aria-controls"), // example: "tab1a-panel"
       panelEl = document.getElementById(panelID),
       panelHeight = panelEl.scrollHeight,
       tabNumber = i + 1, // number of current tab
       element = tabs[i],
       previous = tabs[i - 1], // set previous tab
       next = tabs[i + 1];
       icon = tabs[i].getAttribute("class");

   // convert undefined value to null value when search for neighbors returns nothing
   if (previous === undefined) {
      previous = null;
   };
   if (next === undefined) {
      next = null;
   };
   addTabObjects(); // run function to create object
};
setTabState();


// - - - - - - - - - - - - - - - - - - - -
// Add Event Handlers
// - - - - - - - - - - - - - - - - - - - -

if (document.addEventListener) {
   control.addEventListener("click", function(e) {
      var target = e.target || e.srcElement;
      var tLi = target.nodeName == "LI";
      if (target && tLi) {
         // console.log("you have clicked on a tab");
         var currentPanel = target.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
         target.setAttribute(attrTab, "active"); // add value "active" to attribute
         target.setAttribute("aria-selected", "true"); // pass state to AT
         target.setAttribute("class", "icon-minus");
         setPreviousSiblings(target, attrTab, "passive"); // set previous elements to "passive"
         setPreviousSiblings(target, "aria-selected", "false"); // pass state to AT
         setPreviousSiblings(target, "class", "icon-plus"); 
         setNextSiblings(target, attrTab, ""); // set next elements to ""
         setNextSiblings(target, "aria-selected", "false"); // pass state to AT
         setNextSiblings(target, "class", "icon-plus");
//         setIcon();
         // reset panels
         resetPanels();
         // show corresponding panels
         showPanel(tabObjects, currentPanel);
      }
   });
   control.addEventListener("keydown", function(e) {
      var target = e.target || e.srcElement;
      e.which = e.which || e.keycode;
      if (e.which === 13 || e.which === 32) {
         var currentPanel = e.target.getAttribute("aria-controls");
         // control tab behavior
         target.setAttribute(attrTab, "active"); // add value "active" to attribute
         target.setAttribute("aria-selected", "true") // pass state to AT
         target.setAttribute("class", "icon-minus");
         setPreviousSiblings(target, attrTab, "passive"); // set previous elements to "passive"
         setPreviousSiblings(target, "aria-selected", "false"); // pass state to AT
         setPreviousSiblings(target, "class", "icon-plus"); 
         setNextSiblings(target, attrTab, ""); // set next elements to ""
         setNextSiblings(target, "aria-selected", "false"); // pass state to AT
         setNextSiblings(target, "class", "icon-plus");
//         setIcon();
         // reset panels
         resetPanels();
         // show corresponding panels
         showPanel(tabObjects, currentPanel);
      };
   });
} else if (document.attachEvent) {
   control.attachEvent("onclick", function(e) {
      var target = e.target || e.srcElement;

      var tLi = target.nodeName == "LI";
      if (target && tLi) {
         // console.log("you have clicked on a tab");
         var currentPanel = target.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
         target.setAttribute(attrTab, "active"); // add value "active" to attribute
         target.setAttribute("aria-selected", "true");
         target.setAttribute("class", "icon-minus");
         setPreviousSiblings(target, attrTab, "passive"); // set previous elements to "passive"
         setPreviousSiblings(target, "aria-selected", "false");
         setPreviousSiblings(target, "class", "icon-plus");
         setNextSiblings(target, attrTab, ""); // set next elements to ""
         setNextSiblings(target, "aria-selected", "false");
         setNextSiblings(target, "class", "icon-plus");
//         setIcon();
         // reset panels
         resetPanels();
         // show corresponding panels
         showPanel(tabObjects, currentPanel);
      }
   });
   control.attachEvent("onkeydown", function(e) {
      var target = e.target || e.srcElement;

      e.which = e.which || e.keycode;
      if (e.which === 13 || e.which === 32) {
         var currentPanel = target.parentElement.getAttribute("aria-controls");
         // control tab behavior
         target.parentElement.setAttribute(attrTab, "active"); // add value "active" to attribute
         target.parentElement.setAttribute("aria-selected", "true");
         target.setAttribute("class", "icon-minus");
         setPreviousSiblings(target.parentElement, attrTab, "passive"); // set previous elements to "passive"
         setPreviousSiblings(target.parentElement, "aria-selected", "false");
         setPreviousSiblings(target, "class", "icon-plus");
         setNextSiblings(target.parentElement, attrTab, ""); // set next elements to ""
         setNextSiblings(target.parentElement, "aria-selected", "false");
         setNextSiblings(target, "class", "icon-plus");
//         setIcon();
         // reset panels
         resetPanels();
         // show corresponding panels
         showPanel(tabObjects, currentPanel);
      };
   });
}