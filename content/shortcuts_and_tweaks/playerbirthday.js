/**
 * playerbirthday.js
 * show information about past and coming birthdays
 * @author jurosz, ryanli
 */

 ////////////////////////////////////////////////////////////////////////////////
var FoxtrickPlayerBirthday = {

    MODULE_NAME : "PlayerBirthday",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : new Array('players','YouthPlayers'),
	DEFAULT_ENABLED : true,
	NEW_AFTER_VERSION : "0.4.8.9",
	LATEST_CHANGE : "Birthdaybox fixed for russian lang",

    run : function(page, doc) {
		try {
			// array of players
			var birthdayToday = new Array();
			var birthdayFuture = new Array();
			var birthdayPast = new Array();

			var playerList = Foxtrick.Pages.Players.getPlayerList(doc, true);

			for (var i = 0; i < playerList.length; ++i) {
				if (playerList[i].age !== undefined) {
					if (playerList[i].age.days === 0) {
						birthdayToday.push(playerList[i]);
					}
					else if (playerList[i].age.days > 105) {
						birthdayFuture.push(playerList[i]);
					}
					else if (playerList[i].age.days < 7) {
						birthdayPast.push(playerList[i]);
					}
				}
			}

			// sorting of arrays according to days and then years
			birthdayToday.sort(this.sort);
			birthdayFuture.sort(this.sort);
			birthdayPast.sort(this.sort);

			var parentDiv = doc.createElement("div");
			parentDiv.id = "foxtrick_addactionsbox_parentDiv";

			FoxtrickPlayerBirthday.addType(parentDiv, Foxtrickl10n.getString('foxtrick.tweaks.BirthdayToday'), birthdayToday, doc);
			FoxtrickPlayerBirthday.addType(parentDiv, Foxtrickl10n.getString('foxtrick.tweaks.BirthdayNextWeek'), birthdayFuture, doc);
			FoxtrickPlayerBirthday.addType(parentDiv, Foxtrickl10n.getString('foxtrick.tweaks.BirthdayLastWeek'), birthdayPast, doc);

			// Append the box to the sidebar
			var newBoxId = "foxtrick_birthday_box";
			if (birthdayToday.length + birthdayFuture.length + birthdayPast.length > 0) {
				Foxtrick.addBoxToSidebar(doc, Foxtrickl10n.getString("foxtrick.tweaks.Birthdays"), parentDiv, newBoxId, "last", "");
			}
		}
		catch (e) {
			Foxtrick.dump('PlayerBirthday: ' + e + '\n');
		}
	},


	sort : function(a, b) {
		// this should sort players first by days and then by years
		const maxYears = 10000;
		return (a.age.days * maxYears + a.age.years) - (b.age.days * maxYears + b.age.years);
	},

	addType : function(parent, header, players, doc) {
		if (players == null || players.length === 0) {
			return;
		}
		var div = doc.createElement("div");
		var caption = doc.createElement("h5");
		var captionText = doc.createTextNode(header);
		var list = doc.createElement("ul");
		parent.appendChild(div);
		div.appendChild(caption);
		div.appendChild(list);
		caption.appendChild(captionText);

		for (var i in players) {
			var item = doc.createElement("li");
			var player = players[i].nameLink.cloneNode(true);
			var age = doc.createTextNode(players[i].ageText);
			list.appendChild(item);
			item.appendChild(player);
			item.appendChild(age);
		}
	}
};
