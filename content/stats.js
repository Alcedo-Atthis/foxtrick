/**
 *
 * 
 * stats.js
 * Foxtrick links collection
 * @author other,convinced
 */

/*
 * "params"     : { "infocode" : "text" }   -> ?text=info[infocode]
 * "params"     : { "infocode" : "" }   -> info[infocode]  // eg alltid
 * "params"     : { "" : "#text" }   -> #text   			//eg maptrick , first letter non alphanumeric
 * "params"     : { "infocode" : "," }   -> ,info[infocode]   //eg alltid, first letter non alphanumeric
 * "params"     : { "infocode" : "ftfilter_somename" }   -> parameter only used for allowlink function and will not be shown in link   //eg hattrickchallenge_friendly, first letters = ftfilter
 * for others use the 'paramfunction' eg natstats
 */
  
if (!Foxtrick) var Foxtrick={};

Foxtrick.LinkCollection = {};
Foxtrick.LinkCollection.stats = {};
Foxtrick.LinkCollection.hscountries = {};
Foxtrick.LinkCollection.htworld = {};
Foxtrick.LinkCollection.hslevels = {};


with (Foxtrick.LinkCollection) {
 
hscountries["98"]="Albania";
hscountries["118"]="Algeria";
hscountries["105"]="Andorra";
hscountries["130"]="Angola";
hscountries["7"]="Argentina";
hscountries["122"]="Armenia";
hscountries["39"]="Austria";
hscountries["129"]="Azerbaijan";
hscountries["123"]="Bahrain";
hscountries["132"]="Bangladesh";
hscountries["124"]="Barbados";
hscountries["91"]="Belarus";
hscountries["44"]="Belgium";
hscountries["139"]="Benin";
hscountries["74"]="Bolivia";
hscountries["69"]="Bosnia";
hscountries["16"]="Brazil";
hscountries["136"]="Brunei";
hscountries["62"]="Bulgaria";
hscountries["138"]="Cambodia";
hscountries["17"]="Canada";
hscountries["125"]="CapeVerde";
hscountries["18"]="Chile";
hscountries["60"]="taiwan";
hscountries["19"]="Colombia";
hscountries["81"]="CostaRica";
hscountries["126"]="CotedIvoire";
hscountries["58"]="Croatia";
hscountries["89"]="Cyprus";
hscountries["52"]="Czech";
hscountries["11"]="Danmark";
hscountries["88"]="Dominican";
hscountries["73"]="Ecuador";
hscountries["33"]="Misr";
hscountries["100"]="ElSalvador";
hscountries["2"]="England";
hscountries["56"]="Estonia";
hscountries["76"]="Faroe";
hscountries["12"]="Finland";
hscountries["5"]="France";
hscountries["97"]="FYR";
hscountries["104"]="Georgia";
hscountries["3"]="Germany";
hscountries["137"]="Ghana";
hscountries["50"]="Hellas";
hscountries["107"]="Guatemala";
hscountries["99"]="Honduras";
hscountries["59"]="HongKong";
hscountries["51"]="Hungary";
hscountries["38"]="Ísland";
hscountries["20"]="India";
hscountries["54"]="Indonesia";
hscountries["85"]="Iran";
hscountries["128"]="Iraq";
hscountries["21"]="Ireland";
hscountries["63"]="Israel";
hscountries["4"]="Italy";
hscountries["94"]="Jamaica";
hscountries["22"]="Japan";
hscountries["106"]="Jordan";
hscountries["112"]="Kazakhstan";
hscountries["95"]="Kenya";
hscountries["127"]="Kuwait";
hscountries["102"]="Kyrgyzstan";
hscountries["53"]="Latvia";
hscountries["120"]="Lebanon";
hscountries["117"]="Liechtenstein";
hscountries["66"]="Lithuania";
hscountries["84"]="Luxembourg";
hscountries["45"]="Malaysia";
hscountries["144"]="Maldives";
hscountries["101"]="Malta";
hscountries["6"]="Mexico";
hscountries["103"]="Moldova";
hscountries["119"]="Mongolia";
hscountries["131"]="Montenegro";
hscountries["77"]="Morocco";
hscountries["135"]="Mozambique";
hscountries["14"]="Netherlands";
hscountries["111"]="Nicaragua";
hscountries["75"]="Nigeria";
hscountries["93"]="NIreland";
hscountries["9"]="Norway";
hscountries["15"]="Oceania";
hscountries["134"]="Oman";
hscountries["71"]="Pakistan";
hscountries["96"]="Panama";
hscountries["72"]="Paraguay";
hscountries["34"]="China";
hscountries["23"]="Peru";
hscountries["55"]="Philippines";
hscountries["24"]="Poland";
hscountries["25"]="Portugal";
hscountries["141"]="Qatar";
hscountries["37"]="Romania";
hscountries["35"]="Russia";
hscountries["79"]="SaudiArabia";
hscountries["26"]="Scotland";
hscountries["121"]="Senegal";
hscountries["57"]="Serbia";
hscountries["47"]="Singapore";
hscountries["67"]="Slovakia";
hscountries["64"]="Slovenia";
hscountries["27"]="SouthAfrica";
hscountries["30"]="SouthKorea";
hscountries["36"]="Spain";
hscountries["113"]="Suriname";
hscountries["1"]="Sverige";
hscountries["46"]="Switzerland";
hscountries["140"]="Syria";
hscountries["142"]="Tanzania";
hscountries["31"]="Thailand";
hscountries["110"]="Trinidad";
hscountries["80"]="tunisiyah";
hscountries["32"]="Turkey";
hscountries["143"]="Uganda";
hscountries["68"]="Ukraine";
hscountries["83"]="uae";
hscountries["28"]="Uruguay";
hscountries["8"]="USA";
hscountries["29"]="Venezuela";
hscountries["70"]="Vietnam";
hscountries["61"]="Wales";
hscountries["133"]="Yemen";


htworld[118]='www.ht-world.org/algerie';
htworld[128]='www.ht-world.org/aliraq';
htworld[127]='www.ht-world.org/alkuwayt';
htworld[77]='www.ht-world.org/almaghrib';
htworld[106]='www.ht-world.org/alurdun';
htworld[133]='www.ht-world.org/alyaman';
htworld[105]='www.ht-world.org/andorra';
htworld[130]='www.ht-world.org/angola';
htworld[7]='www.ht-world.org/argentina';
htworld[129]='www.ht-world.org/azerbaycan';
htworld[123]='www.ht-world.org/bahrain';
htworld[132]='www.ht-world.org/bangladesh';
htworld[124]='www.ht-world.org/barbados';
htworld[91]='www.ht-world.org/belarus';
htworld[44]='www.ht-world.org/belgie';
htworld[139]='www.ht-world.org/benin';
htworld[74]='www.ht-world.org/bolivia';
htworld[69]='www.ht-world.org/bosnaihercegovina';
htworld[16]='www.ht-world.org/brasil';
htworld[136]='www.ht-world.org/brunei';
htworld[62]='www.ht-world.org/bulgaria';
htworld[125]='www.ht-world.org/caboverde';
htworld[17]='www.ht-world.org/canada';
htworld[52]='www.ht-world.org/ceskarepublika';
htworld[18]='www.ht-world.org/chile';
htworld[34]='www.ht-world.org/china';
htworld[19]='www.ht-world.org/colombia';
htworld[81]='www.ht-world.org/costarica';
htworld[126]='www.ht-world.org/cotedivoire';
htworld[131]='www.ht-world.org/crnagora';
htworld[61]='www.ht-world.org/cymru';
htworld[89]='www.ht-world.org/cyprus';
htworld[11]='www.ht-world.org/danmark';
htworld[141]='www.ht-world.org/dawlatqatar';
htworld[144]='www.ht-world.org/dhivehiraajje';
htworld[73]='www.ht-world.org/ecuador';
htworld[56]='www.ht-world.org/eesti';
htworld[100]='www.ht-world.org/elsalvador';
htworld[2]='www.ht-world.org/england';
htworld[36]='www.ht-world.org/espana';
htworld[76]='www.ht-world.org/foroyar';
htworld[5]='www.ht-world.org/france';
htworld[137]='www.ht-world.org/ghana';
htworld[107]='www.ht-world.org/guatemala';
htworld[30]='www.ht-world.org/hanguk';
htworld[122]='www.ht-world.org/hayastan';
htworld[50]='www.ht-world.org/hellas';
htworld[99]='www.ht-world.org/honduras';
htworld[59]='www.ht-world.org/hongkong';
htworld[58]='www.ht-world.org/hrvatska';
htworld[20]='www.ht-world.org/india';
htworld[54]='www.ht-world.org/indonesia';
htworld[85]='www.ht-world.org/iran';
htworld[21]='www.ht-world.org/ireland';
htworld[38]='www.ht-world.org/island';
htworld[63]='www.ht-world.org/israel';
htworld[4]='www.ht-world.org/italia';
htworld[94]='www.ht-world.org/jamaica';
htworld[138]='www.ht-world.org/kampuchea';
htworld[112]='www.ht-world.org/kazakhstan';
htworld[95]='www.ht-world.org/kenya';
htworld[102]='www.ht-world.org/kyrgyzstan';
htworld[53]='www.ht-world.org/latvija';
htworld[84]='www.ht-world.org/letzebuerg';
htworld[117]='www.ht-world.org/liechtenstein';
htworld[66]='www.ht-world.org/lietuva';
htworld[120]='www.ht-world.org/lubnan';
htworld[51]='www.ht-world.org/magyarorszag';
htworld[97]='www.ht-world.org/makedonija';
htworld[45]='www.ht-world.org/malaysia';
htworld[101]='www.ht-world.org/malta';
htworld[6]='www.ht-world.org/mexico';
htworld[33]='www.ht-world.org/misr';
htworld[135]='www.ht-world.org/mocambique';
htworld[103]='www.ht-world.org/moldova';
htworld[119]='www.ht-world.org/mongoluls';
htworld[14]='www.ht-world.org/nederland';
htworld[111]='www.ht-world.org/nicaragua';
htworld[75]='www.ht-world.org/nigeria';
htworld[22]='www.ht-world.org/nippon';
htworld[9]='www.ht-world.org/norge';
htworld[93]='www.ht-world.org/northernireland';
htworld[15]='www.ht-world.org/oceania';
htworld[39]='www.ht-world.org/oesterreich';
htworld[134]='www.ht-world.org/oman';
htworld[71]='www.ht-world.org/pakistan';
htworld[96]='www.ht-world.org/panama';
htworld[72]='www.ht-world.org/paraguay';
htworld[23]='www.ht-world.org/peru';
htworld[55]='www.ht-world.org/philippines';
htworld[24]='www.ht-world.org/polska';
htworld[25]='www.ht-world.org/portugal';
htworld[31]='www.ht-world.org/prathetthai';
htworld[88]='www.ht-world.org/republicadominicana';
htworld[37]='www.ht-world.org/romania';
htworld[35]='www.ht-world.org/rossiya';
htworld[104]='www.ht-world.org/sakartvelo';
htworld[79]='www.ht-world.org/saudiarabia';
htworld[46]='www.ht-world.org/schweiz';
htworld[26]='www.ht-world.org/scotland';
htworld[121]='www.ht-world.org/senegal';
htworld[98]='www.ht-world.org/shqiperia';
htworld[47]='www.ht-world.org/singapore';
htworld[64]='www.ht-world.org/slovenija';
htworld[67]='www.ht-world.org/slovensko';
htworld[27]='www.ht-world.org/southafrica';
htworld[57]='www.ht-world.org/srbija';
htworld[12]='www.ht-world.org/suomi';
htworld[113]='www.ht-world.org/suriname';
htworld[140]='www.ht-world.org/suriyah';
htworld[1]='www.ht-world.org/sverige';
htworld[60]='www.ht-world.org/taiwan';
htworld[142]='www.ht-world.org/tanzania';
htworld[80]='www.ht-world.org/tounes';
htworld[110]='www.ht-world.org/trinidadandtobago';
htworld[32]='www.ht-world.org/turkiye';
htworld[143]='www.ht-world.org/uganda';
htworld[68]='www.ht-world.org/ukraina';
htworld[83]='www.ht-world.org/unitedarabemirates';
htworld[28]='www.ht-world.org/uruguay';
htworld[8]='www.ht-world.org/usa';
htworld[29]='www.ht-world.org/venezuela';
htworld[70]='www.ht-world.org/vietnam';
htworld[3]='www.ht-world.org/deutschland';

// dunno check realy whats for. it's certainly out of date
hslevels["99"]= 	 2;
hslevels["102"]= 	 2;
hslevels["98"]= 	 3;
hslevels["100"]= 	 3;
hslevels["105"]= 	 3;
hslevels["107"]= 	 3;
hslevels["117"]= 	 3;
hslevels["131"]= 	 3;
hslevels["103"]= 	 4;
hslevels["15"]= 	 5;
hslevels["17"]= 	 5;
hslevels["26"]= 	 5;
hslevels["29"]= 	 5;
hslevels["50"]= 	 5;
hslevels["57"]= 	 5;
hslevels["62"]= 	 5;
hslevels["63"]= 	 5;
hslevels["64"]= 	 5;
hslevels["69"]= 	 5;
hslevels["2"]= 	 6;
hslevels["7"]= 	 6;
hslevels["8"]= 	 6;
hslevels["44"]= 	 6;
hslevels["16"]= 	 7;
hslevels["18"]= 	 7;
hslevels["11"]= 	 8;
hslevels["25"]= 	 9;



//HT Newsfeeds

stats["xray_newsfeed"] =  { 
       "url" : "http://www.databased.at/hattrick/",  
       "newslink" : { "path" : "rss/",
                      "filters"    : []
        },
       "title" : "HT Newsfeeds",
       "img" : Foxtrick.ResourcePath+"resources/linkicons/htrss2.gif"
  
}

// hattriX-Ray Crossover
stats["xray_crossover"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/",  
        "playerlink" : { "path"       : "?starter=crossover",
                         "filters"    : [], 
                         "params"     : { "playerid" : "pid" }
                       },
        
        "title" : "hattriX-Ray Crossover",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_crossover.png"
};    


// hattriX-Ray Backdraft
stats["xray_backdraft"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",  
        "teamlink" : { "path"       : "?starter=backdraft",
                         "filters"    : [], 
                         "params"     : { "teamid" : "teamid" }
                       },
        
        "title" : "hattriX-Ray Backdraft",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_backdraft.png"
};    

// hattriX-Ray ClubRay
stats["xray_clubray"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "teamlink" : { "path"       : "?starter=clubray",
                         "filters"    : [], 
                         "params"     : { "teamid" : "teamid" }
                       },
        
        "title" : "hattriX-Ray clubray",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_clubray.png"
};    


// hattriX-Ray Friendlier

stats["xray_friendlier"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "challengeslink" : { "path"       : "?starter=friendlier",
                         "filters"    : [], 
                         "params"     : {  }
                       },
        
        "title" : "hattriX-Ray Friendlier",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_friendlier.png"
};    



// hattriX-Ray Rounds 2 go
stats["xray_roundstogo"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "leaguelink" : { "path"       : "?starter=rounds2Go",
                         "filters"    : [], 
                         "params"     : { "leagueid" : "divID" }
                       },
        
        "title" : "hattriX-Ray rounds to go",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_rounds2go.png"
};    

// hattriX-Ray roundrate
stats["xray_roundrate"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "leaguelink" : { "path"       : "?starter=roundrate",
                         "filters"    : [], 
                         "params"     : { "leagueid" : "divID" }
                       },
        
        "title" : "hattriX-Ray roundRate",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_roundrate.png"
};    


// hattriX-Ray leaguemates
stats["xray_leaguemates"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "leaguelink" : { "path"       : "?starter=leaguemates",
                         "filters"    : [], 
                         "params"     : { "leagueid" : "divID" }
                       },
        
        "title" : "hattriX-Ray leaguemates",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_leaguemates.png"
};    


// hattriX-Ray sunray
stats["xray_sunray"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "nextmatchlink" : { "path"       : "?starter=sunray",
                         "filters"    : [], 
                         "params"     : { "teamid" : "teamid" }
                       },
        
        "title" : "hattriX-Ray sunray",
        //"post" : "true",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_sunray.png"
};


// hattriX-Ray live!
stats["xray_live"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "matchlink" : { "path"       : "?starter=live",
                         "filters"    : [], 
                         "params"     : { "matchid" : "matchid" }
                       },
        
        "title" : "hattriX-Ray live!",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_live.png"
};


// hattriX-Ray live! review
stats["xray_livereview"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "playedmatchlink" : { "path"       : "?starter=livereview",
                         "filters"    : [], 
                         "params"     : { "matchid" : "matchid" }
                       },
        
        "title" : "hattriX-Ray live! (played matches)",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_live_review.png"
};

// hattriX-Ray head to head
stats["xray_h2h"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "playedmatchlink" : { "path"       : "?starter=headtohead",
                         "filters"    : [], 
                         "params"     : { "matchid" : "matchid" }
                       },
        
        "title" : "hattriX-Ray head to head (played matches)",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_h2h.png"
};


// hattriX-Ray healing
stats["xray_healing"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "playerhealinglink" : { "path"       : "?starter=healing",
                         "filters"    : [], 
                         "params"     : { "age" : "v1", "injuredweeks" : "v2", "playerid" : "pid"  }
                       },
        
        "title" : "hattriX-Ray healing",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_healing_s.png"
};

// hattriX-Ray healing TSI
stats["xray_healingtsi"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "playerhealinglink" : { "path"       : "?starter=healingTSI",
                         "filters"    : [], 
                         "params"     : { "age" : "v1", "injuredweeks" : "v2", "tsi" : "v3", "playerid" : "pid"  }
                       },
        
        "title" : "hattriX-Ray healing TSI",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_healingtsi_s.png"
};

// hattriX-Ray youngster
stats["xray_youngster"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp?starter=youngster",

        "youthpulllink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : {  }
                       },
        
        "title" : "hattriX-Ray youngster",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_youngster.png"
};


