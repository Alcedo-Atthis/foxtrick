/*
 * notify.js
 * Utilities for creating a notification
 */

if (!Foxtrick) var Foxtrick = {};
if (!Foxtrick.util) Foxtrick.util = {};
Foxtrick.util.notify = {};

// show a notification containin given message and link if possible
// @param msg - message to be shown
// @param url - URL of event if applicable
Foxtrick.util.notify.create = function(msg, url) {
	var createGecko = function() {
		var img = Foxtrick.ResourcePath + "resources/img/hattrick-logo.png";
		var title = "Hattrick.org";
		var clickable = true;
		var listener = {
			observe: function(subject, topic, data) {
				try {
					if (topic == "alertclickcallback") {
						//Foxtrick.newTab(url);
						if (typeof(firefox)==='object')
							Foxtrick.openAndReuseOneTabPerURL(url, true);
						else {
							sandboxed.extension.sendRequest({
								req : "reuseTab",
								url : url
							})
						}
					}
					if (topic == "alertfinished") {
						// empty
					}
				}
				catch (e) {
					Foxtrick.log(e);
				}
			}
		};

		try {
			var alertWin = Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
			alertWin.showAlertNotification(img, title, msg, clickable, url, listener);
		}
		catch (e) {
			// fix for when alerts-service is not available (e.g. SUSE)
			var alertWin = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
				.getService(Components.interfaces.nsIWindowWatcher)
				.openWindow(null, "chrome://global/content/alerts/alert.xul",
					"_blank", "chrome,titlebar=no,popup=yes", null);
			alertWin.arguments = [img, "www.hattrick.org", msg, clickable, url, 0, listener];
		}
	};
	var createChrome = function() {
		sandboxed.extension.sendRequest({req : "notify", msg : msg, url : url});
	};

	var createSafariGrowl = function() {
		showGrowlNotification = function (msg) {
		  try {
			if ( window.GrowlSafariBridge.notifyWithOptions !== undefined) {
				 window.GrowlSafariBridge.notifyWithOptions(msg.name, msg.status, {
					isSticky: false,
					priority: -1,
					imageUrl: msg.img_url
				});
			}
		  } catch(e) {Foxtrick.log(e);}
		};

		var img = Foxtrick.ResourcePath + "resources/img/hattrick-logo.png";
		showGrowlNotification({ name: "www.hattrick.org", status: msg, img_url: img });
	};


	if (Foxtrick.BuildFor == "Gecko") {
		createGecko();
	}
	else if (typeof(chrome)=='object') {
		createChrome();
	}
	else if (typeof(safari)=='object') {
		createSafariGrowl();
	}
};
