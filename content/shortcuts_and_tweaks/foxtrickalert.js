/**
 * foxtrickalert.js
 * give a growl notification on news ticker
 * @author taised, convincedd
 */
////////////////////////////////////////////////////////////////////////////////

var FoxtrickAlert = {

    MODULE_NAME : "FoxtrickAlert",
    MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
    DEFAULT_ENABLED : true,
	NEW_AFTER_VERSION: "0.5.0.5",
	LATEST_CHANGE:"Optional dbus (linux) alert removed again for AMO compliance",
    LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,
	OPTIONS : new Array("NewMail","NewForum"), 
	
	news : [],
	alertWin:null,
	ALERTS: new Array(),
	last_num_message:0,
	last_num_forum:0,
	
    init : function() {
        Foxtrick.registerAllPagesHandler( FoxtrickAlert );
        if (Foxtrick.BuildFor=='Gecko') {
			FoxtrickAlert.news[0] = null;
			FoxtrickAlert.news[1] = null;
			FoxtrickAlert.news[2] = null;
		}
    },

    run : function( doc ) {  
	try {
		if (Foxtrick.BuildFor=='Chrome') {
			if (doc.location.href.search(/hattrick.org\/$|hattrick.ws\/$|hattrick.interia.ws\/$/)==-1) 
				portalert.postMessage({reqtype: "get_old_alerts"});
		}
		else {
				if (this.alertWin) this.closeAlert(true);
			
				// get a tab with hattrick
				var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                   .getService(Components.interfaces.nsIWindowMediator);
				var mainWindow = wm.getMostRecentWindow("navigator:browser");
				FoxtrickAlert.foxtrick_showAlert.tab = mainWindow.getBrowser().selectedTab;
				
				FoxtrickAlert.checkAll( doc );	
            }
	} catch (e) {
		Foxtrick.dump('FoxtrickAlert.js run: '+e);
	}
    },
	
	change : function( page, doc ) {	
	},
		
	checkAll : function( doc ) {							
			// check new, mail and forum after pageload and show alerts if needed
			if (doc.getElementById('hattrick')) FoxtrickAlert.checkNews(doc);
            if (doc.getElementById('hattrickNoSupporter')) FoxtrickAlert.showMailAlert(doc);								

            // add watch to ticker
			var ticker = doc.getElementById('ticker');
			if (ticker) {
				doc.getElementById('ticker').addEventListener("DOMSubtreeModified", FoxtrickAlert.checkNewsEvent, true ) ;          
			}
	},

	showMailAlert : function(doc) {
   	try { 		
		var message;
		var  menu = doc.getElementById('menu');
		message = menu.getElementsByTagName('a')[0].getElementsByTagName('span')[0];
		if (message && Foxtrick.isModuleFeatureEnabled( this, "NewMail" ) ) { 
				var num_message = parseInt(message.innerHTML.replace(/\(|\)/g,''));
				//Foxtrick.dump(message.innerHTML+' num_message '+num_message +' last_num_message: '+ FoxtrickAlert.last_num_message+'\n');
				if (num_message > FoxtrickAlert.last_num_message) {						
					var message = String(parseInt(num_message-FoxtrickAlert.last_num_message))+' '+Foxtrickl10n.getString( "foxtrick.newmailtoyou");
					FoxtrickAlert.ALERTS.push({'message':message,'href':'http://'+doc.location.hostname + "/MyHattrick/Inbox/Default.aspx"});Foxtrick.dump('->add MailAlert to list. in list:'+FoxtrickAlert.ALERTS.length+'\n');
				}	
				FoxtrickAlert.last_num_message = num_message;
			}
		else FoxtrickAlert.last_num_message=0;
		
		var forum = menu.getElementsByTagName('a')[3];
		var numforum = forum.innerHTML.match(/\d+/);
		if (numforum && Foxtrick.isModuleFeatureEnabled( this, "NewForum" )) { 
			if (numforum > FoxtrickAlert.last_num_forum && doc.location.pathname.search(/\/Forum\/Default.aspx/)==-1) {
				var message = String(parseInt(numforum-FoxtrickAlert.last_num_forum))+' '+Foxtrickl10n.getString( "foxtrick.newforumtoyou");
				FoxtrickAlert.ALERTS.push({'message':message,'href':'http://'+doc.location.hostname + "/Forum/Default.aspx?actionType=refresh"});Foxtrick.dump('->add MailAlert to list. in list:'+FoxtrickAlert.ALERTS.length+'\n');
			}
			FoxtrickAlert.last_num_forum = numforum;						
		}
		else FoxtrickAlert.last_num_forum=0;
		FoxtrickAlert.foxtrick_showAlert(false);

		if (Foxtrick.BuildFor=='Chrome') {
			localStorage['last_num_message'] = FoxtrickAlert.last_num_message;
			localStorage['last_num_forum']  = FoxtrickAlert.last_num_forum;
			if (!numforum) numforum=0;
			portalert.postMessage({reqtype: "set_mail_count",mail_count:num_message});
			portalert.postMessage({reqtype: "set_forum_count",forum_count:numforum});
		}
	} catch (e) {Foxtrick.dump('showMailAlert: '+e+'\n');}
	},
	
    checkNewsEvent : function(evt) {
		Foxtrick.dump('checkNewsEvent\n');
		var doc = evt.target.ownerDocument;
		FoxtrickAlert.checkNews(doc);
    },

	checkNews : function(doc) {
       try {   
			Foxtrick.dump('checkNews\n');
			
			var tickerdiv = doc.getElementById('ticker').getElementsByTagName('div');
            var message="";
			var href="";
            var elemText = new Array();
            //getting text
			var numunreadticker=0;
            for (var i=0; i<tickerdiv.length;i++)
            {   
				var tickelem=tickerdiv[i].firstChild.firstChild;
                if (tickelem.nodeType!=tickelem.TEXT_NODE)
                {  
                    //there is the strong tag
					numunreadticker++;
					elemText[i]=tickelem.firstChild.nodeValue;
                    message=tickelem.firstChild.nodeValue;
					href=tickerdiv[i].getElementsByTagName('a')[0].href; 
					//Foxtrick.dump(message+'\t'+href+'\n');
					var isequal = false;
					for (var j=0;j<=3;j++)
					{
						if (elemText[i]==FoxtrickAlert.news[j])
							isequal=true;
					}	
                    if (!isequal) {
						FoxtrickAlert.ALERTS.push({'message':message,'href':href});	Foxtrick.dump('->add ticker alert to list. in list:'+FoxtrickAlert.ALERTS.length+'\n');			
					}
                } else {
					elemText[i]=tickelem.nodeValue;
				}
            } 				
            for (var i=0; i<tickerdiv.length;i++)
            {
			    FoxtrickAlert.news[i]=elemText[i];
			}
			FoxtrickAlert.foxtrick_showAlert(false);
			
        if (Foxtrick.BuildFor=='Chrome') {
			localStorage['news0']  = FoxtrickAlert.news[0];
			localStorage['news1']  = FoxtrickAlert.news[1];
			localStorage['news2']  = FoxtrickAlert.news[2];
			portalert.postMessage({reqtype: "set_unreadticker_count",unreadticker_count: numunreadticker});
		}
        } catch(e) { Foxtrick.dump('error checkNews '+e); }
    },

    foxtrick_showAlert: function( ) { 
     try{ 
//	    Foxtrick.dump('\n -- foxtrick_showAlert --\n');
//		Foxtrick.dump(' messages to show: '+FoxtrickAlert.ALERTS.length+'\n');
//		Foxtrick.dump(' last_num_mail: '+FoxtrickAlert.last_num_message+'\n');
		
 		if ( FoxtrickAlert.ALERTS.length==0) { /*Foxtrick.dump('no more alerts->return\n');*/ return;}	
		
		var num_alerts = FoxtrickAlert.ALERTS.length;
		var alert = FoxtrickAlert.ALERTS.pop(); 
        var message = alert.message;  
        var href = alert.href;
		
		// custom turned off?
		if (Foxtrick.isModuleEnabled(FoxtrickAlertCustomOff)) {
			for (var i=0; i<FoxtrickAlertCustomOff.OPTIONS.length; ++i) {
				var url = FoxtrickAlertCustomOff.urls[i];
				//Foxtrick.dump('try '+url+' '+href.search(url)+' '+ FoxtrickAlertCustomOff.OPTIONS[i] +' '+Foxtrick.isModuleFeatureEnabled( FoxtrickAlertCustomOff, FoxtrickAlertCustomOff.OPTIONS[i])+'\n');
				if (href.search(url) != -1 && Foxtrick.isModuleFeatureEnabled( FoxtrickAlertCustomOff, FoxtrickAlertCustomOff.OPTIONS[i])) {
					Foxtrick.dump('dont show '+url+' '+ FoxtrickAlertCustomOff.OPTIONS[i] +'\n');
					FoxtrickAlert.foxtrick_showAlert(true); // show next
					return;
				}
			}
		}

		if (FoxtrickPrefs.getBool("alertSlider")) {		
			FoxtrickAlert.foxtrick_showAlert_std( message, href);
		}
		else if (FoxtrickPrefs.getBool("alertSliderGrowl")) {
			FoxtrickAlert.foxtrick_showAlertGrowl(message);
		}						

		if (FoxtrickPrefs.getBool("alertSound")) {
			try {
				var play_custom = false;
				if (Foxtrick.isModuleEnabled(FoxtrickAlertCustomSounds)) {
					for (var i=0; i<FoxtrickAlertCustomSounds.OPTIONS.length; ++i) {
						if (Foxtrick.isModuleFeatureEnabled( FoxtrickAlertCustomSounds, FoxtrickAlertCustomSounds.OPTIONS[i])) {
							var url = FoxtrickAlertCustomSounds.urls[i];
							if (href.search(url) != -1) {
								var sound = FoxtrickPrefs.getString("module." + FoxtrickAlertCustomSounds.MODULE_NAME + "." + FoxtrickAlertCustomSounds.OPTIONS[i]+"_text"); 
								if (!sound) sound = FoxtrickAlertCustomSounds.OPTION_TEXTS_DEFAULT_VALUES[i];
								Foxtrick.playSound(sound);
								play_custom=true;
								break;
							}
						}
					}
				}
				if (!play_custom) Foxtrick.playSound(FoxtrickPrefs.getString("alertSoundUrl"));				
			} catch (e) { Foxtrick.dump('playsound: '+e);}
		}
		
        } catch(e) { Foxtrick.dump('error foxtrick_showAlert '+e); }
	},
	
	 foxtrick_showAlert_std: function( message, href) { 
     try { 									
        var img = "http://hattrick.org/favicon.ico";
        var title = "Hattrick.org";
		var clickable = true;
        var listener = { observe:
                function(subject, topic, data) {
                    try{ Foxtrick.dump('callback: '+topic+'\n');
						if (topic=="alertclickcallback") {
							Foxtrick.dump('alertclickcallback:' +'link to: '+data+'\n');
							var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
									.getService(Components.interfaces.nsIWindowMediator);
							Foxtrick.openAndReuseOneTabPerURL(href,true);
						}						
						if (topic=="alertfinished") {
							FoxtrickAlert.foxtrick_showAlert(true);
						}
					} catch(e){Foxtrick.dump('alertcallback: '+e+'\n');}
                }
		};
    		
		try { 
                FoxtrickAlert.alertWin = Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
                FoxtrickAlert.alertWin.showAlertNotification(img, title, message, clickable, href, listener);
				//Foxtrick.dump('ticker: using alerts-service\n');			
		} catch (e) { 
                // fix for when alerts-service is not available (e.g. SUSE)
                FoxtrickAlert.alertWin = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
                    .getService(Components.interfaces.nsIWindowWatcher)
                    .openWindow(null, "chrome://global/content/alerts/alert.xul",
                                "_blank", "chrome,titlebar=no,popup=yes", null);
                FoxtrickAlert.alertWin.arguments = [img, "www.hattrick.org", message, clickable, href,0,listener];
				Foxtrick.dump('ticker: using fallback alert.xul\n');			            
            }
    } catch (e) { 
            Foxtrick.dump('foxtrick_showAlert_std'+e);
    }
    },
	
	closeAlert: function(page_changed) { 
		try{
			//FoxtrickAlert.alertWin.close();  
			//Foxtrick.dump('force close ticker. page_changed:'+page_changed+'\n'); 
		} catch(e) {
			//Foxtrick.dump('error force closing  alertWin :'+e+'\n');
		}
	},
	
    foxtrick_showAlertGrowl: function(text) {
    	// mac only
    	try {
    		var grn = Components.classes["@growl.info/notifications;1"].getService(Components.interfaces.grINotifications);
    		var img = "http://hattrick.org/favicon.ico";
    		var title = "Hattrick.org";
    		grn.sendNotification("Hattrick.org (Foxtrick)", img, title, text, "", null);
    	} catch (e) {
    		Foxtrick.LOG(e);
    	}
    },
};


if (Foxtrick.BuildFor=='Chrome') {
var portalert = chrome.extension.connect({name: "alert"});
portalert.onMessage.addListener(function(msg) { 
	if (msg.response=='resetalert') {  //Foxtrick.dump('resetalert');
		localStorage['last_num_message']=0; 
		localStorage['last_num_forum']=0; 
		localStorage['news0']=''; 
		localStorage['news1']=''; 
		localStorage['news2']=''; 
	} 
	FoxtrickAlert.last_num_message = localStorage['last_num_message']; 
	FoxtrickAlert.last_num_forum  = localStorage['last_num_forum'];
    FoxtrickAlert.news[0]  = localStorage['news0'];
    FoxtrickAlert.news[1]  = localStorage['news1'];
    FoxtrickAlert.news[2]  = localStorage['news2'];
    FoxtrickAlert.checkAll(document);
});
}

