/**
 * header-fix.js
 * Script which fixes the header
 * @author htbaumanns, CSS by Catalyst2950
 */

var FoxtrickHeaderFix = {

	MODULE_NAME : "HeaderFix",
	MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : new Array('match','arena'),
	ONPAGEPREF_PAGE : 'all',
	OPTIONS : new Array("FixLeft","RemoveFlicker"),
	CSS_SIMPLE : Foxtrick.ResourcePath+"resources/css/headerfix.css",
	CSS: Foxtrick.ResourcePath+"resources/css/headerfix_std.css",
	CSS_SIMPLE_RTL : Foxtrick.ResourcePath+"resources/css/headerfix_rtl.css",
	CSS_RTL : Foxtrick.ResourcePath+"resources/css/headerfix_std_rtl.css",
	OPTIONS_CSS: new Array ("",Foxtrick.ResourcePath+"resources/css/fixes/RemoveHeaderFixFlicker.css"),

	init : function() {
		if (FoxtrickPrefs.isModuleOptionEnabled( this, "FixLeft"))
			FoxtrickPrefs.setBool( "module.HeaderFixLeft.enabled", true );
		else FoxtrickPrefs.setBool( "module.HeaderFixLeft.enabled", false );
	},

	run : function(doc) {
		if (doc.location.href.search(/isYouth/i)!=-1) return;

		var isArena = Foxtrick.isPage("arena", doc);
		var isMatch = Foxtrick.isPage("match", doc);

		var ctl00_ctl00_CPContent_CPMain_pnl = doc.getElementById("ctl00_ctl00_CPContent_CPMain_pnlPreMatch");
		if (isArena)  ctl00_ctl00_CPContent_CPMain_pnl = doc.getElementById("ctl00_ctl00_CPContent_CPMain_pnlMain");
		var ctl00_ctl00_CPContent_CPMain_pnlTeamInfo = doc.getElementById("ctl00_ctl00_CPContent_CPMain_pnlTeamInfo");
		var ctl00_ctl00_CPContent_CPMain_pnlArenaFlash = doc.getElementById("ctl00_ctl00_CPContent_CPMain_pnlArenaFlash");

		// check right page and is supporter
		if (isMatch && (!ctl00_ctl00_CPContent_CPMain_pnl || !ctl00_ctl00_CPContent_CPMain_pnlTeamInfo)) return;
		if (isArena && !ctl00_ctl00_CPContent_CPMain_pnl) return;
		if (!ctl00_ctl00_CPContent_CPMain_pnlArenaFlash) return;

		if (isArena && ctl00_ctl00_CPContent_CPMain_pnl.getElementsByTagName('h1').length > 1) return; // don't move if arena is under constriction

		// get some divs to move
		var arenaInfo = ctl00_ctl00_CPContent_CPMain_pnlArenaFlash.nextSibling;
		var separator=null;
		var mainBox=null;
		var divs = ctl00_ctl00_CPContent_CPMain_pnl.getElementsByTagName('div');
		for (var i=0;i<divs.length;++i) {
			if (divs[i].className=='arenaInfo') {arenaInfo=divs[i];}
			if (divs[i].className=='separator') {separator=divs[i];}
			if (divs[i].className=='mainBox') {mainBox=divs[i];}
		}

		// reduce margins of new top div
		if (ctl00_ctl00_CPContent_CPMain_pnlTeamInfo) ctl00_ctl00_CPContent_CPMain_pnlTeamInfo.setAttribute('style','float:left !important; margin-top:-20px;');
		else {
			mainBox.getElementsByTagName('h2')[0].setAttribute('style',' margin-top:-20px;');
			if (Foxtrick.util.layout.isStandard(doc)) mainBox.setAttribute('style',' margin-bottom:0px;');
		}

		// move or delete seperator
		if (separator && (isMatch || !Foxtrick.util.layout.isStandard(doc))) {
			separator = ctl00_ctl00_CPContent_CPMain_pnl.removeChild(separator);
			ctl00_ctl00_CPContent_CPMain_pnl.appendChild(separator);
		}
		// move areainfo
		if (arenaInfo) {
			arenaInfo = ctl00_ctl00_CPContent_CPMain_pnl.removeChild(arenaInfo);
			ctl00_ctl00_CPContent_CPMain_pnl.appendChild(arenaInfo);
			var margin;
			if (isArena) margin='margin-right:18px';
			else margin='';
			if (Foxtrick.util.layout.isStandard(doc)) arenaInfo.setAttribute('style','float:right !important;');
			else arenaInfo.setAttribute('style','float:right !important; width:190px !important;'+margin);
		}

		// move flash
		ctl00_ctl00_CPContent_CPMain_pnlArenaFlash = ctl00_ctl00_CPContent_CPMain_pnl.removeChild(ctl00_ctl00_CPContent_CPMain_pnlArenaFlash);
		ctl00_ctl00_CPContent_CPMain_pnl.appendChild(ctl00_ctl00_CPContent_CPMain_pnlArenaFlash);
		ctl00_ctl00_CPContent_CPMain_pnlArenaFlash.setAttribute('style','margin-top:25px;');
		if (isArena) 	ctl00_ctl00_CPContent_CPMain_pnlArenaFlash.setAttribute('style','margin-top:25px; margin-left:-8px !important; margin-right:-3px !important;');
	}
};

var FoxtrickHeaderFixLeft = {
	MODULE_NAME : "HeaderFixLeft",
	CSS_SIMPLE : Foxtrick.ResourcePath+"resources/css/headerfix_left.css",
	CSS_SIMPLE_RTL : Foxtrick.ResourcePath+"resources/css/headerfix_rtl_left.css",
	CSS: Foxtrick.ResourcePath+"resources/css/headerfix_std_left.css",
	CSSRTL : Foxtrick.ResourcePath+"resources/css/headerfix_std_rtl_left.css",

	init : function() {
		if (!FoxtrickPrefs.isModuleEnabled("HeaderFix"))
			FoxtrickPrefs.setBool( "module.HeaderFixLeft.enabled", false );
	}
};
