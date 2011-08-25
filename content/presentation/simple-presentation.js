/**
 * Presentation Fixes
 * @author spambot, ljushaff
 */

var FoxtrickSimplePresentation = {
	MODULE_NAME : "SimplePresentation",
	MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : ["all"],

	OPTIONS : [
		"League_Table",
		"Guestbook",
		"liveHighlightRed",
		"Highlight_Staff_On_All_Pages",
		"HideAchievementsIcons",
		"NoLogo"
	],
	OPTIONS_CSS : [
		Foxtrick.InternalPath+"resources/css/fixes/League_Table.css",
		Foxtrick.InternalPath+"resources/css/fixes/Guestbook.css",
		Foxtrick.InternalPath+"resources/css/fixes/liveHighlightRed.css",
		Foxtrick.InternalPath+"resources/css/fixes/staffmarker.css",
		Foxtrick.InternalPath+"resources/css/fixes/achievement_hideicons.css",
		Foxtrick.InternalPath+"resources/css/fixes/NoLogo.css"
	]
};
Foxtrick.util.module.register(FoxtrickSimplePresentation);
