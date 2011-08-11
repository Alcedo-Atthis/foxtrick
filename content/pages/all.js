/* all.js
 * Utilities on all pages
 * @author ryanli
 *
 * Pages under this directory need not to be modules, they only provide utility
 * functions for retrieving page-specific information, and serve like libraries.
 *
 * Hence they only need to be included in overlay.xul, not needed to include
 * in preferences.html.
 *
 * Furthermore, since the functions here are page-specific, generally speaking
 * their first arguments need to be `doc'.
 */

 
if (!Foxtrick) var Foxtrick = {};
Foxtrick.Pages = {};

Foxtrick.Pages.All = {
	getId : function(doc) {
		var parseId = function(link) {
			var matched = link.href.match(/id=(\d+)/i);
			if (matched)
				return Number(matched[1]);
			return null;
		};
		var idContainer =  doc.getElementById('mainWrapper').getElementsByTagName("a")[0];
		if (idContainer)
			return {'id':parseId(idContainer), 'name':idContainer.textContent};
	},
	get : function(doc) {
		var parseId = function(span) {
			var matched = span.textContent.match(/^\((\d+)\)$/);
			if (matched)
				return Number(matched[1]);
			return null;
		};
		var header = doc.getElementsByTagName("h1")[0];
		var spans = header.getElementsByTagName("span");
		var idContainer = Foxtrick.filter(spans, function(n) {
			return parseId(n) !== null;
		})[0];
		if (idContainer)
			return parseId(idContainer);
	},
	getOwnTeamId : function(doc) {
		try {
			var id =  Foxtrick.util.id.getOwnTeamId();
			if (id) {
				return id;
			}
		}
		catch (e) {
			Foxtrick.log(e);
		}
		return null;
	},
	getTeamId : function(doc) {
		try {
			var id = Foxtrick.util.id.findTeamId(doc.getElementById("content").getElementsByTagName("div")[0]);
			if (id) {
				return id;
			}
		}
		catch (e) {
			Foxtrick.log(e);
		}
		return null;
	},
	getTeamName : function(doc) {
		try {
			var mainRegular = doc.getElementsByClassName("mainRegular")[0];
			var header = mainRegular.getElementsByTagName("h2")[0];
			var links = header.getElementsByTagName("a")[0];
			for (var i = 0; i < links.length; ++i) {
				if (links[i].search(/TeamID=\d+/) !== -1) {
					return links[i].textContent;
				}
			}
		}
		catch (e) {
			Foxtrick.log(e);
		}
		return null;
	},
	isLoggedIn : function(doc) {
		var teamLinks = doc.getElementById("teamLinks");
		return !!teamLinks && teamLinks.getElementsByTagName("a").length > 0;
	}
};
