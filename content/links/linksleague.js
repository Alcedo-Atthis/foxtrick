/**
 * linksleague.js
 * Foxtrick add links to league pages
 * @author convinced
 */

////////////////////////////////////////////////////////////////////////////////

var FoxtrickLinksLeague = {
	
    MODULE_NAME : "LinksLeague",
	MODULE_CATEGORY : Foxtrick.moduleCategories.LINKS,
	DEFAULT_ENABLED : true,
	OPTIONS : {}, 

    init : function() {
            Foxtrick.registerPageHandler( 'league',
                                          FoxtrickLinksLeague );
			Foxtrick.initOptionsLinks(this,"leaguelink");
    },

    run : function( page, doc ) {
//var own=FoxtrickHelper.getOwnTeamInfo(doc);
//Foxtrick.alert(FoxtrickHelper.ownseriesnum);
		//addExternalLinksToLeagueDetail
		var alldivs = doc.getElementsByTagName('div');
		for (var j = 0; j < alldivs.length; j++) {
			if (alldivs[j].className=="main mainRegular") {
				var thisdiv = alldivs[j];
				var leagueid = FoxtrickHelper.findLeagueLeveUnitId(thisdiv);;
				var countryid = FoxtrickHelper.findCountryId(thisdiv);
        
				var leaguename = FoxtrickHelper.extractLeagueName(thisdiv);
				var leaguename2 = leaguename;
				var leaguename3 = leaguename;
        
				var seriesnum = FoxtrickHelper.getSeriesNum(leaguename);
				var levelnum = FoxtrickHelper.getLevelNum(leaguename, countryid);
        
				if (!leaguename.match(/^[A-Z]+\.\d+/i)) {
					leaguename2="I";
					leaguename3="1";
					}
        
				var links = getLinks("leaguelink", { "countryid": countryid,
					"leagueid": leagueid, "levelnum" : levelnum,
					"seriesnum": seriesnum,	"leaguename" : leaguename,
					"leaguename2" : leaguename2, "leaguename3" : leaguename3 },
					doc, this);  

				if (links.length > 0) {
					var ownBoxBody = doc.createElement("div");
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
					
					FoxtrickLinksCustom.add( page, doc,ownBoxBody,this.MODULE_NAME );	
				}
				break;  
			}
		}
	},
	
	change : function( page, doc ) {
		var header = Foxtrickl10n.getString("foxtrick.links.boxheader" );
		var ownBoxId = "foxtrick_" + header + "_box";
		if( !doc.getElementById ( ownBoxId ) ) {
			this.run( page, doc );
		}
	},
};