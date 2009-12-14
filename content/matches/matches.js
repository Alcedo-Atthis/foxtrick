/**
 * matches.js
 * adds info on matches page
 * @author taised, Jestar
 */
////////////////////////////////////////////////////////////////////////////////
Foxtrick.Matches = {

    MODULE_NAME : "Matches",
	DEFAULT_ENABLED : true,
	PAGES : new Array('match'), 

	htLanguagesXml : null,
	matchxmls: new Array(),
	
	init : function() {
		this.initHtLang();
	},
	
	run : function(page,doc) {
	/*try{
		var matchid = FoxtrickHelper.getMatchIdFromUrl(doc.location.href); 
		var isarchivedmatch = (doc.getElementById("ctl00_CPMain_lblMatchInfo")==null);
		var isprematch = (doc.getElementById("ctl00_CPMain_pnlPreMatch")!=null);
		if (isprematch) return;
		
		if (isarchivedmatch && typeof(this.matchxmls[matchid]) == 'undefined') {
			var req = new XMLHttpRequest();
			req.open('GET', 'http://'+doc.location.hostname+'/Community/CHPP/Matches/chppxml.axd?file=matchdetails&matchID='+matchid+'&matchEvents=true', false); 
			req.send(null);
			if (req.status == 200) {
				this.matchxmls[matchid] = req.responseXML;
				dump('matches.js: get new xml\n');
			}
			else Foxtrick.dump('matches.js: xml request failed\n');
		}
	} catch(e){Foxtrick.dump('matches.js run: '+e+'\n');}*/
	},

	change : function(page,doc) {
	},
	
	_getRatingsTable: function(doc) {
		var ratingstable = null;
		var tables = doc.getElementById('mainBody').getElementsByTagName('table')
		if (tables) { //match is ended
			//finding the right table
			ratingstable = tables.item(0);
		}
		return ratingstable;
	},
	
	_isWalkOver: function(ratingstable) {
		try {
			for (var i = 1; i <= 7; i++) {
				for (var j = 1; j <= 2; j++) {
					var value = this._getStatFromCell(ratingstable.rows[i].cells[j]);
					if (value > 0) { // no Walk-over
						return false;
					}
				}
			}
		} catch (e) {
			Foxtrick.dump('matches.js _isWalkOver: ' +e + "\n");
		}
		return true;
	},
	
	_isCorrectLanguage: function(ratingstable) {
		try {
			for (var i = 1; i <= 7; i++) {
				for (var j = 1; j <= 2; j++) {
					var value = this._getStatFromCell(ratingstable.rows[i].cells[j]);
					if (value < 0) { // wrong language
						return false;
					}
				}
			}
		} catch (e) {
			Foxtrick.dump('matches.js _isCorrectLanguage: ' +e + "\n");
		}
		return true;
	},

	_getStatFromCell: function(cell)
	{
		var link = cell.firstChild;
		var baseValue = parseInt(link.href.replace(/.+lt=skill/i, "").replace(/.+ll=/i, "").match(/^\d+/)) - 1;
		if (baseValue == -1) {
			return 0; // non-existant
		}
		
		var subLevelValue=0;
				
		try {
		  var lang = FoxtrickPrefs.getString("htLanguage");
		} catch (e) {
		  lang = "en";
		}

		try {
			var subLevel = Foxtrick.trim(link.parentNode.textContent.substring(link.textContent.length));			
			var path = "hattricklanguages/language[@name='" + lang + "']/ratingSubLevels/sublevel[@text='" + subLevel + "']";
			subLevelValue = Foxtrick.xml_single_evaluate(this.htLanguagesXml, path, "value");
			if (!subLevelValue)	return -1;
		} catch (e) {
			Foxtrick.dump('matches.js _getStatFromCell: '+e + "\n");
		}

		return baseValue+parseFloat(subLevelValue);
	},

	_getTacticsLevelFromCell: function(cell) {
		var basevalue=0;
		if (cell.firstChild.nodeName=='A')
			basevalue=parseInt(cell.firstChild.href.replace(/.+lt=skill/i, "").replace(/.+ll=/i, "").match(/^\d+/));
		return basevalue;
	},

	_getTacticsFromCell: function(cell) {
		var tactics=Foxtrick.trim(cell.innerHTML);
		try {
			var lang = FoxtrickPrefs.getString("htLanguage");
		} catch (e) {
			lang = "en";
		}

		try {
			var path = "hattricklanguages/language[@name='" + lang + "']/tactics/tactic[@value=\"" + tactics + "\"]";
			subLevelValue = Foxtrick.xml_single_evaluate(this.htLanguagesXml, path, "type");
			if (subLevelValue) return subLevelValue
			else return -1;
		} catch (e) {
			Foxtrick.dump('matches.js _getTacticsFromCell: '+e + "\n");
		}
		return null;

	},

	initHtLang: function ()
	{
		try {
			this.htLanguagesXml = Foxtrick.loadXmlIntoDOM("chrome://foxtrick/content/htlocales/htlang.xml");
		} catch (e) {
			Foxtrick.dump('matches.js initHtLang: '+e+"\n");
		}
	},

};