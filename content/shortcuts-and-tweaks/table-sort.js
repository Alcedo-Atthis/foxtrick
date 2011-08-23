//**********************************************************
/**
* sortTable.js
* sorting of HT-ML tables
* @author convinced
*/

var FoxtrickTableSort = {
	MODULE_NAME : "TableSort",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : ["all"],
	NICE : 10,  // after anythig that adds or changes tables
	CSS : Foxtrick.InternalPath + "resources/css/tableSort.css",

	run : function(doc) {
		if (Foxtrick.isPage("forumViewThread", doc)) {
			var tables = doc.getElementsByClassName("htMlTable");
		}
		else {
			var tables = doc.getElementById('mainBody').getElementsByTagName("table");
		}
		for (var i = 0; i < tables.length; ++i) {
			var ths = tables[i].getElementsByTagName("th");
			for (var j = 0; j < ths.length; ++j) {
				if (ths[j].getElementsByTagName('input').length===0 && ths[j].getElementsByTagName('a').length===0)
					ths[j].addEventListener("click", FoxtrickTableSort.clickListener, false);
			}
		}
		// Foxtrick.dump('FoxtrickTableSort was here...\n');
	},

	clickListener : function( ev ) {
		try {
			var this_th = ev.target;

			// find table header cell if click was on some inner span or img
			for (var i=0;i<5;++i)
			{	if (this_th.nodeName=='TH') break;
				this_th = this_th.parentNode;
			}
			// get the column (index) and row(sort_start). there had been tables with multiple head rows. thus goto whole table
			var table = this_th.parentNode.parentNode.parentNode;
			for (var i = 0; i < table.rows.length; ++i) {
				var index = 0;
				var found = false;
				for (var j = 0; j < table.rows[i].cells.length; ++j) {
					if (table.rows[i].cells[j]===this_th) {
						found = true;
						break;
					}
					// adjust for colspan in header
					var colspan = 1;
					if (table.rows[i].cells[j].getAttribute('colspan')!=null) colspan = parseInt(table.rows[i].cells[j].getAttribute('colspan'));
					index += colspan;
				}
				if (found) break;
			}
			var sort_start = i;
			Foxtrick.log('sort_start:',sort_start,'index: ',index);

			// determine sort direction
			var direction = this_th.hasAttribute("sort-asc") ? 1 : -1;
			if ( index == table.getAttribute('lastSortIndex') ) {
				if (direction==1) this_th.removeAttribute("sort-asc");
				else this_th.setAttribute("sort-asc","true");
				direction *= -1;
			}
			table.setAttribute('lastSortIndex', index);

			var is_num = true, is_age=true, is_youthskill = true, is_ordinal=true, is_date=true, is_skill=true;
			var num_cols = table.rows[sort_start+1].cells.length;
			for (var i = sort_start+1; i < table.rows.length; ++i) {

				// if num_cols change, we are at the bottom with nonsortable entries (eg transfercompare)
				if (num_cols != table.rows[i].cells.length) break;

				// adjust index for colspans in table
				var tdindex = index;
				for (var j = 0; j < index-1; ++j) {
					if (table.rows[i].cells[j].getAttribute('colspan')!=null) {
						tdindex = tdindex-parseInt(table.rows[i].cells[j].getAttribute('colspan'))+1;
					}
				}

				// get sorting format
				var inner = Foxtrick.trim(Foxtrick.stripHTML(table.rows[i].cells[tdindex].innerHTML));
				if (isNaN(parseFloat(inner)) && inner!='') {is_num=false;}
				if (inner.search(/^(-|\d)\/(-|\d)$/)==-1 && inner!='') {is_youthskill=false;}
				if (inner.search(/^\d+\.\d+$/)==-1 && inner!='') {is_age=false;}
				if (inner.search(/^\d+\./)==-1 && inner!='') {is_ordinal=false;}
				if (!Foxtrick.util.time.getDateFromText(inner)) {is_date=false;}
				if (table.rows[i].cells[tdindex].innerHTML.search(/lt=skillshort&amp;ll=\d+/)==-1 && inner!='') {is_skill=false;}
			}
			var sort_end = i;
			Foxtrick.log('sort end: ',sort_end);

			// rows to be sorted
			var rows = new Array();
			for (var i = sort_start+1; i < sort_end; ++i) {
				rows.push(table.rows[i].cloneNode(true));
			}

			var cmp = function (a, b) {
				var aContent, bContent;

				aContent = a.cells[tdindex].innerHTML;
				bContent = b.cells[tdindex].innerHTML;
				var lastSort = Number(a.getAttribute('lastSort'))-Number(b.getAttribute('lastSort'));

				if (aContent === bContent) {
					return lastSort;
				}

				aContent = Foxtrick.trim(Foxtrick.stripHTML(aContent));
				bContent = Foxtrick.trim(Foxtrick.stripHTML(bContent));

				// place empty cells at the bottom
				if (aContent === "" || aContent === null || aContent === undefined) {
					return 1;
				}
				if (bContent === "" || bContent === null || bContent === undefined) {
					return -1;
				}

				if (is_skill) {
					aContent = (a.cells[tdindex].innerHTML.match(/lt=skillshort&amp;ll=(\d+)/)[1]);
					bContent = (b.cells[tdindex].innerHTML.match(/lt=skillshort&amp;ll=(\d+)/)[1]);
					return direction * (bContent - aContent);
				}
				else if (is_date) {
					var date1 = Foxtrick.util.time.getDateFromText(aContent);
					var date2 = Foxtrick.util.time.getDateFromText(bContent);
					return direction * (date2.getTime() - date1.getTime());
				}
				else if (is_youthskill) {
					aContent = aContent.replace('-','0').match(/^(\d)\/(\d)$/);
					aContent = aContent[1] * 18 + aContent[2] * 2 + (a.cells[tdindex].getElementsByTagName('strong').length==0?0:1);
					bContent = bContent.replace('-','0').match(/^(\d)\/(\d)$/);
					bContent = bContent[1] * 18 + bContent[2] * 2 + (b.cells[tdindex].getElementsByTagName('strong').length==0?0:1);
					return direction * (bContent - aContent);
				}
				else if (is_age) {
					aContent = aContent.match(/^(\d+)\.(\d+)$/);
					aContent = parseInt(aContent[1]) * 1000 + parseInt(aContent[2]) ;
					bContent = bContent.match(/^(\d+)\.(\d+)$/);
					bContent = parseInt(bContent[1]) * 1000 + parseInt(bContent[2]);
					return direction * (aContent - bContent);
				}
				else if (is_ordinal) {
					aContent = parseInt(aContent.match(/^(\d+)\./)[1]);
					bContent = parseInt(bContent.match(/^(\d+)\./)[1]);
					return direction * (aContent - bContent);
				}
				else if (is_num) {
					aContent = parseFloat(aContent);
					bContent = parseFloat(bContent);
					aContent = isNaN(aContent) ? lastSort : aContent;
					bContent = isNaN(bContent) ? lastSort : bContent;
					if (aContent === bContent) {
						return lastSort;
					}
					else {
						return direction * (bContent - aContent);
					}
				}
				else { // sort string
					// always sort by ascending order
					return direction * (aContent.localeCompare(bContent));
				}
			};

			// sort them
			rows.sort(cmp);

			// put them back
			for (var i = sort_start+1; i < sort_end; ++i) {
				table.rows[i].innerHTML = rows[i-1-sort_start].innerHTML;
				table.rows[i].setAttribute('lastSort',i);
			}
		}
		catch (e) {
			Foxtrick.log(e);
		}
	}
};
Foxtrick.util.module.register(FoxtrickTableSort);
