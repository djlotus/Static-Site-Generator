if (document.querySelector("[data-tab]").length != 0) {


   // - - - - - - - - - - - - - - - - - - - -
   // Set Variables 
   // - - - - - - - - - - - - - - - - - - - -

   var tabCollection =                 document.querySelectorAll("[data-tab]"), // create collection of tab elements
       panelCollection =               document.querySelectorAll("[data-panel]"), // create collection of panel elements

       tabs =                          [], // create empty array for tabs collection
       panels =						   []; // create empty array for panels collection


   // Convert collections to objects; need loop because IE8 does not support Array.prototype.slice.call :(
   for (var i = 0; i < tabCollection.length; i++) {
      tabs.push(tabCollection[i]);
   };
   for (var i = 0; i < panelCollection.length; i++) {
      panels.push(panelCollection[i]);
   };

   var controlMargin =                 panels[0].scrollHeight, // set initial offset so absolutely positioned panel does not overlap next relatively positioned element
       panelMargin =                   tabs[0].scrollHeight, // set initial offset so absolutely positioned panel does not overlap tabs elements
       
       totalTabs =                     tabs.length, // total number of tabs
       tabObjects =					   [], // create empty array for tab objects
   
       currentTab,                     // create variable for currently active tab
       nextTab,                        // create variable for current previous tab
       prevTab,                        // create variable for current next tab

       attrTab =                       "data-tab", //  set shorthand for tab attribute
       attrPanel =                     "data-panel", // set shorthand for panel attribute

       control =                       document.getElementById("tabs") || document.getElementById("accordions"); // get tabs container

   // Set initial margin on tabs
   if (control.className === "tabs") {
      control.style.marginBottom = (controlMargin + 10) + "px";
   };


   // Hide all but first panel initially. No JS will display all panels. :)
   for (var i = 1; i < panels.length; i++) {
      panels[i].setAttribute(attrPanel, "");
   };


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

         var thisTab = tabObjects[i]; // create variable for current tab object

         if (thisTab.tabNumber === 1) { // if the first tab
            thisTab.state = "active"; // set state to "active"
            currentTab = thisTab; // set initial value for variable "currentTab"
         };
         // apply states to elements		
         if (thisTab.state === "active") { // if state is active
            thisTab.current.setAttribute(attrTab, "active"); // set tab attribute to active
            thisTab.panelEl.setAttribute(attrPanel, "active"); // set panel attribute to active
            thisTab.icon = "minus"; // set icon status to expanded
         } else {
            thisTab.current.setAttribute(attrTab, ""); // set tab attribute to empty value
            thisTab.panelEl.setAttribute(attrPanel, ""); // set panel attribute to empty value
            thisTab.icon = "plus"; // set icon status to collapsed
         };
         setIcon(); // run function "setIcon" to update graphic for tab status
      };
   };

   // set previous elements
   function setPreviousSiblings(el, att, state) { 
      var siblings = []; // create empty array for sibling elements
      if (document.previousElementSibling) { // if broswer supports previousElementSibling
         while (el = el.previousElementSibling.nodeName == "LI") { // while current element has a previous element type "LI"
            siblings.push(el); // push current previous element to array
         };
      } else { // if sad browser :(
         while (el = el.previousSibling) { // while current element has a previous sibling (anytype)
            if (el.nodeType === 1 && el.nodeName == "LI") { // once that sibling is element type "LI"
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
         while (el = el.nextElementSibling.nodeName == "LI") { // while current element has a next element type "LI"
            siblings.push(el); // push current next element to array
         }; 
      } else { // if sad browser :(
         while (el = el.nextSibling) { // while current element has a next sibling
            if (el.nodeType === 1 && el.nodeName == "LI") { // if that sibling is element type "LI"
               siblings.push(el); // push current next element to array
            }
         }
      };

      for (var i = 0; i <= siblings.length - 1; i++) { // for each element in array "siblings"
         siblings[i].setAttribute(att, state); // set attribute to "passive"
      };
      //	console.log(siblings); // debug
      return siblings; //return updated array
   };

   // assign object based on value of "panelID"
   function showPanel(arr, value) {
      var controlMargin, // update variable for control margin 
          activePanelObject, // set variable for object
          activePanel; // set variable for panel
      for (var i = 0; i <= arr.length - 1; i++) { // for each object in array
         if (arr[i].panelID == value) { // if the value of "panelID" is equal to the value of value of the "aria-controls" attribute of the clicked button
            activePanelObject = arr[i]; // var activePanelObject is equal to the current object
            activePanel = activePanelObject.panelEl; // var activePanel is equal to the value of the current object's "panelEL" property
            activePanel.setAttribute(attrPanel, "active"); // set the value of the attribute to "active"
            activePanel.setAttribute("aria-hidden", "false"); // expose panel to AT
            if (control.className === "tabs") { // if the element is a "tabs" group
               controlMargin = activePanel.scrollHeight; // set teh control margin to the height of the active panel
            };
            //         console.log(controlMargin);
            control.style.marginBottom = (controlMargin + 10) + "px"; // set the bottom margin of the "tabs" or "accordion" element
         };
      };
   };

   // reset panel visibility
   function resetPanels() {
      for (var i = 0; i <= tabObjects.length - 1; i++) { // for each object in array
         tabObjects[i].panelEl.setAttribute(attrPanel, ""); // remove value from attribute - hide panels
         tabObjects[i].panelEl.setAttribute("aria-hidden", "true"); // hide panel from AT
      }
   };

   // set icons for accordions
   function setIcon() {
      for (var i = 0; i < tabCollection.length; i++) { // for each element in collection
         if (tabObjects[i].icon === "plus") { // if current tab object is collapsed
            tabCollection[i].setAttribute("class", "icon-plus"); // set class to show collapsed icon
         } else if (tabObjects[i].icon === "minus") { // if current tab object is expanded
            tabCollection[i].setAttribute("class", "icon-minus"); // set class to show expanded icon
         }
      }
   };


   // - - - - - - - - - - - - - - - - - - -
   // Create Tab Objects
   // - - - - - - - - - - - - - - - - - - - 

   for (var i = 0; i <= tabs.length - 1; i++) { // for each tab element
      var name = tabs[i].getAttribute("id"), // example: "tab1-title"
          state = null, // example: "active"
          panelID = tabs[i].getAttribute("aria-controls"), // example: "tab1a-panel"
          panelEl = document.getElementById(panelID), // assign associated panel by value of "panelID"
          panelHeight = panelEl.scrollHeight, // set scroll height of associated panel
          tabNumber = i + 1, // number of current tab
          element = tabs[i], // set element for tab
          previous = tabs[i - 1], // set previous tab element
          next = tabs[i + 1], // set next tab element
          icon = tabs[i].getAttribute("class"); // set current icon status

      // convert undefined value to null value when search for neighbors returns nothing
      if (previous === undefined) {
         previous = null;
      };
      if (next === undefined) {
         next = null;
      };
      addTabObjects(); // run function "addTabObject" to create objects
   };
   setTabState(); // run function "setTabState" to set appearance of tabs
   

   // - - - - - - - - - - - - - - - - - - - -
   // Add Event Handlers
   // - - - - - - - - - - - - - - - - - - - -
   
   var currentTab =                          document.querySelector('[data-tab="active"]'); // set currently active tab

   if (document.addEventListener) {
      // Mouse Functionality
      control.addEventListener("click", function(e) { // set event on "click" of control element
         var target = e.target || e.srcElement,
             tLi = target.nodeName == "LI";
         
         if (target && tLi) {
            // console.log("you have clicked on a tab");
            var currentPanel = target.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
            target.setAttribute(attrTab, "active"); // add value "active" to attribute
            target.setAttribute("aria-selected", "true"); // pass state to AT
            target.setAttribute("class", "icon-minus");  // set class to show expanded icon
            
            setPreviousSiblings(target, attrTab, ""); // set previous elements to "passive"
            setPreviousSiblings(target, "aria-selected", "false"); // pass state to AT
            setPreviousSiblings(target, "class", "icon-plus"); // set class to show collapsed icon
            
            setNextSiblings(target, attrTab, ""); // set next elements to ""
            setNextSiblings(target, "aria-selected", "false"); // pass state to AT
            setNextSiblings(target, "class", "icon-plus"); // set class to show collapsed icon
            // reset panels
            resetPanels();
            // show corresponding panels
            showPanel(tabObjects, currentPanel);
         }
      });
      // Keyboard Functionality
      control.addEventListener("keydown", function(e) {
         
         var target = e.target || e.srcElement;
             e.which = e.which || e.keycode;
         
         if (e.which === 39) {
            
            var currentPanel = currentTab.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
            
            var nextTab = currentTab.nextElementSibling.nextElementSibling;
            
            if (nextTab != null) {
               // control tab behavior
               currentTab.setAttribute(attrTab, ""); // add value "active" to attribute
               currentTab.setAttribute("aria-selected", "false") // expose state to AT
               currentTab.setAttribute("class", "icon-plus"); // set class to show collapsed icon

               nextTab.setAttribute(attrTab, "active"); // set next elements to ""
               nextTab.setAttribute("aria-selected", "true"); // expose state to AT
               nextTab.setAttribute("class", "icon-minus"); // set class to show expanded icon

               currentTab = nextTab; // update value of "currentTab" to match value of "nextTab"
               currentPanel = currentTab.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
               // reset panels
               resetPanels();
               // show corresponding panels
               showPanel(tabObjects, currentPanel);
            }
         };
         
         if (e.which === 37) {

            var currentPanel = currentTab.getAttribute("aria-controls"), // grab attribute value from current element and assign to "currentPanel"
                prevTab = currentTab.previousElementSibling.previousElementSibling;

            if (prevTab != null) {
               // control tab behavior
               currentTab.setAttribute(attrTab, ""); // add value "active" to attribute
               currentTab.setAttribute("aria-selected", "false") // expose state to AT
               currentTab.setAttribute("class", "icon-plus"); // set class to show collapsed icon

               prevTab.setAttribute(attrTab, "active"); // set next elements to ""
               prevTab.setAttribute("aria-selected", "true"); // expose state to AT
               prevTab.setAttribute("class", "icon-minus"); // set class to show expanded icon

               currentTab = prevTab; // update value of "currentTab" to match value of "nextTab"
               currentPanel = currentTab.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
               // reset panels
               resetPanels();
               // show corresponding panels
               showPanel(tabObjects, currentPanel);
            }
         };
         
      });
      
      // Mouse Functionality -- Sad Browsers :(
   } else if (document.attachEvent) {
      control.attachEvent("onclick", function(e) {
         var target = e.target || e.srcElement,
             tLi = target.nodeName == "LI";
         
         if (target && tLi) {
            // console.log("you have clicked on a tab");
            var currentPanel = target.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
            target.setAttribute(attrTab, "active"); // add value "active" to attribute
            target.setAttribute("aria-selected", "true"); // expose state to AT
            target.setAttribute("class", "icon-minus"); // set class to show expanded icon
            
            setPreviousSiblings(target, attrTab, "passive"); // set previous elements to "passive"
            setPreviousSiblings(target, "aria-selected", "false"); // expose state to AT
            setPreviousSiblings(target, "class", "icon-plus"); // set class to show collapsed icon
            
            setNextSiblings(target, attrTab, ""); // set next elements to ""
            setNextSiblings(target, "aria-selected", "false"); // expose state to AT
            setNextSiblings(target, "class", "icon-plus"); // set class to show collapsed icon
            // reset panels
            resetPanels();
            // show corresponding panels
            showPanel(tabObjects, currentPanel);
         }
      });
      
      // Keyboard Functionality -- Sad Browsers :(
      control.attachEvent("onkeydown", function(e) {
         var target = e.target || e.srcElement;
             e.which = e.which || e.keycode;
         
         if (e.which === 39) {

            var currentPanel = currentTab.getAttribute("aria-controls"), // grab attribute value from current element and assign to "currentPanel"
                nextTab = currentTab.nextElementSibling.nextElementSibling;

            if (nextTab != null) {
               // control tab behavior
               currentTab.setAttribute(attrTab, ""); // add value "active" to attribute
               currentTab.setAttribute("aria-selected", "false") // expose state to AT
               currentTab.setAttribute("class", "icon-plus"); // set class to show collapsed icon

               nextTab.setAttribute(attrTab, "active"); // set next elements to ""
               nextTab.setAttribute("aria-selected", "true"); // expose state to AT
               nextTab.setAttribute("class", "icon-minus"); // set class to show expanded icon

               currentTab = nextTab; // update value of "currentTab" to match value of "nextTab"
               currentPanel = currentTab.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
               // reset panels
               resetPanels();
               // show corresponding panels
               showPanel(tabObjects, currentPanel);
            }
         };

         if (e.which === 37) {

            var currentPanel = currentTab.getAttribute("aria-controls"), // grab attribute value from current element and assign to "currentPanel"
                prevTab = currentTab.previousElementSibling.previousElementSibling;

            if (prevTab != null) {
               // control tab behavior
               currentTab.setAttribute(attrTab, ""); // add value "active" to attribute
               currentTab.setAttribute("aria-selected", "false") // pass state to AT
               currentTab.setAttribute("class", "icon-plus");

               prevTab.setAttribute(attrTab, "active"); // set next elements to ""
               prevTab.setAttribute("aria-selected", "true"); // pass state to AT
               prevTab.setAttribute("class", "icon-minus");

               currentTab = prevTab; // update value of "currentTab" to match value of "nextTab"
               currentPanel = currentTab.getAttribute("aria-controls"); // grab attribute value from current element and assign to "currentPanel"
               // reset panels
               resetPanels();
               // show corresponding panels
               showPanel(tabObjects, currentPanel);
            }
         };
      });
   };

}