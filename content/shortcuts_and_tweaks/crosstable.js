/**
 * crosstable.js
 * adds cross table to fixtures
 * @author spambot
 */

var FoxtrickCrossTable = {

    MODULE_NAME : "CrossTable",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : new Array('fixtures'),
	DEFAULT_ENABLED : true,
    OPTIONS :  new Array("allway_show_cross", "allway_show_graph"),
	NEW_AFTER_VERSION: "0.5.1.3",
	LATEST_CHANGE : "Let table expand, and show full name in graph.",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,

    _week : 14,

    run : function( page, doc ) {
        var tbl_cross = (doc.getElementById("ft_cross")!=null);
		if (tbl_cross) return;

		//var DefaultShow = Foxtrick.isModuleFeatureEnabled( this, "DefaultShow" );

        try {
            var width = 540;
            if (!Foxtrick.isStandardLayout(doc)) {
            	width = 440;
            }

            var div = doc.getElementById('mainBody');


    		Foxtrick.addStyleSheet(doc, Foxtrick.ResourcePath+"resources/css/crosstable.css");

            var tbl_fix = div.getElementsByTagName('TABLE')[0];

            tbl_fix.id = 'ft_fixture';

			var names_tmp = new Array(8);
			var names_early = new Array(8);
			var names_late = new Array(8);

            var cross = new Array(  new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1));

            var crossgame = new Array(  new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1),
                                    new Array( '', -1 , -1 , -1 , -1 , -1, -1 , -1 , -1));

            var week =  new Array(  new Array( '', 0 , 0 , 0 , 0 , 0, 0 , 0 , 0, 0 , 0 , 0 , 0 , 0, 0),
                                    new Array( '', 0 , 0 , 0 , 0 , 0, 0 , 0 , 0, 0 , 0 , 0 , 0 , 0, 0),
                                    new Array( '', 0 , 0 , 0 , 0 , 0, 0 , 0 , 0, 0 , 0 , 0 , 0 , 0, 0),
                                    new Array( '', 0 , 0 , 0 , 0 , 0, 0 , 0 , 0, 0 , 0 , 0 , 0 , 0, 0),
                                    new Array( '', 0 , 0 , 0 , 0 , 0, 0 , 0 , 0, 0 , 0 , 0 , 0 , 0, 0),
                                    new Array( '', 0 , 0 , 0 , 0 , 0, 0 , 0 , 0, 0 , 0 , 0 , 0 , 0, 0),
                                    new Array( '', 0 , 0 , 0 , 0 , 0, 0 , 0 , 0, 0 , 0 , 0 , 0 , 0, 0),
                                    new Array( '', 0 , 0 , 0 , 0 , 0, 0 , 0 , 0, 0 , 0 , 0 , 0 , 0, 0));
            //get early Teams
            var tblBodyObj = tbl_fix.tBodies[0];

            for (var i = 0; i < 4; i++) {
                var dummy = tblBodyObj.rows[i+1].cells[1].innerHTML;
                dummy = dummy.split('">')[1].split('</a>')[0].split('&nbsp;-&nbsp;');
                // Foxtrick.dump('['+ dummy + ']\n');

                names_tmp[i*2] = dummy[0];
                names_tmp[i*2 + 1] = dummy[1];
                //Foxtrick.dump(i+' ' + names_tmp[i*2] + ' - ' + names_tmp[i*2+1]+'\n');
            }
			// get late teams
			var last_fixture=13*5;
			for (var i = 0; i < 4; i++) {
                var dummy = tblBodyObj.rows[i+1+last_fixture].cells[1].innerHTML;
                dummy = dummy.split('">')[1].split('</a>')[0].split('&nbsp;-&nbsp;');
                //Foxtrick.dump('['+ dummy + ']\n');

                names_late[i*2] = dummy[0]; cross[i*2][0] = dummy[0]; crossgame[i*2][0] = dummy[0]; week[i*2][0] = dummy[0];
                names_late[i*2 + 1] = dummy[1]; cross[i*2 + 1][0] = dummy[1]; crossgame[i*2+1][0] = dummy[1]; week[i*2+1][0] = dummy[1];
                //Foxtrick.dump(i+' ' + names_late[i*2] + ' - ' + names_late[i*2+1]+'\n');
            }
			// compare and align
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 4; j++) {
					if (j==4) { break;}
					if (names_late[i*2] == names_tmp[j*2+1]) {
						names_early[i*2] = names_tmp[j*2+1];
						names_early[i*2+1] = names_tmp[j*2];
						//Foxtrick.dump(i+'  '+names_late[i*2]+' : '+names_tmp[j*2+1]+' - '+names_late[i*2+1] +' : '+ names_tmp[j*2]+'\n');
						names_tmp[j*2]='';
						continue;
					}
					else if (names_late[i*2+1] == names_tmp[j*2]) {
						names_early[i*2] = names_tmp[j*2+1];
						names_early[i*2+1] = names_tmp[j*2];
						//Foxtrick.dump(i+'  '+names_late[i*2]+' : '+names_tmp[j*2+1]+' - '+names_late[i*2+1] +' : '+ names_tmp[j*2]+'\n');
						names_tmp[j*2]='';
						continue;
					}
				}
            }
			// if more than team has changed
			for (var i = 0; i < 4; i++) {
				if (!names_early[i*2]){
					for (var j = 0; j < 4; j++) {
						if (names_tmp[j*2]!='') {
							names_early[i*2] = names_tmp[j*2+1];
							names_early[i*2+1] = names_tmp[j*2];
							names_tmp[j*2]='';
						}
					}
				}
			}
            Foxtrick.dump('names_early: \n' + Foxtrick.var_dump(names_early) + '<br>\n');
            Foxtrick.dump('names_late: \n' + Foxtrick.var_dump(names_late) + '<br>\n');
            //results
            var row = 0; points_aw = 0; points_hm = 0;
            var weekcount = 1;
            for (var j = 0; j<14; j++){ //day
                // Foxtrick.dump(j + ' [--------------------------------\n');
                Foxtrick.dump('<br><b>Matchday ' + (j+1) + '</b>\n');
                for (var i = 0; i<4 ; i++) { //row
                    row = j*5 + i+1;

                    var dummy = tblBodyObj.rows[row].cells[1].innerHTML;

                    dummy = dummy.split('">')[1].split('</a>')[0].split('&nbsp;-&nbsp;');

                    var crossID = tblBodyObj.rows[row].cells[1].innerHTML.split('matchID=')[1].split('&amp;TeamId=')[0];
                    // Foxtrick.dump('row [' + row + ']  "'+ dummy[0] + '" "' + dummy[1] + '"\n');
                    var home = -1;
                    var away = -1;
                    var homegame = false;

                    //Team 1-2
                    for (var k = 0; k<8; k++){ //vs
                        if (!Foxtrick.isRTLLayout(doc)) {
							if (dummy[0] == names_early[k]) {home = k; homegame = true;}
							else if (dummy[1] == names_early[k]) {away = k}
							else if (dummy[0] == names_late[k]) {home = k; homegame = true;}
							else if (dummy[1] == names_late[k]) {away = k}
						}
						else {
							if (dummy[0] == names_early[k]) {away = k}
							else if (dummy[1] == names_early[k]) {home = k; homegame = true;}
							else if (dummy[0] == names_late[k]) {away = k}
							else if (dummy[1] == names_late[k]) {home = k; homegame = true;}
						}

                        if (home != -1 && away != -1) {
                                Foxtrick.dump('dummy: ' +dummy + ' k: ' + k + ' home: <b>' + home + ' away: '+ away + '</b>\n');
                            }
                        else {
                                // Foxtrick.dump('dummy: ' +dummy + ' k: ' + k + ' home: ' + home + ' away: '+ away + '\n');
                            }
                        if (k == 7 && (home == -1 || away == -1))
                            Foxtrick.dump('<b style="color:red;"> NOT FOUND! </b> '+dummy + ' home: <b>' + home + ' away: '+ away + '</b>\n');
                        if ((home != -1) && (away != -1)) {

                            var result = tblBodyObj.rows[row].cells[2].innerHTML.split('-');

                            crossgame[home][away+1] = crossID;

                            if (!result[1]) {
                                result[0] = -1;
                                result[1] = -1;

                            }
                            else {
                                result[0] = parseInt(Foxtrick.trim(result[0]));
                                result[1] = parseInt(Foxtrick.trim(result[1]));
                                tblBodyObj.rows[row].cells[2].innerHTML = result[0] + ' - ' + result[1];
                            }
                            if ((homegame) && (result[0] != -1)) {
                                cross[home][away+1] = result[0] + '-' + result[1];
                                var points_hm = 1000000, points_aw = 1000000;
                                if (result[0] > result[1]) {points_hm = 3000000; points_aw = 0;}
                                if (result[0] < result[1]) {points_hm = 0; points_aw = 3000000;}
                                if (j == 0) {var old_hm = 0; var old_aw = 0;} else {old_hm = week[home][j]; old_aw = week[away][j];}
                                week[home][j+1] = points_hm + old_hm + ((result[0] - result[1]) * 1000);
                                week[away][j+1] = points_aw + old_aw + ((result[1] - result[0]) * 1000) + result[1];
                                weekcount = j+1;
                                //Foxtrick.dump(weekcount + ' - ');
                            }
                            else {
                                cross[home][away+1] = '-';
                                week[home][j+1] = week[home][j];
                                week[away][j+1] = week[away][j];

                            }
                            //Foxtrick.dump('[' + home + ' - '+ away+'] ' + result[0]+':'+result[1] + '|' + crossgame[home][away+1] + '\n');
                            break;
                        }
                    }
                }
                // Foxtrick.dump('>>>>>>' + week + '<<<<<<\n\n');
			}

			var dayhead=0;
			for (var j = 0; j<tblBodyObj.rows.length; j++){
				if (dayhead==0) {
					tblBodyObj.rows[j].cells[1].innerHTML = '<br/>'+tblBodyObj.rows[j].cells[0].innerHTML;
					tblBodyObj.rows[j].cells[1].setAttribute('class','ch');
					tblBodyObj.rows[j].setAttribute('style','margin-top:10px;');
				}
				++dayhead;
				if  (dayhead==5) dayhead=0;
				tblBodyObj.rows[j].deleteCell(3);
				tblBodyObj.rows[j].deleteCell(0);
			}


            var head_class = "ft_ct_head_std";
            if (!Foxtrick.isStandardLayout(doc) ) {head_class = "ft_ct_head_simple";}

            var heading = doc.createElement("h2");
			heading.id =  "ft_head_cross";
			heading.className = "tblBox";
			heading.innerHTML = Foxtrickl10n.getString('foxtrick.CrossTable.TableHeader.desc');

            var divmap = doc.createElement("div");
            divmap.appendChild(heading);
            divmap.setAttribute("style","width:"+width+"px;margin:10px 0px 10px -10px;border:1px dotted #EEEEEE;font-size:10px;");
            divmap.setAttribute("id", "ft_div_cross");
            Foxtrick.addEventListenerChangeSave( heading, "click", this.HeaderClick_Cross, false );
            div.insertBefore(divmap, div.getElementsByTagName('h1')[0].nextSibling);

            var crosstable=doc.createElement('table');
            crosstable.setAttribute("id", "ft_cross");
            crosstable.setAttribute("style", "width:"+width+"px;padding:1px;font-size:10px;");
            divmap.appendChild(crosstable);

			if (!Foxtrick.isModuleFeatureEnabled(this, "allway_show_cross")) {
				Foxtrick.addClass(heading, head_class + "_arrow");
				Foxtrick.addClass(crosstable, "hidden");
			}
			else {
				Foxtrick.addClass(heading, head_class);
			}

            var tb=doc.createElement("tbody");

            crosstable.appendChild(tb);
            for (var x=0; x < 8; x++){
                var row = doc.createElement("tr");
                row.id = "ft_ct_row"+x;
                tb.appendChild(row);
                if (x==0) { //head
                    var cell = doc.createElement("th");
                    var cnt = doc.createTextNode('');
                    cell.appendChild(cnt);
                    row.appendChild(cell);

                    for (var i = 0; i<8; i++){
                        var cell = doc.createElement("th");
                        cell.setAttribute("style", "text-align:center;");
                        var cnt = doc.createTextNode(this.getShortName(cross[i][0]));
						cell.title=cross[i][0];
                        cell.appendChild(cnt);
                        row.appendChild(cell);
                    }
                    var row = doc.createElement("tr");
                    row.id = "ft_ct_row"+x;
                    tb.appendChild(row);
                }
                for (var y=0; y < 9; y++){ //zeile
                    if (y==0) var cell = doc.createElement("th"); //left head
                    else var cell = doc.createElement("td"); //inner result
                    if (cross[x][y] != -1) { //result
                            if (y == 0) {
                            	//teamnames
								var cnt = doc.createTextNode(cross[x][y]);
							}
                            else {
                                cell.setAttribute("style", "text-align:center");
                                var a = doc.createElement("a");
                                a.title = cross[x][0]+' - '+cross[y-1][0];
                                a.innerHTML = cross[x][y];
                                if (cross[x][y].split('-')[0] > cross[x][y].split('-')[1] && (y!=0))
                                    a.setAttribute("style", "font-weight:bold;text-align:center;color:green;text-decoration:none;");
                                if (cross[x][y].split('-')[0] == cross[x][y].split('-')[1] && (y!=0))
                                    a.setAttribute("style", "font-weight:bold;text-align:center;color:gray;text-decoration:none;");
                                if (cross[x][y].split('-')[0] < cross[x][y].split('-')[1] && (y!=0))
                                    a.setAttribute("style", "font-weight:bold;text-align:center;color:red;text-decoration:none;");
                                a.href = '/Club/Matches/Match.aspx?matchID=' + crossgame[x][y];
                                var cnt = a;
                            }
                        }
                    else
                        var cnt = doc.createTextNode('');
                    cell.appendChild(cnt);
                    row.appendChild(cell);
                }
            }
            div.insertBefore(divmap, div.getElementsByTagName('h1')[0].nextSibling);

			/* Graph */

            var heading = doc.createElement("h2");
			heading.id = "ft_head_graph";
			heading.className = "tblBox";
			heading.innerHTML = Foxtrickl10n.getString('foxtrick.CrossTable.GraphHeader.desc');

            var divmap = doc.createElement("div");
            divmap.appendChild(heading);
            divmap.setAttribute("style","width:"+width+"px;margin:10px 0px 10px -10px;border:1px dotted #EEEEEE;font-size:10px;");
            divmap.setAttribute("id", "ft_div_graph");
            Foxtrick.addEventListenerChangeSave(heading, "click", this.HeaderClick_Graph, false );
            div.insertBefore(divmap, div.getElementsByTagName('h1')[0].nextSibling);

            //Foxtrick.dump('\n\n>'+week+'<\n');
            //Foxtrick.dump('\n\n>'+Foxtrick.var_dump(week, 0) + '<\n');
            for (var draw=0; draw <= 15; draw++) {
                this._week = draw;
                //week.sort(this.numComparisonDesc);
                this.qsort(week, 0, 7);

                for(var act = 0; act<8; act++) {
                    if (draw>0) week[act][draw] = act+1;
                }
                // Foxtrick.dump('\n>' +' - ' + this._week + ' - '+ week + '<\n\n');
            }
            //Foxtrick.dump('\n\n>'+Foxtrick.var_dump(week, 0));
            var position = '', teams = '';
            for (var ii = 0; ii<8; ii++) {
                for(var jj = 1; jj < weekcount; jj++) {
                    position += (9-week[ii][jj]) + ',';
                }
                if (ii < 7) {position += (9-week[ii][weekcount+1]) + '|';}
                else {position += (9-week[ii][weekcount+1]);}
            }
            for (var ii = 0; ii<8; ii++) {
            	var team = escape(week[ii][0]);
            	teams += team;
            	if (ii < 7) {
            		// not the last one
            		teams += "|";
            	}
            }
            /* not working for sweden
			var league = Foxtrick.trim(doc.getElementsByTagName('h1')[0].textContent.split(' -')[1]);
            Foxtrick.dump(league+'\n');
            if (league.search(/\./) > -1) {
                league = league.split('.')[0];
                league = FoxtrickHelper.romantodecimal(league);
            } else {
                league = 1;
            }
            Foxtrick.dump(league+'\n');*/

            if (!Foxtrick.isStandardLayout( doc ) ) {
				var CountryName = Foxtrick.trim(Foxtrick.getElementsByClass('boxHead', doc)[0].getElementsByTagName('a')[0].innerHTML);
				var RomanLeague = Foxtrick.trim(Foxtrick.getElementsByClass('boxHead', doc)[0].getElementsByTagName('a')[1].innerHTML);
			}
            else {
				var CountryName = Foxtrick.trim(Foxtrick.getElementsByClass('boxHead', doc)[1].getElementsByTagName('a')[0].innerHTML);
				var RomanLeague = Foxtrick.trim(Foxtrick.getElementsByClass('boxHead', doc)[1].getElementsByTagName('a')[1].innerHTML);
            }
			
			Foxtrick.dump('['+CountryName+'] ['+RomanLeague+']\n');
            var leagues = 0;
			var country=0;
            try {
                for (var i in Foxtrick.XMLData.League) 
					if (CountryName == FoxtrickHelper.getLeagueDataFromId(i).LeagueName) {
					 	leagues = FoxtrickHelper.getLeagueDataFromId(i).NumberOfLevels;
						country = FoxtrickHelper.getLeagueDataFromId(i).LeagueID;
						break;
					}				
				if (!leagues) {Foxtrick.dump('crosstable.js countries: league not found:' +country+ "\n");; return -1;}
				var league = FoxtrickHelper.getLevelNum(RomanLeague,country);
				Foxtrick.dump('country: ' + country + ' league: ' + league + ' leagues: ' + leagues + '\n');
			} catch (exml) {
                Foxtrick.dump('crosstable.js countries: '+exml + "\n");
            }
			
			

            var colors = "";
            switch (league) {
                    case 11 :colors = "&chm=" + "r,dfeeff,0,0.87,0.88"                                 + "|r,dfeeff,0,0.24,0.25";
                    break;
                    case 10 :colors = "&chm=" + "r,dfeeff,0,0.87,0.88"                                 + "|r,dfeeff,0,0.24,0.25";
                    break;
                    case 9 : colors = "&chm=" + "r,dfeeff,0,0.745,0.755"                               + "|r,dfeeff,0,0.24,0.25";
                    break;
                    case 8 : colors = "&chm=" + "r,dfeeff,0,0.87,0.88"                                 + "|r,dfeeff,0,0.24,0.25";
                    break;
                    case 7 : colors = "&chm=" + "r,dfeeff,0,0.745,0.755"                               + "|r,dfeeff,0,0.24,0.25";
                    break;
                    case 6 : colors = "&chm=" + "r,dfeeff,0,0.87,0.88"                                 + "|r,dfeeff,0,0.24,0.25";
                    break;
                    case 5 : colors = "&chm=" + "r,dfeeff,0,0.87,0.88"     + "|r,dfeeff,0,0.495,0.505" + "|r,dfeeff,0,0.24,0.25";
                    break;
                    case 4 : colors = "&chm=" + "r,dfeeff,0,0.87,0.88"     + "|r,dfeeff,0,0.495,0.505" + "|r,dfeeff,0,0.24,0.25";
                    break;
                    case 3 : colors = "&chm=" + "r,dfeeff,0,0.87,0.88"     + "|r,dfeeff,0,0.495,0.505" + "|r,dfeeff,0,0.24,0.25";
                    break;
                    case 2 : colors = "&chm=" + "r,dfeeff,0,0.87,0.88"     + "|r,dfeeff,0,0.495,0.505" + "|r,dfeeff,0,0.24,0.25";
                    break;
                    case 1 : colors = "&chm=" + "r,dfeeff,0,0.87,0.88"     + "|r,dfeeff,0,0.495,0.505" + "|r,dfeeff,0,0.24,0.25";
                    break;
                    default : colors = "&chm=" + "r,dfeeff,0,0.87,0.88"                                + "|r,dfeeff,0,0.24,0.25";
                    break;
            }

            if (league == leagues) {
                Foxtrick.dump('last League\n');
                colors = colors.substring(0, colors.lastIndexOf('|'));
            }

            var weeks = '0:';
            for (var jj = 1; jj <= weekcount; jj++) {
                weeks += '|' + jj;
            }
            var x_offset = '6.25';
            if (weekcount != 0) {
                x_offset = Math.floor((1/(weekcount-1))*10000)/100;
                Foxtrick.dump(x_offset + '\n');
            }

            var url = "http://chart.apis.google.com/chart"
            	+ "?cht=lc"
				+ "&chs=" + width + "x200"
				+ "&chds=0.5,8.5"
				+ "&chxt=x,y"
				+ "&chxl=1:|8|7|6|5|4|3|2|1|" + weeks
				+ "&chxp=1,6.25,18.5,31.75,44,56.25,68.25,81.5,93.75" + colors
				+ "&chg=" + x_offset + ",300,1,10,0,0"
				+ "&chf=bg,s,FAFAFA"
				+ "&chma=10,10,10,10"
				+ "&chco=FF0000,00FF00,0000FF,FF8800,FF0088,880000,000000,338800"
				+ "&chf=c,lg,90,DDDDCC,0.5,DDDDCC,0|bg,s,EFEFEF"
				+ "&chd=t:" + position
				+ "&chdl=" + teams
				+ "&chdlp=b|l";

            // Foxtrick.alert('URL: [' + url + ']\n')
            Foxtrick.dump('\nurl' + url + '\n');
            var image = doc.createElement('img');
            image.src = url;
            image.title = doc.getElementsByTagName('h1')[0].textContent.replace(/(\ )|(\&nbsp\;)/g,'');
            image.alt = doc.getElementsByTagName('h1')[0].textContent.replace(/(\ )|(\&nbsp\;)/g,'');
            image.id = 'ft_graph'
            divmap.appendChild(image);

            if (!Foxtrick.isModuleFeatureEnabled(this, "allway_show_graph")) {
            	Foxtrick.addClass(heading, head_class + "_arrow");
            	Foxtrick.addClass(image, "hidden");
            }
            else {
            	Foxtrick.addClass(heading, head_class);
            }
        } catch(e) {Foxtrick.dump('CrossTable:' + e + '\n');}
	},

	change : function( page, doc ) {
		var id = "ft_cross";
		if(!doc.getElementById(id)) {
			this.run( page, doc );
		}
	},

	getShortName : function(str) {
		try {
			const minLength = 3; // only suggested
			const maxLength = 9;
			if (str.length <= maxLength) {
				return str;
			}

			// if abbreviation made by all word initials is good, return it
			var initials = "";
			var initialRe = new RegExp("\\b(\\w)\\w*\\b", "g");
			var initialMatches = str.replace(initialRe, "$1").match(initialRe);
			if (initialMatches) {
				for (var i = 0; i < initialMatches.length; ++i) {
					initials += initialMatches[i];
				}
				if (initials.length >= minLength && initials.length <= maxLength) {
					return initials;
				}
			}

			// otherwise, if abbreviation made by all capital letters is good,
			// return it
			var allCaps = "";
			var capRe = new RegExp("[A-Z]", "g");
			var capMatches = str.match(capRe);
			if (capMatches) {
				for (var i = 0; i < capMatches.length; ++i) {
					allCaps += capMatches[i];
				}
				if (allCaps.length >= minLength && allCaps.length <= maxLength) {
					return allCaps;
				}
			}

			// otherwise, if first word is good, return it
			var firstWord;
			var firstWordRe = new RegExp("^\\w+\\b");
			var firstWordMatches = str.match(firstWordRe);
			if (firstWordMatches) {
				firstWord = str.match(firstWordRe)[0];
				if (firstWord.length >= minLength && firstWord.length <= maxLength) {
					return firstWord;
				}
			}

			// finally, just return the substring
			return str.substr(0, maxLength);
		}
		catch (e) {
			Foxtrick.dumpError(e);
		}
	},

    numComparisonDesc : function(a, b)	{
        // Foxtrick.dump(b[this._week] +'[this._week]' + a[this._week]);
        return b[this._week]-a[this._week];
    },

    qsort : function (feld,anfang,ende) {
    	try{
            var i=0;
            var pivot,mitte,tmp;
            if(ende < anfang) return feld;
            pivot = anfang;
            mitte = anfang;
            for (var i = anfang+1; i <= ende; i++) {
                if(feld[i][this._week] > feld[pivot][this._week]) {
                    mitte++;
                    tmp = feld[i];
                    feld[i] = feld[mitte];
                    feld[mitte] = tmp;
                }
            }
            tmp = feld[mitte]
            feld[mitte] = feld[pivot];
            feld[pivot] = tmp;
            feld = this.qsort(feld,anfang,mitte-1);
            feld = this.qsort(feld,mitte+1,ende);
            return feld;
        } catch(eee) {Foxtrick.dump('sort: '+eee + '\n');}
	},

	HeaderClick_Graph : function(evt) {
        try {

            var header = evt.target;
			var doc = evt.target.ownerDocument;
			var head_class = "ft_ct_head_std";
            if (!Foxtrick.isStandardLayout(doc) ) {head_class = "ft_ct_head_simple";}

			Foxtrick.toggleClass(doc.getElementById("ft_graph"), "hidden");
			Foxtrick.toggleClass(header, head_class);
			Foxtrick.toggleClass(header, head_class + "_arrow");
		}
		catch (e) {Foxtrick.dump("CrossTable -> HeaderClick_Graph: "+e+'\n');}
	},

	HeaderClick_Cross : function(evt) {
        try {
            var header = evt.target;
			var doc = evt.target.ownerDocument;
			var head_class = "ft_ct_head_std";
            if (!Foxtrick.isStandardLayout(doc) ) {head_class = "ft_ct_head_simple";}

			Foxtrick.toggleClass(doc.getElementById("ft_cross"), "hidden");
			Foxtrick.toggleClass(header, head_class);
			Foxtrick.toggleClass(header, head_class + "_arrow");
		}
		catch (e) {Foxtrick.dump("CrossTable -> HeaderClick_Cross: "+e+'\n');}
	}
};
