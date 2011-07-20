/**
 * youth-skill-hide-unknown.js
 * Hide unknown skills and/or "maximum" word on youth players page
 * @author convincedd
 */
////////////////////////////////////////////////////////////////////////////////
var FoxtrickYouthSkillHideUnknown = {
	MODULE_NAME : "YouthSkillHideUnknown",
	MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : ["YouthPlayers"],
	OPTIONS: ["HideUnknown", "HideMaximalKeyWord"],

	run : function(doc) {
		// checks whether a table cell (<td> element) is unknown
		var isUnknown = function(cell) {
			return cell.getElementsByClassName("youthSkillBar").length == 0
				&& cell.getElementsByClassName("highlight").length == 0;
		};

		// only for own team
		var ownTeamId = Foxtrick.Pages.All.getOwnTeamId(doc);
		var teamId = Foxtrick.Pages.All.getTeamId(doc);
		if (ownTeamId != teamId)
			return;

		var playerInfos = doc.getElementsByClassName("playerInfo");
		for (var i = 0; i < playerInfos.length; i++) {
			var playerInfo = playerInfos[i];
			var trs = playerInfo.getElementsByTagName("table")[0].getElementsByTagName("tr");
			for (var j = 0; j < trs.length; j++) {
				var tds = trs[j].getElementsByTagName("td");
				if (FoxtrickPrefs.isModuleOptionEnabled(this, "HideUnknown")) {
					if (isUnknown(tds[1]))
						Foxtrick.addClass(trs[j], "hidden");
				}
				if (FoxtrickPrefs.isModuleOptionEnabled(this, "HideMaximalKeyWord")) {
					var skillBars = doc.getElementsByClassName("youthSkillBar");
					Foxtrick.map(skillBars, function(skillBar) {
						var textNodes = Foxtrick.filter(skillBar.childNodes, function(n) {
							return n.nodeType == Node.TEXT_NODE;
						});
						for (var i = 0; i < textNodes.length; ++i)
							textNodes[i].textContent = (i == 1) ? " / " : " ";
					});
				}
			}
		}
	}
}
