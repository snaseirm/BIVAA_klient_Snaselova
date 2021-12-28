<template>
	<div>
		<base-dialog
			:show="!!error"
			title="An error occured"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<div class="row">
			<section>
				<CoachFilter @change-filter="setFilters" />

				<div v-if="isLoading" id="loading">
					<base-spinner></base-spinner>
				</div>
				<ul v-else-if="hasCoaches">
					<CoachItem
						v-for="coach in filteredCoaches"
						:key="coach.id"
						:id="coach.id"
						:first-name="coach.firstName"
						:last-name="coach.lastName"
						:rate="coach.hourlyRate"
						:areas="coach.areas"
					/>
				</ul>
				<h3 v-else>No products found.</h3>

				<base-card mode="flat">
					<div class="controls">
						<base-button mode="flat" @click="loadCoaches(true)"
							>Refresh</base-button
						>
						<base-button mode="flat"
							v-if="!isLoggedIn"
							:to="{
								name: 'auth',
								query: { redirect: 'register' },
							}"
							link
						>
							Login to add a new product
						</base-button>
						<base-button
							v-if="isLoggedIn && !isCoach && !isLoading"
							link
							:to="{ name: 'register' }"
						>
							Add new product
						</base-button>
					</div>
				</base-card>

			</section>
		</div>
	</div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem';
import CoachFilter from '../../components/coaches/CoachFilter';

export default {
	components: {
		CoachItem,
		CoachFilter,
	},
	data() {
		return {
			isLoading: false,
			error: null,
			activeFilters: {
				upper: true,
				lower: true,
				back: true,
			},
		};
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated;
		},
		isCoach() {
			return this.$store.getters['coaches/isCoach'];
		},
		filteredCoaches() {
			const coaches = this.$store.getters['coaches/coaches'];

			const selectedFilters = Object.keys(this.activeFilters).reduce(
				(arr, filter) => {
					this.activeFilters[filter] && arr.push(filter);
					return arr;
				},
				[]
			);

			return coaches.filter((coach) => {
				for (const filter of selectedFilters) {
					if (coach.areas.includes(filter)) {
						return true;
					}
				}
				return false;
			});
		},
		hasCoaches() {
			return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
		},
	},
	methods: {
		setFilters(updatedFilters) {
			this.activeFilters = updatedFilters;
		},
		async loadCoaches(refresh = false) {
			this.isLoading = true;
			try {
				await this.$store.dispatch('coaches/loadCoaches', {
					forceRefresh: refresh,
				});
			} catch (err) {
				this.error = err.message || 'Something went wrong';
			}
			this.isLoading = false;
		},
		handleError() {
			this.error = null;
		},
	},
	created() {
		this.loadCoaches();
	},
};
</script>

<style scoped>
ul {
	list-style: none;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
	gap: 2.4rem;
	justify-content: center;
}

.controls {
	display: flex;
	justify-content: space-between;
	margin-top: 0.8rem;
}

@media only screen and (max-width: 600px) {
	ul {
		grid-template-columns: 1fr;
		gap: 2.4rem;
	}
}

h3 {
	text-align: center;
	margin-top: 2rem;
}

#loading {
	margin-top: 4rem;
}
</style>