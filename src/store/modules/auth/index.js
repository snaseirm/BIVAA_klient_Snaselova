import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
	state() {
		return {
			userId: null,
			token: null,
			didAutoLogout: false,
			API_KEY: 'AIzaSyCSP2j8VZghqy-W2rWE122HsRj9z-YkNhE'
		};
	},
	mutations,
	actions,
	getters
};
