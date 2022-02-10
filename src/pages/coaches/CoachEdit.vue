<template>
	<div v-if="dataReady">
		<section class="row">
			<base-card mode="shadow" color="color">
				<h2>Edit product info</h2>
				<div>id:{{coachId}}</div>
				<CoachForm @save-data="editData" :data-to-edit="dataToEdit"/>
			</base-card>
		</section>
	</div>
	
</template>

<script>
// todo -> add error handling and loading spinner
import CoachForm from '../../components/coaches/CoachForm';
export default {
	components: { CoachForm },
	data(){
		return {
			dataReady: false,
			dataToEdit: null
		};
	},
	computed:{
		coachId(){
			return this.$route.params.id;
		},
		coach(){
			const coaches = this.$store.getters['coaches/coaches'];
			return coaches.find(q => q.id === this.$route.params.id);
		}
	},
	async created(){
		await this.$store.dispatch('coaches/refreshCoach', this.$route.params.id)
		let coaches = this.$store.getters['coaches/coaches'];
			console.debug(typeof coaches);
			console.debug('mounted called');
		let coach = coaches.find(q=>q.id == this.$route.params.id);
		console.debug('Found coach:' + `${JSON.stringify(coach)}`);
		this.dataToEdit = coach;
		this.dataReady = true;
	},
	methods: {
		saveData(data) {
		
			this.$store.dispatch('coaches/registerCoach', data);
			// better than push bcs we cant go back to the page
			this.$router.replace('/coaches');
		},
		editData(data) {
			data['id'] = this.$route.params.id;
			this.$store.dispatch('coaches/editCoach', data);
			// better than push bcs we cant go back to the page
			this.$router.replace('/coaches');
		},
	},
};
</script>


<style scoped>
h2 {
	margin-bottom: 1.6rem;
	color: var(--black);
}
section {
	margin-top: 3.2rem;
}
</style>
