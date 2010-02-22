/**
 * rapidid.js
 * rapid way to view something by id
 * @author ryanli
 */

var FoxtrickRapidId = {
	MODULE_NAME: "RapidId",
	MODULE_CATEGORY: Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES: ["all"],
	DEFAULT_ENABLED: true,
	NEW_AFTER_VERSION: "0.5.0.5",
	LATEST_CHANGE: "Browser auto-completion is now independent for each category. Added option for Senior and Youth Series",
	LATEST_CHANGE_CATEGORY: Foxtrick.latestChangeCategories.FIX,
	CSS: Foxtrick.ResourcePath+"resources/css/rapidid.css",
	CSS_SIMPLE: Foxtrick.ResourcePath+"resources/css/rapidid_simple.css",


	options: [
		{ value: "manager", text: "Manager", url: "Club/Manager/?userId=%n" },
		{ value: "senior", text: "Senior" },
		{ value: "senior-team", text: "Team", url: "Club/?TeamID=%n" },
		{ value: "senior-series", text: "Series", url: "World/Series/Default.aspx?LeagueLevelUnitID=%n" },
		{ value: "senior-player", text: "Player", url: "Club/Players/Player.aspx?playerId=%n" },
		{ value: "senior-match", text: "Match", url: "Club/Matches/Match.aspx?matchID=%n" },
		{ value: "youth", text: "Youth" },
		{ value: "youth-team", text: "Team", url: "Club/Youth/Default.aspx?YouthTeamID=%n" },
		{ value: "youth-series", text: "Series", url: "World/Series/YouthSeries.aspx?YouthLeagueId=%n" },
		{ value: "youth-player", text: "Player", url: "Club/Players/YouthPlayer.aspx?YouthPlayerID=%n" },
		{ value: "youth-match", text: "Match", url: "Club/Matches/Match.aspx?matchID=%n&isYouth=true" }
	],

	setSelected: function(val) {
		FoxtrickPrefs.setString("module.RapidId.selected", val);
	},

	getSelected: function() {
		return FoxtrickPrefs.getString("module.RapidId.selected");
	},

	view: function(event) {
		// prevent the form from being submitted
		event.preventDefault();
		var doc = event.target.ownerDocument;
		var select = doc.getElementById("ft_rapidid_select");
		var type = select.options[select.selectedIndex].getAttribute("value");
		var input = doc.getElementsByClassName("ft_rapidid_input")[0];
		var id = input.value;
		id = Foxtrick.trim(id);
		// only process int
		if (isNaN(id)) {
			return;
		}
		for (var i in FoxtrickRapidId.options) {
			if (FoxtrickRapidId.options[i].value === type) {
				FoxtrickRapidId.setSelected(type);
				var host = doc.location.hostname;
				var url = FoxtrickRapidId.options[i].url.replace("%n", id);
				var fullurl = "http://" + host + "/" + url;
				doc.location.replace(fullurl);
			}
		}
	},

	selectionChange: function(event) {
		// to change the id of input so that auto-complete works correctly
		var doc = event.target.ownerDocument;
		var select = doc.getElementById("ft_rapidid_select");
		var input = doc.getElementsByClassName("ft_rapidid_input")[0];
		input.id = "ft_rapidid_input_" + select.value;
	},

	displayForm: function(doc) {
		try {
			var container = doc.getElementById("ft_rapidid_container");
			var indicator = doc.getElementById("ft_rapidid_indicator");
			container.removeChild(indicator);
			var form = doc.createElement("form");
			container.appendChild(form);

			// form
			form.id = "ft_rapidid_form";
			form.setAttribute("action", "");
			form.addEventListener("submit", this.view, true);
			var select = doc.createElement("select");
			var input = doc.createElement("input");
			var button = doc.createElement("input");
			form.appendChild(select);
			form.appendChild(input);
			form.appendChild(button);

			// the select element
			select.id = "ft_rapidid_select";
			var currentGroup = null;
			var saved = this.getSelected();
			for (var i in this.options) {
				// if no url, then it's an optgroup
				if (!this.options[i].url) {
					var optgroup = doc.createElement("optgroup");
					select.appendChild(optgroup);
					optgroup.setAttribute("label", this.options[i].label);
					currentGroup = optgroup;
				}
				else {
					var option = doc.createElement("option");
					option.setAttribute("value", this.options[i].value);
					option.appendChild(doc.createTextNode(this.options[i].label));
					if (saved === this.options[i].value) {
						option.setAttribute("selected", "selected");
					}
					if (currentGroup === null) {
						select.appendChild(option);
					}
					else {
						currentGroup.appendChild(option);
					}
				}
			}
			select.addEventListener("change", this.selectionChange, false);

			// the input element
			input.id = "ft_rapidid_input_" + select.value;
			input.className = "ft_rapidid_input";
			input.setAttribute("size", "9");

			// the <input type="button" /> element
			button.setAttribute("type", "submit");
			button.setAttribute("value", Foxtrickl10n.getString("View"));
		}
		catch (e) {
			Foxtrick.dump("RapidId(" + e.lineNumber + "): " + e + "\n");
		}
	},

	onclick: function(event) {
		event.preventDefault();
		FoxtrickRapidId.displayForm(event.target.ownerDocument);
	},

	init: function() {
	},

	run: function(page, doc) {
		try {
			// get labels of optgroup and option
			for (var i in this.options) {
				this.options[i].label = Foxtrickl10n.getString(this.options[i].text);
			}

			var header = doc.getElementById("header");
			var ticker = doc.getElementById("ticker");
			var container = doc.createElement("div");
			header.insertBefore(container, ticker);
			container.id = "ft_rapidid_container";
			container.className='float_right';
			var indicator = doc.createElement("a");
			container.appendChild(indicator);

			// indicator
			indicator.id = "ft_rapidid_indicator";
			var viewById = Foxtrickl10n.getString("foxtrick.RapidId.ViewById");
			indicator.appendChild(doc.createTextNode(viewById));
			var search = doc.location.search;
			if (doc.location.search.search(/^\?/) != -1) {
				indicator.setAttribute("href", doc.URL + "&viewid=true");
			}
			else {
				indicator.setAttribute("href", doc.URL + "?viewid=true");
			}
			indicator.addEventListener("click", FoxtrickRapidId.onclick, true);

			if (doc.location.search.search(/[&\?]viewid=true\b/) != -1) {
				this.displayForm(doc);
			}
		}
		catch (e) {
			Foxtrick.dump("RapidId(" + e.lineNumber + "): " + e + "\n");
		}
	},

	change: function(doc) {
	}
};
