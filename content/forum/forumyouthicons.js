/**
 * forumyouthicons.js
 * Foxtrick forum post youth icons
 * @author spambot
 */

 var FoxtrickForumYouthIcons = {

    _DOC : {},
    MODULE_NAME : "ForumYouthIcons",
    MODULE_AUTHOR : "spambot",
    MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : new Array("forumWritePost","messageWritePost","guestbook","announcements","ads","newsletter","forumModWritePost"),
    DEFAULT_ENABLED : true,
    OPTIONS :  new Array("user_id", "kit_id", "article_id", "line_br", "clock", "spoiler", "pre", "youth_player", "youth_team", "youth_match", "youth_series", "enlarge_input"),

	NEW_AFTER_VERSION: "0.4.9",
	LATEST_CHANGE:"Added Insert 'pre' format tag",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,

    _NEW_MESSAGE_WINDOW : 'ctl00_CPMain_ucEditor_tbBody',

    init : function() {
    },

    run : function( page, doc ) {
    try {
        Foxtrick.addJavaScript(doc, "chrome://foxtrick/content/resources/js/HattrickML.js");
        Foxtrick.dump('PAGE: ' + page + '\n');
        var show_main = false; var show_youth = false; 
        var enlarge = Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "enlarge_input");
        if ((Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "user_id")) ||
            (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "kit_id")) ||
            (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "article_id")) ||
            (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "line_br")) ||
            (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "clock")) ||
            (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "spoiler"))
            )
            show_main = true;
        if ((Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "youth_player")) ||
            (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "youth_team")) ||
            (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "youth_match")) ||
            (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "youth_series")))
            show_youth = true;

        var div = doc.getElementById( "ft_youth_icons");
        if (div != null) return;
        
        if (doc.getElementById('ctl00_CPMain_tbNewsBody') != null) page = 'mailnewsletter';
        // Foxtrick.dump('YOUTH => ' + page +'\n');
        if ( (page == 'ads' ) && (!doc.getElementById('ctl00_CPMain_txtInsert'))) return;

        if (page == 'ads' || page == 'newsletter' || page == 'mailnewsletter') {
            if (page == 'ads' ) var textbox = 'ctl00_CPMain_txtInsert';
            if (page == 'newsletter' ) var textbox = 'ctl00_CPMain_txtMessage';
            if (page == 'mailnewsletter' ) var textbox = 'ctl00_CPMain_tbNewsBody';

            var anchor = doc.getElementById(textbox);

            if (page == 'ads') {
                var count = "ctl00_CPMain_txtCharCount";
                var chars = 2000;
                if (enlarge) {
                    anchor.setAttribute('rows','20');
                    anchor.setAttribute('cols','60');
                }
            }
            if (page == 'newsletter') {
                var count = "ctl00_CPMain_txtCharsLeft";
                var chars = 1000;
                if (enlarge) {
                    anchor.setAttribute('rows','20');
                    anchor.setAttribute('cols','50');
                }
            }
            if (page == 'mailnewsletter') {
                var counter = doc.getElementsByName('remlennews')[0];
                counter.id = "ctl00_CPMain_txtCharsLeft";
                var count = "ctl00_CPMain_txtCharsLeft";
                var chars = 1000;
                {
                    anchor.setAttribute('rows','20');
                    anchor.setAttribute('cols','50');
                }
            }

            var div = doc.createElement('div');
            div.setAttribute('class','HTMLToolbar');
            div.setAttribute('style','display:block;width:300px;');
            div.innerHTML="<img style=\"margin: 2px;\" onclick=\"insertQuote(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_quote2\" title=\"[q]\"><img style=\"margin: 2px;\" onclick=\"insertBold(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_bold\" title=\"[b]\"><img style=\"margin: 2px;\" onclick=\"insertItalic(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_italic\" title=\"[i]\"><img style=\"margin: 2px; width: 22px; height: 22px;\" onclick=\"insertUnderline(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_ul\" title=\"[u]\"><img style=\"width: 22px; height: 22px;\" onclick=\"insertRuler(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_hr\" title=\"[hr]\"><img onclick=\"insertPlayerID(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_player\" title=\"[playerID=xxx]\"><img onclick=\"insertTeamID(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_team\" title=\"[teamID=xxx]\"><img onclick=\"insertMatchID(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_match\" title=\"[matchID=xxx]\"><img onclick=\"insertFederationID(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_fed\" title=\"[fedID=xxx]\"><img onclick=\"insertMessage(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_message\" title=\"[post=xxx.yy]\"><img onclick=\"insertLeagueID(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_series\" title=\"[leagueID=xxx]\"><img onclick=\"insertLink(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" src=\"/Img/Icons/transparent.gif\" class=\"f_www\" title=\"[link=xxx]\">";
            anchor.parentNode.insertBefore( div, anchor );
        }

        if (page == 'forumWritePost' && enlarge) {
                var anchor = doc.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody');
                anchor.style.height = '300px';
        }
		
		if (page == 'forumModWritePost' && enlarge) {
                var anchor = doc.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody');
                anchor.style.height = '300px';
        }

        if (page == 'announcements' && enlarge) {
                var anchor = doc.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody');
                anchor.style.height = '300px';
        }        
        var toolbar = Foxtrick.getElementsByClass( "HTMLToolbar", doc );
        toolbar = toolbar[0];
        if  (( toolbar == null ) && (!page == 'ads' )) return;
        var toolbar_main = toolbar;


        if ( (page == 'messageWritePost' ) && ( !Foxtrick.isStandardLayout( doc ) ) )
            try {
                var mainbbox = Foxtrick.getElementsByClass( "mainBox", doc )[0];
                mainbbox.setAttribute( "style", "padding-bottom:25px;");
            }
            catch (e)
            {
                Foxtrick.dump('YouthIcons: mainBox not found ' + e + '\n');
            }

        toolbar.setAttribute("style","float:left; margin-right:3px;");

        if (page == 'guestbook')
            try {
                var textbox = doc.getElementById( "ctl00_CPMain_ucHattrickMLEditor_txtBody" );
                textbox.setAttribute('style' , 'height:100px; width:100%');
            }
            catch (e)
            {
                Foxtrick.dump('YouthIcons: textbox not found ' + e + '\n');
            }

        // Set styles of all buttons
        var nextElement = toolbar.firstChild;
        while (nextElement) {
            try {
                if ( nextElement.id == 'ctl00_CPMain_ucHattrickMLEditor_pnlTags' ||
                     nextElement.id == 'ctl00_CPMain_ucActionEditor_pnlTags' ||
                     nextElement.id == 'ctl00_CPMain_ucEditorMain_pnlTags' ||
                     nextElement.href != null
                   ) {
                        nextElement.setAttribute("style","display:none")
                }
                else {
                    nextElement.setAttribute("style","margin:2px");
                }
                nextElement = nextElement.nextSibling;
            } catch(e) { nextElement = nextElement.nextSibling; }
        }


        //simple test if new icons are set up by HTs
        var toolbar_test = Foxtrick.getElementsByClass( "f_hr", doc );
        //Foxtrick.dump('Document child class "f_hr": ['+toolbar_test+']\n');
        if (toolbar_test.length != null) {
            var target=toolbar.lastChild;
            var tooldivs = doc.getElementsByTagName('img');
            for (var i = 0; i < tooldivs.length; i++) {
                if (tooldivs[i].className=="f_ul") { target=tooldivs[i]; break;}
            }
            target=target.nextSibling;

            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "line_br")) {
            var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", this._br , false );
                newimage.setAttribute( "class", "ft_br");
                newimage.setAttribute("style","margin:2px; width:22px; height:22px; cursor:pointer; background-image: url('chrome://foxtrick/content/resources/linkicons/format_br.png') !important;");
                newimage.title = Foxtrickl10n.getString("ForumSpecialBBCode.br");
                toolbar.insertBefore( newimage,target );
            }
            
            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "user_id")) {
                var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", this._userid , false );
                newimage.setAttribute( "class", "ft_uid");
                newimage.setAttribute("style","margin:2px; width:22px; height:22px; cursor:pointer; background-image: url('chrome://foxtrick/content/resources/linkicons/format_user.png') !important;");
                newimage.title = Foxtrickl10n.getString("ForumSpecialBBCode.user");
                toolbar.insertBefore( newimage,target );
            }
            
            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "kit_id")) {
                var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", this._kitid , false );
                newimage.setAttribute( "class", "ft_kit");
                newimage.setAttribute("style","margin:2px; width:22px; height:22px; cursor:pointer; background-image: url('chrome://foxtrick/content/resources/linkicons/format_kit.png') !important;");
                newimage.title = Foxtrickl10n.getString("ForumSpecialBBCode.kit");
                toolbar.insertBefore( newimage,target );
            }
            
            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "article_id")) {
                var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", this._articleid , false );
                newimage.setAttribute( "class", "ft_aid");
                newimage.setAttribute("style","margin:2px; width:22px; height:22px; cursor:pointer; background-image: url('chrome://foxtrick/content/resources/linkicons/format_article.png') !important;");
                newimage.title = Foxtrickl10n.getString("ForumSpecialBBCode.article");
                toolbar.insertBefore( newimage,target );
            }
            
            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "clock")) {
                var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", this._clock , false );
                newimage.setAttribute( "class", "ft_clock");
                newimage.setAttribute("style", "margin:2px; width:22px; height:22px; cursor:pointer; background-image: url('chrome://foxtrick/content/resources/linkicons/format_clock.png') !important;");
                newimage.title = Foxtrickl10n.getString("ForumSpecialBBCode.clock");
                toolbar.insertBefore( newimage,target );
            }  

            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "spoiler")) {
                var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", this._spoiler , false );
                newimage.setAttribute( "class", "ft_spoiler");
                newimage.setAttribute("style", "margin:2px; width:22px; height:22px; cursor:pointer; background-image: url('chrome://foxtrick/content/resources/linkicons/format_spoiler.png') !important;");
                newimage.title = Foxtrickl10n.getString("ForumSpecialBBCode.spoiler");
                toolbar.insertBefore( newimage,target );
            }

            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "pre")) {
                var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", this._pre , false );
                newimage.setAttribute( "class", "ft_pre");
                newimage.setAttribute("style", "margin:2px; width:22px; height:22px; cursor:pointer; background-image: url('chrome://foxtrick/content/resources/linkicons/format_pre.png') !important;");
                newimage.title = Foxtrickl10n.getString("ForumSpecialBBCode.pre");
                toolbar.insertBefore( newimage,target );
            }
            
            
        }

        var toolbar_label = doc.createElement( "div" );
        toolbar_label.innerHTML = Foxtrickl10n.getString("ForumYouthIcons.labelToolbar");
        toolbar_label.setAttribute( "style" , "background-color:#D0D0D0;;margin-bottom:3px;text-align:center;");
        toolbar.insertBefore( toolbar_label, toolbar.firstChild );

        // Set styles of next siblings
        var nextElement = toolbar.nextSibling;
        while (nextElement) {
            try {
                if (nextElement.id.search('ctl00_') == -1) {
                    nextElement.setAttribute("style","clear:both;");
                }    
                nextElement = nextElement.nextSibling;
            } catch(e) { nextElement = nextElement.nextSibling; }
        }

        FoxtrickForumYouthIcons._DOC = doc;

        if (show_youth || true) {
            var youthbar = doc.createElement( "div" );
            youthbar.setAttribute( "class" , "HTMLToolbar");
            youthbar.setAttribute( "style" , "float:left;");

            var youthbar_label = doc.createElement( "div" );
            youthbar_label.id = "ft_youth_icons";
            youthbar_label.innerHTML = Foxtrickl10n.getString("ForumYouthIcons.label");
            youthbar_label.setAttribute( "style" , "background-color:#D0D0D0;;margin-bottom:3px;text-align:center;");
            if (!show_youth) youthbar_label.setAttribute( "style" , "display:none;");
            youthbar.appendChild( youthbar_label);

            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "youth_player")) {
                var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", FoxtrickForumYouthIcons._youthplayer , false );
                newimage.setAttribute( "class", "f_player");
                newimage.setAttribute("style","margin:2px");
                newimage.title = Foxtrickl10n.getString("ForumYouthIcons.youthplayerid");
                youthbar.appendChild( newimage );
            }

            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "youth_team")) {
                var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", FoxtrickForumYouthIcons._youthteam , false );
                newimage.setAttribute( "class", "f_team");
                newimage.setAttribute("style","margin:2px");
                newimage.title = Foxtrickl10n.getString("ForumYouthIcons.youthteamid");
                youthbar.appendChild( newimage );
            }

            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "youth_match")) {
                var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", FoxtrickForumYouthIcons._youthmatch , false );
                newimage.setAttribute( "class", "f_match");
                newimage.setAttribute("style","margin:2px");
                newimage.title = Foxtrickl10n.getString("ForumYouthIcons.youthmatchid");
                youthbar.appendChild( newimage );
            }

            if (Foxtrick.isModuleFeatureEnabled(FoxtrickForumYouthIcons, "youth_series")) {
                var newimage = doc.createElement( "img" );
                newimage.src = "/Img/Icons/transparent.gif";
                newimage.addEventListener( "click", FoxtrickForumYouthIcons._youthseries , false );
                newimage.setAttribute( "class", "f_series");
                newimage.setAttribute("style","margin:2px");
                newimage.title = Foxtrickl10n.getString("ForumYouthIcons.youthseries");
                youthbar.appendChild( newimage );
            }

            var head = toolbar.parentNode;
            head.insertBefore( youthbar, toolbar.nextSibling );
        }
	} catch(e){Foxtrick.dump('FoxtrickForumYouthIcons error: '+e+'\n');}
    },

	change : function( page, doc ) {
        var div = doc.getElementById( "ft_youth_icons");
        if (div != null) return;
        else this.run(page, doc);
	},



    // FORUM | GB | PE : ctl00_CPMain_ucHattrickMLEditor_txtBody | ctl00_CPMain_ucHattrickMLEditor_txtRemLen | 3900
    // MAIL : ctl00_CPMain_ucEditorMain_txtBody | ctl00_CPMain_ucEditorMain_txtRemLen | 1000
    // TICKET: ctl00_CPMain_ucActionEditor_txtBody | ctl00_CPMain_ucActionEditor_txtRemLen | 2950
    // HT-Press Editor: ctl00_CPMain_txtComment | ctl00_CPMain_txtCharsLeft3 | 1800
    // Fed roundmail: ctl00_CPMain_txtMessage | ctl00_CPMain_txtCharsLeft | 1000
    // Supporter massmail : ctl00_CPMain_tbNewsBody | ctl00_CPMain_txtCharsLeft | 1000

    _youthplayer : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), "[youthplayerid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), "[youthplayerid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), "[youthplayerid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), "[youthplayerid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), "[youthplayerid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), "[youthplayerid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },

    _youthteam : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), "[youthteamid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), "[youthteamid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), "[youthteamid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), "[youthteamid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), "[youthteamid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), "[youthteamid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },

    _youthmatch : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), "[youthmatchid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), "[youthmatchid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), "[youthmatchid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), "[youthmatchid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), "[youthmatchid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), "[youthmatchid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },

    _youthseries : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), "[youthleagueid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), "[youthleagueid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), "[youthleagueid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), "[youthleagueid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), "[youthleagueid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), "[youthleagueid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },

    _userid : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), "[userid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), "[userid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), "[userid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), "[userid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), "[userid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), "[userid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },

    _kitid : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), "[kitid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), "[kitid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), "[kitid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), "[kitid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), "[kitid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), "[kitid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },

    _articleid : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), "[articleid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), "[articleid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), "[articleid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), "[articleid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), "[articleid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), "[articleid=xxx]", null, "xxx", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },

    _br : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), "[br]", null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), "[br]", null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), "[br]", null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), "[br]", null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), "[br]", null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), "[br]", null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },
    
    _clock : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), FoxtrickForumYouthIcons._DOC.getElementById('time').textContent, null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), FoxtrickForumYouthIcons._DOC.getElementById('time').textContent, null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), FoxtrickForumYouthIcons._DOC.getElementById('time').textContent, null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), FoxtrickForumYouthIcons._DOC.getElementById('time').textContent, null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), FoxtrickForumYouthIcons._DOC.getElementById('time').textContent, null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), FoxtrickForumYouthIcons._DOC.getElementById('time').textContent, null, null, null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },
    
    _spoiler : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), "[spoiler]yyy[/spoiler]", null, "yyy", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), "[spoiler]yyy[/spoiler]", null, "yyy", null,FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), "[spoiler]yyy[/spoiler]", null, "yyy", null,FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), "[spoiler]yyy[/spoiler]", null, "yyy", null,FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), "[spoiler]yyy[/spoiler]", null, "yyy", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), "[spoiler]yyy[/spoiler]", null, "yyy", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },    

    _pre : function (  ) {
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtBody'), "[pre]zzz[/pre]", null, "zzz", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucHattrickMLEditor_txtRemLen'), 3900)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtBody'), "[pre]zzz[/pre]", null, "zzz", null,FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucEditorMain_txtRemLen'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtBody'), "[pre]zzz[/pre]", null, "zzz", null,FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_ucActionEditor_txtRemLen'), 2950)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtInsert'), "[pre]zzz[/pre]", null, "zzz", null,FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft3'), 1800)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtMessage'), "[pre]zzz[/pre]", null, "zzz", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
        if ( FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody') != null ) FoxtrickForumYouthIcons.clickHandler(FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_tbNewsBody'), "[pre]zzz[/pre]", null, "zzz", null, FoxtrickForumYouthIcons._DOC.getElementById('ctl00_CPMain_txtCharsLeft'), 1000)
    },
    
    _fillMsgWindow : function( string ) {
        try {
            var msg_window = FoxtrickForumYouthIcons._DOC.getElementById( FoxtrickForumYouthIcons._NEW_MESSAGE_WINDOW );
            msg_window.value += string;
            msg_window.focus();
        } catch(e) {
            Foxtrick.dump('FoxtrickForumYouthIcons'+e);
        }
    },


