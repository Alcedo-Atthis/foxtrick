"use strict";
/**
 * layout.js
 * Utilities for Hattrick layout
 * @author unknown (NOTE - fill in yourself!)
 */

if (!Foxtrick)
	var Foxtrick = {};
if (!Foxtrick.util)
	Foxtrick.util = {};
Foxtrick.util.layout = {};

// Returns whether the HTML document uses standard theme
Foxtrick.util.layout.isStandard = function(doc) {
	var head = doc.getElementsByTagName("head")[0];
	if (!head)
		throw "Not a valid document";
	var links = head.getElementsByTagName("link");
	if (links.length!=0){
		var i=0,link;
		while (link=links[i++])
			if (link.href.search(/\/App_Themes\/Simple/i)!=-1)
				return false;
	}
	else { // mobile internet may have style embedded
		var styles = head.getElementsByTagName("style");
		var i=0,style;
		while (style=styles[i++])
			if (style.textContent.search(/\/App_Themes\/Simple/i)!=-1)
				return false;
	}
	return true;
};

// Returns whether the HTML document uses right-to-left language
Foxtrick.util.layout.isRtl = function(doc) {
	var head = doc.getElementsByTagName("head")[0];
	if (!head)
		throw "Not a valid document";
	var links = head.getElementsByTagName("link");
	if (links.length!=0) {
		var i=0,link;
		while (link=links[i++])
			if (link.href.search("_rtl.css") != -1)
				return true;
	}
	else {
		// mobile internet may have style embedded
		var styles = head.getElementsByTagName("style");
		var i=0,style;
		while (style=styles[i++])
			if (style.textContent.search(/direction:rtl/i)!=-1)
				return true;
	}
	return false;
};

// Returns whether the user logged in is supporter
Foxtrick.util.layout.isSupporter = function(doc) {
	return (doc.getElementsByClassName("hattrickNoSupporter").length === 0);
};

// Returns whether scrolling is on for #mainBody
Foxtrick.util.layout.mainBodyHasScroll = function (doc) {
	var mainBodyChildren = doc.getElementById('mainBody').getElementsByTagName('script');
	var i = 0, child;
	while (child = mainBodyChildren[i++])
		if (child.innerHTML && child.innerHTML.search(/adjustHeight\(\'mainBody\'/) != -1)
			return true;
	return false;
};
