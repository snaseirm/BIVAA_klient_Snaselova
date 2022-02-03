<template>
	<div class="row">
		<section>
			<base-card mode="shadow">
				<h2>{{ fullName }}</h2>
				<base-price :rate="rate"></base-price>
				<div class="badges">
					<base-badge
						v-for="area in areas"
						:key="area"
						:type="area"
						:title="area"
					></base-badge>
				</div>
				<p>{{ description }}</p>
				<header>
					<h3>Are you interested?</h3>
					<base-button link :to="contactLink"> Buy it now </base-button>

					<base-button v-if="isLoggedIn" mode="outline" @click="onEdit" > Edit </base-button>
					<base-button v-if="isLoggedIn" mode="outline" @click="onDelete">Delete</base-button>

				</header>

				<router-view v-slot="{ Component }">
					<transition name="contact" mode="out-in">
						<component :is="Component"></component>
					</transition>
				</router-view>
			</base-card>
		</section>
	</div>
</template>

<script>
export default {
	props: ['id'],
	data() {
		return {
			contactBtnShown: true,
			selectedCoach: null,
		};
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated;
		},

		fullName() {
			return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
		},
		areas() {
			return this.selectedCoach.areas;
		},
		rate() {
			return this.selectedCoach.hourlyRate;
		},
		description() {
			return this.selectedCoach.description;
		},
		contactLink() {
			return {
				name: 'coach-contact',
				params: { id: this.id },
			};
		},
	},

	methods: {
		onDelete(){
			console.debug('OnDelete called');
			this.$store.dispatch('coaches/deleteCoach', this.selectedCoach);
			this.$router.replace('/coaches');
		},
		onEdit(){
			console.debug('OnEdit called');
			this.$store.dispatch('coaches/editCoach', this.selectedCoach);
			this.$router.replace('/coaches');
		}
	},

	created() {
		this.selectedCoach = this.$store.getters['coaches/coaches'].find(
			(coach) => coach.id === this.id
		);
	},
};
</script>

<style scoped>

section:first-of-type {
	margin-top: 3.2rem;
}

.badges {
	margin-top: 1rem;
	margin-bottom: 1rem;
}
h2 {
	margin-bottom: 0.5em;
	color: var(--black);
}

.rate {
	color: var(--black);
}

h3 {
	margin-top: 3rem;
	margin-bottom: 1em;
}

.contact-enter-from {
	opacity: 0;
}

.contact-enter-active {
	transition: all 300ms ease-out;
}
</style>