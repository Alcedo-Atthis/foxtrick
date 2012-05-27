"use strict";
/**
 * links-players.js
 * Foxtrick add links to fans pages
 * @author convinced
 */

Foxtrick.modules["LinksFans"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	PAGES : new Array('fans'),
	OPTION_FUNC : function(doc) {
		return Foxtrick.modules["Links"].getOptionsHtml(doc, "LinksFans", "fanlink");
	},

	run : function(doc) {
		var module = this;
		Foxtrick.modules.Links.getCollection(function(collection){
			module._run(doc);
		});
	},
	
	_run : function(doc) {
		var ownBoxBody = null;
		var mainWrapper = doc.getElementsByClassName("main")[0];

		var teamid = Foxtrick.util.id.findTeamId(mainWrapper);
		var teamname = Foxtrick.util.id.extractTeamName(mainWrapper);
		var fanmood='';
		var fans = mainWrapper.getElementsByTagName('td')[1].textContent.match(/\d+/);

		var links = mainWrapper.getElementsByTagName('a');
		var i=0,link;
		while (link=links[i++]) {
			if (link.href.search(/FanMood/i)!=-1) {
				fanmood += link.href.match(/ll=(\d+)/)[1];
				break;
			}
		}

		var links = Foxtrick.modules["Links"].getLinks("fanlink", { "teamid": teamid, "teamname": teamname, "fanmood" : fanmood }, doc, this);
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
		Foxtrick.util.links.add(doc,ownBoxBody,this.MODULE_NAME ,{ "teamid": teamid, "teamname": teamname,
																		"fans":fans, "fanmood" : fanmood });
	}
};
