var accting = require('accounting');

module.exports = {
		store: function (namespace, data) {
			if (data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}

			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || false;
		},
        resetStore: function (namespace) {
			var store = localStorage.setItem(namespace, null);
		},
        cleanAndFormatMoney: function(numeric) {
            var cleaned = Math.round(numeric * 100) / 100;
            return accting.formatMoney(cleaned, "$", 2, ",", ".");
        },
        twoDigitRound: function(numeric) {
            return Math.round(numeric * 100) / 100;
        }
	};