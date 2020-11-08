'use strict';

/* eslint-disable */
if (!this.Foxtrick)
	var Foxtrick = {};
/* eslint-enable */

if (!Foxtrick.api)
	Foxtrick.api = {};
if (!Foxtrick.api.pastebin)
	Foxtrick.api.pastebin = {};

/**
 * Global api settings
 * http://pastebin.com/api
 */
Foxtrick.api.pastebin.api_url = 'https://pastebin.com/api/api_post.php';
Foxtrick.api.pastebin.api_login_url = 'https://pastebin.com/api/api_login.php';
Foxtrick.api.pastebin.api_get_url = 'https://pastebin.com/raw.php';
Foxtrick.api.pastebin.api_dev_key = '4c9908e8d8f0cb90d7f7328b499f457c';
Foxtrick.api.pastebin.api_user_key = 'cd224a63147fba48dcd092d4988f2e15';
Foxtrick.api.pastebin.api_paste_private = {
	'public': '0', // unlimited
	'unlisted': '1', // max 25 per day
	'private': '2', // max 10 per day
	// however it seems the anonymous API is limited to 10
};
Foxtrick.api.pastebin.api_paste_expire_date = 'N'; //N=never
Foxtrick.api.pastebin.api_paste_format = 'text';

/**
 * Constructs post parameter String from params object and calls callback function
 * @param	{function}		callback	function to call
 * @param	{Object}		params		specific params for the api (optional)
 */
Foxtrick.api.pastebin._buildParams = function(callback, params) {
	var post = '';
	for (var p in params) {
		post = post ? post + '&' : '';
		post += p + '=' + params[p];
	}
	callback(post);
};

/**
 * Generic low-level function to access Pastebin API
 * Should not be used directly.
 * Executes callback(response);
 * failure(response, status) is called if the request fails
 * finalize(response, status) is always called
 * @param	{String}		api			api name
 * @param	{String}		url			url to call
 * @param	{function}		success		function to execute
 * @param	{Object}		params		specific params for the api (optional)
 * @param	{[Function]}	failure		function to execute (optional)
 * @param	{[Function]}	finalize	function to execute (optional)
 */
Foxtrick.api.pastebin._generic = function(api, url, success, params, failure, finalize) {
	params = params || {};
	Foxtrick.api.pastebin._buildParams(function(params) {
		Foxtrick.util.load.async(url, function(response, status) {
			switch (status) {
				case 0:
					Foxtrick.log('[PASTEBIN_API][' + api + '] Error', status, response);
					break;
				case 200:
					Foxtrick.log('[PASTEBIN_API][' + api + '] Success', status, response);
					break;
				default:
					Foxtrick.log('[PASTEBIN_API][' + api + '] Failure', status, response);
					break;
			}
			if (status == 200 && typeof(success) == 'function')
				success(response);
			else if (typeof(failure) == 'function')
				failure(response, status);
			if (typeof(finalize) == 'function')
				finalize(response, status);
		}, params);
	}, params);
};
