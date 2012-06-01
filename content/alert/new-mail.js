"use strict";
/**
 * new-mail.js
 * Script which makes the new mails more visible
 * @author htbaumanns, ryanli
 */

Foxtrick.modules["NewMail"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.ALERT,
	PAGES : ["all"],
	OPTIONS : ["NotifyMail", "NotifyMailSound", "NotifyForum", "NotifyForumSound"],
	OPTION_EDITS : true,
	OPTION_EDITS_DISABLED_LIST : [ true, false, true, false],
	OPTION_EDITS_DATAURL_LOAD_BUTTONS : [false, true, false, true ],
	OPTION_EDITS_DATAURL_IS_SOUND : [false, true, false, true ],


	CSS : Foxtrick.InternalPath + "resources/css/new-mail.css",

	run : function(doc) {
		Foxtrick.sessionGet( {"mailCount":0, "forumCount":0}, function(oldCount) {
			var oldMailCount = oldCount.mailCount || 0;
			var oldForumCount = oldCount.forumCount || 0;

			var menu = doc.getElementById("menu");
			// mail count within My Hattrick link
			var myHt = menu.getElementsByTagName("a")[0];
			if (myHt.getElementsByTagName("span").length) {
				var mailCountSpan = myHt.getElementsByTagName("span")[0];
				mailCountSpan.className = "ft-new-mail";
				var newMailCount = Number(mailCountSpan.textContent.match(/\d+/)[0]);
			}
			else {
				// no unread mails
				var newMailCount = 0;
			}
			Foxtrick.sessionSet("mailCount", newMailCount);
			if (FoxtrickPrefs.isModuleOptionEnabled("NewMail", "NotifyMail")
				&& newMailCount > oldMailCount) {
				Foxtrick.util.notify.create(Foxtrickl10n.getString("notify.newMail", newMailCount).replace(/%s/, newMailCount), 'http://'+doc.location.host+'/MyHattrick/Inbox/Default.aspx');
				// play sound if enabled
				if (FoxtrickPrefs.isModuleOptionEnabled("NewMail", "NotifyMailSound")) {
					var sound = FoxtrickPrefs.getString("module.NewMail.NotifyMailSound_text");
					Foxtrick.playSound(sound, doc);
				}
			}

			// mail count in left menu
			var subMenu = doc.getElementsByClassName("subMenu")[0];
			if (subMenu) {
				var subMenuBox = subMenu.getElementsByClassName("subMenuBox")[0];
				var listItems = subMenuBox.getElementsByTagName("li");
				var mailCountItems = Foxtrick.filter(function(n) {
					return n.getElementsByTagName("span").length > 0;
				}, listItems);
				if (mailCountItems.length) {
					var mailCount = mailCountItems[0].getElementsByTagName("span")[0];
					mailCount.className = "ft-new-mail";
				}
			}

			// new forum message
			var forum = menu.getElementsByTagName("a")[3];
			if (forum.textContent.indexOf("(") > -1) {
				// has new message, no span this time, we need to add it 
				var newForumCount = Number(forum.textContent.match(/\d+/)[0]);
				forum.textContent = forum.textContent.replace(/\(\d+\)/, "");
				var span = doc.createElement('span');
				span.className = "ft-new-forum-msg";
				span.textContent = "("+newForumCount+")";
				forum.appendChild(span);
			}
			else {
				// no new forum messages
				var newForumCount = 0;
			}
			Foxtrick.sessionSet("forumCount", newForumCount);
			if (FoxtrickPrefs.isModuleOptionEnabled("NewMail", "NotifyForum")
				&& newForumCount > oldForumCount) {
				Foxtrick.log('alert' ,FoxtrickPrefs.isModuleOptionEnabled("NewMail", "NotifyForumSound"),FoxtrickPrefs.getString("module.NewMail.NotifyForumSound_text"))
				Foxtrick.util.notify.create(Foxtrickl10n.getString("notify.newForumMessage", newForumCount).replace(/%s/, newForumCount), 'http://'+doc.location.host+'/Forum/Default.aspx?actionType=refresh');
				// play sound if enabled
				if (FoxtrickPrefs.isModuleOptionEnabled("NewMail", "NotifyForumSound")) {
					var sound = FoxtrickPrefs.getString("module.NewMail.NotifyForumSound_text");
					Foxtrick.playSound(sound, doc);
				}
			}
			Foxtrick.log('oldCount', oldCount)
			Foxtrick.log('newCount', newForumCount, newMailCount)
		});
 	}
};
