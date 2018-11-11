/** players-youth-skills.js
 * Functions working the HY playersYouthSkills API supplied by HY.
 * @author LA-MJ, HY backend/API by MackShot
 *
 * @Interface:
 * 		Url: https://www.hattrick-youthclub.org/_data_provider/foxtrick/playersYouthSkills
 * @params:
 *		//params send via http 'POST'
 * 		teamId: teamId
 * 		app: foxtrick
 *		hash: sha1/md5/base64 of 'foxtrick_'  + teamId
 * @response
 *		JSON:
 *			{
 *				$playerId: {
 *					speciality: @integer, // HY TYPO
 *					skills: {
 *						$skill_id: {
 *							cap: @float,
 *							current: @float,
 *							maxed: @boolean,
 *							cap_minimal: @float,
 *							cap_maximal: @float,
 *							current_estimation: @float,
 *							top3: @boolean
 *						},
 *						...
 *					}
 *				},
 *				...
 *			}
 * $playerId: @integer
 * $skill_id: @integer, c.f. Foxtrick.api.hy.skillMap
 * current = current skill level
 * current_estimation = predicted current skill level when current not available
 * cap = the cap of this skill
 * cap_minimal = minimal cap
 * cap_maximal = maximal cap (from top3)
 * maxed = whether the skill is fully maxed out or not
 * top3 = whether skill is among the 3 with highest potential (mentioned in scout report)
 */

'use strict';

/* eslint-disable */
if (!Foxtrick)
	var Foxtrick = {};
/* eslint-enable */

if (!Foxtrick.api)
	Foxtrick.api = {};
if (!Foxtrick.api.hy)
	Foxtrick.api.hy = {};
if (!Foxtrick.api.hy.URL)
	Foxtrick.api.hy.URL = {};

Foxtrick.api.hy.URL.playersYouthSkills = 'https://www.hattrick-youthclub.org' +
	'/_data_provider/foxtrick/playersYouthSkills';

// this maps HY skill-id to skill
Foxtrick.api.hy.skillMap = {
	3: 'playmaking',
	4: 'winger',
	5: 'scoring',
	6: 'keeper',
	7: 'passing',
	8: 'defending',
	9: 'setPieces',
	10: 'experience',
};

/**
 * Low-level function to access HY's API. Should not be used directly
 * Tries to fetch the youth skills from HY and executes callback(players);
 * failure() is called if the request fails
 * finalize() is always called
 * @param	{function}		callback	function to execute
 * @param	{string}		params		specific params for the api = null
 * @param	{[Function]}	failure		function to execute (optional)
 * @param	{[Function]}	finalize	function to execute (optional)
 * @param	{[integer]}		teamId		senior team ID to fetch data for (optional)
 */
Foxtrick.api.hy._fetchYouthSkills = function(callback, params, failure, finalize, teamId) {
	this._fetchGeneric('playersYouthSkills', callback, params, failure, finalize, teamId);
};

/**
 * A localStore wrapper for _fetchYouthSkills
 * Gets youth skills and executes callback(players);
 * failure() is called if the request fails
 * finalize() is always called
 * @param	{function}		callback	function to execute
 * @param	{[Function]}	failure		function to execute (optional)
 * @param	{[Function]}	finalize	function to execute (optional)
 * @param	{[integer]}		teamId		senior team ID to fetch data for (optional)
 */
Foxtrick.api.hy.getYouthSkills = function(callback, failure, finalize, teamId) {
	let days = Foxtrick.util.time.DAYS_IN_WEEK;
	let api = Foxtrick.api.hy;
	api._fetchViaCache(days, 'playersYouthSkills', null, this._fetchYouthSkills, callback,
	                   failure, finalize, teamId);
};
