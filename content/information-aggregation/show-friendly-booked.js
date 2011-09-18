/*
 * show-friendly-booked.js
 * Show whether a team has booked friendly on series page
 * @author ryanli
 */

Foxtrick.util.module.register({
	MODULE_NAME : "ShowFriendlyBooked",
	MODULE_CATEGORY : Foxtrick.moduleCategories.INFORMATION_AGGREGATION,
	PAGES : ["series"],
	OPTIONS : ["OnDemand"],
	CSS : Foxtrick.InternalPath + "resources/css/show-friendly-booked.css",

	run : function(doc) {
		var show = function() {
			var leagueTableSpan = doc.getElementById("ctl00_ctl00_CPContent_CPMain_repLeagueTable");
			var leagueTable = leagueTableSpan.getElementsByTagName("table")[0];
			var rows = leagueTable.getElementsByTagName("tr");
			// remove header row and ownerless teams
			rows = Foxtrick.filter(function(n) {
				var isHeader = function() { return n.getElementsByTagName("th").length > 0; };
				var inCup = function() { return n.getElementsByTagName("td")[3].getElementsByTagName("img").length > 0; };
				var isOwnerless = function() { return n.getElementsByClassName("shy").length > 0; };
				return !isHeader() && !inCup() && !isOwnerless();
			}, rows);
			// see whether friendly booked
			Foxtrick.map(function(n) {
				var teamCell = n.getElementsByTagName("td")[2];
				var teamLink = teamCell.getElementsByTagName("a")[0].href;
				var teamId = Foxtrick.util.id.getTeamIdFromUrl(teamLink);

				var destCell = n.getElementsByTagName("td")[3];
				destCell.textContent = Foxtrickl10n.getString("status.loading.abbr");
				destCell.title = Foxtrickl10n.getString("status.loading");

				var parameters = [
					["file", "teamdetails"],
					["teamID", teamId]
				];
				Foxtrick.util.api.retrieve(doc, parameters, {
						cache_lifetime : "default",
						caller_name : "ShowFriendlyBooked"
					},
					function(xml) {
						if (xml == null) {
							// failed to retrieve XML
							destCell.textContent = Foxtrickl10n.getString("status.error.abbr");
							destCell.title = Foxtrickl10n.getString("api.failure");
							return;
						}
						// reset textContent and title
						destCell.textContent = "";
						destCell.removeAttribute("title");
						var friendly = xml.getElementsByTagName("FriendlyTeamID")[0];
						if (friendly.getAttribute("Available") != "True") {
							destCell.textContent = Foxtrickl10n.getString("status.unknown.abbr");
							destCell.title = Foxtrickl10n.getString("status.unknown");
						}
						else if (friendly.textContent != "0") {
							// friendly booked
							var img = doc.createElement("img");
							img.src = "/Img/Icons/transparent.gif";
							img.alt = img.title = Foxtrickl10n.getString("team.status.booked");
							img.className = "ft_friendly";
							destCell.appendChild(img);
						}
					});
			}, rows);
		};

		// add the stuffs
		if (FoxtrickPrefs.isModuleOptionEnabled("ShowFriendlyBooked", "OnDemand")) {
			// show on demand
			var link = doc.createElement("a");
			link.id = "ft-show-friendlies";
			link.className = "float_left ft-link";
			link.textContent = Foxtrickl10n.getString("ShowFriendlyBooked.ShowFriendlies");
			Foxtrick.listen(link, "click", function() {
				link.parentNode.removeChild(link);
				show();
			}, false);
			if (Foxtrick.util.layout.isSupporter(doc)) {
				var UpdatePanelLiveLeagueTable = doc.getElementById("ctl00_ctl00_CPContent_CPMain_UpdatePanelLiveLeagueTable");
				UpdatePanelLiveLeagueTable.insertBefore(link, UpdatePanelLiveLeagueTable.getElementsByTagName('br')[0].nextSibling);
			}
			else {
				var table = doc.getElementById("ctl00_ctl00_CPContent_CPMain_repLeagueTable");
				table.parentNode.insertBefore(link, table);
				// style.clear needed before the table
				var clear = doc.createElement("div");
				clear.className = "clear";
				table.parentNode.insertBefore(clear, table);
			}
		}
		else {
			// show automatically
			show();
		}
	}
});
