//**********************************************************
/**
* forumchangeposts_modules.js
* module collection of forumchangeposts.js
* @author convinced
*/



//**********************************************************
/**
* forumcopypostid.js
* Foxtrick Copies post id to clipboard
* @author convinced
*/

var FoxtrickFormatPostingText = {

	MODULE_NAME : "FormatPostingText",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array('forumWritePost','messageWritePost','guestbook','announcements','ads','newsletter',"forumModWritePost"),
    NEW_AFTER_VERSION: "0.5.1.2",
	LATEST_CHANGE:"Fixes display error",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,
	DEFAULT_ENABLED : true,
	
	init : function() {
	},
	
	run : function( page, doc ) {
		try {
			var targets = doc.getElementById("mainBody").getElementsByTagName("input");  // Forum
		    for (var i = 0; i < targets.length; ++i) {
		    	if (targets[i].type == "submit") {
		    		// found the submit button, add the listener and we're done
		    		targets[i].addEventListener("click", this.submitListener, false);
		    		return;
		    	}
		    }
		}
		catch (e) {
			Foxtrick.dump('FoxtrickFormatPostingText '+e+'\n');
		}
	},

	format : function(string) {
		return string
			.replace(/·/gi, "")
			.replace(/\n/g, "[FTbr]")
			.replace(/(\<)(\S)/gi, "<·$2")
			.replace(/\[pre\](.*?)\[(i|u|b)\](.*?)\[\/pre\]/gi, "[pre]$1[ $2 ]$3[/pre]")
			.replace(/\[FTbr\]/g, "\n");
	},

	submitListener : function(ev) {
		var doc = ev.target.ownerDocument;
		var textarea = doc.getElementById("mainBody").getElementsByTagName("textarea")[0];
		textarea.value = FoxtrickFormatPostingText.format(textarea.value);
	},

};

var FoxtrickCopyPostID = {

	MODULE_NAME : "CopyPostID",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"), 
	NEW_AFTER_VERSION: "0.5.1.3",
	LATEST_CHANGE:"Added [post=..] to copied post id",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,
	DEFAULT_ENABLED : true,
	OPTIONS : new Array("AddCopyIcon"), 
	
	init : function() {
	},
	
	run : function( page, doc ) {
	},
	
};

//**********************************************************
/**
* forumcopyposting.js
* Foxtrick Copies posting to clipboard
* @author convinced
*/
var FoxtrickCopyPosting = {

	MODULE_NAME : "CopyPosting",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"), 
	NEW_AFTER_VERSION: "0.5.1.3",	
	LATEST_CHANGE:"Copy ht-ml style",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,
	DEFAULT_ENABLED : true,
	RADIO_OPTIONS : new Array("CopyUnformatted","CopyWikiStyle","CopyHT-MLQuoted"), 
	
	init : function() {
	},
	
	run : function( page, doc ) {
	},
	
};

//**********************************************************
/**
 * forumalterheaderline.js
 * Foxtrick Truncate long nicks in forum posts module
 * @author larsw84/convinced
 */

var FoxtrickForumAlterHeaderLine = {
	
    MODULE_NAME : "ForumAlterHeaderLine",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"), 
	DEFAULT_ENABLED : false,
	NEW_AFTER_VERSION: "0.4.9.1",
	LATEST_CHANGE:"HideOldTime fixing for some dateformats",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,
	OPTIONS : new Array("SingleHeaderLine", "CheckDesign","TruncateLongNick","TruncateLeagueName","HideOldTime",
						"SmallHeaderFont","ShortPostId","ReplaceSupporterStar","BookmarkHeaderSmall","HighlightThreadOpener"),
	OPTIONS_CSS: new Array (Foxtrick.ResourcePath+"resources/css/fixes/Forum_Header_Single.css",
							Foxtrick.ResourcePath+"resources/css/fixes/Forum_Header_CheckDesign.css",
							"",
							"",
							"",
							Foxtrick.ResourcePath+"resources/css/fixes/Forum_Header_Smallsize_Single.css",
							"",
							Foxtrick.ResourcePath+"resources/css/fixes/Forum_Header_RemoveSupporterStar.css",
							Foxtrick.ResourcePath+"resources/css/fixes/BookmarkHeaderSmall.css"),

	CSS_SIMPLE : Foxtrick.ResourcePath+"resources/css/fixes/Forum_Header_Single_SimpleFix.css",

    init : function() {
    },
	
    run : function( page, doc ) {
	},
	
};


//**********************************************************
/**
 * forumredirmanagertoteam.js
 * Foxtrick redirect from manager to team page
 * @author convinced
 */

var FoxtrickForumRedirManagerToTeam = {
	
    MODULE_NAME : "ForumRedirManagerToTeam",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"), 
	DEFAULT_ENABLED : false,

	init : function() {
    },

    run : function( page, doc ) { 		
    },
	
};


//**********************************************************
/**
 * forummovelinks.js
 * Foxtrick Move Links in forum posts module
 * @author larsw84
 */

var FoxtrickMoveLinks = {
	
    MODULE_NAME : "MoveLinks",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"), 
	DEFAULT_ENABLED : false,

    init : function() {
    },

    run : function( page, doc ) { 
	},
	
};


//**********************************************************
/**
 * forumhideavataruserinfo.js
 * Foxtrick Hide Manager Avatar User Info module
 * @author larsw84/convinced
 */

var FoxtrickHideManagerAvatarUserInfo = {
       
    MODULE_NAME : "HideManagerAvatarUserInfo",
    MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"), 
    DEFAULT_ENABLED : false,

    init : function() {
    },

    run : function( page, doc ) { 
	},
       
};



//**********************************************************
/**
 * forumadddefaultfacecard.js
 * Foxtrick Add default faceCard module
 * @author larsw84
 */

var FoxtrickAddDefaultFaceCard = {
	
    MODULE_NAME : "AddDefaultFaceCard",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"), 
	DEFAULT_ENABLED : true,

    init : function() {
    },

    run : function( page, doc ) {
	},
	
};


/**
* forumalltidflags.js
* Foxtrick Show Alltid flags in forum posts module
* @author convinced
*/

//**********************************************************
var FoxtrickAlltidFlags = {

	MODULE_NAME : "AlltidFlags",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"), 
	DEFAULT_ENABLED : false,
	//RADIO_OPTIONS : new Array("LinkFlagToLeague","LinkFlagToAlltid"), 
	//CSS: Foxtrick.ResourcePath+"resources/css/conference.css",

	init : function() {
	},

	run : function( page, doc ) {  
	},
	
};


/**
* forumsearch.js
* Foxtrick Show Alltid flags in forum posts module
* @author convinced
*/

//**********************************************************
var FoxtrickForumSearch = {

	MODULE_NAME : "ForumSearch",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumViewThread"), 
	DEFAULT_ENABLED : false,

	init : function() {
	},

	run : function( page, doc ) {  
	},
	
};
