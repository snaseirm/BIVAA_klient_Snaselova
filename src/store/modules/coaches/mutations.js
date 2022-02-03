export default {
	registerCoach(state, payload) {
		state.coaches.push(payload);
	},
	deleteCoach(state,payload){
		state.coaches = state.coaches.filter(obj => obj.id != payload);
	},
	editCoach(state, payload) {
		state.coaches.put(payload);
	},
	setCoaches(state, payload) {
		state.coaches = payload;
	},
	setFetchTimestamp(state) {
		state.lastFetch = Date.now();
	}
};
