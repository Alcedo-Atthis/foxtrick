"use strict";
/**
 * forum-youth-icons.js
 * Foxtrick forum post youth icons
 * @author spambot
 */

Foxtrick.util.module.register({
	MODULE_NAME : "ForumYouthIcons",
	MODULE_CATEGORY : Foxtrick.moduleCategories.FORUM,
	PAGES : ["forumWritePost", "messageWritePost", "guestbook",
		"announcements", "forumSettings", "newsletter", "mailnewsletter",
		"forumModWritePost", "ticket"],
	OPTIONS : ["q", "user_id", "kit_id", "article_id", "line_br", "clock",
		"spoiler", "pre", "table", "youth_player", "youth_team",
		"youth_match", "youth_series", "debug", "settings", "enlarge_input"],
	CSS: Foxtrick.InternalPath + "resources/css/forum-youth-icons.css",

	run : function(doc) {
		var fields = [
			// Forum
			{ page:"forumWritePost", textarea : "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtBody", counterfield : "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtRemLen", length : 3900, add_quote:false },
			// ForumMOD
			{ page:"forumModWritePost", textarea : "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtBody", counterfield : "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtRemLen", length : 3900, add_quote:false },
			// mail
			{ page:"messageWritePost", textarea : "ctl00_ctl00_CPContent_CPMain_ucEditorMain_txtBody", counterfield : "ctl00_ctl00_CPContent_CPMain_ucEditorMain_txtRemLen", length : 1000, add_quote:false },
			// newsletter
			{ page:"newsletter", textarea : "ctl00_ctl00_CPContent_CPMain_txtMessage", counterfield : "ctl00_ctl00_CPContent_CPMain_txtCharsLeft", length : 1000, add_quote:false },
			// newsletter
			{ page:"mailnewsletter", textarea : "ctl00_ctl00_CPContent_CPMain_tbNewsBody", counterfield : "ctl00_ctl00_CPContent_CPMain_txtCharsLeft", length : 1000, add_quote:false },
			// GB
			{ page:"guestbook", textarea : "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtBody", counterfield : "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtRemLen", length : 300, add_quote:false },
			// PA
			{ page:"announcements", textarea : "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtBody", counterfield : "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtRemLen", length : 1000, add_quote:true },
			// ticket
			{ page:"ticket", textarea : "ctl00_ctl00_CPContent_CPMain_ucActionEditor_txtBody", counterfield : "ctl00_ctl00_CPContent_CPMain_ucActionEditor_txtRemLen", length : 2950, add_quote:false },
			// signatur
			{ page:"forumSettings", textarea : "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtBody", counterfield : "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtRemLen", length : 500, add_quote:false },
		];
		var icons = [
			{ type:"q", 		icon_class : "ft_q", 	image : "format_q.png", 		string : "q", 		tags : "[q]qqq[/q]", 			replace_text: "qqq",	alt: "f_quote2" },
			{ type:"line_br", 	icon_class : "ft_br", 	image : "format_br.png", 		string : "br",		tags : "[br]",		 			},
			{ type:"user_id", 	icon_class : "ft_uid", 	image : "format_user.png", 		string : "user", 	tags : "[userid=xxx]",  		replace_text: "xxx"		},
			{ type:"kit_id", 	icon_class : "ft_kit", 	image : "format_kit.png", 		string : "kit",		tags : "[kitid=xxx]",  			replace_text: "xxx"		},
			{ type:"article_id",icon_class : "ft_aid", 	image : "format_article.png", 	string : "article",	tags : "[articleid=xxx]", 		replace_text: "xxx"		},
			{ type:"clock", 	icon_class : "ft_clock", image : "format_clock.png", 	string : "clock", 	tags : "time",  				replace_text: "time"	},
			{ type:"spoiler", 	icon_class : "ft_spoiler",image : "format_spoiler.png",	string : "spoiler",	tags : "[spoiler]yyy[/spoiler]",replace_text: "yyy"		},
			{ type:"pre", 		icon_class : "ft_pre", 	image : "format_pre.png", 		string : "pre", 	tags : "[pre]zzz[/pre]", 		replace_text: "zzz"		},
			{ type:"table", 	icon_class : "ft_table", image : "format_table.png", 	string : "table", 	tags : "[table][tr][td]ttt[/td][/tr][/table]", replace_text: "ttt",  versions:[' ', 'TAB','custom'], versions_string:'tableSeparator'},
		];
		var youthicons = [
			{ type:"youth_player", 	icon_class : "f_player", string : "youthplayerid", 	tags : "[youthplayerid=xxx]",  	replace_text: "xxx"	},
			{ type:"youth_team", 	icon_class : "f_team", 	string : "youthteamid",		tags : "[youthteamid=xxx]",  	replace_text: "xxx"	},
			{ type:"youth_match", 	icon_class : "f_match", 	string : "youthmatchid", 	tags : "[youthmatchid=xxx]",  	replace_text: "xxx"	},
			{ type:"youth_series", 	icon_class : "f_series", string : "youthseries",		tags : "[youthleagueid=xxx]",  	replace_text: "xxx"	},
		];
		var othericons = [
			{ type:"debug", 	icon_class : "f_debug",		image : "format_debug.png", 	string : "debug", 		tags : "debug"},
			{ type:"settings", 	icon_class : "f_settings",	image : "format_settings.png", 	string : "settings", 	tags : "settings"},
		];


		var show_main = Foxtrick.any(function(option) { return FoxtrickPrefs.isModuleOptionEnabled("ForumYouthIcons", option); },
			["user_id", "kit_id", "article_id", "line_br", "clock", "spoiler"]);
		var show_youth = Foxtrick.any(function(option) { return FoxtrickPrefs.isModuleOptionEnabled("ForumYouthIcons", option); },
			["youth_player", "youth_team", "youth_match", "youth_series"]);
		var show_other = Foxtrick.any(function(option) { return FoxtrickPrefs.isModuleOptionEnabled("ForumYouthIcons", option); },
			["debug", "settings"]);
		var enlarge = FoxtrickPrefs.isModuleOptionEnabled("ForumYouthIcons", "enlarge_input");

		var div = doc.getElementById( "ft_youth_icons");
		if (div != null) return;
		var textarea = doc.getElementsByTagName('textarea')[0]
		if (textarea == null ) return;

		if (Foxtrick.isPage("newsletter", doc)
			|| Foxtrick.isPage("mailnewsletter", doc)) {

			Foxtrick.util.inject.jsLink(doc, Foxtrick.InternalPath+"resources/js/HattrickML.js");

			if (Foxtrick.isPage("newsletter", doc))
				var textbox = 'ctl00_ctl00_CPContent_CPMain_txtMessage';
			if (Foxtrick.isPage("mailnewsletter", doc))
				var textbox = 'ctl00_ctl00_CPContent_CPMain_tbNewsBody';

			var anchor = doc.getElementById(textbox);

			if (Foxtrick.isPage("newsletter", doc)) {
				var count = "ctl00_ctl00_CPContent_CPMain_txtCharsLeft";
				var chars = 1000;
				if (enlarge) {
					anchor.setAttribute('rows','20');
					anchor.setAttribute('cols','50');
				}
			}
			if (Foxtrick.isPage("mailnewsletter", doc)) {
				var counter = doc.getElementsByName('remlennews')[0];
				counter.id = "ctl00_ctl00_CPContent_CPMain_txtCharsLeft";
				var count = "ctl00_ctl00_CPContent_CPMain_txtCharsLeft";
				var chars = 1000;
				{
					anchor.setAttribute('rows','20');
					anchor.setAttribute('cols','50');
				}
			}

			var div = doc.createElement('div');
			div.setAttribute('class','HTMLToolbar');
			div.innerHTML = 
				"<img onclick=\"insertQuote(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_quote2\" title=\"[q]\">\
				<img onclick=\"insertBold(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_bold\" title=\"[b]\">\
				<img onclick=\"insertItalic(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_italic\" title=\"[i]\">\
				<img onclick=\"insertUnderline(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_ul\" title=\"[u]\">\
				<img onclick=\"insertRuler(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_hr\" title=\"[hr]\">\
				<img onclick=\"insertPlayerID(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\"  \
					src=\"/Img/Icons/transparent.gif\" class=\"f_player\" title=\"[playerID=xxx]\">\
				<img onclick=\"insertTeamID(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_team\" title=\"[teamID=xxx]\">\
				<img onclick=\"insertMatchID(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_match\" title=\"[matchID=xxx]\">\
				<img onclick=\"insertFederationID(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_fed\" title=\"[fedID=xxx]\">\
				<img onclick=\"insertMessage(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_message\" title=\"[post=xxx.yy]\">\
				<img onclick=\"insertLeagueID(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_series\" title=\"[leagueID=xxx]\">\
				<img onclick=\"insertLink(document.getElementById('" + textbox + "'), document.getElementById('" + count + "'), " + chars + ");\" \
					src=\"/Img/Icons/transparent.gif\" class=\"f_www\" title=\"[link=xxx]\">";
			anchor.parentNode.insertBefore( div, anchor );
		}

		if (Foxtrick.isPage("forumWritePost", doc) && enlarge) {
				//var anchor = doc.getElementById('ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtBody');
				var anchor = doc.getElementById('mainBody').getElementsByTagName('textarea')[0];
				anchor.style.height = '300px';
		}

		if (Foxtrick.isPage("forumModWritePost", doc) && enlarge) {
				//var anchor = doc.getElementById('ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtBody');
				var anchor = doc.getElementById('mainBody').getElementsByTagName('textarea')[0];
				anchor.style.height = '300px';
		}

		if (Foxtrick.isPage("announcements", doc) && enlarge) {
				var anchor = doc.getElementById('ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtBody');
				anchor.style.height = '300px';
		}
		var toolbars = doc.getElementsByClassName("HTMLToolbar");
		if (toolbars[0] == null)
			return;
			
		if (toolbars.length === 1 )
			var toolbar = toolbars[0];
		else 
			// polls have two toolbars. we want the later for now
			var toolbar = toolbars[1];

		toolbar.setAttribute("style","float:left; margin-right:3px;");

		if (Foxtrick.isPage("guestbook", doc))
			try {
				var textbox = doc.getElementById( "ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_txtBody" );
				textbox.setAttribute('style' , 'height:100px; width: 98%;');
			}
			catch (e)
			{
				Foxtrick.log('YouthIcons: textbox not found ',e);
			}

		// Set styles of all buttons
		var nextElement = toolbar.firstChild;
		while (nextElement) {
			try {
				if ( nextElement.id == 'ctl00_ctl00_CPContent_CPMain_ucHattrickMLEditor_pnlTags' ||
					 nextElement.id == 'ctl00_ctl00_CPContent_CPMain_ucActionEditor_pnlTags' ||
					 nextElement.id == 'ctl00_ctl00_CPContent_CPMain_ucEditorMain_pnlTags' ||
					 nextElement.id.search('ctl00_ctl00_CPContent_CPMain_uc') != -1 ||
					 nextElement.href != null
				   ) {
						Foxtrick.addClass(nextElement,"hidden");
				}
				nextElement = nextElement.nextSibling;
			} catch(e) { nextElement = nextElement.nextSibling; }
		}


		//simple test if new icons are set up by HTs
		var target=toolbar.lastChild;
		var tooldivs = doc.getElementsByTagName('img');
		for (var i = 0; i < tooldivs.length; i++) {
			if (tooldivs[i].className=="f_ul") { target=tooldivs[i]; break;}
		}
		target=target.nextSibling;

		var clickHandler = function(textareaId, openingTag, replaceText, fieldCounterId, maxLength) {
			var ta = doc.getElementById(textareaId);
			var fieldCounter = doc.getElementById(fieldCounterId);
			if (ta) {
				// link tags
				if (replaceText) {
					var s = getSelection(ta);
					var newText = (s.selectionLength > 0) ? openingTag.replace(replaceText, s.selectedText) : openingTag;

					Foxtrick.log('selectedText: ', s.selectedText);
					Foxtrick.log('newText: ', newText);

					if (replaceText == 'time') {
						// time
						newText = doc.getElementById('time').textContent;
					}
					else if (replaceText == 'ttt') {
						// table
						var seperator = FoxtrickPrefs.getString("tableSeparator");
						Foxtrick.log('seperator', seperator);

						if (seperator=='TAB') seperator='\\t';
						if (seperator=='|') seperator='\\|';
						if (seperator=='+') seperator='\\+';
						if (seperator=='.') seperator='\\.';
						if (seperator==' ') seperator=' +';

						// deal with some nested tags
						var myReg = new RegExp('\\[i\\](.+)('+seperator+')(.+)\\[\\/i\\]','g');
			 			newText = newText.replace(myReg,'[i]$1[/i]$2[i]$3[/i]');
						var myReg = new RegExp('\\[u\\](.+)('+seperator+')(.+)\\[\\/u\\]','g');
			 			newText = newText.replace(myReg,'[u]$1[/u]$2[u]$3[/u]');
						var myReg = new RegExp('\\[b\\](.+)('+seperator+')(.+)\\[\\/b\\]','g');
			 			newText = newText.replace(myReg,'[b]$1[/b]$2[b]$3[/b]');

						// make the table
						var myReg = new RegExp( seperator,'g');
			 			newText = newText.replace(myReg,'[/td][td]');
						newText = newText.replace(/\n/g,'[/td][/tr][tr][td]');

						// add some colspan for too short rows
						var rows = newText.split('[/tr]');
						var max_cells = 0;
						for (var i=0; i<rows.length-1; ++i) {
							max_cells =  Math.max(max_cells, rows[i].split('[/td]').length-1);
						}
						for (var i=0; i<rows.length-1; ++i) {
							var missing_col = max_cells - (rows[i].split('[/td]').length-1);
							if ( missing_col !==0 ) {
								var last_td = rows[i].lastIndexOf('[td');
								rows[i] = rows[i].substring(0,last_td+3)+' colspan='+String(missing_col+1)+rows[i].substr(last_td+3);
							}
						}
						// add header if first row is bold to some part
						if (rows[0].search(/\[b\].+\[\/b\]/)!=-1) {
							rows[0] = rows[0].replace(/\[b\]/g,'').replace(/\[\/b\]/g,'').replace(/td\]/g,'th]');
						}
						newText='';
						for (var i=0; i<rows.length-1; ++i) {
							newText += rows[i]+'[/tr]'
						}
						newText += '[/table]';
						if (s.selectionLength===0) newText='[table][tr][td]cell1[/td][td]cell2[/td][/tr][tr][td]cell3[/td][td]cell4[/td][/tr][/table]';

						// some formating
						newText = newText.replace(/table\]/g,'table]\n')
							.replace(/\/tr\]/g,'/tr]\n')
							.replace(/\[td/g,' [td')
							.replace(/\[\/td\]/g,'[/td] ')
							.replace(/\[th/g,' [th')
							.replace(/\[\/th\]/g,'[/th] ');
					}

					if (ta.selectionStart || ta.selectionStart == '0') {
						// Opera, Mozilla
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
							if (replaceText == 'qqq' && s.selectionLength === 0){
								ta.selectionStart = s.selectionStart + 3;
								ta.selectionEnd = ta.selectionStart + 3;
							}
							if (replaceText == 'ttt' && s.selectionLength === 0){
								ta.selectionStart = s.selectionStart + 17;
								if (Foxtrick.platform == "Opera") ta.selectionStart++; // opera uses \n\r thus we need to add one for that extra \r
								ta.selectionEnd = ta.selectionStart + 5;
							}
						}

					}
					else {
						// Others
						ta.value += newText;
					}
				}
				else {
					// HR
					var s = getSelection(ta);

					var insertText  = function(text) {
						// Opera, Mozilla
						if (ta.selectionStart || ta.selectionStart == '0') {
							var st = ta.scrollTop;
							ta.value = s.textBeforeSelection + s.selectedText + text + s.textAfterSelection;
							ta.scrollTop = st;

							ta.selectionStart = s.selectionEnd + text.length;
							ta.selectionEnd = ta.selectionStart;
						}

						// IE
						else if (document.selection) {
							var IESel = document.selection.createRange();
							IESel.text = s.selectedText + text;
							IESel.select();
						}

						// Others
						else {
							ta.value += text;
						}
					}

					// debug
					if (openingTag == 'debug'){
						if (Foxtrick.arch === "Sandboxed") {
							sandboxed.extension.sendRequest(
								{ req : "getDebugLog" },
								function(n) {
									insertText(Foxtrick.log.header(doc)+'\n'+n.log);
									textCounter(ta, fieldCounter, maxLength);
								}
							);
							return;
						}
						else {
							openingTag = Foxtrick.log.header(doc) + '\n' + Foxtrick.log.cache.substr(Foxtrick.log.cache.length-3500);
						}
					}
					// settings
					if (openingTag == 'settings'){
						var userPrefsText =  FoxtrickPrefs.SavePrefs(true, false, true,'%key:%value');
						var userPrefsTextArray = userPrefsText.split('\n');
						openingTag = '';
						for (var i=0; i<userPrefsTextArray.length; ++i)
							openingTag += userPrefsTextArray[i].substr(0,240)+'\n';
					}

					insertText(openingTag);
				}
			}
			textCounter(ta, fieldCounter, maxLength);
		};
		var addClick = function(ev) {
			var version = ev.target.getAttribute('version');
			if (version) {
				Foxtrick.log(ev.target.getAttribute('version_string'),' ', version);
				if (version=='custom') {
								var version = prompt(Foxtrickl10n.getString("ForumSpecialBBCode.enterSeparator"));
								Foxtrick.log('custom_seperator: ', version);
								if (version == null || version=='') return;
							}
				FoxtrickPrefs.setString( ev.target.getAttribute('version_string'), version);
				doc.getElementById(ev.target.getAttribute('parent_id')).setAttribute('current_version', version);
				doc.getElementById(ev.target.getAttribute('parent_id')).title = doc.getElementById(ev.target.getAttribute('parent_id')).getAttribute('title_raw').replace(/%s/,version);
			}
			for (var i = 0; i < fields.length; ++i) {
				var page = fields[i].page;
				if (Foxtrick.isPage(page, doc)) {
					clickHandler(fields[i].textarea, ev.target.getAttribute('tags'), ev.target.getAttribute('replace_Text'), fields[i].counterfield, fields[i].length);
					break;
				}
			}
		};
		var getSelection = function(ta) {
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
		};
		var textCounter = function (field, countfield, maxlimit) {
			var text = field.value.replace(/[\r]/g, '').length;
			var text2 = field.value.replace(/[\r\n]/g, '').length; // Count without \n\r
			var diff = text - text2;
			countfield.value = maxlimit - (text2 + diff * 2);
		};

		// add quote tag
		if (FoxtrickPrefs.isModuleOptionEnabled("ForumYouthIcons", icons[0].type)) {
			for (var j = 0; j < fields.length; j++) {
				var page = fields[j].page;
				if (Foxtrick.isPage(page, doc) && fields[j].add_quote==true) {
					var newimage = doc.createElement( "img" );
					newimage.src = "/Img/Icons/transparent.gif";
					Foxtrick.listen(newimage, "click", addClick, false);
					newimage.setAttribute( "tags", icons[0].tags );
					if ( icons[0].replace_text) newimage.setAttribute( "replace_text", icons[0].replace_text);
					newimage.setAttribute( "class", icons[0].icon_class);
					newimage.title = Foxtrickl10n.getString("ForumSpecialBBCode."+icons[0].string);
					toolbar.insertBefore( newimage, toolbar.getElementsByTagName('img')[0] );
				}
			}
		}
		for (var i = 1; i < icons.length; i++) {
			if (FoxtrickPrefs.isModuleOptionEnabled("ForumYouthIcons", icons[i].type)) {
				if (icons[i].alt==null || doc.getElementsByClassName(icons[i].alt).length==0) {
					var newimage = doc.createElement( "img" );
					newimage.src = "/Img/Icons/transparent.gif";
					Foxtrick.listen(newimage, "click", addClick, false );
					newimage.setAttribute( "tags", icons[i].tags);
					if ( icons[i].replace_text) newimage.setAttribute( "replace_text", icons[i].replace_text);
					newimage.setAttribute( "class", icons[i].icon_class);
					newimage.title = Foxtrickl10n.getString("ForumSpecialBBCode."+icons[i].string);

					if (icons[i].versions) {
						var span = doc.createElement("div");
						span.className = "ft-pop-up-container icon";
						span.appendChild(newimage);

						var list = doc.createElement("ul");
						list.className = "ft-pop";
						list.setAttribute('style',"margin-top:-5px;");
						for (var j=0; j<icons[i].versions.length; ++j) {
							var item = doc.createElement("li");
							var link = doc.createElement("span");
							Foxtrick.listen(link, "click", addClick, false);
							link.setAttribute( "tags", icons[i].tags);
							if ( icons[i].replace_text) link.setAttribute( "replace_text", icons[i].replace_text);
							link.setAttribute('version', icons[i].versions[j]);
							link.textContent = Foxtrickl10n.getString('ForumSpecialBBCode.'+icons[i].versions_string).replace(/%s/, icons[i].versions[j]);
							link.setAttribute('parent_id', icons[i].icon_class+'_id');
							link.setAttribute('version_string', icons[i].versions_string);
							item.appendChild(link);
							list.appendChild(item);
						}
						newimage.setAttribute('title_raw', newimage.title);
						newimage.title = newimage.title.replace(/%s/, FoxtrickPrefs.getString(icons[i].versions_string));
						newimage.setAttribute('id', icons[i].icon_class+'_id');
						newimage.setAttribute('parent_id', icons[i].icon_class+'_id');
						newimage.setAttribute('version', FoxtrickPrefs.getString(icons[i].versions_string));
						newimage.setAttribute('version_string', icons[i].versions_string);

						span.appendChild(list);
						toolbar.insertBefore(span,target);
					}
					else toolbar.insertBefore( newimage,target );
				}
			}
		}

		var toolbar_label = doc.createElement( "div" );
		toolbar_label.textContent = Foxtrickl10n.getString("ForumYouthIcons.labelToolbar");
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

		if (show_other || true) {
			var otherbar = doc.createElement( "div" );
			otherbar.setAttribute( "class" , "HTMLToolbar");
			otherbar.setAttribute( "style" , "float:right;");

			var otherbar_label = doc.createElement( "div" );
			otherbar_label.id = "ft_other_icons";
			otherbar_label.textContent = Foxtrickl10n.getString("ForumOtherIcons.label");
			if (!show_other) otherbar_label.className= "hidden";
			otherbar.appendChild( otherbar_label);

			for (var i = 0; i < othericons.length; i++) {
				if (FoxtrickPrefs.isModuleOptionEnabled("ForumYouthIcons", othericons[i].type)) {
						var newimage = doc.createElement( "img" );
						newimage.src = "/Img/Icons/transparent.gif";
						Foxtrick.listen(newimage, "click", addClick, false );
						newimage.setAttribute( "tags", othericons[i].tags);
						if ( othericons[i].replace_text) newimage.setAttribute( "replace_text", othericons[i].replace_text);
						newimage.setAttribute( "class", othericons[i].icon_class);
						newimage.title = Foxtrickl10n.getString("ForumOtherIcons."+othericons[i].string);
						otherbar.appendChild( newimage );
				}
			}

			var head = toolbar.parentNode;
			head.insertBefore( otherbar, toolbar.nextSibling );
		}

		if (show_youth || true) {
			var youthbar = doc.createElement( "div" );
			youthbar.setAttribute( "class" , "HTMLToolbar");
			youthbar.setAttribute( "style" , "float:left;");

			var youthbar_label = doc.createElement( "div" );
			youthbar_label.id = "ft_youth_icons";
			youthbar_label.textContent = Foxtrickl10n.getString("ForumYouthIcons.label");
			if (!show_youth) youthbar_label.className = "hidden";
			youthbar.appendChild( youthbar_label);

			for (var i = 0; i < youthicons.length; i++) {
				if (FoxtrickPrefs.isModuleOptionEnabled("ForumYouthIcons", youthicons[i].type)) {
						var newimage = doc.createElement( "img" );
						newimage.src = "/Img/Icons/transparent.gif";
						Foxtrick.listen(newimage, "click", addClick, false );
						newimage.setAttribute( "tags", youthicons[i].tags);
						if ( youthicons[i].replace_text) newimage.setAttribute( "replace_text", youthicons[i].replace_text);
						newimage.setAttribute( "class", youthicons[i].icon_class);
						newimage.title = Foxtrickl10n.getString("ForumYouthIcons."+youthicons[i].string);
						youthbar.appendChild( newimage );
				}
			}

			var head = toolbar.parentNode;
			head.insertBefore( youthbar, toolbar.nextSibling );
		}
	},

	change : function(doc) {
		this.run(doc);
	}
});
