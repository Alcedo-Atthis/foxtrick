"use strict";
/*
 * live-alert.js
 * Alerting HT Live goals
 * @author ryanli
 */
(function() {
 /* 
	 * Source: /Community/CHPP/ChppMatchEventTypes.aspx
	 * Event Types and Icon mapping
	 * 
	 * 20,21,40,47,70,71,599 are used for match indicators, don't convert them to objects
	 * 
	 * for events that require several icons specify a dictionary with  
	 * keys "team" and "other" and an array of icons as values. 
	 * If only one team needs icons the other key can be omnitted.
	 * 
	 * Example: 
	 * { "team": ["miss", "se_technical"], "other": ["se_head_specialist"] },
	 */
	var eventTypes = {
		"20" : "formation",
		"21" : "formation",
		"40" : "possession",
		"41" : "best player",
		"42" : "worst player",
		"47" : "possession",
		"55" : { "team": ["goal", "se_technical"] },
		"56" : "goal",
		"57" : "goal",
		"58" : "miss",
		"59" : "miss",
		"61" : "confusion",
		"62" : "pullback",
		"68" : "pressing",
		"70" : "extraTime",
		"71" : "penaltyShootOut",
		"73" : "tossing_coin",
		"90" : "bruised",
		"91" : { "team": ["injured", "substitution"] },
		"92" : { "team": ["injured", "substitution"] },
		"93" : { "team": ["injured", "sub_out"] },
		"94" : "bruised",
		"95" : { "team": ["injured", "substitution"] },
		"96" : { "team": ["injured", "sub_out"] },
		"97" : { "team": ["injured", "formation"] },
		"100" : { "team": ["goal", "whistle"] },
		"101" : { "team": ["goal_C"] },
		"102" : { "team": ["goal_L"] },
		"103" : { "team": ["goal_R"] },
		"104" : { "team": ["goal", "penalty"] },
		"105" : { "team": ["goal", "se_unpredictable"] },
		"106" : { "team": ["goal", "se_unpredictable"] },
		"107" : { "team": ["goal", "longshot"] },
		"108" : { "team": ["goal", "se_unpredictable"] },
		"109" : { "team": ["goal", "se_unpredictable_negative"] },
		"110" : { "team": ["goal", "whistle"] },
		"111" : { "team": ["goal_C"] },
		"112" : { "team": ["goal_L"] },
		"113" : { "team": ["goal_R"] },
		"114" : { "team": ["goal", "penalty"] },
		"115" : { "team": ["goal", "se_quick"] },
		"116" : { "team": ["goal", "se_quick"] },
		"117" : { "team": ["goal"], "other": ["tired"] },
		"118" : { "team": ["goal", "corner"] },
		"119" : { "team": ["goal", "se_head_specialist"] },
		"120" : { "team": ["goal", "whistle"] },
		"121" : { "team": ["goal_C"] },
		"122" : { "team": ["goal_L"] },
		"123" : { "team": ["goal_R"] },
		"124" : { "team": ["goal", "penalty"] },
		"125" : { "team": ["goal", "se_unpredictable"] },
		"130" : { "team": ["goal", "whistle"] },
		"131" : { "team": ["goal_C"] },
		"132" : { "team": ["goal_L"] },
		"133" : { "team": ["goal_R"] },
		"134" : { "team": ["goal", "penalty"] },
		"135" : { "team": ["goal", "experience"] },
		"136" : { "team": ["goal"], "other": ["experience"] },
		"137" : { "team": ["goal", "winger", "se_head_specialist"] },
		"138" : { "team": ["goal", "winger"] },
		"139" : { "team": ["goal", "se_technical"], "other": ["se_head_specialist_negative"] },
		"140" : { "team": ["goal", "counter-attack", "whistle"] },
		"141" : { "team": ["goal_C", "counter-attack"] },
		"142" : { "team": ["goal_L", "counter-attack"] },
		"143" : { "team": ["goal_R", "counter-attack"] },
		"150" : { "team": ["goal", "whistle"] },
		"151" : { "team": ["goal_C"] },
		"152" : { "team": ["goal_L"] },
		"153" : { "team": ["goal_R"] },
		"154" : { "team": ["goal", "penalty"] },
		"160" : { "team": ["goal", "whistle"] },
		"161" : { "team": ["goal_C"] },
		"162" : { "team": ["goal_L"] },
		"163" : { "team": ["goal_R"] },
		"164" : { "team": ["goal", "penalty"] },
		"170" : { "team": ["goal", "whistle"] },
		"171" : { "team": ["goal_C"] },
		"172" : { "team": ["goal_L"] },
		"173" : { "team": ["goal_R"] },
		"174" : { "team": ["goal", "penalty"] },
		"180" : { "team": ["goal", "whistle"] },
		"181" : { "team": ["goal_C"] },
		"182" : { "team": ["goal_L"] },
		"183" : { "team": ["goal_R"] },
		"184" : { "team": ["goal", "penalty"] },
		"185" : { "team": ["goal", "indirect"] },
		"186" : { "team": ["goal", "counter-attack", "indirect"] },
		"187" : { "team": ["goal", "longshot"] },
		"200" : { "team": ["miss", "whistle"] },
		"201" : { "team": ["miss_C"] },
		"202" : { "team": ["miss_L"] },
		"203" : { "team": ["miss_R"] },
		"204" : { "team": ["miss", "penalty"] },
		"205" : { "team": ["miss", "se_unpredictable"] },
		"206" : { "team": ["miss", "se_unpredictable"] },
		"207" : { "team": ["miss", "longshot"] },
		"208" : { "team": ["miss", "se_unpredictable"] },
		"209" : { "team": ["miss"], "other": ["se_unpredictable_negative"]  },
		"210" : { "team": ["miss", "whistle"] },
		"211" : { "team": ["miss_C"] },
		"212" : { "team": ["miss_L"] },
		"213" : { "team": ["miss_R"] },
		"214" : { "team": ["miss", "penalty"] },
		"215" : { "team": ["miss", "se_quick"] },
		"216" : { "team": ["miss", "se_quick"] },
		"217" : { "team": ["miss"], "other": ["tired"] },
		"218" : { "team": ["miss", "corner"] },
		"219" : { "team": ["miss", "se_head_specialist"] },
		"220" : { "team": ["miss", "whistle"] },
		"221" : { "team": ["miss_C"] },
		"222" : { "team": ["miss_L"] },
		"223" : { "team": ["miss_R"] },
		"224" : { "team": ["miss", "penalty"] },
		"225" : { "team": ["miss", "se_unpredictable"] },
		"230" : { "team": ["miss", "whistle"] },
		"231" : { "team": ["miss_C"] },
		"232" : { "team": ["miss_L"] },
		"233" : { "team": ["miss_R"] },
		"234" : { "team": ["miss", "penalty"] },
		"235" : { "team": ["miss", "experience"] },
		"236" : { "team": ["miss"], "other": ["experience"] },
		"237" : { "team": ["miss", "winger"] },
		"239" : { "team": ["miss", "se_technical"], "other": ["se_head_specialist_negative"] },
		"240" : { "team": ["miss", "counter-attack", "whistle"] },
		"241" : { "team": ["miss_C", "counter-attack"] },
		"242" : {"team": ["miss_L", "counter-attack"] },
		"243" : { "team": ["miss_R", "counter-attack"] },
		"250" : { "team": ["miss", "whistle"] },
		"251" : { "team": ["miss_C"] },
		"252" : { "team": ["miss_L"] },
		"253" : { "team": ["miss_R"] },
		"254" : { "team": ["miss", "penalty"] },
		"260" : { "team": ["miss", "whistle"] },
		"261" : { "team": ["miss_C"] },
		"262" : { "team": ["miss_L"] },
		"263" : { "team": ["miss_R"] },
		"264" : { "team": ["miss", "penalty"] },
		"270" : { "team": ["miss", "whistle"] },
		"271" : { "team": ["miss_C"] },
		"272" : { "team": ["miss_L"] },
		"273" : { "team": ["miss_R"] },
		"274" : { "team": ["miss", "penalty"] },
		"280" : { "team": ["miss", "whistle"] },
		"281" : { "team": ["miss_C"] },
		"282" : { "team": ["miss_L"] },
		"283" : { "team": ["miss_R"] },
		"284" : { "team": ["miss", "penalty"] },
		"285" : { "team": ["miss", "indirect"] },
		"286" : { "team": ["miss", "counter-attack", "indirect"] },
		"287" : { "team": ["miss", "longshot"] },
		"288" : { "team": ["miss", "longshot"] },
		"289" : { "team": ["se_quick_negative"], "other": ["se_quick"] },
		"301" : { "team": ["se_technical_negative", "rain"] },
		"302" : { "team": ["se_powerful", "rain"] },
		"303" : { "team": ["se_technical", "sun"] },
		"304" : { "team": ["se_powerful_negative", "sun"] },
		"305" : { "team": ["se_quick_negative", "rain"] },
		"306" : { "team": ["se_quick_negative", "sun"] },
		"350" : "substitution",
		"351" : "substitution",
		"352" : "substitution",
		"360" : "change of tactics",
		"361" : "change of tactics",
		"362" : "formation",
		"370" : "swap",
		"371" : "swap",
		"372" : "swap",
		"510" : "yellow card",
		"511" : "yellow card",
		"512" : { "team": ["yellow card", "red card"] },
		"513" : { "team": ["yellow card", "red card"] },
		"514" : "red card",
		"599": "result"
	};
	var icons = {
		"bruised":"/Img/Icons/bruised.gif",
		"best player":"/Img/Matches/star_yellow.png",
		"change of tactics":"/Img/Matches/behaviorchange.gif",
		"formation":"/Img/Matches/formation.gif",
		"goal": Foxtrick.InternalPath + 'resources/img/matches/ball.png',
		"goal_C": Foxtrick.InternalPath + 'resources/img/matches/ball_C.png',
		"goal_R": Foxtrick.InternalPath + 'resources/img/matches/ball_R.png',
		"goal_L": Foxtrick.InternalPath + 'resources/img/matches/ball_L.png',
		"injured":"/Img/Icons/injured.gif",
		"injured_leaves": ["/Img/Icons/injured.gif","/Img/Matches/substitution.gif"],
		"miss" : Foxtrick.InternalPath + 'resources/img/matches/redball.png',
		"miss_C": Foxtrick.InternalPath + 'resources/img/matches/red_ball_C.png',
		"miss_R": Foxtrick.InternalPath + 'resources/img/matches/red_ball_R.png',
		"miss_L": Foxtrick.InternalPath + 'resources/img/matches/red_ball_L.png',
		"pressing": Foxtrick.InternalPath + 'resources/img/matches/press.png',
		"rain": Foxtrick.InternalPath + 'resources/img/matches/rain.gif',
		"red card":"/Img/Icons/red_card.gif",
		"se_head_specialist": Foxtrick.InternalPath + 'resources/img/matches/spec5.png',
		"se_technical": Foxtrick.InternalPath + 'resources/img/matches/spec1.png',	
		"se_powerful": Foxtrick.InternalPath + 'resources/img/matches/spec3.png',
		"se_quick": Foxtrick.InternalPath + 'resources/img/matches/spec2.png',		
		"se_unpredictable": Foxtrick.InternalPath + 'resources/img/matches/spec4.png',
		"se_technical_negative": Foxtrick.InternalPath + 'resources/img/matches/spec1_red.png',	
		"se_powerful_negative": Foxtrick.InternalPath + 'resources/img/matches/spec3_red.png',
		"se_quick_negative": Foxtrick.InternalPath + 'resources/img/matches/spec2_red.png',		
		"se_unpredictable_negative": Foxtrick.InternalPath + 'resources/img/matches/spec4_red.png',
        "se_head_specialist_negative": Foxtrick.InternalPath + 'resources/img/matches/spec5_red.png',		
		"substitution":"/Img/Matches/substitution.gif",
		"sub_out":"/Img/Matches/sub_out.gif",
		"sun": Foxtrick.InternalPath + 'resources/img/matches/sun.png',
		"swap" : "/Img/Matches/player_swap.gif",
		"tired" : Foxtrick.InternalPath + 'resources/img/matches/tired.png',
		"whistle" : Foxtrick.InternalPath + 'resources/img/matches/whistle.png',
		"worst player" : "/Img/Matches/star_brown.png",
		"yellow card":"/Img/Icons/yellow_card.gif",
		"left wing":"/Img/Matches/sub_in.gif",
		"right wing":"/Img/Matches/sub_out.gif",
		"middle": Foxtrick.InternalPath + 'resources/img/matches/middle.png',
		"counter-attack": Foxtrick.InternalPath + 'resources/img/matches/ca.png',
		"indirect": Foxtrick.InternalPath + 'resources/img/matches/indirect.png',
		"confusion": Foxtrick.InternalPath + 'resources/img/matches/confusion.png',
		"penalty": Foxtrick.InternalPath + 'resources/img/matches/penalty.png',
		"pullback": Foxtrick.InternalPath + 'resources/img/matches/pullback.png',
		"longshot": Foxtrick.InternalPath + 'resources/img/matches/longshot.png',
		"corner": Foxtrick.InternalPath + 'resources/img/matches/corner.png',
		"experience": Foxtrick.InternalPath + 'resources/img/matches/exp.png',
		"winger": Foxtrick.InternalPath + 'resources/img/matches/winger.png',
		"tossing_coin": Foxtrick.InternalPath + 'resources/img/matches/coin.png',
		"transparent": Foxtrick.InternalPath + 'resources/img/matches/trans_14x14.png'
	}
	
var eventText = {
	20:	"Tactical disposition",
	21:	"Player names in lineup",
	22:	"YouthTeam, players from neighborhood used",
	25:	"Regional derby",
	26:	"Neutral ground",
	27:	"Away is actually home",
	30:	"Spectators/venue - rain",
	31:	"Spectators/venue - cloudy",
	32:	"Spectators/venue - fair weather",
	33:	"Spectators/venue - sunny",
	40:	"Dominated",
	41:	"Best player",
	42:	"Worst player",
	45:	"Half time results",
	46:	"Hat-trick comment",
	47:	"No team dominated",
	55:	"Penalty contest: Goal by Technical (no nerves)",
	56:	"Penalty contest: Goal, no nerves",
	57:	"Penalty contest: Goal in spite of nerves",
	58:	"Penalty contest: No goal because of nerves",
	59:	"Penalty contest: No goal in spite of no nerves",
	60:	"Underestimation",
	61:	"Organization breaks",
	62:	"Withdraw",
	63:	"Remove underestimation at pause",
	64:	"Reorganize",
	65:	"Nerves in important thrilling game",
	66:	"Remove underestimation at pause (goaldiff = 0)",
	67:	"Remove underestimation at pause (goaldiff = 1)",
	68:	"Successful pressing",
	69:	"Remove underestimation",
	70:	"Extension",
	71:	"Penalty contest (after extension)",
	72:	"Extension decided",
	73:	"After 22 penalties tossing coin!",
	80:	"New captain",
	90:	"Injured but keeps playing",
	91:	"Moderately injured, leaves field",
	92:	"Badly injured, leaves field",
	93:	"Injured and no replacement existed",
	94:	"Injured after foul but continues",
	95:	"Injured after foul and exits",
	96:	"Injured after foul and no replacement existed",
	97:	"Keeper injured, field player has to take his place",
	100:	"Reducing goal home team free kick",
	101:	"Reducing goal home team middle",
	102:	"Reducing goal home team left wing",
	103:	"Reducing goal home team right wing",
	104:	"Reducing goal home team penalty kick normal",
	105:	"SE: Goal Unpredictable long pass",
	106:	"SE: Goal Unpredictable scores on his own",
	107:	"SE: Goal longshot",
	108:	"SE: Goal Unpredictable special action",
	109:	"SE: Goal Unpredictable mistake",
	110:	"Equalizer goal home team free kick",
	111:	"Equalizer goal home team middle",
	112:	"Equalizer goal home team left wing",
	113:	"Equalizer goal home team right wing",
	114:	"Equalizer goal home team penalty kick normal",
	115:	"SE: Quick scores after rush",
	116:	"SE: Quick rushes, passes and reciever scores",
	117:	"SE: Tired defender mistake, striker scores",
	118:	"SE Goal: Corner to anyone",
	119:	"SE: Goal Corner: Head specialist",
	120:	"Goal to take lead home team free kick",
	121:	"Goal to take lead home team middle",
	122:	"Goal to take lead home team left wing",
	123:	"Goal to take lead home team right wing",
	124:	"Goal to take lead home team penalty kick normal",
	125:	"SE: Goal: Unpredictable, own goal",
	130:	"Increase goal home team free kick",
	131:	"Increase goal home team middle",
	132:	"Increase goal home team left wing",
	133:	"Increase goal home team right wing",
	134:	"Increase goal home team penalty kick normal",
	135:	"SE: Experienced forward scores",
	136:	"SE: Inexperienced defender causes goal",
	137:	"SE: Winger to Head spec. Scores",
	138:	"SE: Winger to anyone Scores",
	139:	"SE: Technical goes around head player",
	140:	"Counter attack goal, free kick",
	141:	"Counter attack goal, middle",
	142:	"Counter attack goal, left",
	143:	"Counter attack goal, right",
	150:	"Reducing goal away team free kick",
	151:	"Reducing goal away team middle",
	152:	"Reducing goal away team left wing",
	153:	"Reducing goal away team right wing",
	154:	"Reducing goal away team penalty kick normal",
	160:	"Equalizer goal away team free kick",
	161:	"Equalizer goal away team middle",
	162:	"Equalizer goal away team left wing",
	163:	"Equalizer goal away team right wing",
	164:	"Equalizer goal away team penalty kick normal",
	170:	"Goal to take lead away team free kick",
	171:	"Goal to take lead away team middle",
	172:	"Goal to take lead away team left wing",
	173:	"Goal to take lead away team right wing",
	174:	"Goal to take lead away team penalty kick normal",
	180:	"Increase goal away team free kick",
	181:	"Increase goal away team middle",
	182:	"Increase goal away team left wing",
	183:	"Increase goal away team right wing",
	184:	"Increase goal away team penalty kick normal",
	185:	"Goal indirect free kick",
	186:	"Counter attack goal, indirect free kick",
	187:	"Goal long shot",
	200:	"No reducing goal home team free kick",
	201:	"No reducing goal home team middle",
	202:	"No reducing goal home team left wing",
	203:	"No reducing goal home team right wing",
	204:	"No reducing goal home team penalty kick normal",
	205:	"SE: No Goal Unpredictable long pass",
	206:	"SE: No Goal Unpredictable almost scores",
	207:	"SE: No Goal longshot",
	208:	"SE: No Goal Unpredictable special action",
	209:	"SE: No Goal Unpredictable mistake",
	210:	"No equalizer goal home team free kick",
	211:	"No equalizer goal home team middle",
	212:	"No equalizer goal home team left wing",
	213:	"No equalizer goal home team right wing",
	214:	"No equalizer goal home team penalty kick normal",
	215:	"SE: Speedy misses after rush",
	216:	"SE: Quick rushes, passes but reciever fails",
	217:	"SE: Tired defender mistake but no goal",
	218:	"SE No goal: Corner to anyone",
	219:	"SE: No Goal Corner: Head specialist",
	220:	"No goal to take lead home team free kick",
	221:	"No goal to take lead home team middle",
	222:	"No goal to take lead home team left wing",
	223:	"No goal to take lead home team right wing",
	224:	"No goal to take lead home team penalty kick normal",
	225:	"SE: No goal: Unpredictable, own goal almost",
	230:	"No increase goal home team free kick",
	231:	"No increase goal home team middle",
	232:	"No increase goal home team left wing",
	233:	"No increase goal home team right wing",
	234:	"No increase goal home team penalty kick normal",
	235:	"SE: Experienced forward fails to score",
	236:	"SE: Inexperienced defender almost causes goal",
	237:	"SE: Winger to someone: No goal",
	239:	"SE: Technical goes around head player, no goal",
	240:	"Counter attack, no goal, free kick",
	241:	"Counter attack, no goal, middle",
	242:	"Counter attack, no goal, left",
	243:	"Counter attack, no goal, right",
	250:	"No reducing goal away team free kick",
	251:	"No reducing goal away team middle",
	252:	"No reducing goal away team left wing",
	253:	"No reducing goal away team right wing",
	254:	"No reducing goal away team penalty kick normal",
	260:	"No equalizer goal away team free kick",
	261:	"No equalizer goal away team middle",
	262:	"No equalizer goal away team left wing",
	263:	"No equalizer goal away team right wing",
	264:	"No equalizer goal away team penalty kick normal",
	270:	"No goal to take lead away team free kick",
	271:	"No goal to take lead away team middle",
	272:	"No goal to take lead away team left wing",
	273:	"No goal to take lead away team right wing",
	274:	"No goal to take lead away team penalty kick normal",
	280:	"No increase goal away team free kick",
	281:	"No increase goal away team middle",
	282:	"No increase goal away team left wing",
	283:	"No increase goal away team right wing",
	284:	"No increase goal away team penalty kick normal",
	285:	"No goal indirect free kick",
	286:	"Counter attack, no goal, indirect free kick",
	287:	"No goal long shot",
	288:	"No goal long shot, defended",
	289:	"SE: Quick rushes, stopped by quick defender",
	301:	"SE: Technical suffers from rain",
	302:	"SE: Powerful thrives in rain",
	303:	"SE: Technical thrives in sun",
	304:	"SE: Powerful suffers from sun",
	305:	"SE: Quick loses in rain",
	306:	"SE: Quick loses in sun",
	331:	"Tactic Type: Pressing",
	332:	"Tactic Type: Counter-attacking",
	333:	"Tactic Type: Attack in middle",
	334:	"Tactic Type: Attack on wings",
	335:	"Tactic Type: Play creatively",
	336:	"Tactic Type: Long shots",
	343:	"Tactic: Attack in middle used",
	344:	"Tactic: Attack on wings used",
	350:	"Player substitution: team is behind",
	351:	"Player substitution: team is ahead",
	352:	"Player substitution: minute",
	360:	"Change of tactic: team is behind",
	361:	"Change of tactic: team is ahead",
	362:	"Change of tactic: minute",
	370:	"Player position swap: team is behind",
	371:	"Player position swap: team is ahead",
	372:	"Player position swap: minute",
	500:	"Both teams walkover",
	501:	"Home team walkover",
	502:	"Away team walkover",
	503:	"Both teams break game (2 players remaining)",
	504:	"Home team breaks game (2 players remaining)",
	505:	"Away team breaks game (2 players remaining)",
	510:	"Yellow card nasty play",
	511:	"Yellow card cheating",
	512:	"Red card (2nd warning) nasty play",
	513:	"Red card (2nd warning) cheating",
	514:	"Red card without warning",
	599:	"Match finished"
}

Foxtrick.modules["LiveMatchReportFormat"]={
	MODULE_CATEGORY : Foxtrick.moduleCategories.MATCHES,
	PAGES : [ "matchesLive" ],
	NICE: 1,

	run : function(doc) {
		var react = function(liveReport){
			var events = liveReport.getElementsByTagName("tr");
			var koPending = true;
			var topDown = true;
			var firstEventType = parseInt(events[0].getAttribute("data-eventtype").match(/\d+/)[0]);
			if(firstEventType < 30 || firstEventType > 33)
				topDown = false;
			
			for(var i=0;i<events.length;i++){

				var event = events[i];
				if(!topDown)
					event = events[events.length-1-i];

				var is_event = event.getAttribute("data-eventtype");
				if(!is_event){
					if(event.firstChild.className == "shy"){
						var newspan = parseInt(event.firstChild.getAttribute("colspan")) + 2;
						event.firstChild.setAttribute("colspan", newspan);
					}
					continue;
				}
				var evtType = parseInt(event.getAttribute("data-eventtype").match(/\d+/)[0]);				
				var evtMin = parseInt(event.firstChild.textContent.match(/\d+/)[0]);
				var is_HomeEvent = Foxtrick.hasClass(event, "liveHomeEvent");
				var is_awayEvent = Foxtrick.hasClass(event, "liveAwayEvent");
				var is_neutralEvent = !(is_HomeEvent || is_awayEvent);

				var homeIconsContainer = Foxtrick.createFeaturedElement(doc, Foxtrick.modules["LiveMatchReportFormat"], "td");
				var awayIconContainer = Foxtrick.createFeaturedElement(doc, Foxtrick.modules["LiveMatchReportFormat"], "td");

				var evtText = eventText[evtType];
				var title = evtText +" (" + evtType + ")";

				// indicators to be added
				var indicatorList = [
					{
						"class": "kick-off",
						"text": "kickOff",
						"before": true,
						"func": (function() {
							return function() {
								if (koPending && evtMin != "0") {
									koPending = false;
									return true;
								}
								else {
									return false;
								}
							};
						})()
					},
					{
						"class": "half-time",
						"text": "halfTime",
						"func": function() { return (eventTypes[evtType] == "possession") && (evtMin == "45"); }
					},
					{
						"class": "full-time",
						"text": "fullTime",
						"func": function() { return (eventTypes[evtType] == "possession") && (evtMin == "90"); }
					},
					{
						"class": "extra-time",
						"text": "extraTime",
						"func": function() { return eventTypes[evtType] == "extraTime"; }
					},
					{
						"class": "penalty-shoot-out",
						"text": "penaltyShootOut",
						"func": function() { return eventTypes[evtType] == "penaltyShootOut"; }
					},
					{
						"class": "result",
						"text": "result",
						"before": true,
						"func": function() { return eventTypes[evtType] == "result"; }
					}
				];
				var indType = Foxtrick.nth(0, function(n) {
					return n.func();
				}, indicatorList);
				if (indType){
					var tr = doc.createElement('tr');
					var td = doc.createElement('td');
					Foxtrick.addClass(td, "ft-match-report-" + indType["class"])
					var text = doc.createTextNode( Foxtrickl10n.getString("MatchReportFormat." + indType.text) );
					td.setAttribute("colspan", 4);
					td.appendChild(text);
					tr.appendChild(td);	

					var before = indType.before;
					if(!topDown)
						before = !before;

					if (before){
					 	event.parentNode.insertBefore(tr,event);
					 	i++;
					 }
					 else {
						event.parentNode.insertBefore(tr,event.nextSibling);	
						if(!topDown)
							i++;
					 }
				}
					
				//exact copy of the current match-report-format.js function
				var addEventIcons = function(parent, isEventTeam, evtType, title){
					if (FoxtrickPrefs.isModuleOptionEnabled("MatchReportFormat", "ShowEventIcons")){
						var createEventIcon = function(src, title, alt) {
							return Foxtrick.createImage(doc, { alt: alt, title: title, src: src , className: "ft-match-report-event-icon-image" });
						}

						//icons for both columns (e.g.: Header vs. quick etc.)
						if (typeof(eventTypes[evtType]) == "object"){
							//event team
							if (isEventTeam) {
								if (eventTypes[evtType]["team"]) 
									for(var i = 0; i < eventTypes[evtType]["team"].length; ++i)
										parent.appendChild(createEventIcon(icons[eventTypes[evtType]["team"][i]], title, "Event Id " + evtType + " : " + eventTypes[evtType]["team"][i]));
							} 
							else {
								if (eventTypes[evtType]["other"])
									for(var i = 0; i < eventTypes[evtType]["other"].length; ++i)
										parent.appendChild(createEventIcon(icons[eventTypes[evtType]["other"][i]], title, "Event Id " + evtType + " : " + eventTypes[evtType]["team"][i]));
							} 
						} 
						//simple case, display icon for team
						else if (eventTypes[evtType] && icons[eventTypes[evtType]]){
							if (!isEventTeam)
								return;
							if (icons[eventTypes[evtType]] instanceof Array)
								for(var i = 0; i < icons[eventTypes[evtType]].length; ++i)
									parent.appendChild(createEventIcon(icons[eventTypes[evtType]][i], title, "Event Id " + evtType + " : " +eventTypes[evtType]));
							else {
								parent.appendChild(createEventIcon(icons[eventTypes[evtType]], title, "Event Id " + evtType + " : " +eventTypes[evtType]));
							}
						}
						//no icon, put in transparent icon to allow tooltoip
						else{
							parent.appendChild(createEventIcon(icons["transparent"], title, title));
						}
					}
				}
				addEventIcons(homeIconsContainer, is_HomeEvent, evtType, title);
				addEventIcons(awayIconContainer, is_awayEvent, evtType, title);

				event.insertBefore(homeIconsContainer, event.firstChild.nextSibling);
				event.insertBefore(awayIconContainer, homeIconsContainer.nextSibling);
			}	
		}
		var livereportsContainer = doc.getElementById("ctl00_ctl00_CPContent_CPMain_UpdatePanelMatch");
		if(livereportsContainer)
			Foxtrick.listen(livereportsContainer, 'DOMNodeInserted', function(event){				
				if(event.target.className == "liveReport"){
					react(event.target);
				}
			}, false); 

		var lContainer = doc.getElementsByClassName("liveMatchContainer")[0];
		if(lContainer)
			Foxtrick.listen(lContainer, 'DOMNodeInserted', function(event){	
				if(event.target.getAttribute("id") == "ctl00_ctl00_CPContent_CPMain_repM"){
				var livereports = event.target.getElementsByClassName("liveReport");
				for(var i=0; i < livereports.length; i++)
					react(livereports[i]);
				}
			}, false); 

		//firstload
		var livereports = doc.getElementsByClassName("liveReport");
		for(var i=0; i < livereports.length; i++){
			react(livereports[i]);
		}
	},
}; 
}());