// hattriX-Ray youngster
stats["xray_econray"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "economylink" : { "path"       : "?starter=econray",
                         "filters"    : [], 
                         "params"     : {  }
                       },
        
        "title" : "hattriX-Ray econray",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_econray.png"
};

stats["xray_keeper"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",

        "keeperlink" : { "path"       : "?starter=keepersup",
                         "filters"    : [], 
                         "params"     : { "tsi" : "tsi", "form": "form", "playerid" : "pid", "goalkeeping" : "v1"}
                       },
        
        "title" : "hattriX-Ray keepers-up",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_keepersup_s.png"
};


stats["xray_coach"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/pages/coach.asp",

        "coachlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : {  }
                       },
        
        "title" : "hattriX-Ray Coach",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_coach.png"
};

// hattrick challenge
stats["hattrickchallenge_friendly"] =  { 
        "url" : "http://www.hattrickchallenge.com/Tools/Entry.php",

        "challengeslink" : { "path"       : "?tool=friendly",
                         "filters"    : [], 
                          "params"     : {"teamid":"teamid","ownteamid":"ftfilter_ownteamid"}
                       },

		"youthchallengeslink" : { "path"       : "?tool=youthfriendly",
                         "filters"    : [], 
                          "params"     : {"youthteamid":"youthteamid","teamid":"teamid","ownteamid":"ftfilter_ownteamid"}
                       },
        
        "youthlink" : { "path"       : "?tool=youthfriendly",
                         "filters"    : [], 
                         "params"     : {"youthteamid":"youthteamid","teamid":"teamid","ownteamid":"ftfilter_ownteamid"}
                       },
		"allowlink" : function(filterparams, stattype) {           
            if (filterparams["teamid"] != filterparams["ownteamid"]) {
                return false;
            } else {
                return true;
            }
        },
        "title" : "HattrickChallenge Friendly ads",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hattrickchallenge_main.png"
};

// hattrick challenge
stats["hattrickchallenge"] =  { 
        "url" : "http://www.hattrickchallenge.com/Tools/Entry.php",

        "teamlink" : { "path"       : "?tool=myteam",
                         "filters"    : [], 
                         "params"     : { "teamid" : "teamid"}
                       },
                       
        "countrylink" : { "path"       : "?tool=challenge",
                       "filters"    : [], 
                       "params"     : { "countryid" : "countryid" }
                     },

        "leaguelink" : { "path"       : "?tool=forecast",
                         "filters"    : [], 
                         "params"     : {"leagueid" : "leagueid" }
                       },

        "title" : "HattrickChallenge",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hattrickchallenge_main.png"
};


