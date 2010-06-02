/**
 * contextMenuCopy.js
 * Options at the context menu for copying ID and/or link and content in HT-ML
 * @author convinced, ryanli
 */

var FoxtrickContextMenuCopy = {

	MODULE_NAME : "ContextMenuCopy",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : ["all"],
	OPTIONS : ["Id", "Link", "HtMl"],
	DEFAULT_ENABLED : true,
	NEW_AFTER_VERSION : "0.5.2.1",
	LATEST_CHANGE : "Option for copying selected content in HT-ML.",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,

	MENU_ID : null,
	MENU_LINK : null,
	MENU_HT_ML : null,

	SELECTION : null,

	ID : [
		{ type : "player", re : /\?playerId=(\d+)/i, tag : "playerid" },
		{ type : "youthplayer", re : /\?YouthPlayerID=(\d+)/i, tag : "youthplayerid" },
		{ type : "team", re : /\?TeamID=(\d+)/i, tag : "teamid" },
		{ type : "youthteam", re : /\?YouthTeamID=(\d+)/i, tag : "youthteamid" },
		{ type : "youthmatch", re : /\?matchID=(\d+)&isYouth=True/i, tag : "youthmatchid" },
		{ type : "match", re : /\?matchID=(\d+)&/i, tag : "matchid" },
		{ type : "federation", re : /\?AllianceID=(\d+)/i, tag : "federationid" },
		{ type : "league", re : /\?LeagueLevelUnitID=(\d+)/i, tag : "leagueid" },
		{ type : "youthleague", re : /\?YouthLeagueId=(\d+)/i, tag : "youthleagueid" },
		{ type : "user", re : /\?userId=(\d+)/i, tag : "userid" },
		{ type : "kit", re : /\?KitID=(\d+)/i, tag : "kitid" },
		{ type : "article", re : /\?ArticleID=(\d+)/i, tag : "articleid" },
		{ type : "post", re : /\/Forum\/Read.aspx\?t=(\d+).*&n=(\d+)/i, tag : "post" }
	],

	init : function() {
	},

	run : function(page, doc) {
		doc.addEventListener("contextmenu", this.onContext, false);
		this.MENU_LINK.setAttribute("label", Foxtrickl10n.getString("copy.link"));
		this.MENU_HT_ML.setAttribute("label", Foxtrickl10n.getString("copy.ht-ml"));
	},

	change : function(page, doc) {
	},

	// if ID is found, will return an object like this:
	// { type : "match", id : "123456789", tag : "matchid" },
	// or like this:
	// { type : "arena", id : "123456" }
	// otherwise, return null
	getIdFromLink : function(link) {
		if (typeof(link) !== "string" || link.search(/^javascript/i) === 0) {
			return null;
		}
		for (var index in this.ID) {
			var current = this.ID[index];
			if (link.search(current.re) !== -1) {
				var match = link.match(current.re);
				var id = "";
				for (var matchIndex = 1; matchIndex < match.length; ++matchIndex) {
					id += match[matchIndex];
					if (matchIndex !== match.length - 1) {
						id += ".";
					}
				}
				var ret = {};
				ret.type = current.type;
				ret.id = id;
				ret.tag = current.tag;
				return ret;
			}
		}
		// no tagged ID is found, go on to find if there is non-tagged ID
		var generalRe = /([a-z]+)+ID=(\d+)/i;
		if (link.search(generalRe) !== -1) {
			var match = link.match(generalRe);
			var ret = {};
			ret.type = match[1];
			ret.id = match[2];
			return ret;
		}
		// return null if nothing is found
		return null;
	},

	// returns a string link like "[matchid=123456789]"
	// or "[link=/Club/…]" or "[link=ftp://example.org/…]"
	getMarkupFromLink : function(link) {
		var idObj = this.getIdFromLink(link);
		var ret = null;
		if (idObj !== null && idObj.tag !== undefined) {
			ret = "[" + idObj.tag + "=" + idObj.id + "]";
		}
		else if (typeof(link) === "string") {
			const relRe = new RegExp("http://[^/]+(/.+)", "i");
			if (link.match(relRe) !== null) {
				var relLink = link.match(relRe)[1];
				ret = "[link=" + relLink + "]";
			}
		}
		return ret;
	},

	getMarkupFromNode : function(node) {
		if (node.nodeName === undefined) {
			return null;
		}

		var doc = node.ownerDocument;
		var window = doc.defaultView;

		var computedStyle = null;
		if (node.nodeType === Node.ELEMENT_NODE) {
			computedStyle = window.getComputedStyle(node, null);
		}

		if (computedStyle && computedStyle.getPropertyValue("display") === "none") {
			return "";
		}

		var nodeName = node.nodeName.toLowerCase();

		// we consider these nodes as stand-alone elements
		if (nodeName === "img") {
			if (node.hasAttribute("alt") && node.getAttribute("alt") !== "") {
				return node.getAttribute("alt");
			}
			else if (node.hasAttribute("title") && node.getAttribute("title") !== "") {
				return node.getAttribute("title");
			}
			else {
				return "";
			}
		}
		else if (nodeName === "hr") {
			return "[hr]";
		}
		else if (nodeName === "br") {
			return "\n";
		}

		var ret = "";

		if (!node.hasChildNodes()) {
			ret = this.trim(node.textContent);
		}
		else {
			var children = node.childNodes;
			for (var i = 0; i < children.length; ++i) {
				// recursively get the content of child nodes
				ret += this.getMarkupFromNode(children[i]);
				if (i !== children.length - 1) {
					ret += " ";
				}
			}
		}

		if (nodeName === "a") {
			if (node.href !== undefined) {
				var linkMarkup = this.getMarkupFromLink(node.href);
				if (linkMarkup !== null) {
					ret += linkMarkup;
				}
			}
		}
		else if (nodeName === "table" || nodeName === "tr") {
			ret = "[" + nodeName + "]" + ret + "[/" + nodeName + "]\n";
		}
		else if (nodeName === "th" || nodeName === "td") {
			var colspan = "";
			var rowspan = "";
			if (node.hasAttribute("colspan") && node.getAttribute("colspan") !== "") {
				colspan = " colspan=" + node.getAttribute("colspan");
			}
			if (node.hasAttribute("rowspan") && node.getAttribute("rowspan") !== "") {
				rowspan = " rowspan=" + node.getAttribute("rowspan");
			}
			ret = "[" + nodeName + colspan + rowspan + "]" + ret + "[/" + nodeName + "]";
		}
		else if (nodeName === "div" || nodeName === "p" || nodeName.search(/^h[1-6]$/i) !== -1) {
			ret += "\n";
		}

		return ret;
	},

	trim : function(string) {
		return string.replace(RegExp("^\\s+"), "")
			.replace(RegExp("\\s+$"), "")
			.replace(RegExp("\\s*\n\\s*", "g"), "\n")
			.replace(RegExp("(\\s)\\s+", "g"), "$1");
	},

	copyId : function() {
		if (FoxtrickContextMenuCopy.MENU_ID) {
			if (FoxtrickContextMenuCopy.MENU_ID.hasAttribute("copy")) {
				Foxtrick.copyStringToClipboard(FoxtrickContextMenuCopy.MENU_ID.getAttribute("copy"));
			}
		}
	},

	copyLink : function() {
		if (FoxtrickContextMenuCopy.MENU_LINK) {
			if (FoxtrickContextMenuCopy.MENU_LINK.hasAttribute("copy")) {
				Foxtrick.copyStringToClipboard(FoxtrickContextMenuCopy.MENU_LINK.getAttribute("copy"));
			}
		}
	},

	copyHtMl : function() {
		if (!FoxtrickContextMenuCopy.SELECTION) {
			return;
		}
		var markup = "";
		for (var i = 0; i < FoxtrickContextMenuCopy.SELECTION.rangeCount; ++i) {
			markup += FoxtrickContextMenuCopy.getMarkupFromNode(FoxtrickContextMenuCopy.SELECTION.getRangeAt(i).cloneContents());
			if (i !== FoxtrickContextMenuCopy.SELECTION.rangeCount - 1) {
				markup += "\n";
			}
		}
		markup = FoxtrickContextMenuCopy.trim(markup);
		Foxtrick.copyStringToClipboard(markup);
	},

	onContext : function(event) {
		try {
			var href = null;
			var currentObj = event.target;
			while (currentObj) {
				if (currentObj.href !== undefined) {
				href = currentObj.href;
					break;
				}
				currentObj = currentObj.parentNode;
			}

			if (Foxtrick.isModuleFeatureEnabled(FoxtrickContextMenuCopy, "Id")) {
				var id = FoxtrickContextMenuCopy.getIdFromLink(href);
				if (id !== null) {
					FoxtrickContextMenuCopy.MENU_ID.setAttribute("copy", id.id);
					var idText = Foxtrickl10n.getString("copy.id").replace("%s", id.type + " ID").replace("%i", id.id);
					FoxtrickContextMenuCopy.MENU_ID.setAttribute("label", idText);
					FoxtrickContextMenuCopy.MENU_ID.setAttribute("hidden", false);
				}
				else {
					FoxtrickContextMenuCopy.MENU_ID.setAttribute("hidden", true);
				}
			}
			else {
				FoxtrickContextMenuCopy.MENU_ID.setAttribute("hidden", true);
			}

			if (Foxtrick.isModuleFeatureEnabled(FoxtrickContextMenuCopy, "Link")) {
				var markup = FoxtrickContextMenuCopy.getMarkupFromLink(href);
				if (markup !== null) {
					FoxtrickContextMenuCopy.MENU_LINK.setAttribute("copy", markup);
					FoxtrickContextMenuCopy.MENU_LINK.setAttribute("hidden", false);
				}
				else {
					FoxtrickContextMenuCopy.MENU_LINK.setAttribute("hidden", true);
				}
			}
			else {
				FoxtrickContextMenuCopy.MENU_LINK.setAttribute("hidden", true);
			}

			if (Foxtrick.isModuleFeatureEnabled(FoxtrickContextMenuCopy, "HtMl")) {
				var doc = event.target.ownerDocument;
				var window = doc.defaultView;
				var selection = window.getSelection();
				if (!selection.isCollapsed && selection.rangeCount > 0) {
					FoxtrickContextMenuCopy.SELECTION = selection;
					FoxtrickContextMenuCopy.MENU_HT_ML.setAttribute("hidden", false);
				}
				else {
					FoxtrickContextMenuCopy.MENU_HT_ML.setAttribute("hidden", true);
				}
			}
			else {
				FoxtrickContextMenuCopy.MENU_HT_ML.setAttribute("hidden", true);
			}
		}
		catch (e) {
			Foxtrick.dumpError(e);
			FoxtrickContextMenuCopy.MENU_ID.setAttribute("hidden", true);
			FoxtrickContextMenuCopy.MENU_LINK.setAttribute("hidden", true);
			FoxtrickContextMenuCopy.MENU_HT_ML.setAttribute("hidden", true);
		}
	}
};
