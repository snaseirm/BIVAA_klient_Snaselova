<template>
	<li>
		<header>
			<a :href="emailLink">{{ email }}</a>
			<span :title="time">{{ date }}</span>
		</header>
		<div>
			<ion-icon name="checkmark-done-outline"></ion-icon>
			<p>{{ message }}</p>
		</div>
	</li>
</template>

<script>
import dayjs from 'dayjs';

export default {
	props: ['email', 'message', 'timestamp'],
	computed: {
		emailLink() {
			return `mailto:${this.email}`;
		},
		date() {
			return dayjs(this.timestamp).format('D MMM YYYY');
		},
		time() {
			return 'at ' + dayjs(this.timestamp).format('HH:mm');
		},
	},
};
</script>

<style scoped>
li {
	border-radius: 2rem;
	padding: 1.6rem;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
		box-shadow: 0rem 0.8rem 4rem var(--gray-3-hover);

}

li:hover {
	border-color: var(--blue);
}

li:hover ion-icon {
	color: var(--blue);
}

header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

header span {
	color: var(--gray-2);
	font-size: 0.9em;
}

a {
	color: var(--black);
	text-decoration: none;
	font-weight: bold;
}

a:hover,
a:active {
	color: var(--blue);
}

div {
	display: flex;
	align-items: center;
}

ion-icon {
	display: block;
	font-size: 3rem;
	margin-right: 1.6rem;
}
</style>