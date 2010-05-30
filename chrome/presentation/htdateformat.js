/**
 * HTDateFormat displays week and season next to date
 * @author spambot
 */

FoxtrickHTDateFormat = {

    MODULE_NAME : "HTDateFormat",
    MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
 	PAGES : new Array('transfersTeam','TransfersPlayer','transfer','TransferCompare','match',
					'matches','matchesarchiv','teamPageGeneral','achievements',
					'teamevents','history','arena','league','hallOfFame','statsMatchesHeadToHead'), 
	ONPAGEPREF_PAGE : 'all', 
    DEFAULT_ENABLED : true,
    NEW_AFTER_VERSION: "0.4.6.2",	
	LATEST_CHANGE:"Option to set first day of week added",
	OPTIONS :  new Array("LocalSaison","FirstDayOfWeekOffset"), 
	OPTION_TEXTS : true,
	OPTION_TEXTS_DEFAULT_VALUES : new Array("","0"),
	OPTION_TEXTS_DISABLED_LIST : new Array(true,false),

    init : function() {
    },

    run : function(page, doc) {
        //Foxtrick.dump('HTDateformat RUN '+page+'\n');
        var httime = doc.getElementById( "time" ).innerHTML;

        Foxtrick.HT_date = Foxtrick.getDatefromCellHTML( httime );
        if (!Foxtrick.HT_date) return;

        var mainBody = doc.getElementById( "mainBody" );
        if (!mainBody) return;
        
		var weekdayoffset = FoxtrickPrefs.getString("module." + this.MODULE_NAME + "." + "FirstDayOfWeekOffset_text"); 
		if (!weekdayoffset) weekdayoffset = this.OPTION_TEXTS_DEFAULT_VALUES[1]; 
			
        switch ( page ) {

            case 'transfersTeam' :
                Foxtrick.modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;

            case 'TransfersPlayer' :
                Foxtrick.modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;
				
            case 'transfer' :
                Foxtrick.modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;
				
            case 'match' : 
                Foxtrick.modifyDates ( mainBody, false, 'div', '&nbsp;' , '&nbsp;',weekdayoffset, true );
                break;
                
            case 'matches' :
				Foxtrick.modifyDates ( mainBody, false, 'td', '&nbsp;' , '',weekdayoffset );
                //Foxtrick.modifyDates ( mainBody, false, 'td', '<br>' , '',weekdayoffset ); //see FoxtrickMatchTables
                break;

            case 'matchesarchiv' :
                Foxtrick.modifyDates ( mainBody, true, 'td', '&nbsp;' , '',weekdayoffset );
                break;
                
            case 'teamPageGeneral' :
				if (doc.location.href.search(/Club\/Matches\/Live.aspx/i)!=-1) return;
				//Foxtrick.modifyDates ( mainBody, false, 'span', '&nbsp;', '',weekdayoffset );
                Foxtrick.modifyDates ( mainBody, false, 'td', '&nbsp;', '',weekdayoffset );
                break;

            case 'TransferCompare' :
                Foxtrick.modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;
                
            case 'achievements' :
                Foxtrick.modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;
                
            case 'teamevents' :
                Foxtrick.modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;
                
            case 'history' :
                Foxtrick.modifyDates ( mainBody, true, 'td', '&nbsp;', '',weekdayoffset );
                break;                

            case 'arena' :
                Foxtrick.modifyDates ( mainBody, true, 'td', '&nbsp;', '' ,weekdayoffset);
                break;
                
            case 'league' :
                Foxtrick.modifyDates ( mainBody, true, 'h3', '&nbsp;', '',weekdayoffset );
                break;
                
            case 'HallOfFame' :
                Foxtrick.modifyDates ( mainBody, true, 'p', '&nbsp;', '',weekdayoffset, true );
                break;
            
			case 'statsMatchesHeadToHead' :
                Foxtrick.modifyDates ( mainBody, false, 'td', '&nbsp;', '',weekdayoffset );
                break;
                
        }
    },

	change : function(page, doc) {
    try{
		if (doc.getElementById('mainBody').innerHTML.search('ft_HTDateFormat') > -1 ) return;
        else {
            // Foxtrick.dump('HTDateformat CHG RUN\n');
            this.run(page,doc);
        }
      } catch(e){Foxtrick.dump('HTDateformat CHG: '+e+'\n');}  
	}     
};


