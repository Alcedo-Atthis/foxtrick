"use strict";
/**
 * api.js
 * Proxy for authorizing and retrieving XML data from Hattrick
 * @author ryanli
 */

if (!Foxtrick)
	var Foxtrick = {};
if (!Foxtrick.util)
	Foxtrick.util = {};

Foxtrick.util.api = {
	consumerKey : "sKDixHQBSGgdJ3a9O6lRtL",
	consumerSecret : "DIZIDBTX64d0+-9fPq8GrYN5PNHtMxYhpS9ZKsbcPqf",

	signatureMethod : "HMAC-SHA1",
	requestTokenUrl : "https://chpp.hattrick.org/oauth/request_token.ashx",
	authorizeUrl : "https://chpp.hattrick.org/oauth/authorize.aspx",
	accessTokenUrl : "https://chpp.hattrick.org/oauth/access_token.ashx",
	resourceUrl : "http://chpp.hattrick.org/chppxml.ashx",

	// map of requested and unprocessed urls {serialized url : true}
	queue: {},

	authorized : function() {
		return Foxtrick.util.api.getAccessToken()
			&& Foxtrick.util.api.getAccessTokenSecret();
	},

	authorize : function(doc) {
		var div = doc.createElement("div");
		var accessor = {
			consumerSecret : Foxtrick.util.api.consumerSecret,
			tokenSecret : null
		};
		var msg = {
			action : Foxtrick.util.api.requestTokenUrl,
			method : "get",
			parameters : [
				["oauth_consumer_key", Foxtrick.util.api.consumerKey],
				["oauth_signature_method", Foxtrick.util.api.signatureMethod],
				["oauth_signature", ""],
				["oauth_timestamp", ""],
				["oauth_nonce", ""],
				["oauth_callback", "oob"] // no callback
			]
		};
		Foxtrick.OAuth.setTimestampAndNonce(msg);
		Foxtrick.OAuth.SignatureMethod.sign(msg, accessor);
		var requestTokenUrl = Foxtrick.OAuth.addToURL(Foxtrick.util.api.requestTokenUrl, msg.parameters);
		var link = doc.createElement("a");
		link.className = "ft-link";
		link.textContent = Foxtrickl10n.getString("oauth.authorize");
		link.addEventListener("click", function(ev) {
			showNotice();
			var linkPar = doc.createElement("p");
			div.appendChild(linkPar);
			linkPar.appendChild(Foxtrick.util.note.createLoading(doc, true));
			Foxtrick.log("Requesting token at: ", Foxtrick.util.api.stripToken(requestTokenUrl) );
			Foxtrick.load(requestTokenUrl, function(text, status) {
				linkPar.textContent = ""; // clear linkPar first
				if (status != 200) {
					// failed to fetch link
					linkPar.textContent = Foxtrick.util.api.getErrorText(text, status) ;
					return;
				}
				var requestToken = text.split(/&/)[0].split(/=/)[1];
				var requestTokenSecret = text.split(/&/)[1].split(/=/)[1];
				// link
				var link = doc.createElement("a");
				link.title = link.href = Foxtrick.util.api.authorizeUrl + "?" + text;
				link.textContent = Foxtrickl10n.getString("oauth.link");
				link.target = "_blank";
				linkPar.appendChild(link);
				// input
				var inputPar = doc.createElement("p");
				div.appendChild(inputPar);
				var input = doc.createElement("input");
				inputPar.appendChild(input);
				var button = doc.createElement("input");
				button.type = "button";
				button.value = Foxtrickl10n.getString("button.authorize");
				button.addEventListener("click", function(ev) {
					var accessor = {
						consumerSecret : Foxtrick.util.api.consumerSecret,
						tokenSecret : requestTokenSecret
					};
					var msg = {
						action : Foxtrick.util.api.accessTokenUrl,
						method : "get",
						parameters : [
							["oauth_consumer_key", Foxtrick.util.api.consumerKey],
							["oauth_token", requestToken],
							["oauth_signature_method", Foxtrick.util.api.signatureMethod],
							["oauth_signature", ""],
							["oauth_timestamp", ""],
							["oauth_nonce", ""],
							["oauth_verifier", input.value]
						]
					};
					Foxtrick.OAuth.setTimestampAndNonce(msg);
					Foxtrick.OAuth.SignatureMethod.sign(msg, accessor);
					var query = Foxtrick.OAuth.formEncode(msg.parameters);
					var accessTokenUrl = Foxtrick.util.api.accessTokenUrl + "?" + query;
					Foxtrick.log("Requesting access token at: ",  Foxtrick.util.api.stripToken(accessTokenUrl));
					Foxtrick.load(accessTokenUrl, function(text, status) {
						if (status != 200) {
							// failed to fetch link
							showFinished( Foxtrick.util.api.getErrorText(text, status) );
							return;
						}
						var accessToken = text.split(/&/)[0].split(/=/)[1];
						var accessTokenSecret = text.split(/&/)[1].split(/=/)[1];
						Foxtrick.util.api.setAccessToken(accessToken);
						Foxtrick.util.api.setAccessTokenSecret(accessTokenSecret);
						showFinished();
					}, true); // save token and secret
				}, false); // after hitting "authorize" button
				inputPar.appendChild(button);
			}, true); // get authorize URL with Foxtrick.load()
		}, false); // initial authorize link event listener
		div.appendChild(link);
		var showNotice = function() {
			div.removeChild(link);
			var notice = doc.createElement("p");
			var paragraphs = Foxtrickl10n.getString("oauth.instructions").split(/\n/);
			for (var i = 0; i < paragraphs.length; ++i) {
				notice.appendChild(doc.createTextNode(paragraphs[i]));
				if (i != paragraphs.length - 1)
					notice.appendChild(doc.createElement("br"));
			}
			div.appendChild(notice);
			// link to FAQ
			var more = doc.createElement("a");
			more.textContent = Foxtrickl10n.getString("oauth.why");
			more.href = 'javascript:void();'
			more.addEventListener('click', function() {FoxtrickPrefs.show('#faq=authorize');}, false);
			div.appendChild(more);
		};
		var showFinished = function(text) {
			if (!text) div.textContent = Foxtrickl10n.getString("oauth.success");
			else div.textContent = text;
		}
		Foxtrick.util.note.add(doc, null, "ft-api-proxy-auth", div, null,
			false, false, false);
	},


	// used to change expire date of xml_cache eg for to my_monitors nextmachtdate
	setCacheLifetime : function(doc, parameters_str, cache_lifetime) {
		var xml_cache = Foxtrick.sessionGet('xml_cache.'+parameters_str);
		Foxtrick.sessionSet('xml_cache.'+parameters_str,
							{ xml_string:xml_cache.xml_string, cache_lifetime : cache_lifetime })
	},

	clearCache : function (ev) {
		try {
			var doc = ev.target.ownerDocument;
			Foxtrick.sessionDeleteBranch('xml_cache');
			doc.location.reload();
		} catch (e) {Foxtrick.log(e);}
	},

	// options: {cache:'session' or 'default' or timestamp}
	// session: take xml from this session. xml doesn't expire
	// default: currently 1 hour, see bellow
	// timestamp: time in milliseconds since 1970 when a new xml will get retrieved
	retrieve : function(doc, parameters, options, callback) {
		if (!FoxtrickPrefs.getBool("xmlLoad")) {
			Foxtrick.log("XML loading disabled");
			callback(null);
			return;
		}

		var httime = doc.getElementById("time").textContent;
		try {
			var HT_date = Foxtrick.util.time.getDateFromText(httime).getTime();
		} catch(e) { // no httime yet.we have been to fast. lets put us 1 day in the future
			Foxtrick.log('no httime yet');
			var HT_date = (new Date()).getTime()+24*60*60*1000;
		}

		var parameters_str = JSON.stringify(parameters);
		var xml_cache = Foxtrick.sessionGet('xml_cache.'+parameters_str);
		if (xml_cache) Foxtrick.log("ApiProxy: options: ",options,
								'  cache_lifetime: ',(new Date(xml_cache.cache_lifetime)).toString(),
								'  current timestamp: ',(new Date(HT_date)).toString());

		// check cache first
		if (xml_cache && xml_cache.xml_string && options
				&& 	(  options.cache_lifetime=='session'
					|| (Number(xml_cache.cache_lifetime) > HT_date ))) {
			Foxtrick.log('ApiProxy: use cached xml: ' ,parameters_str);

			// add clear cache link
			var bottom = doc.getElementById('bottom');
			if (bottom) {
				var clear_cache_span = doc.getElementById('ft_clear_cache');
				// don't add twice
				if (!clear_cache_span) {
					clear_cache_span = doc.createElement('span');
					clear_cache_span.id='ft_clear_cache';
					clear_cache_span.textContent = Foxtrickl10n.getString('action.clearCache');
					clear_cache_span.title = Foxtrickl10n.getString('action.clearCache.title');
					clear_cache_span.addEventListener('click',Foxtrick.util.api.clearCache,false);
					bottom.insertBefore(clear_cache_span, bottom.firstChild);
				}
			}

			var parser = new window.DOMParser();
			try {
				callback (parser.parseFromString( JSON.parse(xml_cache.xml_string), "text/xml"));
			} catch (e) {
				Foxtrick.log('ApiProxy: uncaught callback error: ',e);
			}
		}
		else {
			// add to or create queue
			if ( typeof(Foxtrick.util.api.queue[parameters_str])!=='undefined' ) {
				Foxtrick.util.api.queue[parameters_str].push(callback);
				return;
			}
			else {
				Foxtrick.util.api.queue[parameters_str] = [];
				Foxtrick.util.api.queue[parameters_str].push(callback);
			}

			// process queued requested
			var process_queued = function(x, status) {
				var errorText = null;
				if (x == null) 
					errorText = Foxtrickl10n.getString("api.failure");
				if (status == 503) 
					errorText = Foxtrickl10n.getString("api.serverUnavailable");
					
				for (var i=0; i< Foxtrick.util.api.queue[parameters_str].length; ++i)
					Foxtrick.util.api.queue[parameters_str][i](x, errorText);
				delete (Foxtrick.util.api.queue[parameters_str]);
			};

			// determine cache liftime
			if (options && options.cache_lifetime) {
				if (options.cache_lifetime=='default') var cache_lifetime = HT_date+60*60*1000;  //= 1 hour
				else var cache_lifetime = options.cache_lifetime;
			}
			else var cache_lifetime = 0;

			try {
				Foxtrick.log("ApiProxy: attempting to retrieve: ", parameters, "…");

				if (!Foxtrick.util.api.authorized()) {
					Foxtrick.log("ApiProxy: unauthorized.");
					Foxtrick.util.api.authorize(doc);
					process_queued(null,0);
					return;
				}

				var accessor = {
					consumerSecret : Foxtrick.util.api.consumerSecret,
					tokenSecret : Foxtrick.util.api.getAccessTokenSecret()
				};
				var msg = {
					action : Foxtrick.util.api.resourceUrl,
					method : "get",
					parameters : parameters
				};
				Foxtrick.OAuth.setParameters(msg, [
					["oauth_consumer_key", Foxtrick.util.api.consumerKey],
					["oauth_token", Foxtrick.util.api.getAccessToken()],
					["oauth_signature_method", Foxtrick.util.api.signatureMethod],
					["oauth_signature", ""],
					["oauth_timestamp", ""],
					["oauth_nonce", ""],
				]);
				Foxtrick.OAuth.setTimestampAndNonce(msg);
				Foxtrick.OAuth.SignatureMethod.sign(msg, accessor);
				var url = Foxtrick.OAuth.addToURL(Foxtrick.util.api.resourceUrl, msg.parameters);
				Foxtrick.log("Fetching XML data from ",  Foxtrick.util.api.stripToken(url));
				Foxtrick.loadXml(url, function(x, status) {
					if (status == 200) {
						var serializer = new window.XMLSerializer();
						Foxtrick.sessionSet('xml_cache.'+parameters_str,
											{ xml_string : JSON.stringify(serializer.serializeToString(x)),
											cache_lifetime:cache_lifetime });
						try {
							process_queued(x, status);
						} catch (e) {
							Foxtrick.log('ApiProxy: uncaught callback error: ',e);
						}
					}
					else if (status == 401 || (Foxtrick.platform == "Opera" && status==0) ) { // opera hotfix. returned status not correct
						Foxtrick.log("ApiProxy: error 401, unauthorized. Arguments: ", parameters);
						Foxtrick.util.api.invalidateAccessToken(doc);
						Foxtrick.util.api.authorize(doc);
						process_queued(null, 401);
					}
					else {
						Foxtrick.log("ApiProxy: error ", Foxtrick.util.api.getErrorText(x, status) ,
									". Arguments: ", Foxtrick.filter(function(p) {
														return (p[0]!='oauth_consumer_key'
																&& p[0]!='oauth_token'
																&& p[0]!='oauth_signature');
													}, parameters));
						process_queued(null, status);
					}
				}, true);
			} catch(e){
				Foxtrick.log(e);
				process_queued(null, 0);
			}
		}
	},

	// batchParameters: array of parameters for retrieve function
	// returns array of xml docs with matching indices
	// still better to later identify xmls by content, not by index
	batchRetrieve : function(doc, batchParameters, options, callback) {
		if (!FoxtrickPrefs.getBool("xmlLoad")) {
			Foxtrick.log("XML loading disabled");
			callback(null);
			return;
		}
		var index = 0, responses = [];
		var processSingle = function(last_response, errorText){
			// collect responses
			if (index != 0) 
				responses.push( last_response );
			// return if finished
			if (index == batchParameters.length) 
				callback(responses, errorText);
			else
				// load next file
				Foxtrick.util.api.retrieve(doc, batchParameters[index++], options, processSingle)
		};
		processSingle();
	},
	
	invalidateAccessToken : function() {
		Foxtrick.util.api.setAccessToken("");
		Foxtrick.util.api.setAccessTokenSecret("");
	},

	getAccessToken : function() {
		var teamId = Foxtrick.util.id.getOwnTeamId();
		return FoxtrickPrefs.getString("oauth." + teamId + ".accessToken");
	},

	setAccessToken : function(token) {
		var teamId = Foxtrick.util.id.getOwnTeamId();
		FoxtrickPrefs.setString("oauth." + teamId + ".accessToken", token);
	},

	getAccessTokenSecret : function() {
		var teamId = Foxtrick.util.id.getOwnTeamId();
		return FoxtrickPrefs.getString("oauth." + teamId + ".accessTokenSecret");
	},

	setAccessTokenSecret : function(secret) {
		var teamId = Foxtrick.util.id.getOwnTeamId();
		FoxtrickPrefs.setString("oauth." + teamId + ".accessTokenSecret", secret);
	},

	stripToken : function(url) {
		return url.substr(0,url.search('oauth_consumer_key')-1);
	},

	getErrorText : function(text, status) {
		try {
			var xml = Foxtrick.parseXml(text);
			var errorText = xml.getElementsByTagName("h2")[0].textContent;
		}
		catch (e) {
			var errorText = Foxtrickl10n.getString("exception.error").replace(/%s/, status);
		}
		return errorText;
	}
};
