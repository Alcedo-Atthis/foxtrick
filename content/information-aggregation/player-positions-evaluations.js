'use strict';
/**
 * player-positions-evaluation.js
 * Compute and display player evaluation value for each position
 * @author Greblys
 */

if (!Foxtrick)
	var Foxtrick = {};

Foxtrick.modules['PlayerPositionsEvaluations'] = {
	MODULE_CATEGORY: Foxtrick.moduleCategories.INFORMATION_AGGREGATION,
	PAGES: ['playerDetails', 'transferSearchResult', 'players', 'ntPlayers'],
	OPTIONS: [
		'ShowBestPosition', 'Normalised',
		'FormIncluded', 'StaminaIncluded',
		'LoyaltyAndMCBIncluded', 'ExperienceIncluded', 'BruisedIncluded',
	],

	prefMap: {
		experience: 'ExperienceIncluded',
		loyalty: 'LoyaltyAndMCBIncluded',
		form: 'FormIncluded',
		stamina: 'StaminaIncluded',
		bruised: 'BruisedIncluded',
		normalise: 'Normalised',
	},
	getPrefs: function() {
		var prefs = {};
		for (var pref in this.prefMap) {
			prefs[pref] = Foxtrick.Prefs.isModuleOptionEnabled(this, this.prefMap[pref]);
		}
		return prefs;
	},
	setPrefs: function(prefs) {
		var mName = this.MODULE_NAME;
		for (var pref in this.prefMap) {
			Foxtrick.Prefs.setModuleEnableState(mName + '.' + this.prefMap[pref], prefs[pref]);
		}
	},

	insertEvaluationsTable: function(doc, contributions) {
		var feat_div = Foxtrick.createFeaturedElement(doc, this, 'div');
		var entryPoint = doc.getElementById('mainBody');
		var title = doc.createElement('h2');
		title.textContent = Foxtrick.L10n.getString('module.PlayerPositionsEvaluations.title');
		feat_div.appendChild(title);
		var table = doc.createElement('table');
		Foxtrick.addClass(table, 'ft_positions_evaluations_table');
		var tbody = doc.createElement('tbody');

		var tr = doc.createElement('tr');
		var td = doc.createElement('th');
		td.textContent = Foxtrick.L10n.getString('module.PlayerPositionsEvaluations.position');
		tr.appendChild(td);
		td = doc.createElement('th');
		td.textContent =
			Foxtrick.L10n.getString('module.PlayerPositionsEvaluations.contribution');
		tr.appendChild(td);
		tbody.appendChild(tr);

		var sortable = [];
		for (var name in contributions)
			sortable.push([name, contributions[name]]);

		sortable.sort(function(a, b) { return b[1] - a[1]; });

		for (var item in sortable) {
			name = sortable[item][0];
			tr = doc.createElement('tr');
			td = doc.createElement('td');
			td.textContent = Foxtrick.L10n.getString(name + 'Position');
			tr.appendChild(td);
			td = doc.createElement('td');
			td.textContent = contributions[name];
			tr.appendChild(td);
			tbody.appendChild(tr);
		}

		table.appendChild(tbody);
		feat_div.appendChild(table);
		entryPoint.appendChild(feat_div);
	},

	insertBestPosition: function(doc, contributions) {
		var module = this;
		if (Foxtrick.Prefs.isModuleOptionEnabled('PlayerPositionsEvaluations',
		                                         'ShowBestPosition')) {
			if (Foxtrick.Pages.Player.isSenior(doc)) {
				if (!doc.getElementsByClassName('playerInfo').length)
					return;

				// creating the new element
				var panel = Foxtrick.getMBElement(doc, 'pnlplayerInfo');
				var table = panel.querySelector('table');
				var row = Foxtrick.insertFeaturedRow(table, module, table.rows.length);
				Foxtrick.addClass(row, 'ft-best-player-position');
				var title = row.insertCell(0);
				title.textContent = Foxtrick.L10n.getString('BestPlayerPosition.title');
				var bestPositionCell = row.insertCell(1);
				var bestPositionValue = Foxtrick.Pages.Player.getBestPosition(contributions);
				bestPositionCell.textContent =
					Foxtrick.L10n.getString(bestPositionValue.position + 'Position') +
					' (' + bestPositionValue.value.toFixed(2) + ')';

			}
			else if (Foxtrick.isPage(doc, 'transferSearchResult')) {
				var list = Foxtrick.Pages.TransferSearchResults.getPlayerList(doc);
				// filter out players with out skill data (after deadline)
				var transfers = Foxtrick.filter(function(p) {
					return typeof p.bestPositionValue !== 'undefined';
				}, list);
				Foxtrick.forEach(function(p) {
					var table = p.playerNode.querySelector('.transferPlayerSkills table');
					var row = Foxtrick.insertFeaturedRow(table, module, table.rows.length);
					Foxtrick.addClass(row, 'ft-best-player-position');
					var title = row.insertCell(0);
					title.colSpan = '2';
					var b = doc.createElement('strong');
					b.textContent = Foxtrick.L10n.getString('BestPlayerPosition.title');
					title.appendChild(b);
					var bestPositionCell = row.insertCell(1);
					bestPositionCell.colSpan = '2';
					bestPositionCell.textContent = p.bestPositionLong +
						' (' + p.bestPositionValue.toFixed(2) + ')';
				}, transfers);
			}
			else if (Foxtrick.isPage(doc, 'ownPlayers')) {
				var playerList = Foxtrick.Pages.Players.getPlayerList(doc);
				Foxtrick.forEach(function(p) {
					var table = p.playerNode.querySelector('table');
					var container = Foxtrick.createFeaturedElement(doc, module, 'div');
					Foxtrick.addClass(container, 'ft-best-player-position');
					container.textContent = Foxtrick.L10n.getString('BestPlayerPosition.title') +
						' ' + p.bestPositionLong + ' (' + p.bestPositionValue.toFixed(2) + ')';

					var before = table.nextSibling;
					before.parentNode.insertBefore(container, before);
				}, playerList);
			}
		}
	},

	run: function(doc) {
		var module = this;
		if (Foxtrick.Pages.Player.isSenior(doc)) {
			if (Foxtrick.Pages.Player.wasFired(doc))
				return;

			var id = Foxtrick.Pages.Player.getId(doc);
			Foxtrick.Pages.Player.getPlayer(doc, id, function(player) {
				var skills = Foxtrick.Pages.Player.getSkills(doc);
				if (!skills)
					return;
				var contributions = Foxtrick.Pages.Player.getContributions(skills, player);
				module.insertEvaluationsTable(doc, contributions);
				// lets reuse contributions and don't recalculate them for bestPosition
				module.insertBestPosition(doc, contributions);
			});
		}
		else
			module.insertBestPosition(doc, {});
	},
};
