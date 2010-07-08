/**
 * historyStats.js
 * Foxtrick team history stats
 * @author spambot
 */
////////////////////////////////////////////////////////////////////////////////
FoxtrickHistoryStats= {
    
    MODULE_NAME : "HistoryStats",
    MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : new Array('history'), 
    DEFAULT_ENABLED : true,
    NEW_AFTER_VERSION: "0.5.1.3",
	LATEST_CHANGE:"Some style fixes",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,
    Buffer : new Array(),
    Pages : new Array(),
    Offset : 0,
    
    run : function( page, doc ) {
        this.Buffer = Array();
        this.Pages = Array();
        this._fetch(doc);
        this._paste(doc);
    },
        
    change : function( page, doc ) {
        this._fetch(doc);
        this._paste(doc);
    },
    
    _fetch : function(doc) {
        try {
            try {
                var pager = doc.getElementById('ctl00_CPMain_ucOtherEvents_ucPagerBottom_divWrapper');
                var page = parseInt(pager.getElementsByTagName('strong')[0].textContent);
            } catch(e) {var page = 1;}
            if (!Foxtrick.in_array(this.Pages,page)) {
                this.Pages.push(page);
                Foxtrick.dump('<br>' + i + ' | '+ Foxtrick.var_dump(this.Pages) + '\n');
                Foxtrick.dump('------------------------------------------------<br>\n');
                
                try {
                    var done = false;
                    var a = doc.getElementById('ctl00_CPMain_ucOtherEvents_ctl00').getElementsByTagName('a');
                    for (var i = 0; i < a.length;i++){
                        if (a[i].href.search(/viewcup/) > -1) {
                            var check_season = a[i].textContent;
                            
                            if(a[i].parentNode.previousSibling.previousSibling) season = a[i].parentNode.previousSibling.previousSibling.textContent;
                            var reg = /(\d+)(.*?)(\d+)(.*?)(\d+)(.*?)/i;
                            var ar = reg.exec(season);
                            var stime = ar[0] + '.' + ar[2] + '.' + ar[4] + ' 00.00.01';
                            stime = Foxtrick.substr(stime, Foxtrick.strrpos( stime, ";"), stime.length);
                            season = Foxtrick.gregorianToHT(stime).split('/')[1].split(')')[0];
                            //Foxtrick.dump('HT Season: ' + season + '\n');
                            this.Offset = parseInt(season)-parseInt(check_season);
                            Foxtrick.dump(' > precheck: '+check_season+'||'+season+'||'+this.Offset+'||<br>\n');
                            done = true;
                        }
                        if (done) break;
                    }
                } catch(e_offset) {Foxtrick.dump('Error Offset calc: ' + e_offset +'<br>\n');}
                var table = Foxtrick.getElementsByClass('otherEventText', doc.getElementById('ctl00_CPMain_ucOtherEvents_ctl00').cloneNode(true));
                for (var i = 0; i < table.length; i++) {
					// Foxtrick.dump(table[i].innerHTML);
					if (table[i].innerHTML.search(/\<span class\=\"shy\"\>/) != -1 ) continue;
					// Foxtrick.dump(">>>>     OK <<<<<<");
                    dummy = Foxtrick.trim(table[i].innerHTML);
                    
                    //Foxtrick.dump('<br>' + i + ' | '+ Foxtrick.var_dump(dummy) + '\n');
                    
                        var buff = '';
                        var league = -1;
                        var leagueN = -1;
                        var season = -1;
                        var cup = -1;
                        if(table[i].previousSibling.previousSibling) season = table[i].previousSibling.previousSibling.textContent;
                        var reg = /(\d+)(.*?)(\d+)(.*?)(\d+)(.*?)/i;
                        var ar = reg.exec(season);
                        var stime = ar[0] + '.' + ar[2] + '.' + ar[4] + ' 00.00.01';
                        stime = Foxtrick.substr(stime, Foxtrick.strrpos( stime, ";"), stime.length);
                        season = Foxtrick.gregorianToHT(stime).split('/')[1].split(')')[0];
                        //Foxtrick.dump('HT Season: ' + season + '\n');
                        var a = table[i].getElementsByTagName('a');
                        for (var j = 0; j < a.length; j ++) {
                            if (a[j].href.search(/LeagueLevelUnitID/) > -1) {
                                league = Foxtrick.trim(a[j].innerHTML);
                                var leagueN = league;
                                if (league.search(/\./) > -1) {
                                    league = league.split('.')[0];
                                    league = FoxtrickHelper.romantodecimal(league);
                                } else {
                                    league = 1;
                                }
                            }
                            if (a[j].href.search(/viewcup/) > -1) {
                                while (table[i].getElementsByTagName('a')[0]) {
                                    table[i].removeChild(table[i].getElementsByTagName('a')[0]);
                                }
                                cup = table[i].innerHTML.match(/\d{1,2}/);
                                if (!cup) cup = '<span class="bold" title="'+Foxtrickl10n.getString("foxtrick.HistoryStats.cupwinner")+'">' + Foxtrickl10n.getString("foxtrick.HistoryStats.cupwinner.short") + '</span>';
                            }
                        }
                        //league
                        if (league != -1) {
                            try {
                                while (table[i].getElementsByTagName('a')[0]) {
                                    table[i].removeChild(table[i].getElementsByTagName('a')[0]);
                                }
                            }catch(e_rem){}
                            table[i].innerHTML = Foxtrick.trim(table[i].innerHTML.replace(season-this.Offset,''));
                            var pos = table[i].innerHTML.match(/\d{1}/);
                            buff = season + '|' + league + '|' + pos + '|' + leagueN;
                            if (!Foxtrick.in_array(this.Buffer,buff)) {
                                this.Buffer.push(buff);
                            } else {
                            }
                        } else if (cup != -1) {
                            buff = season + '|' + cup;
                            if (!Foxtrick.in_array(this.Buffer,buff)) {
                                this.Buffer.push(buff);
                            } else {
                            }
                        }
                        
                }
                Foxtrick.dump('Buffer:' + Foxtrick.var_dump(this.Buffer) + '\n');            
                Foxtrick.dump('-----------------------------------------------------------------------------------------------<br>\n');          
            }
        } catch(e) {Foxtrick.dump(this.MODULE_NAME + ' fetch ' + e + '\n');}
    },
    
    _paste : function(doc){
        if (this.Buffer.length==0) return;
        try {
            var HistoryTable="<tr>" + 
				"<th title='"+Foxtrickl10n.getString("foxtrick.HistoryStats.season")+"'>"+Foxtrickl10n.getString("foxtrick.HistoryStats.season.short")+"</th>" + 
				"<th title='"+Foxtrickl10n.getString("foxtrick.HistoryStats.cup")+"'>"+Foxtrickl10n.getString("foxtrick.HistoryStats.cup.short")+"</th>" +
				"<th title='"+Foxtrickl10n.getString("foxtrick.HistoryStats.league")+"'>"+Foxtrickl10n.getString("foxtrick.HistoryStats.league.short")+"</th>" +
				"<th title='"+Foxtrickl10n.getString("foxtrick.HistoryStats.pos")+"'>"+Foxtrickl10n.getString("foxtrick.HistoryStats.pos.short")+"</th></tr>";
            
            var last = -1;
            for (var i = 0; i< this.Buffer.length; i++){
                var dummy = this.Buffer[i].split('|');
                dummy[0] = parseInt(dummy[0]) - this.Offset + '|';
                var line = '<tr><td>%s'+dummy[0]+'</td><td>%c'+dummy[0]+'</td><td title="%l_t'+dummy[0]+'">%l'+dummy[0]+'</td><td>%p'+dummy[0]+'</td></tr>';
                // Foxtrick.dump(Foxtrick.var_dump(dummy));
                
                if (last == -1 || last != dummy[0]) {
                    HistoryTable += line;
                }
                
                
                HistoryTable = HistoryTable.replace("%s"+dummy[0],dummy[0]);
                
                if (dummy[3]){
                    HistoryTable = HistoryTable.replace("%p"+dummy[0],dummy[2]);
                    if (dummy[3].length > 8) 
					{
						HistoryTable = HistoryTable.replace("%l"+dummy[0],dummy[3].substr(0,5) + '…');
					}
					else
					{
						HistoryTable = HistoryTable.replace("%l"+dummy[0],dummy[3]);
					}
                    HistoryTable = HistoryTable.replace("%l_t"+dummy[0],dummy[3]);					
                } else{
                    HistoryTable = HistoryTable.replace("%c"+dummy[0],dummy[1]);
                }
                
                last = dummy[0];
            }
            var	table = doc.createElement("table");
            table.setAttribute( "class", 'smallText historystats' );
            HistoryTable=HistoryTable.replace(/((\%c)|(\%p)|(\%l))\d{1,2}\|/gi,'-').replace(/\|/g,'');;
            table.innerHTML = HistoryTable;
            
            try {
                var	ownBoxBody = doc.createElement("div");
                var header = Foxtrickl10n.getString("foxtrick.HistoryStats.label");
                var ownBoxId = "ft_HistoryStats_box";
                var ownBoxBodyId = "ft_HistoryStats";
                ownBoxBody.setAttribute( "id", ownBoxBodyId );
                ownBoxBody.appendChild(table);
                Foxtrick.addBoxToSidebar( doc, header, ownBoxBody, ownBoxId, "last", "");
            }catch(e_box){Foxtrick.dump('ERROR');}
            doc.getElementById('ft_HistoryStats').firstChild.innerHTML = table.innerHTML;
        } catch(e) {Foxtrick.dump(this.MODULE_NAME + ' paste ' + e + '\n');}
        Foxtrick.dump('FLUSHED');
    }
};




