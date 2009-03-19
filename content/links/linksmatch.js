/**
 * linksmatch.js
 * Foxtrick add links to played matches pages
 * @author convinced
 */

////////////////////////////////////////////////////////////////////////////////
var FoxtrickLinksMatch = {
	
    MODULE_NAME : "LinksMatch",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	DEFAULT_ENABLED : true,
	OPTIONS : {}, 

    init : function() {
            Foxtrick.registerPageHandler( 'match',
                                          FoxtrickLinksMatch);
			var linktypes = new Array("playedmatchlink","nextmatchlink","matchlink");
			Foxtrick.initOptionsLinksArray(this,linktypes);
    },

    run : function( page, doc ) {

		// get ids
		var youthmatch = FoxtrickHelper.findIsYouthMatch(doc.location.href);
		var teamid,teamid2;

		var alldivs = doc.getElementsByTagName('div');
		var matchid = FoxtrickHelper.getMatchIdFromUrl(doc.location.href); 
		var isarchivedmatch = (doc.getElementById("ctl00_CPMain_lblMatchInfo")==null);
		dump('isarchivedmatch:'+isarchivedmatch+'\n');
		if (isarchivedmatch) {
			var sidediv = doc.getElementById("sidebar");
			teamid = FoxtrickHelper.findTeamId(sidediv);
			teamid2 = FoxtrickHelper.findSecondTeamId(sidediv,teamid);		
		}
		else {
			var sidediv = doc.getElementById("ctl00_CPMain_pnlTeamInfo");
			teamid = FoxtrickHelper.findTeamId(sidediv);
			teamid2 = FoxtrickHelper.findSecondTeamId(sidediv,teamid);				
		}
		var links,links2;
		var add_links=false;
		//addExternalLinksToPlayedMatch
		if (isarchivedmatch) {
			if (youthmatch) {links = getLinks("playedyouthmatchlink", { "matchid": matchid, "teamid" : teamid,"teamid2":teamid2  }, doc, this); }
			else {links = getLinks("playedmatchlink", { "matchid": matchid, "teamid" : teamid,"teamid2":teamid2  }, doc, this); }
			if (links.length>0) add_links = true;
		}    
		//addExternalLinksToCommingMatch
		if (!isarchivedmatch && !youthmatch) { 
	        links = getLinks("nextmatchlink", { "matchid": matchid, "teamid" : teamid ,"teamid2":teamid2  }, doc,this);  
			links2 = getLinks("matchlink", { "matchid": matchid, "teamid" : teamid,"teamid2":teamid2  }, doc,this);  
			if (links.length+links2.length>0) add_links = true;	
 		}   
 		// add links box
		var ownBoxBody=null;
		if (add_links) { 
			ownBoxBody = doc.createElement("div");
			var header = Foxtrickl10n.getString("foxtrick.links.boxheader" );
			var ownBoxId = "foxtrick_" + header + "_box";
			var ownBoxBodyId = "foxtrick_" + header + "_content";
			ownBoxBody.setAttribute( "id", ownBoxBodyId );
                                
			for (var k = 0; k < links.length; k++) {
				links[k].link.className ="inner";
				ownBoxBody.appendChild(doc.createTextNode(" "));
				ownBoxBody.appendChild(links[k].link);
			}
			if (links2) {
				for (var k = 0; k < links2.length; k++) {
					links2[k].link.className ="inner";
					ownBoxBody.appendChild(doc.createTextNode(" "));
					ownBoxBody.appendChild(links2[k].link);
				}
			}			
			Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "first", "");				
		}	
		
		// add custom links
		if (isarchivedmatch) {
			if (youthmatch) {prefset=this.MODULE_NAME+".youth.played";}
			FoxtrickLinksCustom.add( page, doc,ownBoxBody,prefset,{ "matchid": matchid, "teamid" : teamid,"teamid2":teamid2  });						
		}    
		if (!isarchivedmatch && !youthmatch) { 
	        FoxtrickLinksCustom.add( page, doc,ownBoxBody,this.MODULE_NAME+".coming" ,{ "matchid": matchid, "teamid" : teamid,"teamid2":teamid2  });					
        } 
	},
	
	change : function( page, doc ) {
		var header = Foxtrickl10n.getString("foxtrick.links.boxheader" );
		var ownBoxId = "foxtrick_" + header + "_content";
		if( !doc.getElementById ( ownBoxId ) ) {
			this.run( page, doc );
		}
	},
};