// hattriX-Ray HTPE
stats["HTPE"] =  { 
        "url" : "http://www.databased.at/hattrick/htpe/",

        "transfercomparelink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "playerid" : "pid", "teamid" : "tid",
                                          "tsi" : "tsi", "age" : "age", "form" : "form", "exp" : "exp",
                                          "stamina" : "st", "goalkeeping" : "gk", "playmaking" : "pm",
                                          "passing" : "pa", "winger" : "wi", "defending" : "de",
                                          "scoring" : "sc", "setpieces" : "sp"
                          }
                       },
        
        "title" : "hattriX-Ray HTPE",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htpe.png"
};    

// Hattrick Hall of Fame
stats["halloffame_match"] =  { 
        "url" : "http://www.databased.at/hattrick/halloffame/",
        "playedmatchlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "matchid" : "matchid" }
                       },
        "title" : "Hattrick Hall of Fame (match)",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hhof.png"
};    

stats["halloffame_team"] =  { 
        "url" : "http://www.databased.at/hattrick/halloffame/",
        "teamlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "teamid" : "teamid" }
                       },
        "title" : "Hattrick Hall of Fame (team)",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hhof.png"
};    

stats["halloffame_player"] =  { 
        "url" : "http://www.databased.at/hattrick/halloffame/",
        "playerlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "playerid" : "pid" }
                       },
        "title" : "Hattrick Hall of Fame (player)",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hhof.png"
};    

// hattriX-Ray arenasizer
stats["xray_arenasizer"] =  { 
        "url" : "http://www.databased.at/hattrick/x-ray/index.asp",
        "arenalink" : { "path"       : "?starter=arenasizer",
                         "filters"    : [], 
                         "params"     : { "terraces" : "v1", "basic": "v2", "roof" : "v3", "vip" : "v4"}
                       },
        
        "title" : "hattriX-Ray arenasizer",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/xray_arenasizer.png"
};


// Alltid Hattrick Statistikk, International
// Thomas Johnsenn

stats["alltid"] =  { 
    
        "url" : "http://alltid.org/",

        "leaguelink" : { "path"       : "league/",
                         "filters"    : [], 
                         "params"     : { "leagueid" : "" }
                       },

        "teamlink" : { "path"       : "team/",
                         "filters"    : [], 
                         "params"     : { "teamid" : "" }
                       },

        "playerlink" : { "path"       : "player/",
                         "filters"    : [], 
                         "params"     : { "playerid" : "" }
                       },

        "countrylink" : { "path"       : "countrylid/",
                         "filters"    : [], 
                         "params"     : { "countryid" : "" }
                       },

        "federationlink" : { "path"       : "federation/",
                         "filters"    : [], 
                         "params"     : { "federationid" : "" }
                       },
		"playedmatchlink" : { "path"       : "match/",
                         "filters"    : [], 
                         "params"     : { "matchid" : "","match":"" }
                       },
        "matchlink" : { "path"       : "teamcompare/",
                         "filters"    : [], 
                         "params"     : { "teamid" : "","teamid2":"," }
                       },
        
        
        "title" : "Alltid Hattrick Statistics International",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/ahstats.png"
};    



// HT-Deutschland
stats["ht_deutschland"] =  { 
  "url" : "http://www.ht-deutschland.de/",
  
  "leaguelink" : { "path"       : "liga.php",
                   "filters"    : ["countryid"], 
                   "params"     : { "leaguename" : "leagueLevelUnitName",
                                    "levelnum" : "leagueLevel"
                                  }
                 },
  
  "teamlink" : { "path"       : "teamview.php",
                   "filters"    : ["countryid"], 
                   "params"     : { "teamid" : "teamID" }
                 },
 
 "countrylink" : { "path"       : "overview.php",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "countryidranges" : [[3, 3]], 
  "title" : "HT-Deutschland",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/ht-deutschland.png"
};    


// peasohtstats
stats["htstats"] =  { 
        "url" : "http://htstats.com/",

        "leaguelink" : { "path"       : "liga.php",
                         "filters"    : ["countryid"], 
                         "params"     : { "leagueid" : "htliga"}
                       },

        "teamlink" : { "path"       : "equipo.php",
                         "filters"    : ["countryid"], 
                         "params"     : { "teamid" : "htequipo" }
                       },
       "countrylink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },

        "countryidranges" : [[36, 36]], 
        
        "title" : "Peaso Hattrick Stats",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htstats.png"
};    

stats["htstats_all"] =  {  
        "url" : "http://www.htstats.com/",
        "playedmatchlink" : { "path"       : "",
                         "filters"    : [], 
                         "paramfunction" : function(params) {
							var matchid=params["matchid"];
							var lang=FoxtrickPrefs.getString("htLanguage"); 
                            if (lang=='ca') lang='cat';
							else if (lang=='es') lang='es';
                            else lang='en';
                            return "matchinfo-" + matchid + "&setlang=" + lang;
							}
						 }, 
        "playedyouthmatchlink" : { "path"       : "",
							"filters"    : [], 
							"paramfunction" : function(params) {
							var matchid=params["matchid"];
							var lang=FoxtrickPrefs.getString("htLanguage"); 
                            if (lang=='ca') lang='cat';
							else if (lang=='es') lang='es';
                            else lang='en';
                            return "matchinfoy-" + matchid + "&setlang=" + lang;
							}
						 }, 
        "title" : "htstats (played match)",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htstats.png"        
};

stats["htms_stats"] =  {  
        "url" : "http://www.fantamondi.it/HTMS/index.php?page=predictor",
        "nextmatchlink" : { "path"       : "",
                         "filters"    : [], 
                         "paramfunction" : function(params) {
							var lang=FoxtrickPrefs.getString("htLanguage"); 
                            if (lang!='it') lang='en';
                            return "&lang=" + lang;
							}
						 }, 
        "title" : "htms predictor",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htms.png"        
};


// VnukStats

stats["vnukstats"] =  { 
        "url" : "http://vnukstats.hattrick-sk.com/",

        "leaguelink" : { "path"       : "league/details/",
                         "filters"    : ["countryid"], 
                         "params"     : { "leagueid" : "" }
                       },

        "teamlink" : { "path"       : "team/details/",
                         "filters"    : ["countryid"], 
                         "params"     : { "teamid" : "" }
                       },
        "countrylink" : { "path"       : "top-series/default/",
                         "filters"    : ["countryid"], 
                         "params"     : { "countryid" : "" }
                       },             


        "countryidranges" : [[52, 52],[67, 67]],  // CZ+SK
        "title" : "VnukStats",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/vnukstats.png"
};    


// todohattrick
stats["todohattrick"] =  { 
        "url" : "http://www.stepi.org/todohattrick/",

        "leaguelink" : { "path"       : "grupo.asp",
                         "filters"    : ["countryid"], 
                         "params"     : { "leagueid" : "grupoID"
                                        }
                       },

        "teamlink" : { "path"       : "equipo.asp",
                         "filters"    : ["countryid"], 
                         "params"     : { "teamid" : "equipoID" }
                       },

        "countryidranges" : [[36, 36]], 
        "title" : "TodoHattrick",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/todohattrick.png"
};    

/*
// La Gazzetta di HT

stats["lagazzetta"] =  { 
        "url" : "http://www.gazzaht.org/",

        "teamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     : []
                       },
		"leaguelink" : { "path"       : "index.php?pag=13",
                         "filters"    : ["countryid"], 
                         "params"     : { "leagueid" : "girone"
                                        }
                       },
		"countrylink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []                                        
                       },

        
        "countryidranges" : [[4, 4]], 
        "title" : "La Gazzetta di Hattrick",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/lagazzetta.jpg"
};    
*/
// ht-tools 
stats["ekonomer"] =  { 
        "url" : "http://ht-tools.sytes.net/ekonomer/ekonomer.asp",

        "economylink" : { "path"       : "",
                         "filters"    : ["owncountryid"], 
                         "params"     : {"newCash" : "resultat","" : "kassa=0"} 
                       },
		"owncountryidranges" : [[1, 1]], 
        "title" : "Ekonomkalkylatorn",   
        "img" : Foxtrick.ResourcePath+"resources/linkicons/httools_economy.png"
};

// 
stats["ComunidadHattrickVenezuela"] =  { 
        "url" : "http://www.hattrick.org.ve",

        "countrylink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     : []
                       },
		"countryidranges" : [[29, 29]], 
        "title" : "Comunidad Hattrick Venezuela",   
        "img" : Foxtrick.ResourcePath+"resources/linkicons/chtvicon.png"
};

// 
stats["ConvertidordeTiempo"] =  { 
        "url" : "http://www.hattrick.org.ve/herramientas/tiempo/",

        "transfercomparelink" : { "path"       : "",
                         "filters"    : ["owncountryid"], 
                         "params"     : {"deadline":"deadline"}
                       },
		"owncountryidranges" : [[29, 29]], 
        "title" : "Convertidor de Tiempo de Hattrick-Venezuela",   
        "img" : Foxtrick.ResourcePath+"resources/linkicons/iconotiempo.png"
};


stats["francestats"] =  { 
        "url" : "http://www.francestats.fr/",

        "leaguelink" : { "path"       : "show_league.php",
                         "filters"    : ["countryid"], 
                         "params"     : { "leagueid" : "league"}
                       },

        "teamlink" : {   "path"       : "show_team.php",
                         "filters"    : ["countryid"],         
                         "params"     : { "teamid" : "teamid" }
                       },
       "countrylink" : { "path"       : "",
                         "filters"    : ["countryid"],         
                         "params"     : []
                       },

	    "countryidranges" : [[5, 5]],
        "title" : "FranceStats",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/francestats.png"        
};  


// Hattrick Chile
stats["estadisticas.hattrick.cl"] =  { 
        "url" : "http://estadisticas.hattrick.cl/",

        "leaguelink" : { "path"       : "leagues/view/",
                         "filters"    : ["countryid"], 
                         "params"     : { "leagueid" : "" }
                       },

        "teamlink" : {   "path"       : "teams/view/",
                         "filters"    : ["countryid"], 
                         "params"     : { "teamid" : "" }
                       },
        
        "countryidranges" : [[18, 18]], 
        "title" : "Estadisticas Chile",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hattrick_cl.png"        
};


stats["hattrick.cl"] = { 
  "url" : "http://www.hattrick.cl/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/hattrick_cl.png",
  "title" : "hattrick.cl",
  
        "countrylink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
        
        "countryidranges" : [[18, 18]] 
};
    

