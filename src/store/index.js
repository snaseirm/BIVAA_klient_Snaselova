import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';
import authModule from './modules/auth/index';

const store = createStore({
	modules: {
		coaches: coachesModule,
		requests: requestsModule,
		auth: authModule
	},
	state() {
		return {
			databaseUrl:
				'https://eshop-snaseirm-default-rtdb.firebaseio.com/'
		};
	},
	mutations: {},
	getters: {
		databaseUrl(state) {
			return state.databaseUrl;
		}
	}
});

export default store;
