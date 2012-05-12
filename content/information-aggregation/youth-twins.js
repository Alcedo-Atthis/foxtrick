"use strict";
/* youth-twins.js
 * Displays twin information for youth squad players using an API supplied by HY.
 * @author CatzHoek, HY backend/API by MackShot
 *
 * @Interface:
 * 		Url: http://www.hattrick-youthclub.org/_admin/twins.php
 * @params:
 *		//params send via http "POST"
 * 		forceUpdate (optional): !!!! NOT SUPPORTED FOR THE MOMENT, will be ignored on HY
 *			no param requred but send = 1 for safety reasons
 *			forces HY to recalculate results, should only be used after a new player was pulled onto the youth squad or if it is really required
 * 		debug (optional):
 *			no param requred but send = 1 for safety reasons
 *			force ht to return a random result so developers can check stuff without having actual twins
 *		players:
 *			urlencoded version of youthplayerlist chpp file v1.0 with actiontype = "details"
 *		avatars:
 *			urlencoded version of youthavatars chpp file v1.0
 *		isHyUser (0/1) (optional):
 *			used to simulate HY users or non-HY users for debugging purposes
 *			if not present HY will find out the correct value itself
 *			if set to 1
 *			@response players[id].marked and
 *			@response players[id].non will not be present for non HT users.
 *
 * @response
 *		JSON:
 *			isHyUser (true / false)
 *				the user is using HY already
 *			players: (dictionary)
 *				list of players
 *				non: number of possible twins marked as non-twin (not present if isHyUser = false)
 *				marked: number of possible twins marked as twin (not present if isHyUser = false)
 *				possible: total number of possible twins
 *			fetchTime: 
 *				Unix timestamp of the feteched information in seconds
 *			lifeTime:
 *				LifeTime of the information in seconds, avoid further requests until fetchTime+lifeTime is met, new pulls to the youth team are a valid reason to disrespect and use forceUpdate. *
 */

 Foxtrick.modules["YouthTwins"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.INFORMATION_AGGREGATION,
	PAGES : ["YouthPlayers"],
	CSS : Foxtrick.InternalPath + "resources/css/youth-twins.css",
	run : function(doc) { 

		var ignoreHours = 24;

		if (!Foxtrick.isPage('ownYouthPlayers', doc))
			return;

		var getYouthPlayerList = function (teamId, callback){
			var args = [];
			args.push(["file", "youthplayerlist"]);
			args.push(["youthTeamID", teamId]);
			args.push(["actionType", "details"]);
			args.push(["version", "1.0"]);
			Foxtrick.util.api.retrieve(doc, args,{ cache_lifetime:'session'}, callback);
		}
		var getYouthAvatars = function (callback){
			var args = [];
			args.push(["file", "youthavatars"]);
			args.push(["version", "1.0"]);
			Foxtrick.util.api.retrieve(doc, args,{ cache_lifetime:'session'}, callback);
		}

		//icons resources for representation
		var icon_green = Foxtrick.InternalPath + 'resources/img/twins/twin.png';
		var icon_red = Foxtrick.InternalPath + 'resources/img/twins/twin_red.png'; 
		var icon_yellow = Foxtrick.InternalPath + 'resources/img/twins/twin_yellow.png'; 

		//params
		//teamid : Current Foxtrick user
		//forceUpdate: Force HY to update, avoid!
		//debug: Fakes a reponse where twins will be present
		//callback: function to be called after HY was queried
		var getTwinsFromHY = function (teamid, forceupdate, debug, userType, callback){
			getYouthPlayerList(teamid, function(playerlist) {
				getYouthAvatars(function(avatars){
					//urlencode xml files
					var pl = encodeURIComponent((new XMLSerializer()).serializeToString(playerlist));
					var av = encodeURIComponent((new XMLSerializer()).serializeToString(avatars));
					
					//api url
					var url = "http://www.hattrick-youthclub.org/_data_provider/foxtrick/playersTwinsCheck";
					
					//assemble param string
					var params = "players=" + pl + "&avatars=" + av;
					
					//forceUpdate to avoid getting the cached HY response, use carefully
					if(forceupdate)
						params = params + "&forceUpdate=1"

					//debug: Generates a random reponse where twins will be present
					if(debug)
						params = params + "&debug=1"

					//ability to fake if the user is a hy user or not, influeces response of "marked and non"
					if(userType == "user")
						params = params + "&isHyUser=1"
					else if(userType == "foreigner")
						params = params + "&isHyUser=0"	
					else {
						//HY determines on its own
					}
					// load and callback
					Foxtrick.load(url, callback, params);					
				});	
			});
		}
		var handleHyResponse = function (response, status){
			switch(status){
				case 0:
					Foxtrick.log("YouthTwins: Sending failed", status);
					return; 
				case 200: 
					Foxtrick.log("YouthTwins: Looking fine, ignoreUntil set to -1", status);
					FoxtrickPrefs.set("YouthTwins.ignoreUntil", -1);
					break;
				case 400:
					Foxtrick.log("YouthTwins: Given data is invalid or incomplete", status, response);
					return;
				case 404:
					var now = new Date();
					var ignoreUntil = now.setTime(now.getTime() + ignoreHours*60*60*1000);
					FoxtrickPrefs.set("YouthTwins.ignoreUntil", ignoreUntil);
					Foxtrick.log("YouthTwins: HY is moving servers or is in huge trouble", status);
					Foxtrick.log("YouthTwins: No requests for " + ignoreHours/24.0 + " day(s).");
					return;
				case 500: 
					Foxtrick.log("YouthTwins: HY is in trouble", status);
					return; 
				case 503:
					var now = new Date();
					var ignoreUntil = now.setTime(now.getTime() + ignoreHours*60*60*1000);
					FoxtrickPrefs.set("YouthTwins.ignoreUntil", ignoreUntil);
					Foxtrick.log("YouthTwins: HY temporarily disabled the feature", status, "");
					Foxtrick.log("YouthTwins: No requests for " + ignoreHours/24.0 + " day(s).");
					return; 
				default:
					Foxtrick.log("YouthTwins: HY returned unhandled status", status, response);
					return;
			}
			
			//save response as pref
			FoxtrickPrefs.set("YouthTwins.lastResponse", response);

			var json = JSON.parse( response );

			var isHYuser = json.isHyUser;
			Foxtrick.log("YouthTwins: isHyUser: ", isHYuser);

			var playerInfos = doc.getElementsByClassName("playerInfo");
			for(var i = 0; i < playerInfos.length; i++){
				var playerInfo = playerInfos[i];

				//find spot to place the images
				var target = playerInfo.getElementsByTagName("b")[0];
				
				//get playerid
				var playerID = playerInfo.getElementsByTagName("a")[0].href.match(/YouthPlayerID=(\d+)/i)[1];
				
				//new player pulled, needs a forceUpdate
				if(json.players[playerID] === undefined){
					Foxtrick.log("New player pulled", playerID);
					continue;
				}

				//amounts of twins by category, for non hattrick youthclub users marked and non are not present by api definition
				var possible = parseInt(json.players[playerID].possible);
				var marked = isHYuser?parseInt(json.players[playerID].marked):0;
				var non = isHYuser?parseInt(json.players[playerID].non):0;
				var missing = possible - marked - non;
				
				//l10n strings
				var l10n_possible_twins =Foxtrickl10n.getString("YouthTwins.possibleTwins", possible).replace("%1", possible);
				var l10n_marked_twins = Foxtrickl10n.getString("YouthTwins.markedTwins").replace("%1", marked);
				var l10n_non_twins = Foxtrickl10n.getString("YouthTwins.nonTwins").replace("%1", non);
				var l10n_undecided_twins = Foxtrickl10n.getString("YouthTwins.undecidedTwins").replace("%1", missing);
				var l10n_non_hy_user = Foxtrickl10n.getString("YouthTwins.nonHyUser");

				//assemble title
				if(isHYuser)
					var title = " " + l10n_possible_twins + "\n " + l10n_marked_twins + "\n " + l10n_non_twins + "\n " + l10n_undecided_twins;
				else
					var title = " " + l10n_possible_twins + "\n " + l10n_non_hy_user;
				
				//repeat twin icon in representative color according to amount of twin category
				var link = Foxtrick.createFeaturedElement(doc, this, "a");
				var container = Foxtrick.createFeaturedElement(doc, this, "span");
				Foxtrick.addClass(container, "ft-youth-twins-container");
				container.setAttribute("title", title);
				container.setAttribute("alt", title);

				//add icons according to amount of occurance
				var addIcons = function (parent, limit, alt, className, src){
					for(var k = 0; k < limit; k++){
						Foxtrick.addImage(doc, parent, { alt: alt, class: className, src: src}); 
					}
				}
				addIcons(container, marked, l10n_marked_twins, "ft-youth-twins-icon", icon_green);
				addIcons(container, missing, l10n_undecided_twins, "ft-youth-twins-icon", icon_yellow);
				addIcons(container, non, l10n_non_twins, "ft-youth-twins-icon", icon_red);

				link.appendChild(container);

				//link destinations as Mackshot from HY requested
				if(isHYuser)
					link.setAttribute("href","http://www.hattrick-youthclub.org/site/players_twins");
				else
					link.setAttribute("href","http://www.hattrick-youthclub.org");

				link.setAttribute("target","_blank");

				if(possible > 0){
					//and a neat info button
					var infolink = Foxtrick.createFeaturedElement(doc, this, "a");
					Foxtrick.addClass(infolink, "ft-youth-twins-info");
					
					var infoimg = doc.createElement("img");
					infoimg.setAttribute("src","/Img/Icons/info.png");
					infolink.href = "http://www.hattrick-youthclub.org/site/wiki-player_twins";
					infolink.target = "_blank";
					var infotext = Foxtrickl10n.getString("YouthTwins.infoText");
					infoimg.title = infotext;
					infoimg.alt = infotext;
					infolink.appendChild(infoimg);
					target.parentNode.insertBefore(infolink,target.nextSibling);
				}
				//add the whole stuff to the site
				target.parentNode.insertBefore(link,target.nextSibling);
			}
		}

		//teamid for chpp playerList
		var teamid = doc.location.href.match(/teamid=(\d+)/i)[1];

		//get last saved result from and possible ignoreTime
		var saved = FoxtrickPrefs.get("YouthTwins.lastResponse");
		var ignoreUntil = FoxtrickPrefs.get("YouthTwins.ignoreUntil");
		var now = new Date();		

		if(ignoreUntil === null)
			ignoreUntil == -1;

		//noting saved, probably a fresh install, force request
		if(saved === null && (ignoreUntil == -1 || now.getTime() > ignoreUntil)){
			Foxtrick.log("YouthTwins: lastResponse is null  ... Updating from HY");
			getTwinsFromHY(teamid, false, false, "auto", handleHyResponse);
		}		
		else {
			try {
				var json = JSON.parse( saved );
				var fetchTime = parseInt(json.fetchTime)*1000;
				var lifeTime = parseInt(json.lifeTime)*1000;
			} catch(e) {
				//something might be wrong with the saved result, force an update
				Foxtrick.log("YouthTwins: corrupted saved JSON", e, saved);
				//possible emergency fix, forceReload from HY
				//getTwinsFromHY(teamid, true, false, "auto", handleHyResponse);
				return;
			}
			var expireTime = fetchTime + lifeTime;
			var fetchDate = new Date();
			fetchDate.setTime(fetchTime);
			var expireDate = new Date();
			expireDate.setTime(expireTime);

			//see if the saved information is still valid
			var playerInfos = doc.getElementsByClassName("playerInfo");
			var valid = true;

			for(var i = 0; i < playerInfos.length; i++){
				var playerID =  playerInfos[i].getElementsByTagName("a")[0].href.match(/YouthPlayerID=(\d+)/i)[1];
				if(typeof(json.players[playerID]) !== "object")
					valid = false;
			}
			Foxtrick.log("YouthTwins: Team is valid:", valid);
			
			//query HY or use cached stuff and alter the site
			if(now.getTime() > fetchTime && now.getTime() <= fetchTime + lifeTime){
				//in valid lifespan, also saved response seems to be valid
				Foxtrick.log("YouthTwins: Using cached response from", fetchDate.toUTCString(),"expires", expireDate.toUTCString(),"now", (new Date()).toUTCString());
				handleHyResponse(saved, 200);
			} else if(now > fetchTime + lifeTime) {
				if(ignoreUntil != -1 && now < ignoreUntil){
					var until = new Date();
					until.setTime(ignoreUntil);
					Foxtrick.log("YouthTwins: Ignoring due to HY request until", until.toUTCString());
					return;
				}
				//saved data is valid, plain request should suffice
				Foxtrick.log("YouthTwins: Lifetime expired, updating from HY");
				//teamid, forceUpdate, debug, usertype, response
				getTwinsFromHY(teamid, false, false, "auto", handleHyResponse);
			
			} else 
				Foxtrick.log("Dear time traveler, we welcome you!");	
		}
	}
};