// Hattristics
stats["hattristics"] =  { 
        "url" : "http://www.hattristics.org/",

        "leaguelink" : { "path"       : "pub/viewLeague.php",
                         "filters"    : ["levelnum","countryid"], 
                         "params"     : { "leaguename" : "leagueName" }
                       },

        "teamlink" : {   "path"       : "pub/viewTeam.php",
                         "filters"    : ["countryid"], 
                         "params"     : { "teamid" : "teamID" }
                       },
        "teamlink" : {   "path"       : "index.php",
                         "filters"    : ["countryid"], 
                         "params"     : []
                       },
        "countryidranges" : [[46, 46]], 
		"levelnumranges" : [[1, 5]],
        "title" : "Hattristics",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hattrist.png"
};    


// akickku USA
stats["akickku"] =  { 
        "url" : "http://www.akickku.com/",

        "leaguelink" : { "path"       : "series.php",
                         "filters"    : ["countryid"], 
                         "params"     : { "leaguename" : "seriesname" }
                       },

        "teamlink" : {   "path"       : "team.php",
                         "filters"    : ["countryid"], 
                         "params"     : { "teamid" : "id",
                                          "teamname" : "name"}
                       },
        "countrylink" : {   "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     : []
                       },
        "countryidranges" : [[8, 8]],
        "title" : "Akickku",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/akickku.png"
};    

// HC Stats - Hellas, Cyprus
stats["hcstatshellas"] =  { 
        "url" : "http://www.hattrick.gr/",  //"http://www.hattrick.gr/~hcstats/", stats page not working atm

        "leaguelink" : { "path"       : "", 			//"content/db/series.php?lang=gr",
                         "filters"    : ["countryid"], 
                         "params"     : {
                                        "leaguename" : "name",
                                        "countryid" : "country"
                                        },
                        "paramfunction" : function(params) {
                            
                            if (params["levelnum"] == 1) {
                             return "&country=" + params["countryid"] + "&level=1";
                            } else {
                             return "&country=" + params["countryid"] + "&name=" + params["leaguename"];                
                            }
                            
                        }                                        
                       },

        "teamlink" : {   "path"       : "", //"content/db/team.php?lang=gr",        
                         "filters"    : ["countryid"], 
                         "params"     : { "teamid" : "teamId", "countryid" : "country" }
                       },
        "countrylink" : {   "path"       : "",        
                         "filters"    : ["countryid"], 
                         "params"     : []
                       },        
        "countryidranges" : [[50, 50], [89, 89]], 
        "title" : "HC Stats",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hcstats_hellas.png"        
};    

/* // down
// HTTools Friendly Manager
stats["httoolsfriendlymanager"] =  { 
        "url" : "http://httoolsfriendlymanager.cretze.ro/",

        "challengeslink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : []
                       },
        
        "title" : "HTTools Friendly Manager",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/httools_friendly.png"
};  */  

 // Maptrick

stats["maptrick_coolness"] =  { 
        "url" : "http://www.maptrick.org/",
 
        "teamlink" : { "path"		: "coolness.php",
						"filters"	: [],
						"params"	: { "teamid" : "team" ,"":"#results"}
						},
         
        "title" : "Maptrick Coolness",
         "img" : Foxtrick.ResourcePath+"resources/linkicons/maptrick_cool.png"
};

stats["maptrick_hoc"] =  { 
        "url" : "http://www.maptrick.org/",

        "countrylink" : { "path"	: "hallofcool.php",
						"filters"	: [],
						"params"	: { "countryid" : "country" }
						},
		
		"leaguelink" : { "path"		: "hallofcool.php",
						"filters"	: [],
						"params"	: { "leagueid" : "league" }
						},
		"federationlink" : { "path"	: "hallofcool.php",
						"filters"	: [],
						"params"	: { "federationid" : "alliance" }
						},
        
        "title" : "Maptrick Hall of Cool",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/maptrick_hoc.png"
};

stats["maptrick_botmap"] =  { 
        "url" : "http://www.maptrick.org/",

        "countrylink" : { "path"	: "botmap.php",
						"filters"	: [],
						"params"	: { "countryid" : "country" }
						},
        
        "title" : "Maptrick Botmap",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/maptrick_bot.png"
};
 

// HT-Dog
stats["ht-dog"] =  { 
        "url" : "http://mikehell.kicks-ass.net/ht-dog/",

        "teamlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "teamid" : "otherTeamID" }
                       },

        "title" : "HT-Dog",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/ht-dog.png"
};    

// Hatstats
/*
stats["hatstats"] =  { 
        "url" : "",
        "urlfunction": function (filterparams) {
                             var countryid = filterparams["countryid"];
                             if (typeof(hscountries[countryid]) == 'undefined') return null;
                             return "http://" + hscountries[countryid] + ".hatstats.info/";
                        },
    
        "leaguelink" : { "path"       : "standings.php?rank=0&round=99",
                         "filters"    : [], 
                         "params"     : { "leagueid" : "series",
                                          "levelnum" : "level" }
                       },

        "teamlink" : {   "path"       : "team_overview.php",
                         "filters"    : [], 
                         "params"     : { "teamid" : "teamid",
                                          "levelnum" : "level" }
                       },
        "countrylink" : {   "path"       : "",
                         "filters"    : [], 
                         "params"     : []
                       },
        "allowlink" : function(filterparams, stattype) {
            
            var maxlevel = 4;
            if (typeof(hslevels[filterparams["countryid"]]) != 'undefined') {
                maxlevel = hslevels[filterparams["countryid"]];
            }
            
            if (maxlevel < filterparams["levelnum"]) {
                return false;
            } else {
                return true;
            }
        },

        "title" : "HatStats",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hatstats.png"        
};    
*/
/* down
stats["advancedinjurycalc"] =  { 
        "url" : "http://www.student.ru.nl/rvanaarle/injury.php",

        "playerhealinglink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "age" : "nAge", "injuredweeks" : "nWeeks", "tsi" : "nTSIafter"  }
                        },
        
        "title" : "Advanced Injury Calculator",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/redcross_small.png"
};*/


stats["healingkawasaki"] =  { 
        "url" : "http://av.hattricknippon.org",

        "playerhealinglink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { }
                       },
        
        "title" : "Kawasaki Tigers Injury Healing Time Prediction Tool",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/redcross_small.png"
};

stats["healingkawasaki2"] =  { 
        "url" : "http://av2.hattricknippon.org",

        "playerhealinglink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { }
                       },
        
        "title" : "Kawasaki Tigers Injury Healing Time Prediction Tool 2",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/redcross_small.png"
};

stats["htbox_heal"] =  { 
        "url" : "http://www.ht-box.ru/",

        "playerhealinglink" : { "path"       : "healing.php",
                         "filters"    : [], 
                        "params"     : { "age" : "age",
										"injuredweeks" : "inj", 
										"tsi" : "tsi" 
									 }
                        },
        
        "title" : "HTBox Healing",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htbox_heal.gif"
};


stats["htbox_training"] =  { 
        "url" : "http://www.ht-box.ru/",

        "playerlink" : { "path"       : "training.php",
                         "filters"    : [], 
                        "params"     : { "age" : "yr", 
										"age_days" : "dy",
										"goalkeeping" : "goalkeeping", 
										"defending":"defending",
										"playmaking":"playmaking",
										"winger":"winger", 
										"passing":"passing",
										"scoring":"scoring",
										"setpieces":"setpieces" 
										}
                        },
        
		"traininglink" : { "path"       : "training.php",
                         "filters"    : [], 
                         "params"     : {"Coach":"coach","TI":"ti","STA":"ko","TrainingType":"type"}
						},
        "title" : "HTBox Training",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htbox_train.png"
};

//Training Team Evaluation
stats["Training_Team_Evaluation"] =  { 
        "url" : "http://www.adrianomm.site88.net/",

        "playerlink" : { "path"       : "playertraining.php?PlayerId=",
                         "filters"    : [], 
                        "params"     :  {"playerid" : "" }
                        },
        
		"traininglink" : { "path"       : "playertraining.php",
                         "filters"    : [], 
                         "params"     : []
						},
        "title" : "Training Team Evaluation",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/training_evaluation.png"
};

//NrgJack Wage Reduction Calculator
stats["Wage_Reduction_Calculator"] =  { 
        "url" : "http://www.nrgjack.altervista.org/",

        "playerlink" : { "path"       : "wagereduction.php",
                         "filters"    : ["age"], 
                        /*"params"     :  {"age" : "age",
										 "wage" : "wage",
										 "wagebonus" : "wagebonus" 
										}*/
						 "paramfunction" : function(params) {
							var wage=params["wage"];
							var wagebonus=params["wagebonus"];
							var age=params["age"];
							var CurrCode=params["Currency"];
                            if (CurrCode!="EUR"){
								wage=Math.round(wage*FoxtrickPrefs.getString("currencyRate"));
								wagebonus=Math.round(wagebonus*FoxtrickPrefs.getString("currencyRate"));
								age=Math.round(age);
							}
                            return "?wage=" + wage + "&wagebonus=" + wagebonus + "&age=" + age;                                                        
						 }
                       },
					   
		"ageranges" : [[28, 99]],
        "title" : "Wage Reduction Calculator",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/wagereduction.png"
};

//Ht4u - Primary Skill drop Calculator
stats["Ht4u"] =  { 
        "url" : "http://ht4u.altervista.org",

        "playerlink" : { "path"       : "/index.php",
                         "filters"    : ["age"],
                         "params"     : [], 
						 /* no data sharing with non chpp pages
						 "params"     : { "lang":"lang", "age" : "age",
                                          "playmaking" : "pm",
                                          "passing" : "pass", "winger" : "wi", "defending" : "def",
                                          "scoring" : "sco", "setpieces":"sp", "wage":"wage"
										} */                       						
                       },
		"ageranges" : [[27, 99]],
        "title" : "Primary Skill drop Calculator",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/ht4u.bmp"
};

//Ht4u - Team Spirit Calculator
stats["Ht4uTS"] =  { 
        "url" : "http://ht4u.altervista.org/TSpredictor",

        "traininglink" : { "path"       : "/team_spirit_predictor.php",
                         "filters"    : [],
                         "params"     : [],                        						
                       },
        "title" : "Team Spirit Calculator",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/ht4u.bmp"
};