clickHandler : function (ta, openingTag, closingTag, replaceText, counter, fieldCounter, maxLength) {
    if (ta) {
        // link tags
        if (replaceText) {
            var s = this.getSelection(ta);
            var newText = (s.selectionLength > 0) ? openingTag.replace(replaceText, s.selectedText) : openingTag;


            // Opera, Mozilla
            if (ta.selectionStart || ta.selectionStart == '0') {
                var st = ta.scrollTop;
                ta.value = s.textBeforeSelection + newText + s.textAfterSelection;
                ta.scrollTop = st;

                if ((openingTag.indexOf(' ') > 0) && (openingTag.indexOf(' ') < openingTag.length - 1)) {
                    ta.selectionStart = s.selectionStart + openingTag.indexOf('=') + 1;
                    ta.selectionEnd = ta.selectionStart + openingTag.indexOf(' ') - openingTag.indexOf('=') - 1;
                }

                // MessageID
                else {
                    if (s.selectionLength === 0) {
                        ta.selectionStart = s.selectionStart + openingTag.indexOf('=') + 1;
                        ta.selectionEnd = ta.selectionStart + openingTag.indexOf(']') - openingTag.indexOf('=') - 1;
                    }
                    else {
                        ta.selectionStart = s.selectionStart + newText.length;
                        ta.selectionEnd = ta.selectionStart;
                    }
                    if (replaceText == 'yyy' && s.selectionLength === 0){
                        ta.selectionStart = s.selectionStart + 9;
                        ta.selectionEnd = ta.selectionStart + 3;
                    }
                    if (replaceText == 'zzz' && s.selectionLength === 0){
                        ta.selectionStart = s.selectionStart + 5;
                        ta.selectionEnd = ta.selectionStart + 3;
                    }                    
                }

            }

            // Others
            else {
                ta.value += newText;
            }
        }

        // start/end tags
        else if ((closingTag) && (counter >= 0)) {
            var s = this.getSelection(ta);
            var newText = (s.selectionLength > 0) ? openingTag + s.selectedText + closingTag : (counter % 2 == 1) ? openingTag : closingTag;

            // Opera, Mozilla
            if (ta.selectionStart || ta.selectionStart == '0') {
                var st = ta.scrollTop;
                ta.value = s.textBeforeSelection + newText + s.textAfterSelection;
                ta.scrollTop = st;

                ta.selectionStart = s.selectionStart + newText.length;
                ta.selectionEnd = ta.selectionStart;
            }

            // IE
            else if (document.selection) {
                var IESel = document.selection.createRange();
                IESel.text = newText;
                IESel.select();
            }

            // Others
            else {
                ta.value += newText;
            }
        }

        // Quote
        else if ((closingTag) && !(counter)) {
            ta.value = quoteText + '\n' + ta.value;
        }

        // HR
        else {
            var s = this.getSelection(ta);

            // Opera, Mozilla
            if (ta.selectionStart || ta.selectionStart == '0') {
                var st = ta.scrollTop;
                ta.value = s.textBeforeSelection + s.selectedText + openingTag + s.textAfterSelection;
                ta.scrollTop = st;

                ta.selectionStart = s.selectionEnd + openingTag.length;
                ta.selectionEnd = ta.selectionStart;
            }

            // IE
            else if (document.selection) {
                var IESel = document.selection.createRange();
                IESel.text = s.selectedText + openingTag;
                IESel.select();
            }

            // Others
            else {
                ta.value += newText;
            }
        }
    }
    this.textCounter(ta, fieldCounter, maxLength);
},

