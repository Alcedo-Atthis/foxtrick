/**
 * linksstaff.js
 * Foxtrick add links to manager pages
 * @author convinced
 */

////////////////////////////////////////////////////////////////////////////////
var FoxtrickLinksStaff = {
	
    MODULE_NAME : "LinksStaff",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	DEFAULT_ENABLED : false,
	OPTIONS : {}, 

    init : function() {
            Foxtrick.registerPageHandler( 'staff',
                                          FoxtrickLinksStaff );
			Foxtrick.initOptionsLinks(this,"stafflink");
    },

    run : function( page, doc ) { 

		//addExternalLinksToManagerPage		
		var ownBoxBody = null;
		var mainBody = doc.getElementById('mainWrapper');
  		
		var teamid = FoxtrickHelper.findTeamId(mainBody);
		var teamname = FoxtrickHelper.extractTeamName(mainBody);
		
		var links = Foxtrick.LinkCollection.getLinks("stafflink", { "teamid": teamid, "teamname": teamname}, doc, this);  
		if (links.length > 0){
			ownBoxBody = doc.createElement("div");
			var header = Foxtrickl10n.getString(
						"foxtrick.links.boxheader" );
			var ownBoxId = "foxtrick_" + header + "_box";
			var ownBoxBodyId = "foxtrick_" + header + "_content";
			ownBoxBody.setAttribute( "id", ownBoxBodyId );
                                
			for (var k = 0; k < links.length; k++) {
				links[k].link.className ="inner";
				ownBoxBody.appendChild(doc.createTextNode(" "));
				ownBoxBody.appendChild(links[k].link);
			}
						
			Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "first", "");
			}
		FoxtrickLinksCustom.add( page, doc,ownBoxBody,this.MODULE_NAME ,{ "teamid": teamid, "teamname": teamname});	        
	},
	
	change : function( page, doc ) {
		var header = Foxtrickl10n.getString("foxtrick.links.boxheader" );
		var ownBoxId = "foxtrick_" + header + "_content";
		if( !doc.getElementById ( ownBoxId ) ) {
			this.run( page, doc );
		}
	}, 
};