//Team Confidence Calculator
stats["confidence"] =  { 
        "url" : "http://fptsj.brinkster.net",

        "traininglink" : { "path"       : "/confianca.aspx",
                         "filters"    : [],
                         "params"     : [],                        						
                       },
        "title" : "Team Confidence Calculator",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/confidence.png"
};

stats["ht-u20"] =  { 
        "url" : "http://age.ht-u20.com/",

        "playerlink" : { "path"       : "",
                         "filters"    : ["age"], 
                        "params"     : { "age" : "years", 
										"age_days" : "days",
										}
                        },
        "youthplayerdetaillink" : { "path"       : "",
                         "filters"    : [], 
                        "params"     : { "age" : "years", 
										"age_days" : "days",
										}
                        },
        "ageranges" : [[15, 20]],         
        "title" : "HT-U20 Check age vs U-20 matches",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/u20.png"
};

stats["hottrickkeeper"] =  { 
        "url" : "http://www.hottrick.org/",

        "keeperlink" : { "path"       : "hattrick_keeper_tool.php",
                         "filters"    : [], 
                         "params"     : { }
                       },
        
        "title" : "Hottrick Keeper Tool",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hottrick_small.png" 
};

stats["htnipponkeeper"] =  { 
        "url" : "http://keeper.hattricknippon.org/",

        "keeperlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "tsi" : "tsi", "form" : "form" }
                       },
        
        "title" : "Keeper Level Prediction Tool",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hattricknippon_small.png"
};

stats["coachexperience"] =  { 
        "url" : "http://www.manager.brygge.dk/Hattrick/experience.htm",

        "coachlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : []
                       },
        
        "title" : "Coach experience table",
        "shorttitle" : "Cet"
};


stats["nrgjack_accountant_tool"] =  { 
        "url" : "http://nrgjack.altervista.org/",

        "economylink" : { "path"       : "accountant.php",
                         "filters"    : [], 
                          //"params"     : {"newCash" : "money","Currency":"Currency"}
						 "paramfunction" : function(params) {
							var newCash=params["newCash"];
							var CurrCode=params["Currency"];
                            if (CurrCode!="EUR"){
								newCash=Math.round(newCash*FoxtrickPrefs.getString("currencyRate"));
								CurrCode="EUR";
							}
                            return "?money=" + newCash;                                                        
						 } 
                       },
        
        "title" : "NrgJack Accountant Tool",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/nrgjackeconomists.png"
};    

stats["htlinks_economists"] =  { 
        "url" : "http://www.ht-links.de/Hattrick/Economist-Checker.html",

        "economylink" : { "path"       : "",
                         "filters"    : [], 
                         //"params"     : {"Cash" : "Cash","Currency":"Currency"}
						 "paramfunction" : function(params) {
							var Cash=params["Cash"];
							var CurrCode=params["Currency"];
                            if (CurrCode!="EUR" && CurrCode!="CHF"){
								Cash=Math.round(Cash*FoxtrickPrefs.getString("currencyRate"));
								CurrCode="EUR";
							}
                            return "?Cash=" + Cash + "&Currency=" + CurrCode;                                                        
						 } 
                       },
        
        "title" : "HT-Links.de Economist Checker",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htlinks_lupe.png"
};    

stats["htlinks_trainingspeedchecker"] =  { 
        "url" : "http://www.ht-links.de/Hattrick/TrainingsSpeedCheckerE.html",

        "traininglink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : {"Coach":"Trainer","TI":"TI","STA":"KO","TrainingType":"TrainingType"}
                       },
        
        "title" : "HT-Links.de TrainingSpeedChecker",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htlinks_lupe.png"
};    

stats["htlinks_Goalkeeper_Checker"] =  { 
        "url" : "http://www.ht-links.de/Hattrick/Goalkeeper-Checker.html",

        "keeperlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "tsi" : "TSI", "form": "Form","age":"Age"}
                       },
        
        "title" : "HT-Links.de  - Goalkeeper-Checker",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htlinks_small.png"
};


stats["htlinks_ti_schrauber"] =  { 
        "url" : "http://www.ht-links.de/Hattrick/TISchrauber.html",

        "traininglink" : { "path"       : "",
                         "filters"    : ["owncountryid"], 
                         "params"     : {},                      
						 },
        "owncountryidranges" : [[3, 3]], 
        "title" : "HT-Links.de  - TISchrauber",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htlinks.png"
};


stats["htlinks_price_money"] =  { 
        "url" : "http://www.ht-links.de/Hattrick/PraemiephpE.html",

        "teamlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : {  "fans" : "Fan",'leaguepos':'Platz','levelnum':'Liga'}
                       },
        "title" : "HT-Links.de  - price_money",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htlinks.png"
};

stats["htlinks_arena"] =  { 
        "url" : "http://www.ht-links.de/Hattrick/ArenaCalculator2E.html?",

        "arenalink" : { "path"       : "",
                         "filters"    : [], 
                          "params"     : { "terraces" : "t", "basic": "b", "roof" : "r", "vip" : "v"}                       
                      },
        "title" : "HT-Links.de  - ArenaCalculator2",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htlinks.png"
};

stats["htlinks_Errungenschaften"] =  { 
        "url" : "http://www.ht-links.de/",

        "achievementslink" : { "path"       : "Hattrick/Errungenschaften.html",
                         "filters"    : ["owncountryid"], 
                         "params"     : []
                       },
         "owncountryidranges" : [[3, 3]], 
        "title" : "HT-Links.de - Errungenschaften",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htlinks.png"
};



stats["Hattrick_training_speed_tool"] =  { 
        "url" : "http://trainingspeed.freehostia.com/",

        "traininglink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : {"Coach":"Coach","TI":"TI","STA":"KO","TrainingType":"TrainingType"}
                       },
        
        "title" : "Hattrick training speed tool",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/trainingspeed.png"
};    


/*  // claims to have CHPP but doesn't. hence illegal
stats["skillraise"] =  { 
        "url" : "http://www.htdaytrading.com/",

        "playerlink" : { "path"       : "?page=showplayer",
                         "filters"    : ["age"], 
                         "params"     : { "age" : "age",
                                          "stamina" : "stamina",  "playmaking" : "playmaking",
                                          "passing" : "passing", "winger" : "winger", "defending" : "defending",
                                          "scoring" : "scoring"
                          }
                       },
                       
        "ageranges" : [[17, 19]], 

        "title" : "SkillRaise Tool",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/skillraise.png"
};  */  


stats["Hattrickstats_fr"] =  { 
        "url" : "http://friendly.cup.free.fr/",

        "leaguelink" : { "path"       : "Stats.php",
                         "filters"    : ["countryid"], 
                         "params"     : { "leagueid" : "id" }
                       },

        "teamlink" : { "path"       : "Stats.php",
                         "filters"    : ["countryid"], 
                         "params"     : { "teamid" : "team" }
                       },
        "countrylink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     : []
                       },
                
        "countryidranges" : [[5, 5]], 
        "title" : "HATTRICKSTATS.WeB.SiTe",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hattrickstats_fr.gif"
};    

stats["natstats"] =  { 
  "url" : "http://doof92.co.uk/",
  "title" : "NatStats",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/natstats.png",
  
  "nationalteamlink" : { "path"     : "",
                         "filters"  : [],
                         "params"   : {"ntteamid" : "id","LeagueOfficeTypeID":"LeagueOfficeTypeID" },
						 "paramfunction" : function(params) {
                            
                            if (params["LeagueOfficeTypeID"] == 2) {
                             return "HT/team.asp?id=" + params["ntteamid"];
                            } else {
                             return "/HT/u20team.asp?id=" + params["ntteamid"];                
                            }
                            
                        } 
  }
  
};


// Hattrick Today
stats["hattricktoday"] =  { 
        "url" : "http://www.frelive.net/",
        "matchlink" : { "path"       : "HT2D/Viewer/index.php",
                         "filters"    : [], 
                         "params"     : { "matchid" : "urlMatches" }
                       },
         "playedmatchlink" : { "path"       : "HT2D/Viewer/index.php",
                         "filters"    : [], 
                         "params"     : { "matchid" : "urlMatches" }
                       },
        
        "title" : "Hattrick Today",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hattricktoday.png"
};

 
stats["magicyp"] =  { 
        "url" : "http://www.rodelhang.at/magicyp",

        "youthpulllink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : []
                       },
        
        "title" : "Magic Youthpull",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/magicyp.png"
};


stats["hattrick-youthclub"] =  { 
        "url" : "http://www.hattrick-youthclub.org/",
        "youthlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : {"teamid":"ftfilter_teamid","ownteamid":"ftfilter_ownteamid"}
                       },
        "youthtraininglink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : {"teamid":"ftfilter_teamid","ownteamid":"ftfilter_ownteamid"}
                       },
		"allowlink" : function(filterparams, stattype) {           
            if (filterparams["teamid"] != filterparams["ownteamid"]) {
                return false;
            } else {
                return true;
            }
        },
        "title" : "Hattrick Youthclub",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/hyouthclub.png"
};

// youth db links 
stats["srbijayadb"] =  { 
        "url" : "http://srbijayadb.freehostia.com/newslist.php",
        "youthlink" : { "path"       : "",
                         "filters"    : ["owncountryid"], 
                         "params"     : []
                       },
        "youthtraininglink" : { "path"       : "",
                         "filters"    : ["owncountryid"], 
                         "params"     : []
                       },
		"owncountryidranges" : [[57, 57]], 
        "title" : "Srbija YA DB",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
};
stats["englandyadb"] =  { 
        "url" : "http://www.realfootball.co.uk/hattrick/ya/",
        "youthlink" : { "path"       : "",
                         "filters"    : ["owncountryid"], 
                         "params"     : []
                       },
        "youthtraininglink" : { "path"       : "",
                         "filters"    : ["owncountryid"], 
                         "params"     : []
                       },
		"owncountryidranges" : [[2, 2]], 
        "title" : "England YA DB",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
};
stats["junnukoira"] =  { 
        "url" : "http://www.saunalahti.fi/pterasti/Hattrick/",

        "youthplayerdetaillink" : { "path"       : "superlupaukset.html",
                         "filters"    : ["owncountryid"], 
                         "params"     : [], 
                       },
		"owncountryidranges" : [[12, 12]], 
        "title" : "Junnukoira - U-20 -superlupausten arvioija",   
        "img" : Foxtrick.ResourcePath+"resources/linkicons/puhuvakoira.png"
};
stats["treenikoira"] =  { 
        "url" : "http://www.saunalahti.fi/pterasti/Hattrick/",

        "traininglink" : { "path"       : "treenikoira.html",
                         "filters"    : ["owncountryid"], 
                         "params"     :  {"Coach":"coach","TI":"ti","STA":"sta","TrainingType":"trainingtype"}, 
                       },
		"owncountryidranges" : [[12, 12]], 
        "title" : "Treenikoira - treenilaskuri" ,   
        "img" : Foxtrick.ResourcePath+"resources/linkicons/puhuvakoira.png"
};

