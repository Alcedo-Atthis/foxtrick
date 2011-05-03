/*
 * match-tables.js
 * @author Mod-spambot
 */

var FoxtrickMatchTables = {
	MODULE_NAME : "MatchTables",
	MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : new Array('matchesarchiv', 'matches','league','youthleague'),
	OPTIONS :  new Array("RemoveTime"),

	run : function( page, doc ) {
		if (Foxtrick.isStandardLayout(doc)) {
			if (page == "league") {
				// remove non-breaking spaces (&nbsp;) in league table
				var table = doc.getElementById("ctl00_ctl00_CPContent_CPMain_repLeagueTable");
				if (!table)
					return;
				table = table.getElementsByTagName("table")[0];
				// need to replace cell by cell otherwise we could overwrite
				// information provided by other modules, namely
				// ShowFriendlyBooked
				var cells = table.getElementsByTagName("td");
				Foxtrick.map(cells, function(n) {
					if (n.innerHTML.search(/&nbsp;/) > -1)
						n.innerHTML = n.innerHTML.replace(/&nbsp;/g, "");
				});
			}
			return;
		}

		// adjust league table
		if (page=='league' || page== 'youthleague') {
			Foxtrick.addStyleSheet(doc,Foxtrick.ResourcePath+"resources/css/FoxtrickMatchTables_league.css");
			return;
		}

		// adjust matchtable, keep hour
		if (!Foxtrick.isModuleFeatureEnabled( this, "RemoveTime" ) ) {
			if (page=='matchesarchiv' || page== 'matches') Foxtrick.addStyleSheet(doc,Foxtrick.ResourcePath+"resources/css/FoxtrickMatchTables_matches.css");
			return;
		}

		// adjust matchtable, remove hour
		var id = "ft_matchtable";
		if (doc.getElementById(id)) return;

		var div = doc.getElementById('mainBody');
		if (!div) return;
		var tbl = div.getElementsByTagName('TABLE')[0];
		if (!tbl) return;
		tbl.id = 'ft_matchtable';
		tbl.setAttribute('class', '');
		tbl.setAttribute('style', 'margin-left:-6px; margin-right:-6px; padding:0px;width:440px;');

		var tblBodyObj = tbl.tBodies[0];
		var section = 0;
		for (var i=0; i<tblBodyObj.rows.length; i++) {
			if (tblBodyObj.rows[i].cells[1]) {
				var cell = tblBodyObj.rows[i].cells[0];
				var content = Foxtrick.trim(cell.innerHTML);
				var reg = /(\d{1,4})(.*?)(\d{1,2})(.*?)(\d{1,4})(.*?)/i;
				if (content.search(':') > -1) reg = /(\d{1,4})(.*?)(\d{1,2})(.*?)(\d{1,4})(.*?)(\d{2})(.*?)(\d{2})(.*?)/i;
				var ar = reg.exec(content);
				var DATEFORMAT = Foxtrick.utils.time.getDateFormat();

				switch ( DATEFORMAT ) {
					case 'ddmmyyyy':
						if (content.search(/\(/) > -1) cell.innerHTML = ar[1] + '.' + ar[3] + '.' + ar[5].substring(2,4)  + '&nbsp;<span id="ft_HTDateFormat">(' + content.split('(')[1] + '</span>';
						else cell.innerHTML = ar[1] + '.' + ar[3] + '.' + ar[5].substring(2,4);
						if (ar.length>7) cell.title = ar[7] + ar[8] + ar[9] + ar[10];
						break;
					case 'mmddyyyy':
						if (content.search(/\(/) > -1) cell.innerHTML = ar[1] + '.' + ar[3] + '.' + ar[5].substring(2,4)  + '&nbsp;<span id="ft_HTDateFormat">(' + content.split('(')[1] + '</span>';
						else cell.innerHTML = ar[1] + '.' + ar[3] + '.' + ar[5].substring(2,4);
						if (ar.length>7) cell.title = ar[7] + ar[8] + ar[9] + ar[10];
						break;
					case 'yyyymmdd':
						if (content.search(/\(/) > -1) cell.innerHTML = ar[1] + '-' + ar[3] + '-' + ar[5].substring(2,4)  + '&nbsp;<span id="ft_HTDateFormat">(' + content.split('(')[1] + '</span>';
						else cell.innerHTML = ar[1] + '-' + ar[3] + '-' + ar[5].substring(2,4);
						if (ar.length>7) cell.title = ar[7] + ar[8] + ar[9] + ar[10];
						break;
				}
				cell.setAttribute('style', "font-size:9px; text-align:center;padding:2px 0px 2px 0px;vertical-align:middle;");
				cell.setAttribute('class', "date");
				if (section == 2) {
					tblBodyObj.rows[i].deleteCell(3);
					tblBodyObj.rows[i].cells[2].setAttribute('colspan', 2);
				}
				for(var j = 1; j < 7; j++) {
					var cell = tblBodyObj.rows[i].cells[j];
					if (cell) {

						cell.setAttribute('style', "padding:1px; margin:0px;font-size:10px;vertical-align:middle;text-align:center");
						if (j != 2)
							cell.innerHTML = cell.innerHTML.replace(/\&nbsp\;/gi, '').replace(' - ', ':');
						else
							cell.innerHTML = cell.innerHTML.replace(' - ', ':')
					}
				}
			} else section++;
		}
	},

	change : function( page, doc ) {
		var id = "ft_matchtable";
		if(!doc.getElementById(id)) {
			this.run( page, doc );
		}
	}
};
