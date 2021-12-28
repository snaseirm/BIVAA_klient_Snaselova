<template>
	<button v-if="!link" :class="mode">
		<slot></slot>
	</button>
	<router-link v-else :to="to" :class="mode">
		<slot></slot>
	</router-link>
</template>

<script>
export default {
	props: {
		mode: {
			type: String,
			required: false,
			default: null,
		},
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		to: {
			type: Object,
			required: false,
			default: () => {
				'home';
			},
		},
	},
};
</script>
<style scoped>
button,
a {
	text-decoration: none;
	padding: 0.5em 1em;
	font-size: 1.4rem;
	font-family: var(--font-primary);
	color: var(--white-1);
	background-color: var(--blue);
	border: 0.2rem solid transparent;
	color: var(--white-2);
	cursor: pointer;
	border-radius: 1.5rem;
	display: inline-block;
	transition: all 200ms ease;
}

a:hover,
a:active,
button:hover,
button:active {
	background-color: var(--black);
}

.white {
	background-color: var(--white-1);
	border-color: transparent;
	color: var(--blue);
	text-decoration: none;
}

.flat {
	background-color: transparent;
	border-color: transparent;
	color: var(--gray-2);
	text-decoration: none;
}

.outline {
	background-color: var(--white-1);
	color: var(--blue);
	border-color: var(--blue);
}

.flat:hover,
.flat:active {
	background-color: var(--gray-4);
	color: var(--gray-2);
	border-color: transparent;
}

.outline:hover,
.outline:active {
	background-color: var(--black);
	border-color: var(--black);
	color: var(--white-1);
}
</style>