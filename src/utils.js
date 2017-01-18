import * as accting from 'accounting';

const Utils = {
	store: function (name, data) {
		if (data) {
			return localStorage.setItem(name, JSON.stringify(data));
		}

		let store = localStorage.getItem(name);
		return (store && JSON.parse(store)) || false;
	},
	storeExists: function (name) {
		let store = localStorage.getItem(name);
		return (store !== undefined && store !== null);
	},
    cleanAndFormatMoney: function(numeric) {
        let cleaned = Math.round(numeric * 100) / 100;
        return accting.formatMoney(cleaned, "$", 2, ",", ".");
    },
    twoDigitRound: function(numeric) {
        return Math.round(numeric * 100) / 100;
    }
};

export default Utils;