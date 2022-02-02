import axios from 'axios';

export default {
	async registerCoach(context, data) {
		const userId = context.rootGetters.userId;
		const coachData = {
			firstName: data.first,
			lastName: data.last,
			description: data.desc,
			hourlyRate: data.rate,
			areas: data.areas
		};

		const databaseUrl = context.rootGetters.databaseUrl;
		const token = context.rootGetters.token;

		try {

            let response = await axios.post(
                `${databaseUrl}/coaches.json?auth=${token}`,
                coachData
            );

            coachData['id']=response.data.name;
            context.commit('registerCoach', {
                ...coachData,
                id: userId
            });

        } catch (error) {
            console.log(error);
        }
	},

	async editCoach(context, data) {
		const userId = context.rootGetters.userId;
		const coachData = {
			firstName: data.first,
			lastName: data.last,
			description: data.desc,
			hourlyRate: data.rate,
			areas: data.areas
		};

		const databaseUrl = context.rootGetters.databaseUrl;
		const token = context.rootGetters.token;

		try {
            let response = await axios.put(
                `${databaseUrl}/coaches/${coachData.id}.json?auth=${token}`,
                coachData
            );

            coachData['id']=response.data.name;
            context.commit('registerCoach', {
                ...coachData,
                id: userId
            });

        } catch (error) {
            console.log(error);
        }
	},

	async deleteCoach(context, data) {
		const userId = context.rootGetters.userId;
		const coachData = {
			firstName: data.first,
			lastName: data.last,
			description: data.desc,
			hourlyRate: data.rate,
			areas: data.areas
		};

		const databaseUrl = context.rootGetters.databaseUrl;
		const token = context.rootGetters.token;

		try {
			let response = await axios.delete(
                `${databaseUrl}/coaches/${coachData.id}.json?auth=${token}`);

            coachData['id']=response.data.name;
            context.commit('registerCoach', {
                ...coachData,
                id: userId
            });

        } catch (error) {
            console.log(error);
        }
	},

	async loadCoaches(context, payload) {
		// used data already stored if its less than a minute old
		if (!payload.forceRefresh && !context.getters.shouldUpdate) return;

		const databaseUrl = context.rootGetters.databaseUrl;

		try {
			const { data: coachesData } = await axios.get(
				`${databaseUrl}/coaches.json`
			);

			const coaches = [];
			for (const key in coachesData) {
				const coach = {
					id: key,
					firstName: coachesData[key].firstName,
					lastName: coachesData[key].lastName,
					description: coachesData[key].description,
					hourlyRate: coachesData[key].hourlyRate,
					areas: coachesData[key].areas
				};
				coaches.push(coach);

				context.commit('setCoaches', coaches);
				context.commit('setFetchTimestamp');
			}
		} catch (err) {
			console.log(err.response);
			const error = new Error(
				err.response.data.error || 'Failed to fetch'
			);
			throw error;
		}
	}
};