stats["arenaoptimizer"] =  { 
        "url" : "http://www.arenaoptimizer.es/",
        "arenalink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "terraces" : "t", "basic": "b", "roof" : "r", "vip" : "v"}                       
                       },
        "title" : "Arena Optimizer",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/arenaoptimizer.gif"
};

stats["htarena"] =  { 
        "url" : "http://www.htarena.org/",
        "arenalink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "terraces" : "t", "basic": "b", "roof" : "r", "vip" : "v"}                       
                       },
        "title" : "HTArena - the calculator",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htarena.png"
};

stats["nrg_eco"] =  { 
        "url" : "http://nrgjack.altervista.org/",
        "arenalink" : { "path"       : "eco.php",
                         "filters"    : [], 
                         "params"     : { "terraces" : "t", "basic": "b", "roof" : "r", "vip" : "v"}                       
                       },
        "title" : "NRG ECO",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/eco.png"
};

stats["nrg_fc"] =  { 
        "url" : "http://nrgjack.altervista.org/",
	    "coachlink" : { "path"       : "fc.php",
                         "filters"    : [], 
                         "params"     : {  }
                       },
        "title" : "NRG FC",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/nrg_fc.png"
};
					   
stats["nrg_pop"] =  { 
        "url" : "http://nrgjack.altervista.org/",
		"playerlink" : { "path"       : "pop.php",
                         "filters"    : [], 
                         "params"     : [], 
						 /* no data sharing with non chpp pages
						 "params"     : { "tsi" : "tsi", "form" : "fo",
                                          "stamina" : "st",  "playmaking" : "pm",
                                          "passing" : "pa", "winger" : "wi", "defending" : "df",
                                          "scoring" : "sc" }*/
                          },
        "title" : "NRG Pop",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/nrg_pop.png"
};

stats["nrg_deffor"] =  { 
        "url" : "http://nrgjack.altervista.org/",
		"playerlink" : { "path"       : "trequartista.php",
                         "filters"    : [], 
                         "params"     : { "playmaking" : "pm", "passing" : "pa", 
                                          "winger" : "wi", "defending" : "df",
                                          "scoring" : "sc", "goalkeeping" : "gk" }
                          },
        "allowlink" : function(filterparams, stattype) { 
			if (parseInt(filterparams["passing"])+ parseInt(filterparams["scoring"])+ parseInt(filterparams["playmaking"]) > 
				2*(parseInt(filterparams["winger"]) + parseInt(filterparams["defending"]) + parseInt(filterparams["goalkeeping"])))
			/*var pa=filterparams["passing"];
            var sc=filterparams["scoring"];
            if ((pa >= filterparams["playmaking"] && pa > filterparams["winger"] 
				&& pa > filterparams["defending"] && pa > filterparams["goalkeeping"])
			|| (sc >= filterparams["playmaking"] && sc > filterparams["winger"] 
				&& sc > filterparams["defending"] && sc > filterparams["goalkeeping"]))*/ {
                return true;
            } else {
                return false;
            }
        },
        "title" : "NRG The Perfect Defensive Forward",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/nrg_deffor.gif"
};



// ArgenStat
stats["argenstat"] =  { 
        "url" : "http://argenstat.com.ar/",
        "leaguelink" : { "path"       : "?V=L",
                         "filters"    : ["countryid"], 
                         "params"     : { "leagueid" : "ID" }
                       },
                       
        "teamlink" : { "path"       : "?V=T",
                         "filters"    : ["countryid"], 
                         "params"     : { "teamid" : "ID" }
                       },
        "countrylink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
        
        "countryidranges" : [[7, 7]], 
        "title" : "ArgenStat",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/argenstat.png"
};


// Gham live
stats["gham"] =  { 
        "url" : "http://hattrickitalia.org/gham/live/",

        "matchlink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "matchid" : "matchId" }
                       },
        
        "title" : "Gham live",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/gham.png"
};
   
   
   
// HT-bet
stats["ht_bet"] =  { 
        "url" : "http://www.ht-bet.org/predict.php",

        "leaguelink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "leagueid" : "league_id" }
                       },
        
        "title" : "HT-bet",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/ht_bet.png"
};    
   

// Team Position Probability Calculator
stats["tppc"] =  { 
        "url" : "http://www.adrianomoutinho.com/hattrick/index.php",

        "leaguelink" : { "path"       : "",
                         "filters"    : [], 
                         "params"     : { "leagueid" : "leagueid" },
						 "paramfunction" : function(params) {
							return '?LeagueId'+params["leagueid"]+'&Language='+FoxtrickPrefs.getString("htLanguage");
						}
                       },
        
        "title" : "Team Position Probability Calculator",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/tppc.png"
};    
      
   
// ----------------------------------------------------------------------
// -------------- tracker & national teams ------------------------------
// ----------------------------------------------------------------------

// ht-deutschland tracker

/* replaced by ht-world

stats["ht_scouting"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "scouting/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "scouting/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[3, 3]], 
  "countryidranges" : [[3, 3]], 
  "title" : "HT-Deutschland Scouting DB",
  "img":"flag"
  //"img" : Foxtrick.ResourcePath+"resources/linkicons/ht-d-scout.gif"
};


stats["ht_scouting_nigeria"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "nigeria/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "nigeria/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[75, 75]], 
  "countryidranges" : [[75, 75]], 
  "title" : "Nigeria Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_alyaman"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "alyaman/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "alyaman/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[133, 133]], 
  "countryidranges" : [[133, 133]], 
  "title" : "Al Yaman Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_bahrain"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "bahrain/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "bahrain/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[123, 123]], 
  "countryidranges" : [[123, 123]], 
  "title" : "Bahrain Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}


stats["ht_scouting_taiwan"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "taiwan/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "taiwan/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[60, 60]], 
  "countryidranges" : [[60, 60]], 
  "title" : "Taiwan Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_TrinidadTobago"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "trinidadandtobago/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "trinidadandtobago/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[110, 110]], 
  "countryidranges" : [[110, 110]], 
  "title" : "Trinidad & Tobago Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_malaysia"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "malaysia/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "malaysia/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[45, 45]], 
  "countryidranges" : [[45, 45]], 
  "title" : "Malaysia Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_kyrgyzstan"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "kyrgyzstan/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "kyrgyzstan/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[102, 102]], 
  "countryidranges" : [[102, 102]], 
  "title" : "Kyrgyzstan Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}


stats["ht_scouting_saudiarabia"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "saudiarabia/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "saudiarabia/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[79, 79]], 
  "countryidranges" : [[79, 79]], 
  "title" : "Saudi Arabia Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_brunei"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "brunei/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "brunei/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[136, 136]], 
  "countryidranges" : [[136, 136]], 
  "title" : "Brunei Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_malta"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "malta/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "malta/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[101, 101]], 
  "countryidranges" : [[101, 101]], 
  "title" : "Malta Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}


stats["ht_scouting_letzebuerg"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "letzebuerg/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "letzebuerg/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[84, 84]], 
  "countryidranges" : [[84, 84]], 
  "title" : "Letzebuerg Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_almaghrib"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "almaghrib/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "almaghrib/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[77, 77]], 
  "countryidranges" : [[77, 77]], 
  "title" : "Al Maghrib Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}


stats["ht_scouting_alkuwayt"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "alkuwayt/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "alkuwayt/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[127, 127]], 
  "countryidranges" : [[127, 127]], 
  "title" : "Al Kuwayt Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_andorra"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "andorra/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "andorra/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[105, 105]], 
  "countryidranges" : [[105, 105]], 
  "title" : "Andorra Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_armenia"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "hayastan/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "hayastan/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[122, 122]], 
  "countryidranges" : [[122, 122]], 
  "title" : "Hayastan NT Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_eesti"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "eesti/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "eesti/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[56, 56]], 
  "countryidranges" : [[56, 56]], 
  "title" : "Eesti NT Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}


stats["ht_scouting_liechtenstein"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "liechtenstein/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "liechtenstein/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[117, 117]], 
  "countryidranges" : [[117, 117]], 
  "title" : "Liechtenstein NT Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_kampuchea"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "scouting/kampuchea/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "scouting/kampuchea/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[138, 138]], 
  "countryidranges" : [[138, 138]], 
  "title" : "Kampuchea NT Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_alurdun"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "alurdun/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "alurdun/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[106, 106]], 
  "countryidranges" : [[106, 106]], 
  "title" : "Al Urdun NT Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_bangladesh"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "scouting/bangladesh/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "scouting/bangladesh/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[132, 132]], 
  "countryidranges" : [[132, 132]], 
  "title" : "Bangladesh NT Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["ht_scouting_singapore"] =  { 
  "url" : "http://www.ht-deutschland.de/",
 
  "trackerplayerlink" : { "path"       : "scouting/singapore/scouting.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "scouting/singapore/index.php?language=2",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[47, 47]], 
  "countryidranges" : [[47, 47]], 
  "title" : "Singapore NT Scouting DB",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png"
}

stats["omantracker"] = { 
  "url" : "http://www.ht-deutschland.de/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Oman U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "scouting/oman/scouting.php?language=2",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "scouting/oman/index.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[134,134]] , 
	"nationalityranges" : [[134,134]], 
};


stats["nirelandtracker"] = { 
  "url" : "http://www.ht-deutschland.de/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Northern Ireland U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "scouting/northernireland/scouting.php?language=2",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "scouting/northernireland/index.php?language=2",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[93,93]] , 
	"nationalityranges" : [[93,93]], 
};
*/

// ------------------------- nattrick tracker --------------------------------

stats["canadatracker"] = { 
  "url" : "http://nattrick.ca/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Canada U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "list.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "update.php",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[17,17]] ,
	"nationalityranges" : [[17,17]], 
};

stats["suomitracker"] = { 
  "url" : "http://suomi.nattrick.ca/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Suomi U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "list.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "update.php",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[12,12]] ,
	"nationalityranges" : [[12,12]], 
};


