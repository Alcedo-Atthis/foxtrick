/**
 * Transfer list deadline
 * @author spambot
 */

FoxtrickTransferListDeadline = {

    MODULE_NAME : "TransferListDeadline",
    MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : new Array('transferListSearchResult','playerdetail','transfer'), 
    DEFAULT_ENABLED : true,

    init : function() {
    },

    run : function(page, doc) {

        var httime = doc.getElementById( "time" ).innerHTML;

        Foxtrick.HT_date = Foxtrick.getDateFromText( httime );
        if (!Foxtrick.HT_date) return;

        switch ( page ) {
            case 'transferListSearchResult' :

                this._PlayerListDeatline ( doc, 'span' );
                break;

            case 'playerdetail' :

                this._PlayerDetailsDeatline ( doc );
                break;

            case 'transfer' :

                this._PlayerListDeatline ( doc, 'div' );
                break;
        }
    },

	change : function( page, doc ) {
		var httime = doc.getElementById( "time" ).innerHTML;
		Foxtrick.HT_date = Foxtrick.getDateFromText( httime );
        if (!Foxtrick.HT_date) return;

        switch ( page ) {

            case 'playerdetail' :
                this._PlayerDetailsDeatline ( doc );
                break;
        }
	},

    _PlayerListDeatline : function ( doc, element ) {
        var spans = doc.getElementsByTagName( element );
        var j = 0;
        for (var i=0; i<spans.length; i++) {
            try {
                var cell = "ctl00_CPMain_lstBids_ctrl"+ j + "_jsonDeadLine";
                var selltime_elm = doc.getElementById( cell );

                if (selltime_elm == null) {
                    var cell = "ctl00_CPMain_dl_ctrl"+ j +"_TransferPlayer_lblDeadline";
                    var selltime_elm = doc.getElementById( cell );
                }

                if (selltime_elm != null ) {
                    var selltime = Foxtrick.trim(selltime_elm.innerHTML);
                    // Foxtrick.dump ('\n>>>>>' + selltime + '<<<<<\n');
                    var ST_date = Foxtrick.getDateFromText( selltime );
                    if (ST_date != null ) {
                        var deadline_s = Math.floor( (ST_date.getTime()-Foxtrick.HT_date.getTime()) / 1000); //Sec
                        var DeadlineText = TimeDifferenceToText (deadline_s);
                        // Foxtrick.dump ('\n>>>>>' + DeadlineText + '<<<<<\n');
                        if (DeadlineText.search("NaN") == -1)
                            selltime_elm.innerHTML +=  '<span class="date smallText" id="ft_deadline" style="margin-left:10px; color:#800000">(' + DeadlineText + ')</span>';
                        else Foxtrick.dump('  Could not create deadline (NaN)\n');
                    }
                }
            }
            catch (e) {
                Foxtrick.dump (e);
            }
            j++;
        }
    },

    _PlayerDetailsDeatline : function ( doc ) {
        if ( doc.location.href.search(/Player.aspx/i) < 0 ) return;

        try {
            //Check if deadline already set
			var deadline_span = doc.getElementById( "ft_deadline" );
            if  (deadline_span != null ) return;

            var div = doc.getElementById( 'ctl00_CPMain_updBid' );
            if (div == null ) return;
            
            var spans = Foxtrick.getElementsByClass( "alert", div );
            if (spans == null) return;
            
            var selltime_elm = spans[0].getElementsByTagName( "p" )[0];
            
            if (selltime_elm == null) return;
            var selltime_clone = selltime_elm.cloneNode(true);
            if (selltime_clone == null) return;

            var selltimeInner = Foxtrick.trim(selltime_clone.innerHTML);

            var selltime = selltimeInner;

            // suporters check
            var startPos = selltimeInner.search("<a ");

            if(startPos != -1) {
                selltime = selltimeInner.substr(0,startPos);
            }

            selltime = Foxtrick.substr(selltime, Foxtrick.strrpos( selltime, ";")+1, selltime.length);
            // Foxtrick.dump('ST: ' + selltime + '\n');

            var ST_date = Foxtrick.getDateFromText( selltime );
            if (!ST_date) return;

            var deadline_s = Math.floor( (ST_date.getTime()-Foxtrick.HT_date.getTime()) / 1000); //Sec

            var DeadlineText = TimeDifferenceToText (deadline_s);

            // Foxtrick.dump ('\n>>>>>' + DeadlineText + '<<<<<\n');
            if (DeadlineText.search("NaN") == -1)
                selltime_elm.innerHTML +=  '<span class="date smallText" id="ft_deadline" style="margin-left:10px; color:#800000">(' + DeadlineText + ')</span>'
            else Foxtrick.dump('  Could not create deadline (NaN)\n');
        } catch (e) {
            Foxtrick.dump('FoxtrickTransferListDeadline'+e);
        }
    }
};
