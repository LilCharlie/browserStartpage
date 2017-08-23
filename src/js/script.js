// TODO: use data-target instead of elementIndex

// is the DOM ready for manipulation?
document.addEventListener('DOMContentLoaded', function() {

	// add JS to body-tag to allow CSS-Manipulation if JS is available
	document.getElementsByTagName("body")[0].className += "js";

	// initially set Element-count of tabs and tabbedContent and check consistency
	var tabTrigger = document.getElementsByClassName("tab");
	var tabbedContent = document.getElementsByClassName("tabbed-content");
	if(tabTrigger.length !== tabbedContent.length) {
		console.log("count of tabs and tabbed-contend isn't consistent");
	}

	// Tab-Handling-Function
	// -- set Current-Tab and tabbed-content
	var setCurrentTab = function(newTabId) {
		markTabTrigger = document.getElementsByClassName("tab")[newTabId].classList.add("active");
		unhideSelectedContent = document.getElementsByClassName("tabbed-content")[newTabId].classList.add("active");
		localStorage.setItem("tabbedContentId", newTabId);
		console.log("localStorage ID is: " + newTabId);
	}

	// -- unset Current-Tab and tabbed-conent
	var unsetTabs = function() {
		for(i=0; i < tabbedContent.length; i++) {
			tabTrigger[i].classList.remove("active");
			tabbedContent[i].classList.remove("active");
		}
	}

	// -- if DOM is ready, check if localStorage is filled and stored Id is still available
	var savedLocalStorageId = localStorage.getItem("tabbedContentId");
	if(savedLocalStorageId !== null && tabTrigger.length >= savedLocalStorageId) {
		setCurrentTab(savedLocalStorageId);
	} else {
		console.log("localStorage is empty or stored Id is no longer present - setting default");
		setCurrentTab(0);
	}

	// -- switch tabs onClick
	for(i=0; i < tabTrigger.length; i++) {
		(function(index){
			tabTrigger[i].onclick = function(){
				unsetTabs();
				setCurrentTab(index);
				return false;
			}
		})(i);
	}
});
