"use strict";
/**
 * Transfer list filters
 * @author kolmis, bummerland
 */

Foxtrick.modules["TransferSearchFilters"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : ["transferSearchForm"],
	CSS : Foxtrick.InternalPath + "resources/css/transfer-search-filters.css",

	run : function(doc) {
		// do not modify the mappings - the keys are stored in preferences
		var backwardCompatibleCodes = {
			"_01" : "ctl00$ctl00$CPContent$CPMain$ddlDeadline",
			"_02" : "ctl00$ctl00$CPContent$CPMain$ddlAgeMin",
			"_03" : "ctl00$ctl00$CPContent$CPMain$ddlAgeMax",
			"_04" : "ctl00$ctl00$CPContent$CPMain$ddlSkill1",
			"_05" : "ctl00$ctl00$CPContent$CPMain$ddlSkill1Min",
			"_06" : "ctl00$ctl00$CPContent$CPMain$ddlSkill1Max",
			"_07" : "ctl00$ctl00$CPContent$CPMain$ddlSkill2",
			"_08" : "ctl00$ctl00$CPContent$CPMain$ddlSkill2Min",
			"_09" : "ctl00$ctl00$CPContent$CPMain$ddlSkill2Max",
			"_10" : "ctl00$ctl00$CPContent$CPMain$ddlSkill3",
			"_11" : "ctl00$ctl00$CPContent$CPMain$ddlSkill3Min",
			"_12" : "ctl00$ctl00$CPContent$CPMain$ddlSkill3Max",
			"_13" : "ctl00$ctl00$CPContent$CPMain$ddlSkill4",
			"_14" : "ctl00$ctl00$CPContent$CPMain$ddlSkill4Min",
			"_15" : "ctl00$ctl00$CPContent$CPMain$ddlSkill4Max",
			"_16" : "ctl00$ctl00$CPContent$CPMain$ddlSpecialty",
			"_17" : "ctl00$ctl00$CPContent$CPMain$ddlZone",
			"_18" : "ctl00$ctl00$CPContent$CPMain$ddlBornIn",
			"_19" : "ctl00_ctl00_CPContent_CPMain_txtTSIMin_text",
			"_20" : "ctl00$ctl00$CPContent$CPMain$txtTSIMin",
	//		"_21" : "ctl00_ctl00_CPContent_CPMain_txtTSIMin_ClientState",
			"_22" : "ctl00_ctl00_CPContent_CPMain_txtTSIMax_text",
			"_23" : "ctl00$ctl00$CPContent$CPMain$txtTSIMax",
	//		"_24" : "ctl00_ctl00_CPContent_CPMain_txtTSIMax_ClientState",
			"_25" : "ctl00_ctl00_CPContent_CPMain_txtBidMin_text",
			"_26" : "ctl00$ctl00$CPContent$CPMain$txtBidMin",
	//		"_27" : "ctl00_ctl00_CPContent_CPMain_txtBidMin_ClientState",
			"_28" : "ctl00_ctl00_CPContent_CPMain_txtBidMax_text",
			"_29" : "ctl00$ctl00$CPContent$CPMain$txtBidMax",
	//		"_30" : "ctl00_ctl00_CPContent_CPMain_txtBidMax_ClientState",
			"_31" : "ctl00$ctl00$CPContent$CPMain$ddlGlobalSkillMax",
			"_32" : "ctl00$ctl00$CPContent$CPMain$chkUseGlobalMax",

			"_51" : "FoxtrickTransferSearchResultFilters.hideBruised.check",
			"_52" : "FoxtrickTransferSearchResultFilters.hideInjured.check",
			"_53" : "FoxtrickTransferSearchResultFilters.hideSuspended.check",
			"_55" : "FoxtrickTransferSearchResultFilters.days.min",
			"_56" : "FoxtrickTransferSearchResultFilters.days.max",
		};
		var findFormElement = function(name) {
			var els = doc.getElementsByName(name);
			return (els.length > 0) ? els[0] : null;
		};
		var addNewFilter = function() {
			try {
				var filtername = prompt(Foxtrickl10n.getString("TransferSearchFilters.enterName"));
				if (filtername == '') return;

				var formString = "<root>";
				for (var i in backwardCompatibleCodes) {
					var el = findFormElement(i, doc);
					if (el == null) {
						var subst = backwardCompatibleCodes[i];
						if (typeof(subst) != 'undefined') {
							el = findFormElement(subst, doc);
						}
					}
					if (el != null && el.type != "radio" && el.type != "checkbox" ) {
						if (el.value.search('{')!=-1) continue;  // don't save hidden imputs
						formString = formString + "<elem>";
						formString = formString + "<name>" + i + "</name>";
						formString = formString + "<value>" + el.value + "</value>";
						formString = formString + "</elem>";
					}

					if (el != null && el.type != "radio" && el.type == "checkbox" ) {
						formString = formString + "<elem>";
						formString = formString + "<name>" + i + "</name>";
						formString = formString + "<value>" + el.checked + "</value>";
						formString = formString + "</elem>";
					}
				}
				formString = formString + "</root>";

				var namelist = FoxtrickPrefs.getList("transferfilterlist");
				var bExists = false;
				for (var i=0; i< namelist.length; i++) {
					if (namelist[i] == filtername){
						bExists = true;
						break;
					}
				}
				FoxtrickPrefs.setString("transferfilter." + filtername, formString);
				if (bExists){
					FoxtrickPrefs.delListPref("transferfilterlist", filtername);
					var el = doc.getElementById("filter_" + filtername);
						if (el)
							el.parentNode.removeChild(el);
				}
				FoxtrickPrefs.addPrefToList("transferfilterlist", filtername);
				var table = doc.getElementById("ft-transfer-search-filter-table");
				if (table) {
					addFilter(table, filtername);
				}
			}
			catch (e) {
				Foxtrick.log(e);
			}
		};
		var addFilter = function(table, name) {
			var fillForm = function(ev) {
				try {
					var filter = ev.target.getAttribute("filter");
					// parse it
					var dp = new window.DOMParser();
					var obj = dp.parseFromString(filter, "text/xml");

					var root = obj.firstChild;

					for (var i=0; i<root.childNodes.length; i++) {
						var name = root.childNodes[i].childNodes[0].textContent;

						var value;
						if (root.childNodes[i].childNodes[1].childNodes.length >0) {
							value = root.childNodes[i].childNodes[1].textContent;
						}
						else {
							value="";
						}

						// set the value in form
						var el = findFormElement(name, doc);
						if (el == null) {
							var subst = backwardCompatibleCodes[name];
							if (typeof(subst) != 'undefined') {
								el = findFormElement(subst, doc);
							}
						}
						if (el == null) continue;

						if (el.type != "radio") {
							el.value=value;
						}
						if (el.type == 'checkbox' && value == 'true' ) {el.checked = true;} else {el.checked = false;}
						el.disabled = false;
					}
				}
				catch (e) {
					Foxtrick.log(e);
					Foxtrick.log('filter-name: ', filter);
					Foxtrick.log('filter-obj: ', obj);
				}
			};
			var deleteFilter = function(ev) {
				if (Foxtrick.confirmDialog(Foxtrickl10n.getString('TransferSearchFilters.deleteFilter.ask'))) {
				  FoxtrickPrefs.delListPref( "transferfilterlist", ev.target.msg );
				  FoxtrickPrefs.deleteValue("transferfilter." + ev.target.msg);
					var el = doc.getElementById("filter_" + ev.target.msg);
					if (el)
						el.parentNode.removeChild(el);
				}
			};

			var filter = FoxtrickPrefs.getString("transferfilter." + name);
			if (filter === null) {
				filter = FoxtrickPrefs.getString(encodeURI("transferfilter." + name));
				if (filter === null)
					return;
			}
		
			var tr = doc.createElement("tr");
			tr.id = "filter_" + name;
			table.appendChild(tr);

			var td_fname = doc.createElement("td");
			var td_remove = doc.createElement("td");
			tr.appendChild(td_fname);
			tr.appendChild(td_remove);

			var link = doc.createElement("a");
			link.className = "ft-link";
			Foxtrick.listen(link, "click", fillForm, false);
			link.textContent = name;
			link.setAttribute("filter", filter);
			td_fname.appendChild(link);

			var remover = doc.createElement("div");
			remover.className = "foxtrickRemove";
			remover.msg = name;
			Foxtrick.listen(remover, "click", deleteFilter, false);
			td_remove.appendChild(remover);
		};

		var ownBoxBody = doc.createElement("div");
		var header = Foxtrickl10n.getString("TransferSearchFilters.boxheader");

		// add link
		var addlink = Foxtrick.createFeaturedElement(doc, this, "a");
		addlink.id = "ft-transfer-search-filter-new";
		addlink.className = "ft-link";
		Foxtrick.listen(addlink, "click", addNewFilter, false);
		addlink.textContent = Foxtrickl10n.getString("TransferSearchFilters.saveFilter");
		ownBoxBody.appendChild(addlink);

		var namelist = FoxtrickPrefs.getList("transferfilterlist");
		namelist.sort();
		var table = Foxtrick.createFeaturedElement(doc, this, "table");
		table.id = "ft-transfer-search-filter-table";
		for (var i=0; i< namelist.length; i++) {
			addFilter(table, namelist[i]);
		}
		ownBoxBody.appendChild(table);
		Foxtrick.addBoxToSidebar(doc, header, ownBoxBody, 1);
	}
};
