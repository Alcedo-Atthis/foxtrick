"use strict";
/**
 * transfer-search-result-filters.js
 * Transfer list filters
 * @author convincedd, ryanli
 */

Foxtrick.modules["TransferSearchResultFilters"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : ['transferSearchForm','transferSearchResult'],
	NICE : -1, // before TransferDeadline and HTMSPoints

	run : function(doc) {
		// functions returning whether to hide a player
		// need to check availablility of a certain property first since they
		// may not be available for players just sold
		var FILTER_FUNC = {
			"hideBruised" : function(player, checked) {
				if (player.bruised == null)
					return true;
				return player.bruised;
			},
			"hideInjured" : function(player, checked) {
				if (player.injured == null)
					return true;
				return player.injured;
			},
			"hideSuspended" : function(player, checked) {
				if (player.redCard == null)
					return true;
				return player.redCard == 1;
			},
			"days" : function(player, min, max) {
				if (player.age == null)
					return true;
				if (typeof(min) == "number" && player.age.days < min)
					return true;
				if (typeof(max) == "number" && player.age.days > max)
					return true;
				return false;
			}
		};
		// default filter values
		var FILTER_VAL = [
			{ key : "hideBruised", type : "check", checked : false },
			{ key : "hideInjured", type : "check", checked : false },
			{ key : "hideSuspended", type : "check", checked : false },
			{ key : "days", type : "minmax", min : null, max : null }
		];
		var getFilters = function(callback) {
			var n = Foxtrick.sessionGet("transfer-search-result-filters");
			try {
				if (n === undefined) {
					// set default filters if not set
					Foxtrick.sessionSet("transfer-search-result-filters", FILTER_VAL);
					callback(FILTER_VAL);
				}
				else {
					callback(n);
				}
			}
			catch (e) {
				Foxtrick.log(e);
			}
		};
		var setFilters = function(filters) {
			Foxtrick.sessionSet("transfer-search-result-filters", filters);
		};
		var showHTSearchProfileComment = function() {
			var HTProfileRow = doc.getElementById('ctl00_ctl00_CPContent_CPMain_rowProfiles');
			if (HTProfileRow) {
				var HTProfileSelect = doc.getElementById('ctl00_ctl00_CPContent_CPMain_ddlSearchProfile');
				var tr = Foxtrick.createFeaturedElement(doc, Foxtrick.modules.TransferSearchResultFilters, 'tr');
				var td = doc.createElement('td');
				td.textContent = HTProfileSelect.title;
				tr.appendChild(td)
				HTProfileRow.parentNode.insertBefore(tr, HTProfileRow.nextSibling)
			}
		};
		var addNewFilter = function(table, filters, idx) {
			var saveValues = function(ev) {
				getFilters(function(filters) {
					var value = null;
					if (ev.target.type == "text") {
						if (ev.target.value != "" && !isNaN(ev.target.value))
							value = Number(ev.target.value);
					}
					else if (ev.target.type == "checkbox")
						value = Boolean(ev.target.checked);

					var index = ev.target.getAttribute("x-ft-filter-idx");
					var prop = ev.target.getAttribute("x-ft-filter-prop");
					filters[index][prop] = value;
					setFilters(filters);
				});
			};

			var filter = filters[idx];

			var tr = doc.createElement('tr');
			table.appendChild(tr);

			if (filter.type == "minmax") {
				var td = doc.createElement('td');
				tr.appendChild(td);
				var strong = doc.createElement('strong');
				strong.textContent = Foxtrickl10n.getString("TransferSearchResultFilters." + filter.key);
				td.appendChild(strong);

				var td = doc.createElement('td');
				td.colSpan = 2;
				td.textContent = Foxtrickl10n.getString("Filters.minimum") + "\u00a0";
				tr.appendChild(td);
				var input = doc.createElement("input");
				input.style.width = "90px";
				input.id = "FoxtrickTransferSearchResultFilters." + filter.key + ".min";
				input.value = filter.min;
				input.setAttribute("x-ft-filter-idx", idx);
				input.setAttribute("x-ft-filter-prop", "min");
				Foxtrick.listen(input, "blur", saveValues, false);
				td.appendChild(input);

				var td = doc.createElement('td');
				td.colSpan = 2;
				td.textContent = Foxtrickl10n.getString("Filters.maximum") + "\u00a0";
				tr.appendChild(td);
				var input = doc.createElement("input");
				input.style.width = "90px";
				input.id = "FoxtrickTransferSearchResultFilters." + filter.key + ".max";
				input.value = filter.max;
				input.setAttribute("x-ft-filter-idx", idx);
				input.setAttribute("x-ft-filter-prop", "max");
				Foxtrick.listen(input, "blur", saveValues, false);
				td.appendChild(input);
			}
			else if (filter.type == "check") {
				var td = doc.createElement("td");
				td.colSpan = 5;
				tr.appendChild(td);
				var input = doc.createElement("input");
				input.type = "checkbox";
				input.id = "FoxtrickTransferSearchResultFilters." + filter.key + ".check";
				input.setAttribute("x-ft-filter-idx", idx);
				input.setAttribute("x-ft-filter-prop", "checked");
				if (filter.checked === true)
					input.setAttribute("checked", "checked");
				Foxtrick.onClick(input, saveValues);
				td.appendChild(input);
				var label = doc.createElement("label");
				label.textContent = Foxtrickl10n.getString("TransferSearchResultFilters." + filter.key);
				label.htmlFor = input.id;
				td.appendChild(label);
			}
		};
		var addExtraFilters = function() {
			getFilters(function(filters) {
				var tableAdvanced = doc.getElementById('ctl00_ctl00_CPContent_CPMain_tblAdvanced');
				if (tableAdvanced === null) {
					return;  //only show if advanced filters is on
				}
				var table = Foxtrick.createFeaturedElement(doc, Foxtrick.modules.TransferSearchResultFilters, 'table');
				table.id = 'ft-ExtraFilters'
				var tr = doc.createElement('tr');
				table.appendChild(tr);
				var td = doc.createElement('td');
				td.setAttribute('colspan','5');
				tr.appendChild(td);
				var div = doc.createElement('div');
				div.setAttribute('class','borderSeparator');
				td.appendChild(div);

				for (var j = 0; j < filters.length; ++j) {
					addNewFilter(table,filters,j);
				}
				tableAdvanced.parentNode.insertBefore(table, tableAdvanced.nextSibling);

				var buttonClear = doc.getElementById('ctl00_ctl00_CPContent_CPMain_butClear');
				Foxtrick.onClick(buttonClear, function() {
						getFilters(function(filters) {
							for (var j = 0; j < filters.length; ++j) {
								var filter = filters[j];
								if (filter.type == "minmax") {
									filters[j].min = null;
									doc.getElementById("FoxtrickTransferSearchResultFilters." + filter.key + ".min").value = "";
									filters[j].max = null;
									doc.getElementById("FoxtrickTransferSearchResultFilters." + filter.key + ".max").value = "";
								}
								else if (filter.type == "check") {
									filters[j].checked = false;
									doc.getElementById("FoxtrickTransferSearchResultFilters." + filter.key + ".check").removeAttribute("checked");
								}
							}
							setFilters(filters);
						});
					});
			});
		};
		var filterResults = function() {
			getFilters(function(filters) {
				var playerList = Foxtrick.Pages.TransferSearchResults.getPlayerList(doc);
				var playerInfos = doc.getElementsByClassName("transferPlayerInfo");
				// Transform a live NodeList to an array because we'll remove
				// elements below. Without transformation the index would
				// point to incorrect nodes.
				playerInfos = Foxtrick.map(function(n) { return n; }, playerInfos);

				// playerList and playerInfos should have the same order,
				// and the same length
				for (var i = 0; i < playerInfos.length; ++i) {
					var player = playerList[i];
					var hide = false;
					for (var j = 0; j < filters.length; ++j) {
						var filter = filters[j];
						if (filter.type == "minmax" && (filter.min != null || filter.max != null) ) {
							if (FILTER_FUNC[filter.key](player, filter.min, filter.max))
								hide = true;
						}
						else if (filter.type == "check") {
							//Foxtrick.log(filter, filter.checked, FILTER_FUNC[filter.key](player), player)
							if (filter.checked && FILTER_FUNC[filter.key](player))
								hide = true;
						}
						if (hide) {
							playerInfos[i].parentNode.removeChild(playerInfos[i]);
							break;
						}
					}
				}
			});
		};
		if (Foxtrick.isPage("transferSearchForm", doc)) {
			addExtraFilters();
			showHTSearchProfileComment();
		}
		else if (Foxtrick.isPage("transferSearchResult", doc))
			filterResults();
	}
};
