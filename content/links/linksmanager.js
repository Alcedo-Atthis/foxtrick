/**
 * linksmanager.js
 * Foxtrick add links to manager pages
 * @author convinced
 */

////////////////////////////////////////////////////////////////////////////////
var FoxtrickLinksManager = {
	
    MODULE_NAME : "LinksManager",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	PAGES : new Array('managerPage'), 
	DEFAULT_ENABLED : false,
	OPTIONS : {}, 

    init : function() {
			Foxtrick.initOptionsLinks(this,"managerlink");
    },

    run : function( page, doc ) { 

		//addExternalLinksToManagerPage		
		var ownBoxBody = null;
		var mainBody = doc.getElementById('mainBody');
  		
		var teamid = FoxtrickHelper.findTeamId(mainBody);
		var teamname = FoxtrickHelper.extractTeamName(mainBody);
		var userid = FoxtrickHelper.findUserId(mainBody);		
		var leaguename = FoxtrickHelper.extractLeagueName(mainBody);
		var leagueid = FoxtrickHelper.findLeagueLeveUnitId(mainBody);;
   		var owncountryid = FoxtrickHelper.ownTeam.ownCountryId;

		var h1 = mainBody.getElementsByTagName('h1')[0];
		var username = h1.innerHTML.replace(/<.+>/g,'').replace(/^\s+/,'').replace(/\s+$/,'').replace(/\(.+/,'').replace(/\s+$/g, '');
	
		var links = Foxtrick.LinkCollection.getLinks("managerlink", { "teamid": teamid, "teamname": teamname, "userid" : userid,  "username" : username,
												"leagueid" : leagueid ,"owncountryid":owncountryid  }, doc, this);  
		if (links.length > 0){
			ownBoxBody = doc.createElement("div");
			var header = Foxtrickl10n.getString(
						"foxtrick.links.boxheader" );
			var ownBoxId = "foxtrick_links_box";
			var ownBoxBodyId = "foxtrick_links_content";
			ownBoxBody.setAttribute( "id", ownBoxBodyId );
                                
			for (var k = 0; k < links.length; k++) {
				links[k].link.className ="inner";
				ownBoxBody.appendChild(doc.createTextNode(" "));
				ownBoxBody.appendChild(links[k].link);
			}
						
			Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "first", "");
			}
		FoxtrickLinksCustom.add( page, doc,ownBoxBody,this.MODULE_NAME ,{ "teamid": teamid, "teamname": teamname, "userid" : userid,  "username" : username,
												"leagueid" : leagueid ,"owncountryid":owncountryid  });	        
	},
	
	change : function( page, doc ) {
		var header = Foxtrickl10n.getString("foxtrick.links.boxheader" );
		var ownBoxId = "foxtrick_links_content";
		if( !doc.getElementById ( ownBoxId ) ) {
			this.run( page, doc );
		}
	}, 
};