export default {
	registerCoach(state, payload) {
		state.coaches.push(payload);
	},
	deleteCoach(state,payload){
		state.coaches = state.coaches.filter(obj => obj.id != payload);
	},
	editCoach(state, payload) {
		console.debug(typeof payload);

		if (!Array.isArray(state.coaches)) {
			state.coaches = [];
		}

		var original = state.coaches.find(obj => obj.id === payload.id);
		let index = state.coaches.findIndex(q => q.id === payload.id);

		if(original == null || original === -1)
		{
			state.coaches.push(payload);
		}
		else {

			let temp = state.coaches;
			temp[index] = payload;
			state.coaches = temp;
		}

	},
	setCoaches(state, payload) {
		state.coaches = payload;
	},
	setFetchTimestamp(state) {
		state.lastFetch = Date.now();
	}
};
