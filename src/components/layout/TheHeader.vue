<template>
	<div class="row">
		<header>
			<nav>
				<h1>
					<router-link :to="{ name: 'home' }" id="brand-title">
						Medical Equipment e-shop
					</router-link>
				</h1>
				<ul>
					<li>
						<base-button :to="{ name: 'coaches' }" link>
							E-shop
						</base-button>
					</li>
					<li v-if="isLoggedIn">
						<base-button :to="{ name: 'requests' }" link>
							Orders
						</base-button>
					</li>
					<li v-else>
						<base-button :to="{ name: 'auth' }" link>
							Login
						</base-button>
					</li>
					<li v-if="isLoggedIn">
						<base-button @click="logout">Logout</base-button>
					</li>
				</ul>
			</nav>
		</header>
	</div>
</template>

<script>
export default {
	computed: {
		isLoggedIn() {
			return this.$store.getters.isAuthenticated;
		},
	},
	methods: {
		logout() {
			this.$store.dispatch('logout');
			this.$router.replace({ name: 'coaches' });
		},
	},
};
</script>

<style scoped>
header {
	color: var(--white-2);

	max-width: var(--max-width);
	margin-top: 1.2rem;
}

header nav {
	background: var(--blue);
	border-radius: 666rem;
	padding: 3.5rem;

	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

h1 {
	font-family: var(--font-display);
	font-size: 4rem;
	font-weight:900;
}

#brand-title {
	color: var(--white-2);
	font-weight: normal;
	padding: 1rem;
}

a:active,
a:hover {
	color: var(--white);
	background-color: var(--black);
}

a.router-link-active {
	color: var(--blue);
	background-color: var(--white-1);
}


h1 a:hover,
h1 a:active,
h1 a.router-link-active {
	border-color: transparent;
	color: inherit;
	background: none;
}

header ul {
	list-style: none;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
}

@media only screen and (max-width: 600px) {
	header a,
	logout-btn {
		padding: 0.5em;
		font-size: 0.9em;
	}
	li {
		margin: 0 0.2rem;
	}
}
</style>