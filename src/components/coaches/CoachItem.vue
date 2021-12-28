<template>
	<base-card mode="shadow">
		<li>
			<h3>{{ fullName }}</h3>
			<div class="price">
			<base-price :rate="rate"></base-price>
			</div>
			<div class="badge">
				<base-badge
					v-for="area in areas"
					:key="area"
					:type="area"
					:title="area"
				></base-badge>
			</div>
			<div class="actions">
				<base-button mode="outline" link :to="coachDetailsLink">
					View Details
				</base-button>
				<base-button link :to="coachContactLink">
					Buy Product
				</base-button>
			</div>
		</li>
	</base-card>
</template>

<script>
export default {
	props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
	computed: {
		fullName() {
			return `${this.firstName} ${this.lastName}`;
		},
		coachContactLink() {
			// return `${this.$route.path}/${this.id}/contact`;
			return {
				name: 'coach-contact',
				params: { id: this.id },
			};
		},
		coachDetailsLink() {
			return {
				name: 'coach-profile',
				params: { id: this.id },
			};
		},
	},
};
</script>

<style scoped>
.card:hover {
	box-shadow: 0rem 0.4rem 2rem var(--gray-3-hover);
	transition: all 150ms ease-out;
}

li {
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.4em;
}

h3 {
	font-size: 2.4rem;
	text-align: center;
	color: var(--black);
	font-family: var(--font-primary);
	font-weight: bold;
}

.actions {
	margin-top: auto;
	padding-top: 1.6rem;
	display: flex;
	justify-content: center;
	gap: 1.6rem;
}

.badge { 
	margin-top: auto;
	display: flex;
	justify-content: center;
}

.price { 
	margin-top: auto;
	display: flex;
	justify-content: center;
}

</style>