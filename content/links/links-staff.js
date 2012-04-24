"use strict";
/**
 * links-staff.js
 * Foxtrick add links to manager pages
 * @author convinced
 */

Foxtrick.modules["LinksStaff"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	PAGES : new Array('staff'),
	OPTION_FUNC : function(doc) {
		return Foxtrick.modules["Links"].getOptionsHtml(doc, "LinksStaff", "stafflink");
	},

	run : function(doc) {
		var ownBoxBody = null;
		var mainBody = doc.getElementsByClassName("main")[0];

		var teamid = Foxtrick.util.id.findTeamId(mainBody);
		var teamname = Foxtrick.util.id.extractTeamName(mainBody);

		var links = Foxtrick.modules["Links"].getLinks("stafflink", { "teamid": teamid, "teamname": teamname}, doc, this);
		if (links.length > 0){
			ownBoxBody = Foxtrick.createFeaturedElement(doc, this, "div");
			var header = Foxtrickl10n.getString(
						"links.boxheader" );
			var ownBoxBodyId = "foxtrick_links_content";
			ownBoxBody.setAttribute( "id", ownBoxBodyId );

			for (var k = 0; k < links.length; k++) {
				links[k].link.className ="inner";
				ownBoxBody.appendChild(links[k].link);
			}

			var box = Foxtrick.addBoxToSidebar(doc, header, ownBoxBody, -20);
			box.id = "ft-links-box";
		}
		Foxtrick.util.links.add(doc,ownBoxBody,this.MODULE_NAME ,{ "teamid": teamid, "teamname": teamname});
	}
};
