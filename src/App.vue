<template>
	<TheHeader />
	<router-view v-slot="{ Component }">
		<transition name="route" mode="out-in">
			<component :is="Component"></component>
		</transition>
	</router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader';

export default {
	components: {
		TheHeader,
	},
	computed: {
		didAutoLogout() {
			return this.$store.getters.didAutoLogout;
		},
	},
	created() {
		this.$store.dispatch('tryLogin');
	},
	watch: {
		didAutoLogout(curValue, oldValue) {
			// automatically redirect user if auto logged out
			// if didAutoLogout changes to true
			if (curValue && curValue !== oldValue) {
				this.$router.replace({ name: 'coaches' });
			}
		},
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins');
@import url('https://fonts.googleapis.com/css?family=Playfair+Display');


:root {
	--purple-1: hsl(250, 78%, 75%);
	--purple-2: hsl(250, 26%, 50%);
	--purple-3: hsl(250, 27%, 33%);
	--pink-1: #fd98d0;
	--pink-2: #ece1fc;
	--gray-1: #41463d;
	--gray-2: #6B6B6B;
	--gray-3-hover: #A3A3A3;
	--gray-3: #B5B5B5;
	--gray-4: #E5E5E5;
	--white-1: #fff;
	--white-2: #f4f9f9;
	--black: #000000;
	--blue: #0000ff;

	--font-primary: 'Poppins', sans-serif;
	--font-display: 'Playfair Display', serif;

	--max-width: 144rem;
}

* {
	margin: 0;
	padding: 0;
}

*,
*::before,
*::after {
	box-sizing: inherit;
}

html {
	box-sizing: border-box;
	font-family: var(--font-primary);
	font-size: 62.5%;
	background: var(--white-1);
	overflow-y: overlay;
}

body {
	font-size: 1.6rem;
	color: var(--black);
}

p {
	color: var(--black);
}

section {
	width: 100%;
	margin-top: 2rem;
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

ul {
	list-style: none;
}

button {
	font: inherit;
}

.row {
	max-width: var(--max-width);
	margin-left: auto;
	margin-right: auto;
	padding: 0 1.6rem;
}

a {
	text-decoration: none;
}

.route-enter-from {
	opacity: 0;
	transform: translateY(-30px);
}
.route-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
.route-enter-active {
	transition: all 250ms ease-out;
}
.route-leave-active {
	transition: all 250ms ease-in;
}

body::-webkit-scrollbar {
	width: 4px; /* width of the entire scrollbar */
}

body::-webkit-scrollbar-track {
	background: transparent; /* color of the tracking area */
}

body::-webkit-scrollbar-thumb {
	background-color: var(--gray-2); /* color of the scroll thumb */
	border-radius: 2rem; /* roundness of the scroll thumb */
}
</style>