stats["oceaniatracker"] = { 
  "url" : "http://oceania.nattrick.ca/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Oceania U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "list.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "update.php",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[15,15]] ,
	"nationalityranges" : [[15,15]], 
};


stats["kenyatracker"] = { 
  "url" : "http://kenya.nattrick.ca/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Kenya U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "list.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[95,95]] ,
	"nationalityranges" : [[95,95]], 
};

stats["indiatracker"] = { 
  "url" : "http://india.nattrick.ca/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "India U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "list.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "update.php",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[20,20]] ,
	"nationalityranges" : [[20,20]], 
};

stats["panamatracker"] = { 
  "url" : "http://panama.nattrick.ca/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Panama U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "list.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "update.php",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[96,96]] ,
	"nationalityranges" : [[96,96]], 
};


stats["usatracker"] = { 
  "url" : "http://usa.nattrick.ca/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "USA U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "list.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "update.php",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[8,8]] ,
	"nationalityranges" : [[8,8]], 
};


stats["irantracker"] = { 
  "url" : "http://iran.nattrick.ca/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Iran U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "list.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "update.php",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[85,85]] ,
	"nationalityranges" : [[85,85]], 
};

stats["lebanontracker"] = { 
  "url" : "http://lebanon.nattrick.ca/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Lebanon U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "list.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "update.php",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[120,120]] ,
	"nationalityranges" : [[120,120]], 
};



// -------- ht.quickly.co.il  tracker-----------------------

stats["israeltracker"] = { 
  "url" : "http://ht.quickly.co.il",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Israel U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[63,63]] , 
	"nationalityranges" : [[63,63]], 
};

stats["suriyahtracker"] = { 
  "url" : "http://suriyah.ht.quickly.co.il/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Suriyah U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[140,140]] , 
	"nationalityranges" : [[140,140]], 
};


stats["philippinestracker"] = { 
  "url" : "http://philippines.ht.quickly.co.il/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Philippines U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[55,55]] , 
	"nationalityranges" : [[55,55]], 
};

stats["barbadostracker"] = { 
  "url" : "http://barbados.ht.quickly.co.il/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Barbados U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[124,124]] , 
	"nationalityranges" : [[124,124]], 
};


stats["indonesiatracker"] = { 
  "url" : "http://indonesia.ht.quickly.co.il/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Indonesia U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[54,54]] , 
	"nationalityranges" : [[54,54]], 
};

stats["moldovatracker"] = { 
  "url" : "http://db.hattrick.md/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Moldova U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[103,103]] , 
	"nationalityranges" : [[103,103]], 
};


// --------------- own trackers --------------------------------

stats["ht-fff"] =  { 
        "url" : "http://www.ht-fff.org/",

        "trackerplayerlink" : { "path"       : "dtn_submitting.php",
                         "filters"    : ["nationality"], 
                         "params"     : []
                       },
		"trackernationalteamlink" : { "path"       : "dtn_submitting.php",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
        "nationalityranges" : [[5, 5]],
        "countryidranges" : [[5, 5]],
        "title" : "ht-fff.org | french scouting group.",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/htfff.png"
}; 

stats["scouting_mexico"] =  { 
  "url" : "http://www.hattrick.org.mx/SN/",
 
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
				}, 
  "trackernationalteamlink" : { "path"       : "",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
  "nationalityranges" : [[6, 6]], 
  "countryidranges" : [[6, 6]], 
  "title" : "Hattrick México",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/Mexico_scouting.png"
};

stats["brasileira_tracker"] =  { 
        "url" : "http://www.opendev.com.br/chpp/br/",

        "trackerplayerlink" : { "path"       : "",
                         "filters"    : ["nationality"], 
                         "params"     : []
                       },
        "trackernationalteamlink" : { "path"       : "",
                   "filters"    : ["countryid"], 
                   "params"     : []
				}, 
		"countryidranges" : [[16, 16]],   
        "nationalityranges" : [[16, 16]],
        "title" : "Estatísticas da Seleçăo Brasileira",
        "img" : Foxtrick.ResourcePath+"resources/linkicons/brasileira.png"
};

stats["benintracker"] = { 
  "url" : "http://htbenin.athost.fr/index.php",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Benin NT/U20 Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[139,139]] ,
	"nationalityranges" : [[139,139]], 
};

stats["czechrepublic_nt"] = { 
  "url" : "http://tracker.kiekko.cz/players/submit/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/czech_nt_tracker.png",
  "title" : "Česká republika U20-NT Tracker",
  
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },  
    "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
        
    "countryidranges" : [[52, 52]] ,
	"nationalityranges" : [[52, 52]],
};


stats["crotracker"] = { 
  "url" : "http://cro-tracker.com/index.php",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/cro-tracker.gif",
  "title" : "Hrvatska NT U20 Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[58,58]] ,
	"nationalityranges" : [[58,58]], 
};


stats["ghanatracker"] = { 
  "url" : "http://www.ghana.comoj.com/?pg=submitPlayer",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/ghana_tracker.gif",
  "title" : "Ghana U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[137,137]] ,
	"nationalityranges" : [[137,137]], 
};


stats["armenia_u20tracker"] = { 
  "url" : "http://www.hayastan-u20.de.tl/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Hayastan U20 Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[122,122]] , 
	"nationalityranges" : [[122,122]], 
};


stats["belgiumtracker"] = { 
  "url" : "http://belgium.beltrick.org/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "National Team Belgium Database",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[44,44]] ,
	"nationalityranges" : [[44,44]], 
};

stats["colombiatracker"] = { 
  "url" : "http://seleccion.htcolombia.org/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Colombia U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[19,19]] ,
	"nationalityranges" : [[19,19]], 
};


stats["cyprustracker"] = { 
  "url" : "http://db.ht-cy.org",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Cyprus U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[89,89]] , 
	"nationalityranges" : [[89,89]], 
};


stats["englandtracker"] = { 
  "url" : "http://www.realfootball.co.uk/hattrick/tracker",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "England U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[2,2]] ,
	"nationalityranges" : [[2,2]], 
};


stats["nederlandtracker"] = { 
  "url" : "http://www.dutchscouts.nl/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Nederland U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[14,14]] ,
	"nationalityranges" : [[14,14]], 
};


stats["qatartracker"] = { 
  "url" : "http://www.tracker.comyr.com/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/qatartracker.png",
  "title" : "Dawlat Qatar U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[141,141]] ,
	"nationalityranges" : [[141,141]], 
};

stats["romaniatracker"] = { 
  "url" : "http://rtc.fubar.ro",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Romania U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[37,37]] ,
	"nationalityranges" : [[37,37]], 
};


stats["hellastracker"] = { 
  "url" : "http://www.hdb.gr",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Hellas U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[50,50]] ,
	"nationalityranges" : [[50,50]], 
};


stats["surinametracker"] = { 
  "url" : "http://tracker.hattricksuriname.com/players.php",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Suriname U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[113,113]] ,
	"nationalityranges" : [[113,113]], 
};

stats["ugandatracker"] = { 
  "url" : "http://uganda.site50.net",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Uganda U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[143,143]] ,
	"nationalityranges" : [[143,143]], 
};


stats["mozambiquetracker"] = { 
  "url" : "http://mozambique.comuf.com",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Mozambique U20/NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[135,135]] ,
	"nationalityranges" : [[135,135]], 
};

stats["srbijatracker"] = { 
  "url" : "http://srbijadb.foundationhorizont.org/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Serbian U-20/NT DB",
  
  "trackernationalteamlink" : { "path"       : "homelist.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "Prijaveadd2.php",
                   "filters"    : ["nationality"], 
                   "params"     : {"playerid":"playerID", "playername":"name", "age":"years", "age_days":"days",
									"teamname":"team","teamid":"teamID","exp":"exp","stamina":"sta","playmaking":"ply",
									"winger":"win","scoring":"sco","goalkeeping":"keep","passing":"pass","defending":"def","setpieces":"sp"}
                 },
	"countryidranges" : [[57,57]] ,
	"nationalityranges" : [[57,57]], 
};

stats["srbijassttracker"] =  { 
    "title" : "SST Srbija WC tracker",
    "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",        
    "url" : "http://spydb.foundationhorizont.org/",

    "trackerplayerlink" : { "path"       : "Prijaveadd2.php",
                   "filters"    : [], 
                   "params"     : {"playerid":"playerID", "playername":"name", "nationality":"LeagueID",
								   "age":"years", "age_days":"days","teamname":"team","teamid":"teamID",
								   "exp":"exp","stamina":"sta","playmaking":"ply","winger":"win","scoring":"sco",
								   "goalkeeping":"keep","passing":"pass","defending":"def","setpieces":"sp"}
                 }, 				 

};  

stats["montenegrotracker"] = { 
  "url" : "http://cgdb.foundationhorizont.org/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Montenegro U-20/NT DB",
  
  "trackernationalteamlink" : { "path"       : "homelist.php",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "Prijaveadd2.php",
                   "filters"    : ["nationality"], 
                   "params"     : {"playerid":"playerID", "playername":"name", "age":"years", "age_days":"days",
									"teamname":"team","teamid":"teamID","exp":"exp","stamina":"sta","playmaking":"ply",
									"winger":"win","scoring":"sco","goalkeeping":"keep","passing":"pass","defending":"def","setpieces":"sp"}
                 },
	"countryidranges" : [[131,131]] ,
	"nationalityranges" : [[131,131]], 
};

stats["scotlandtracker"] = { 
  "url" : "http://www.htscotland.co.uk",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Scotland U-20/NT DB",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[26,26]] ,
	"nationalityranges" : [[26,26]], 
};

  	 
stats["tanzaniatracker"] = { 
  "url" : "http://hattricktanzania.ic.cz",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Tanzania U-20/NT DB",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[142,142]] ,
	"nationalityranges" : [[142,142]], 
};

stats["turkeytracker"] = { 
  "url" : "http://www.ht-turkiye.com",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Türkiye & Azebaycan Player Database",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[32,32],[129,129]] ,
	"nationalityranges" : [[32,32],[129,129]], 
};


stats["southafricatracker"] = { 
  "url" : "http://ht-southafrica.co.za/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "South Africa U-20/NT DB",
  
  "trackernationalteamlink" : { "path"       : "latestNews.aspx",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "submitPlayerHT.aspx",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[27,27]] ,
	"nationalityranges" : [[27,27]], 
};

