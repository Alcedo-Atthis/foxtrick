/**
 * originalFace.js
 * Show player's original face
 * @author smates
 */

var FoxtrickOriginalFace = {
	MODULE_NAME : "OriginalFace",
	MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : ["playerdetail", "players", "YouthPlayer", "YouthPlayers"],
	DEFAULT_ENABLED : false,
	OPTIONS : ["HideTransfer", "HideInjury", "HideSuspended", "ColouredYouth"],
	OPTIONS_CSS : [
		Foxtrick.ResourcePath + "resources/css/HideFaceTransferImages.css",
		Foxtrick.ResourcePath + "resources/css/HideFaceInjuryImages.css",
		Foxtrick.ResourcePath + "resources/css/HideFaceSuspendedImages.css",
		null
	],
	NEW_AFTER_VERSION : "0.5.0.5",
	LATEST_CHANGE : "Merged four modules to OriginalFace as options.",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,

	run : function(page, doc) {
		if (Foxtrick.isModuleFeatureEnabled(FoxtrickSkillTable, "ColouredYouth")) {
			if (Foxtrick.isPage(Foxtrick.ht_pages["YouthPlayer"], doc)
				|| Foxtrick.isPage(Foxtrick.ht_pages["YouthPlayers"], doc)) {
				var imgs = doc.getElementsByTagName("img");
				for (var i=0; i < imgs.length; i++) {
					if (imgs[i].src.match(/\/Img\/Avatar/i)) {
						imgs[i].src = imgs[i].src.replace(/y_/, "");
					}
				}
			}
		}
	},

};
