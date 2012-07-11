"use strict";
/**
 * linksClubTransfers.js
 * Foxtrick add links to arena pages
 * @author convincedd
 */

Foxtrick.modules["LinksClubTransfers"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	PAGES : new Array('transfer'),
	OPTION_FUNC : function(doc, callback) {
		return Foxtrick.modules["Links"].getOptionsHtml(doc, "LinksClubTransfers", "clubtransferslink", callback);
	},

	run : function(doc) {
		var module = this;
		Foxtrick.modules.Links.getCollection(function(collection){
			module._run(doc);
		});
	},
	
	_run : function(doc) {
		var main = doc.getElementsByClassName("main")[0]; 
		var ownBoxBody=null;
		var thisdiv = main.getElementsByTagName("div")[0];
		
		var links = Foxtrick.modules["Links"].getLinks("clubtransferslink", {}, doc, this );
		if (links.length > 0) {
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
		Foxtrick.util.links.add(doc,ownBoxBody,this.MODULE_NAME,{} );
	}
};
