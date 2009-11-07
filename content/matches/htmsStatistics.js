/** * htmsStatistics.js * adds some statistics on matches based on HTMS web site info * @author taised */////////////////////////////////////////////////////////////////////////////////Foxtrick.htmsStatistics = {		MODULE_NAME : "htmsStatistics",	MODULE_CATEGORY : Foxtrick.moduleCategories.MATCHES,	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,	PAGES : new Array('match'), 	DEFAULT_ENABLED : true,	NEW_AFTER_VERSION: "0.4.8.9",	LATEST_CHANGE:"Adds some statistics on matches based on HTMS web site info",	init : function() {		Foxtrick.Matches.init();	},	run : function( page, doc ) { 		try {			var isprematch = (doc.getElementById("ctl00_CPMain_pnlPreMatch")!=null);			if (isprematch) return;						var ratingstable = Foxtrick.Matches._getRatingsTable(doc);			if (ratingstable == null) return;			var tacticRow=ratingstable.rows.length-2;			//Foxtrick.LOG('got table '+tacticRow+' : '+ratingstable.rows[tacticRow].innerHTML)			if (Foxtrick.Matches._isWalkOver(ratingstable)) return;			if (!Foxtrick.Matches._isCorrectLanguage(ratingstable)) { // incorrect language				var row = ratingstable.insertRow(8);				var cell = row.insertCell(0);				cell.setAttribute("colspan" , 3);				cell.innerHTML = Foxtrickl10n.getString( "foxtrick.matches.wronglang" );				return;			}			var midfieldLevel=new Array(Foxtrick.Matches._getStatFromCell(ratingstable.rows[1].cells[1]), Foxtrick.Matches._getStatFromCell(ratingstable.rows[1].cells[2]));			midfieldLevel[0]=midfieldLevel[0]*4+1;			midfieldLevel[1]=midfieldLevel[1]*4+1;			var rdefence=new Array(Foxtrick.Matches._getStatFromCell(ratingstable.rows[2].cells[1]), Foxtrick.Matches._getStatFromCell(ratingstable.rows[2].cells[2]));			rdefence[0]=rdefence[0]*4+1;			rdefence[1]=rdefence[1]*4+1;			var cdefence=new Array(Foxtrick.Matches._getStatFromCell(ratingstable.rows[3].cells[1]), Foxtrick.Matches._getStatFromCell(ratingstable.rows[3].cells[2]));			cdefence[0]=cdefence[0]*4+1;			cdefence[1]=cdefence[1]*4+1;			var ldefence=new Array(Foxtrick.Matches._getStatFromCell(ratingstable.rows[4].cells[1]), Foxtrick.Matches._getStatFromCell(ratingstable.rows[4].cells[2]));			ldefence[0]=ldefence[0]*4+1;			ldefence[1]=ldefence[1]*4+1;			var rattack=new Array(Foxtrick.Matches._getStatFromCell(ratingstable.rows[5].cells[1]), Foxtrick.Matches._getStatFromCell(ratingstable.rows[5].cells[2]));			rattack[0]=rattack[0]*4+1;			rattack[1]=rattack[1]*4+1;			var cattack=new Array(Foxtrick.Matches._getStatFromCell(ratingstable.rows[6].cells[1]), Foxtrick.Matches._getStatFromCell(ratingstable.rows[6].cells[2]));			cattack[0]=cattack[0]*4+1;			cattack[1]=cattack[1]*4+1;			var lattack=new Array(Foxtrick.Matches._getStatFromCell(ratingstable.rows[7].cells[1]), Foxtrick.Matches._getStatFromCell(ratingstable.rows[7].cells[2]));			lattack[0]=lattack[0]*4+1;			lattack[1]=lattack[1]*4+1;			var tactics;			var tacticsLevel;			// var tacticRow=14;			// if (FoxtrickHelper.findIsYouthMatch(doc.location.href)) {				// tacticRow=10;			// }						tactics=new Array(Foxtrick.Matches._getTacticsFromCell(ratingstable.rows[tacticRow].cells[1]), Foxtrick.Matches._getTacticsFromCell(ratingstable.rows[tacticRow].cells[2]));			tacticsLevel=new Array(Foxtrick.Matches._getTacticsLevelFromCell(ratingstable.rows[tacticRow+1].cells[1]), Foxtrick.Matches._getTacticsLevelFromCell(ratingstable.rows[tacticRow++].cells[2]));            //Foxtrick.LOG('rows '+ratingstable.rows.length+' Tactics:['+ tactics + '], TacticsLevel:[' +tacticsLevel +']'+ '\n');						//Creating params for link			var lang=FoxtrickPrefs.getString("htLanguage");             //if (!((lang=='it') || (lang=='fr'))) lang='en';			var params='&TAM='+midfieldLevel[0]+'&TBM='+midfieldLevel[1];			params+='&TARD='+rdefence[0]+'&TBRD='+rdefence[1];			params+='&TACD='+cdefence[0]+'&TBCD='+cdefence[1];			params+='&TALD='+ldefence[0]+'&TBLD='+ldefence[1];			params+='&TARA='+rattack[0]+'&TBRA='+rattack[1];			params+='&TACA='+cattack[0]+'&TBCA='+cattack[1];			params+='&TALA='+lattack[0]+'&TBLA='+lattack[1];			if (tactics[0]=='aow') {				params+='&TATAC=AOW&TATACLEV='+tacticsLevel[0];			}			if (tactics[0]=='aim') {				params+='&TATAC=AIM&TATACLEV='+tacticsLevel[0];			}			if (tactics[0]=='pressing') {				params+='&TATAC=PRES&TATACLEV='+tacticsLevel[0];			}			if (tactics[0]=='ca') {				params+='&TATAC=CA&TATACLEV='+tacticsLevel[0];			}			if (tactics[1]=='aow') {				params+='&TBTAC=AOW&TBTACLEV='+tacticsLevel[1];			}			if (tactics[1]=='aim') {				params+='&TBTAC=AIM&TBTACLEV='+tacticsLevel[1];			}			if (tactics[1]=='pressing') {				params+='&TBTAC=PRES&TBTACLEV='+tacticsLevel[1];			}			if (tactics[1]=='ca') {				params+='&TBTAC=CA&TBTACLEV='+tacticsLevel[1];			}			//Foxtrick.LOG(tactics[0]+' - '+tactics[1]);						//Inserting a blank line			var row = ratingstable.insertRow(ratingstable.rows.length);			var cell = row.insertCell(0);			cell.innerHTML='&nbsp;';						//Inserting header cell			row = ratingstable.insertRow(ratingstable.rows.length);			cell = row.insertCell(0);			cell.className='ch';			cell.innerHTML = Foxtrickl10n.getString( "foxtrick.htmsStatistics.prediction.desc" );						//Inserting cell with bar			cell = row.insertCell(1);			cell.setAttribute("colspan", 2);			cell.setAttribute('align', 'center');			//version with img -- NOT WORKING			//cell.innerHTML = '<a class="inner" target="_stats" href="http://www.fantamondi.it/HTMS/index.php?page=predictor&lang='+lang+params+'"><img src="chrome://foxtrick/content/resources/linkicons/htms.png"></a>';			//version with iframe			var barwidth=320;			var framewidth=barwidth+10;			var barheight=50;			var frameheight=barheight+95;			cell.innerHTML = '<iframe width="'+framewidth+'" height="'+frameheight+'" frameborder="0" src="http://www.fantamondi.it/HTMS/dorequest.php?action=showpredict&lang='+lang+params+'&width='+barwidth+'&height='+barheight+'"></iframe>';			/*		// iframe alternative		var req = new XMLHttpRequest();		req.open('GET', 'http://www.fantamondi.it/HTMS/dorequest.php?action=showpredict&lang='+lang+params+'&width='+barwidth+'&height='+barheight, false); 		req.send(null);		if(req.status == 200)			dump(req.responseText);*/  		} catch (e) {			Foxtrick.LOG('htmsStatistics.js run: '+e+"\n");		}	},	change : function( page, doc ) { 	},};