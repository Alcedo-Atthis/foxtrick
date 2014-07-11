'use strict';
/**
 * transfer-compare-players.js
 * Foxtrick Shows a median and average value of price and tsi in transfer compare. Include players' details in table
 * @author bummerland - tasosventouris
 */

Foxtrick.modules['TransferComparePlayers'] = {
	MODULE_CATEGORY: Foxtrick.moduleCategories.INFORMATION_AGGREGATION,
	PAGES: ['transferCompare'],

	run: function(doc) {
		var table = doc.querySelectorAll('#mainBody > table')[0];
		if (!table) return;
		if (table.rows[0].cells.length < 5) return;
		var ownplayer = table.rows[1].cells[0].getElementsByTagName("a")[0];

		var count = table.rows.length;
		var priceArray = [];
		var tsiArray = [];
		for (var i = 5; i < count; i++) {
			if (table.rows[i].cells[0].getElementsByTagName("a")[0] == ownplayer) {
				table.rows[i].style.backgroundColor = "yellow";
			}
			if (table.rows[i].cells[3].textContent.search(/\d/) != -1) {
				var thisPrice = Foxtrick.trimnum(table.rows[i].cells[3].textContent);
				priceArray.push(thisPrice);
			};
			if (table.rows[i].cells[2].textContent.search(/\d/) != -1) {
				var thisPrice = Foxtrick.trimnum(table.rows[i].cells[2].textContent);
				tsiArray.push(thisPrice);
			}
		}

		priceArray.sort(function(a, b) { return a - b; });
		tsiArray.sort(function(a, b) { return a - b; });

		var medianprice = 0;
		var avgprice = 0;
		var mediantsi = 0;
		var avgtsi = 0;

		var len = priceArray.length;
		for (var i = 0; i < priceArray.length; ++i) {
			avgprice = avgprice + priceArray[i];
			avgtsi = avgtsi + tsiArray[i];
		}
		avgprice = Math.round(avgprice / len);
		avgtsi = Math.round(avgtsi / len);

		if (len % 2 == 1) {
			medianprice = Math.round(priceArray[(len - 1) / 2]);
			mediantsi = Math.round(tsiArray[(len - 1) / 2]);
		}
		else {
			medianprice = Math.round((priceArray[(len / 2) - 1] + priceArray[len / 2]) / 2);
			mediantsi = Math.round((tsiArray[(len / 2) - 1] + tsiArray[len / 2]) / 2);
		}

		if (count > 0) {
			var currency = table.rows[5].cells[3].textContent.match(/\D+$/)[0].trim();
			var row = Foxtrick.insertFeaturedRow(table, this, table.rows.length);
			var cell = row.insertCell(0);
			cell.className = 'left bold';
			cell.colSpan = 2;
			cell.textContent = Foxtrick.L10n.getString('MedianTransferPrice.median');
			cell = row.insertCell(1);
			cell.className = 'right bold nowrap';
			cell.colSpan = 1;
			cell.textContent = Foxtrick.formatNumber(mediantsi, '\u00a0');
			cell = row.insertCell(2);
			cell.className = 'right bold nowrap';
			cell.textContent = Foxtrick.formatNumber(medianprice, '\u00a0') + ' ' + currency;
			cell = row.insertCell(3);
			cell.colSpan = 2;

			row = Foxtrick.insertFeaturedRow(table, this, table.rows.length);
			cell = row.insertCell(0);
			cell.className = 'left bold';
			cell.colSpan = 2;
			cell.textContent = Foxtrick.L10n.getString('MedianTransferPrice.average');
			cell = row.insertCell(1);
			cell.className = 'right bold nowrap';
			cell.colSpan = 1;
			cell.textContent = Foxtrick.formatNumber(avgtsi, '\u00a0');
			cell = row.insertCell(2);
			cell.className = 'right bold nowrap';
			cell.textContent = Foxtrick.formatNumber(avgprice, '\u00a0') + ' ' + currency;
			cell = row.insertCell(3);
			cell.colSpan = 2;
		}
	}
};