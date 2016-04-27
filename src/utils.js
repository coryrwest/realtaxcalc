var accting = require('accounting');

module.exports = {
		store: function (name, data) {
			if (data) {
				return localStorage.setItem(name, JSON.stringify(data));
			}

			var store = localStorage.getItem(name);
			return (store && JSON.parse(store)) || false;
		},
		storeExists: function (name) {
			var store = localStorage.getItem(name);
			return (store !== undefined && store !== null);
		},
        cleanAndFormatMoney: function(numeric) {
            var cleaned = Math.round(numeric * 100) / 100;
            return accting.formatMoney(cleaned, "$", 2, ",", ".");
        },
        twoDigitRound: function(numeric) {
            return Math.round(numeric * 100) / 100;
        }
	};