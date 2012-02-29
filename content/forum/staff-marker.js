"use strict";
/**
 * staff-marker.js
 * Foxtrick forum staff (HT, GM, Mod, CHPP, LA) marker
 * @author bummerland, ryanli
 */

Foxtrick.modules["StaffMarker"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : ["forumViewThread", "forumWritePost", "teamPage"],
	OPTIONS : ["own", "manager","HT-Youthclub"],
	OPTION_TEXTS : true,
	OPTION_TEXTS_DISABLED_LIST : [false, true, true],

	CSS : Foxtrick.InternalPath + "resources/css/staff-marker.css",

	// get Hattrick-youthclub staffs
	init : function() {
		var obj = {};
		// JSON files to be downloaded
		var uris = [
			"http://foxtrick.googlecode.com/svn/trunk/res/staff/foxtrick.json",
			"http://foxtrick.googlecode.com/svn/trunk/res/staff/chpp.json",
			"http://foxtrick.googlecode.com/svn/trunk/res/staff/editor.json",
		];
		if (FoxtrickPrefs.isModuleOptionEnabled("StaffMarker","HT-Youthclub")) 
			uris.push("http://www.hattrick-youthclub.org/_admin/foxtrick/team.json");

		// counter of URI remaining to fetch
		var todo = uris.length;
		Foxtrick.map(function(uri) {
			var parseMarkers = function(text) {
				try {
					var parsed = JSON.parse(text);
				}
				catch (e) {
					// JSON.parse failed
					Foxtrick.log("Cannot parse file from: ", uri);
				}
				if (parsed) {
					var key = parsed["type"];
					var list = parsed["list"];
					// add them!
					obj[key] = {};
					if(key == "chpp-holder")
						obj[key]["apps"] = {}
					Foxtrick.map(function(user) {
						obj[key][user.id] = true;
						if (key == "chpp-holder")
							obj[key]["apps"][user.id] = user.appNames
						
					}, list);
				}
				// all your data are belong to us
				if (--todo == 0) {
					Foxtrick.sessionSet('staff-marker-data', obj);
					Foxtrick.log("Staff marker data loaded.");
				}
			};
			Foxtrick.get(uri)("success", function(text) {
				parseMarkers(text);
				FoxtrickPrefs.setString("Markers."+uri, text);							
			})("failure", function(code) {
				Foxtrick.log("Failure loading file: " + uri, ". Using cached markers.");
				var text =  FoxtrickPrefs.getString("Markers."+uri);
				parseMarkers(text);
			});
		}, uris);
	},

	run : function(doc) {

		var data = Foxtrick.sessionGet('staff-marker-data');
		// getting user-defined IDs and colors
		var customMarker = {};
		if (FoxtrickPrefs.isModuleOptionEnabled("StaffMarker", "own")) {
			var customText = FoxtrickPrefs.getString("module.StaffMarker.own_text");
			try {
				customMarker = JSON.parse(customText);
			}
			catch (e) {
				Foxtrick.log("JSON parse error: ", customText);
			}
		}
		// tell whether user is staff by id or alias,
		// and attach class and/or user-defined style to object
		var modifier = function(id, alias, object) {
			// alias in select boxes might have a Left-to-Right
			// Overwrite (LRO, U+202D) in front
			var markers = [
				[/^\u202d?HT-/i, "ht"],
				[/^\u202d?GM-/i, "gm"],
				[/^\u202d?Mod-/i, "mod"],
				[/^\u202d?CHPP-/i, "chpp"],
				[/^\u202d?LA-/i, "la"]
			];
			// user-defined style
			if (customMarker[id] !== undefined)
				object.setAttribute("style", customMarker[id]);
			// exclusive classes for official staffs
			var first = Foxtrick.nth(0, function(pair) {
					return alias.search(pair[0]) == 0;
				}, markers);
			if (first) {
				Foxtrick.addClass(object, "ft-staff-" + first[1]);
			}

			// data loaded from external files
			for (var type in data) {
				if (data[type][id] == true){
					Foxtrick.addClass(object, "ft-staff-" + type);
					if (type == "chpp-holder"){
						var appNames = "";
						Foxtrick.map(function (appName){
							appNames = appNames + " \n● " + appName
						}, data[type]["apps"][id])
						object.setAttribute("title", object.getAttribute("title") + appNames)
					}
				}
			}
		};

		// mark staffs in thread
		var markThread = function() {
			var userDivs = doc.getElementById("mainWrapper").getElementsByClassName("float_left");
			Foxtrick.map(function(user) {
				var links = user.getElementsByTagName("a");
				Foxtrick.map(function(a) {
					if (!a.href) return; // eg our copy link
					if (a.getAttribute("href").search(/\/Club\/Manager\/\?userId\=/i) == -1
						|| a.getAttribute("href").search(/redir_to_league=true/i) != -1)
						return;
					var uname = Foxtrick.trim(a.title);
					// Work-around for supporter star
					if (uname.lastIndexOf("*") == uname.length-1)
						uname = uname.substring(0,uname.length-1);
					var uid = a.href.replace(/.+userId=/i, "").match(/^\d+/);

					modifier(uid, uname, a);
				}, links);
			}, userDivs);
		};
		// mark staffs in select box
		var markSelect = function() {
			var selects = doc.getElementById("mainWrapper").getElementsByClassName("threadPagingFilter");
			Foxtrick.map(function(select) {
				if (select.id.search(/filter/i) == -1
					&& select.id.search(/recipient/i) == -1)
					return;

				var css = '';
				var i = 1;
				var user_hasClass = {};
				var option;
				while (option = select.options[i++]) {
					var uname = Foxtrick.trim(option.textContent);
					uname = uname.substring(0, uname.indexOf(" "));
					if (uname == "")
						uname = Foxtrick.trim(option.textContent);
					if (uname == "")
						break;
					var uid = option.value.replace(/by_|to_/gi, "");

					modifier(uid, uname, option); // no background image in chrome for select. background-colors only

					if (option.value==-3) {
						Foxtrick.addClass(option, "ft-staff-seperator");
					}
					else if (option.value=="by_-1") {
						Foxtrick.addClass(option, "ft-staff-official");
					}
				}
			}, selects);
		};

		if (Foxtrick.isPage("forumViewThread", doc)) {
			markThread(doc, modifier);
			markSelect(doc, modifier);
		}
		else if (Foxtrick.isPage("forumWritePost", doc)) {
			markSelect(doc, modifier);
		}
		else if (Foxtrick.isPage("teamPage", doc)) {
			if (FoxtrickPrefs.isModuleOptionEnabled("StaffMarker", "manager")) {
				markThread(doc, modifier);
			}
		}
	}
};
