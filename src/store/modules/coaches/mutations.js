export default {
	registerCoach(state, payload) {
		state.coaches.push(payload);
	},
	deleteCoach(state,payload){
		state.coaches = state.coaches.filter(obj => obj.id != payload);
	},
	setCoaches(state, payload) {
		state.coaches = payload;
	},
	setFetchTimestamp(state) {
		state.lastFetch = Date.now();
	}
};
