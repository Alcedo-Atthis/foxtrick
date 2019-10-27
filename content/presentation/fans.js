/**
 * Add some infos to fans page
 * @author teles
 */

'use strict';

Foxtrick.modules['Fans'] = {
	MODULE_CATEGORY: Foxtrick.moduleCategories.PRESENTATION,
	PAGES: ['fans'],

	OPTIONS: [
		'AddLiveLink',
		'ShowSumFans',
	],

	/**
	 * @param {document} doc
	 */
	run: function(doc) {
		var module = this;

		if (Foxtrick.Prefs.isModuleOptionEnabled('Fans', 'AddLiveLink')) {
			/** @type {NodeListOf<HTMLAnchorElement>} */
			var links = doc.querySelectorAll('#upcoming a[href*="matchID"]');
			Foxtrick.forEach(function(link) {
				var node = Foxtrick.createFeaturedElement(doc, module, 'a');
				node.href = link.href.replace('/Club/Matches/Match.aspx?',
				                              '/Club/Matches/Live.aspx?actionType=addMatch');

				var liveText = Foxtrick.L10n.getString('MyMonitor.htLive');
				Foxtrick.addImage(doc, node, {
					alt: liveText,
					title: liveText,
					src: '/Img/icons/transparent.gif',
					class: 'matchHTLive',
				});

				// eslint-disable-next-line no-extra-parens
				let grandParent = /** @type {Element} */ (link.parentNode.parentNode);
				grandParent.previousElementSibling.appendChild(node);
			}, links);
		}

		if (Foxtrick.Prefs.isModuleOptionEnabled('Fans', 'ShowSumFans')) {
			var main = doc.getElementById('mainBody');
			var fansText = main.getElementsByTagName('td')[1].textContent;
			var fansNow = Foxtrick.trimnum(fansText);

			var nums = doc.querySelectorAll('#members .inc, #members .dec');
			var total = 0;
			Foxtrick.forEach(function(num) {
				var text = num.textContent;
				var n = parseInt(text, 10);
				if (/%/.test(text)) {
					var untilThen = fansNow - total;
					n = Math.round(untilThen / (100 + n) * n);
				}
				total += n;
			}, nums);

			/** @type {HTMLTableElement} */
			var table = doc.querySelector('#members .thin');
			var row = Foxtrick.insertFeaturedRow(table, module, -1);
			Foxtrick.addClass(row, 'ft-bordertop');
			var td1 = doc.createElement('td');
			td1.className = 'date bold';
			td1.textContent = Foxtrick.L10n.getString('TeamStats.Total');
			var td2 = doc.createElement('td');
			td2.className = total > 0 ? 'inc' : 'dec';
			td2.textContent = total > 0 ? '+' + total : total.toString();
			row.appendChild(td1);
			row.appendChild(td2);
		}

	},

};
