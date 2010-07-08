/*
 * youthPromotes.js
 * Shows days to promote a youth player
 * @Author: smates, ryanli
 */

var FoxtrickYouthPromotes = {
	MODULE_NAME : "YouthPromotes",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : new Array('YouthPlayer'),
	DEFAULT_ENABLED : true,
	NEW_AFTER_VERSION: "0.5.0.5",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,
	LATEST_CHANGE: "Now working on all locales",

	run : function( page, doc ) {
		try {
			var daysToPromote = Foxtrick.Pages.YouthPlayer.getDaysToPromote(doc);
			if (!isNaN(daysToPromote)) {
				var message = "";
				if (daysToPromote > 0) { // you have to wait to promote
					message = Foxtrickl10n.getString("foxtrick.youthpromotedays.prom_d") + " " +
						daysToPromote + " " + Foxtrickl10n.getString("foxtrick.youthpromotedays.days");
				}
				else { // can be promoted already
					message = Foxtrickl10n.getString("foxtrick.youthpromotedays.prom_t");
				}

				var birthdayCell;
				var allDivs = doc.getElementsByTagName("div");
				for (var i = 0; i < allDivs.length; i++) {
					if (allDivs[i].className == "byline") {
						birthdayCell = allDivs[i];
					}
				}
				var promotionCell = doc.createElement("p");
				promotionCell.appendChild(doc.createTextNode(message));
				birthdayCell.appendChild(promotionCell);
			}
		}
		catch (e) {
			Foxtrick.dump("YouthPromotes: " + e + "\n");
		}
	}
};
