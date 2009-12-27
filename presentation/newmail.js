/**
 * newmail.js
 * Script which makes the new mails more visible
 * @author htbaumanns
 */

var FoxtrickNewMail = {
	
    MODULE_NAME : "NewMail",
    MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : new Array ( 'all' ),
	DEFAULT_ENABLED : true,
	NEW_AFTER_VERSION: "0.4.9",
	LATEST_CHANGE:"Option to highlight new forum message",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,
	CSS:  "",
    OLD_CSS:"",
	
	OPTIONS : new Array("CustomColor","HighlightNewMailIcon","HighlightNewForum"),
	OPTION_TEXTS : true,
	OPTION_TEXTS_DEFAULT_VALUES : new Array("red","",""),        
	OPTION_TEXTS_DISABLED_LIST : new Array(false,true,true),
	NewMailColor:"red",
	
    init : function() {
	FoxtrickNewMail.NewMailColor="";
	if (Foxtrick.isModuleFeatureEnabled( this, "CustomColor")) {
			var color = FoxtrickPrefs.getString("module." + this.MODULE_NAME + "." + "CustomColor_text"); 
			if (color) 	FoxtrickNewMail.NewMailColor=color;
	}
	var HighlightNewMailIconCss="img.scNewMail {background: url('chrome-extension://kfdfmelkohmkpmpgcbbhpbhgjlkhnepg/resources/linkicons/new_mail.png') !important;}";
	
	if (!Foxtrick.isModuleFeatureEnabled( this, "HighlightNewMailIcon")) HighlightNewMailIconCss="";
	
	var zaw = '/*NEWMAILCOLOR*/'+
		 (Foxtrick.BuildFor=='Chrome')?'':('@-moz-document domain(hattrick.org), domain(hattrick.interia.pl), domain(hattrick.ws) {')+
		'div.subMenuBox>div.boxBody>ul>li>span,'+
		'div#folders.sidebarBox>div.boxBody>p>span,'+
		'div#folders.sidebarBox>p>span,'+
		'div#header>div#menu a>span,'+
		'div#ctl00_pnlSubMenu.subMenu>div.subMenuBox>ul>li>span'+
		'{'+
		'color:'+FoxtrickNewMail.NewMailColor +'!important;'+
		'font-weight:bold !important;'+
		'}'+
		HighlightNewMailIconCss +		
		(Foxtrick.BuildFor=='Chrome')?'':'}';
		
	this.OLD_CSS = this.CSS;		
	if (Foxtrick.BuildFor=='Chrome') this.CSS = zaw;
	else this.CSS = Foxtrick.GetDataURIText(zaw);
	alert(this.CSS);
    },

    run : function( page, doc ) {
	
		if (Foxtrick.isModuleFeatureEnabled( this, "HighlightNewForum")) {
			var  menu=doc.getElementById('menu');
			if (menu) {
				var forum = menu.getElementsByTagName('a')[3];
				var parts = forum.innerHTML.split('(');
				if (parts.length>1) forum.innerHTML = parts[0]+'<span>('+parts[1]+'</span>';
			}
		}	
 	},
	
	change : function( page, doc ) {	
	}
};