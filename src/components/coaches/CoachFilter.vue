<template>
	<base-card mode="full" color="color">
		<h2>What are you looking for?</h2>
		<div class="filters">
			<span class="filter-option">
				<input
					type="checkbox"
					id="upper"
					checked
					@change="setFilter"
				/>
				<label for="upper">Upper limb equipment</label>
			</span>
			<span class="filter-option">
				<input
					type="checkbox"
					id="lower"
					checked
					@change="setFilter"
				/>
				<label for="lower">Lower limb equipment</label>
			</span>
			<span class="filter-option">
				<input
					type="checkbox"
					id="back"
					checked
					@change="setFilter"
				/>
				<label for="back">Back pain relief</label>
			</span>
		</div>
	</base-card>
</template>

<script>
export default {
	emits: ['change-filter'],
	data() {
		return {
			filters: {
				upper: true,
				lower: true,
				back: true,
			},
		};
	},
	methods: {
		setFilter(event) {
			const inputId = event.target.id;
			const isActive = event.target.checked;
			const updatedFilters = {
				...this.filters,
				[inputId]: isActive,
			};
			this.filters = updatedFilters;
			this.$emit('change-filter', updatedFilters);
		},
	},
};
</script>

<style scoped>
h2 {
	font-size: 3rem;
	margin-bottom: 1rem;
	margin-left: 1rem;
	font-family: var(--font-display);
	font-weight: bold;
	text-align: center;
}

.filters {
	display: flex;
	gap: 1.6rem;
	justify-content: center;

}

.filter-option {
	font-size: 1.5rem;
	padding: 0.75em;
	border-radius: 1.5rem;
}

.filter-option:hover {
	background-color: var(--gray-4);
	color: var(--black);
}

.filter-option label {
	margin-left: 1.2rem;
	user-select: none;
}

.filter-option.active label {
	font-weight: bold;
}

input {
	transform: scale(1.4);
}

@media only screen and (max-width: 600px) {
	.filter-option {
		font-size: 1.6rem;
		padding: 0.55em;
	}

	.filter-option label {
		margin-left: 0.8rem;
		user-select: none;
	}
}
@media only screen and (max-width: 400px) {
	.filter-option {
		font-size: 1.6rem;
		padding: 0.4em;
	}
	input {
		transform: scale(1.2);
	}
}
</style>