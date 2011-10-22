"use strict";
/**
 * table-of-statistical-truth.js
 * add htms predicted table to old series
 * @author spambot, ryanli
 */

Foxtrick.util.module.register({
	MODULE_NAME : "TableOfStatisticalTruth",
	MODULE_CATEGORY : Foxtrick.moduleCategories.INFORMATION_AGGREGATION,
	PAGES : ["oldseries"],
	CSS : Foxtrick.InternalPath + "resources/css/table-of-statistical-truth.css",

	run : function(doc) {

		var season =  doc.getElementById('mainBody').getElementsByTagName('select')[0].value;
		var serie =  Foxtrick.util.id.getLeagueLeveUnitIdFromUrl(doc.getElementById('mainWrapper').getElementsByTagName('h2')[0].getElementsByTagName('a')[1].href);
		var lang = FoxtrickPrefs.getString("htLanguage");

		var leaguetable = doc.getElementById("mainBody").getElementsByTagName('table')[0]
		var insertBefore = leaguetable.nextSibling;

		var tableHeader = doc.createElement("h2");
		tableHeader.textContent = Foxtrickl10n.getString("truthTable.table");
		tableHeader.className = "ft-expander-unexpanded";
		tableHeader.id = 'ft-truth-table-h2';
		insertBefore.parentNode.insertBefore(tableHeader, insertBefore);
		var div = doc.createElement("div");
		div.className = "ft-truth-table-div";
		insertBefore.parentNode.insertBefore(div, insertBefore);
		var table;
		
		var toggleTable = function() {
			Foxtrick.toggleClass(tableHeader, "ft-expander-unexpanded");
			Foxtrick.toggleClass(tableHeader, "ft-expander-expanded");
			if (table) 
				Foxtrick.toggleClass(table, "hidden");
			else { 
				addTable();
			}
		};

		tableHeader.addEventListener("click", toggleTable, false);
		
		var addTable = function() {
			var url = "http://www.fantamondi.it/HTMS/dorequest.php?action=truthtable&serie="+serie+"&season="+season;
			Foxtrick.loadXml(url, function(xml) { 
				if (!xml) {
					// feedback
					return;
				}
				else if (xml.getElementsByTagName('available')[0].textContent=='false') {
					
					table = doc.createElement("a");
					table.href = 'http://www.fantamondi.it/HTMS/index.php?page=truthtable&lang='+lang+'&serie='+serie+'&season='+season;
					table.id="createTableLink";
					table.target = '_blank';
					table.textContent = Foxtrickl10n.getString('truthTable.notAvailableYet');
					insertBefore.parentNode.insertBefore(table, insertBefore);
					return;
				}
				
				var teams = xml.getElementsByTagName('team');
				
				table = doc.createElement("table");
				table.id = "ft-truth-table";
				div.appendChild(table);

				var colTypes = {
					'predicted_position':'center',
					'name':'left',
					'real_position':'center',
					'real_points':'right',
					'predicted_points':'right',
					'difference':'right'
				};
					
				var headRow = doc.createElement("tr");
				table.appendChild(headRow);
				for (var i in colTypes) {
					var th = doc.createElement("th");
					th.className = colTypes[i];
					th.textContent = Foxtrickl10n.getString('truthTable.'+i);
					headRow.appendChild(th);
				}
				
				for (var j=0; j<teams.length; ++j) {
					var row = doc.createElement("tr");
					table.appendChild(row);
					
					for (var i in colTypes) {
						var cell = doc.createElement("td");
						cell.className = colTypes[i];
						
						if ( i == 'name') {
							var a = doc.createElement("a");
							a.href = '/Club/?TeamID=' + teams[j].getElementsByTagName( 'id' )[0].textContent;
							a.textContent = teams[j].getElementsByTagName( i )[0].textContent;
							cell.appendChild(a);
						}
						else if ( i != 'difference') {
							var text =  teams[j].getElementsByTagName( i )[0].textContent;
							if ( i =='predicted_points' )
								text = Number(text).toFixed(2);
							cell.textContent = text;
						}
						else {
							var text = ( Number(teams[j].getElementsByTagName( 'real_points' )[0].textContent)-
										Number(teams[j].getElementsByTagName( 'predicted_points' )[0].textContent) ).toFixed(2) ;
							if (text>0) 
								Foxtrick.addClass(cell,'ft-gd-positive');
							else if (text<0) 
								Foxtrick.addClass(cell,'ft-gd-negative');
							cell.textContent = text;
						}
						row.appendChild(cell);
					}
				}
				
				insertBefore.parentNode.insertBefore(table, insertBefore);
				
				var br = doc.createElement("br");
				insertBefore.parentNode.insertBefore(br, insertBefore);
				
				var link = doc.createElement("a");
				link.href = 'http://www.fantamondi.it/HTMS/index.php?page=truthtable&lang='+lang+'&serie='+serie+'&season='+season;
				link.target = '_blank';
				link.textContent = Foxtrickl10n.getString('truthTable.tableAtHTMS');
				insertBefore.parentNode.insertBefore(link, insertBefore);
					
				
				Foxtrick.util.module.get("TableSort").run(doc);
			}, true);
		};
	}
});