stats["norwayU20tracker"] = { 
  "url" : "http://tracker.sletholt.net/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Norway U-20 DB",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid","LeagueOfficeTypeID"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality","age"], 
                   "params"     : []
                 },
	"countryidranges" : [[9,9]] ,
	"LeagueOfficeTypeIDranges": [[3,4]],
	"nationalityranges" : [[9,9]],
	"ageranges" : [[17,19]], 	
};

stats["danmarktracker"] = { 
  "url" : "http://www.hobbyisten.biz/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Danmark NT/U-20 DB",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[11,11]] ,
	"nationalityranges" : [[11,11]],	
};


stats["ukrainatracker"] = { 
  "url" : "http://nt.ht-bet.org/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Ukraina NT/U-20 DB",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "update.php",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[68,68]] ,
	"nationalityranges" : [[68,68]],	
};

stats["spaintracker"] = { 
  "url" : "http://www.htspain.com.es/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Espańa NT/U-20 DB",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "index.php?pag=ht_login",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[36,36]] ,
	"nationalityranges" : [[36,36]],	
};

stats["polskatracker"] = { 
  "url" : "http://www.ntdb.pl/",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Polska NT/U-20 DB",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "index.php?page=Logging",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[24,24]] ,
	"nationalityranges" : [[24,24]],	
};

//  ------------- spreadsheets trackers ----------------
stats["mongoltracker"] = { 
  "url" : "http://spreadsheets.google.com/viewform?formkey=cGhyMThkSzVUdURSdmlWWHdmRldqUXc6MA..",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Mongol Uls U-20/NT DB",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[119,119]] ,
	"nationalityranges" : [[119,119]], 
};

stats["nippontracker"] = { 
  "url" : "http://spreadsheets.google.com/viewform?key=pPPtfeGUpefgXsyLLwuDrAw",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",
  "title" : "Nippon U-20 DB",
  
  "trackernationalteamlink" : { "path"       : "",
                         "filters"    : ["countryid"], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },
	"countryidranges" : [[22,22]] ,
	"nationalityranges" : [[22,22]], 
};


// global tracker
/* links to sokker.org
stats["u20_nt_tracker"] = { 
  "url" : "http://www.ant-db.net/index.php",
  "img" : Foxtrick.ResourcePath+"resources/linkicons/nt_tracker.png",
  "title" : "Global U20 & NT Tracker",
  
  "trackernationalteamlink" : { "path"       : "?action=select_country",
                         "filters"    : ["countryid"], 
                         "params"     :  { "countryid" : "id" }
                       },
  "trackerplayerlink" : { "path"       : "?action=player_submit&cat=1",
                   "filters"    : ["nationality"], 
                   "params"     : []
                 },    
	"countryidranges" :   [[1,1],[4,4],[7,7],[9,10],[13,13],[18,18],[21,21],[23,23],[25,25],[28,35],[38,43],[46,46],[48,51],[53,53],[59,59],
						[61,62],[64,67],[69,74],[76,76],[78,78],[80,83],[86,88],[90,94],[97,100],
						[104,105,],[107,109],[111,112],[114,116],[117,119],[121,121],[125,126],[128,131],[139,139],[142,142],[144,200]],
	"nationalityranges" : [[1,1],[4,4],[7,7],[9,10],[13,13],[18,18],[21,21],[23,23],[25,25],[28,35],[38,43],[46,46],[48,51],[53,53],[59,59],
						[61,62],[64,67],[69,74],[76,76],[78,78],[80,83],[86,88],[90,94],[97,100],
						[104,105],[107,109],[111,112],[114,116],[118,119],[121,121],[125,126],[128,131],[139,139],[142,142],[144,200]], 
};  // own tracker: exclude all above
*/

stats["htworld"] =  { 
    "title" : "HT-World NT/U20 tracker",
    "img" : Foxtrick.ResourcePath+"resources/linkicons/tracker.png",        
    "url" : "",
    "urlfunction": function (filterparams) {
                             var countryid = filterparams["countryid"];
                             var nationality = filterparams["nationality"];
                             if (typeof(htworld[countryid]) == 'undefined') {
								if (typeof(htworld[nationality]) == 'undefined') return null;
								return "http://" + htworld[nationality];
								}
                             return "http://" + htworld[countryid];
                        },
  "trackernationalteamlink" : { "path"       : "/index.php?language=2",
                         "filters"    : [], 
                         "params"     :  []
                       },
  "trackerplayerlink" : { "path"       : "/scouting.php?language=2",
                   "filters"    : [], 
                   "params"     : []
                 },    

};   

};

//------------------------------------------------------------------
// -----------------------------------------------------------------


if (!Foxtrick) var Foxtrick={};

Foxtrick.StatsHash = {};

Foxtrick.MakeStatsHash = function(){		
		// create stats Hash for Foxtrick.LinkCollection
		for (var key in Foxtrick.LinkCollection.stats) {
			var stat = Foxtrick.LinkCollection.stats[key];
			for (var prop in stat) {
				if (prop.match(/link/)) {
					if (typeof(Foxtrick.StatsHash[prop]) == 'undefined') {
						Foxtrick.StatsHash[prop] = {};
					}
					Foxtrick.StatsHash[prop][key] = stat;
				}
			}
		}
}





Foxtrick.LinkCollection.getLinks2  = function(stats, stattype, filterparams, doc, overridesettings, module) { 
    var links = [];
    var counter = 0;
    
    for (var key in stats) {

        if (!Foxtrick.isModuleFeatureEnabled(module, key)  && 
			!overridesettings) {
			 continue;
        } 
        var stat = stats[key];
        var statlink = stat[stattype];
        var filters = statlink["filters"];
        
        var allowed = true;
        
        if (filters.length == 0 && (typeof(stat["allowlink"]) == 'undefined')) {
            allowed = true;
        } else {
            if (filters.length > 0) {

              for (var i=0; i<filters.length; i++) {

                var filtertype = filters[i];
                var filterranges = stat[filtertype + "ranges"];
                var temp = false;
     			
				for (var j=0; j<filterranges.length; j++) {
                  if ( (filterparams[filtertype] >= filterranges[j][0]) && (filterparams[filtertype] <= filterranges[j][1])) {
                    temp = true;
                    break;
                  }
                }
                
                if (!temp) {
                  allowed = false;
                  break;
                }
             }
            
           } else {
                if (typeof(stat["allowlink"]) != 'undefined') {
                    if (stat["allowlink"](filterparams, stattype)) {
                        allowed = true;
                    } else {
                        allowed = false;
                    }
                }
            }
        }
        
        if (allowed) {
             var link = Foxtrick.LinkCollection.makelink(stat, statlink, filterparams, key, doc);
             if (link != null) { 
                links.push({"link" : Foxtrick.LinkCollection.getLinkElement(link, stat, doc, key, module.MODULE_NAME), "stat" : stat});
             }
        }

    }
  return Foxtrick.LinkCollection.getSortedLinks(links);
};


Foxtrick.LinkCollection.getLinks  = function(stattype, filterparams, doc, module) { 
  return Foxtrick.LinkCollection.getLinks2(Foxtrick.StatsHash[stattype], stattype, filterparams, doc, false, module);
};


Foxtrick.LinkCollection.makelink  = function(stat, statlink, filterparams, key, doc) { 

    var params = statlink["params"];
    var args = "";

    if (typeof (statlink["paramfunction"]) == 'undefined') {
        for (var paramkey in params) {
		if (params[paramkey].search('ftfilter')==0) continue;
			var temp;
            
            if ((args == "") && statlink["path"].search(/\?/) == -1 && stat["url"].search(/\?/) == -1) {
                temp = "?";
             } else {
                temp = "&";
             }
			 
             if (!params[paramkey].charAt(0).match(/\w+/)) {temp="";}
			 //dump(params[paramkey].charAt(0)+' '+ (!params[paramkey].charAt(0).match(/\w+/))+' '+temp+' '+filterparams[paramkey]+'\n');	
             if (filterparams[paramkey] != null) {
                args += ( (params[paramkey] != "" && temp !="") ? (temp + params[paramkey] + "=") : params[paramkey])+ encodeURIComponent(filterparams[paramkey]);
				}
			else {args += (params[paramkey] != "" ? temp + params[paramkey] : "");}
        }

    } else {
        args = statlink["paramfunction"](filterparams);
    }

    var url=null;

    if (typeof (stat["urlfunction"]) == 'undefined') {
        url = stat["url"];
    } else {
        url = stat["urlfunction"](filterparams);
    }
    
    if (url == null) return null;
    
    var link;
    
    if (typeof(stat["post"]) == 'undefined') {
        link = url + statlink["path"] + args;
    } else {
        var temp = "";
       
        for (var paramkey in params) {
            temp = temp + "-" + params[paramkey] + "-" + filterparams[paramkey];
        }
        
        link = "javascript:document.forms.namedItem('" + key + temp + "').submit();";
  
        var form = doc.createElement("form");
        form.name = key + temp;
        form.action = url + statlink["path"];
        form.method = "post";
        form.target = "_stats";
        form.style.display = "none";

        for (var paramkey in params) {
            var input = doc.createElement("input");
            input.type="hidden";
            input.name=params[paramkey];
            input.value=filterparams[paramkey];
            form.appendChild(input);
        }
        
        doc.getElementsByTagName("body")[0].appendChild(form);
        
    }
    
    return link;    
};


Foxtrick.LinkCollection.getLinkElement  = function(link, stat, doc, key, module_name) {

    var statslink = doc.createElement("a");
    if (typeof(stat["post"]) == 'undefined') {
       if (typeof(stat["openinthesamewindow"]) == 'undefined') {
          statslink.target = "_stats";
       }   
    }
    statslink.title = stat.title;
    //statslink.style.verticalAlign = "middle";
    statslink.setAttribute('key',key);
	statslink.setAttribute('module',module_name); 
	
    if (typeof(stat["img"]) == 'undefined') {
        statslink.appendChild(doc.createTextNode(stat.shorttitle));
     } else {
        var img = doc.createElement("img");
        img.alt = stat.title;
        img.title = stat.title;
        img.style.border="0";
		img.src = stat.img;
        statslink.appendChild(img);
    }
    
    statslink.href = link;

    return statslink;        
};

Foxtrick.LinkCollection.getSortedLinks = function(links) {
  function sortfunction(a,b) {
    return a.link.title.localeCompare(b.link.title);
  }
  links.sort(sortfunction);
  return links;
};