getSelection : function(ta) {
    if (ta) {
        ta.focus();

        var textAreaContents = {
            completeText: '',
            selectionStart: 0,
            selectionEnd: 0,
            selectionLength: 0,
            textBeforeSelection: '',
            selectedText: '',
            textAfterSelection: ''
        };

        if (ta.selectionStart || ta.selectionStart == '0') {
            textAreaContents.completeText = ta.value;
            textAreaContents.selectionStart = ta.selectionStart;

            if ((ta.selectionEnd - ta.selectionStart) !== 0) {
                while (ta.value.charAt(ta.selectionEnd - 1) == ' ') {
                    ta.selectionEnd--;
                }
            }

            textAreaContents.selectionEnd = ta.selectionEnd;
            textAreaContents.selectionLength = ta.selectionEnd - ta.selectionStart;
            textAreaContents.textBeforeSelection = ta.value.substring(0, ta.selectionStart);

            var st = ta.value.substring(ta.selectionStart, ta.selectionEnd);

            textAreaContents.selectedText = st;
            textAreaContents.textAfterSelection = ta.value.substring(ta.selectionEnd, ta.value.length);
            return textAreaContents;
        }
    }
},

textCounter : function (field, countfield, maxlimit) {
    var text = field.value.replace(/[\r]/g, '').length;
    var text2 = field.value.replace(/[\r\n]/g, '').length; // Count without \n\r
    var diff = text - text2;
    countfield.value = maxlimit - (text2 + diff * 2);
}

};
