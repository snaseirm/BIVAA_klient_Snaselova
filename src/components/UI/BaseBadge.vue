<template>
	<span class="badge" :class="type">
		{{ text }}
	</span>
</template>

<script>
export default {
	props: ['type', 'title'],
	computed: {
		text() {
			return this.title.toUpperCase();
		},
	},
};
</script>

<style scoped>
.badge {
	background-color: #ccc;
	color: #252525;
	border-radius: 100rem;
	padding: 0.5em 1.2em;
	display: inline-block;
	margin-right: 0.5rem;
	font-size: 1rem;
	font-weight: bold;
}

.upper {
	background-color: var(--gray-4);
	color: var(--blue);
}

.lower {
	background-color: var(--gray-4);
	color: var(--blue);
}

.back {
	background-color: var(--gray-4);
	color: var(--blue);
}
</style>