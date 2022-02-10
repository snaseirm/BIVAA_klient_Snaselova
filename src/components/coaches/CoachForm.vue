<template>
	<form @submit.prevent="submitForm">
		<div class="form-control" :class="styleInvalid(firstName)">
			<label for="firstname">Product name</label>
			<input
				type="text"
				id="firstname"
				v-model.trim="firstName.val"
				@blur="clearValidity(firstName)"
			/>
			<p v-if="!firstName.isValid">Product name must not be empty</p>
		</div>
		<div class="form-control" :class="styleInvalid(lastName)">
			<label for="lastname">Product sub name (optional)</label>
			<input
				type="text"
				id="lastname"
				v-model.trim="lastName.val"
				@blur="clearValidity(lastName)"
			/>
			<p v-if="!lastName.isValid">Product sub name must not be empty</p>
		</div>
		<div class="form-control" :class="styleInvalid(description)">
			<label for="description">Description</label>
			<textarea
				id="description"
				rows="5"
				v-model.trim="description.val"
				@blur="clearValidity(description)"
			/>
			<p v-if="!description.isValid">
				Description name must not be empty
			</p>
		</div>
		<div class="form-control" :class="styleInvalid(rate)">
			<label for="rate">Price (EUR)</label>
			<input
				type="number"
				id="rate"
				v-model.number="rate.val"
				@blur="clearValidity(rate)"
			/>
			<p v-if="!rate.isValid">
				Price must not be empty and be greater than zero
			</p>
		</div>
		<div class="form-control checkboxes" :class="styleInvalid(areas)">
			<h3>Types of products</h3>
			<div>
				<input
					type="checkbox"
					id="upper"
					value="upper"
					v-model="areas.val"
					@blur="clearValidity(areas)"
				/>
				<label for="upper">Upper limb equipment</label>
			</div>
			<div>
				<input
					type="checkbox"
					id="lower"
					value="lower"
					v-model="areas.val"
					@blur="clearValidity(areas)"
				/>
				<label for="lower">Lower limb equipment</label>
			</div>
			<div>
				<input
					type="checkbox"
					id="back"
					value="back"
					v-model="areas.val"
					@blur="clearValidity(areas)"
				/>
				<label for="back">Back pain relief</label>
			</div>
			<p v-if="!areas.isValid">At least one type must be selected.</p>
		</div>
		<p v-if="!formIsValid" class="errors">
			Please fix the above errors and try again
		</p>
		<base-button class="submit-btn">{{saveBtnText()}}</base-button>
	</form>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';
export default {
	emits: ['save-data'],
	props:['dataToEdit'],
	components: { BaseButton },
	data() {
		
		let data = {
			firstName: {
				val: '',
				isValid: true,
			},
			lastName: {
				val: '',
				isValid: true,
			},
			description: {
				val: '',
				isValid: true,
			},
			rate: {
				val: null,
				isValid: true,
			},
			areas: {
				val: [],
				isValid: true,
			},
			formIsValid: true,
		};
		
		console.debug('bbfsdfsdfd')
		console.debug(JSON.stringify(data))
		console.debug(JSON.stringify(this.dataToEdit))
		if (this.dataToEdit != null){
			data.firstName.val = this.dataToEdit.firstName;
			data.lastName.val = this.dataToEdit.lastName;
			data.description.val = this.dataToEdit.description;
			data.rate.val = this.dataToEdit.hourlyRate;
			data.areas.val = this.dataToEdit.areas;
			data['id'] = this.dataToEdit.id;
		}
		console.debug(JSON.stringify(data))
		console.debug('end')
		return data;
	},
	methods: {
		validateForm() {
			this.formIsValid = true;

			if (this.isEmpty(this.firstName.val)) {
				this.firstName.isValid = false;
				this.formIsValid = false;
			}

			if (this.isEmpty(this.description.val)) {
				this.description.isValid = false;
				this.formIsValid = false;
			}
			if (!this.rate.val || this.rate.val < 0) {
				this.rate.isValid = false;
				this.formIsValid = false;
			}
			if (this.areas.val.length === 0) {
				this.areas.isValid = false;
				this.formIsValid = false;
			}
		},
		submitForm() {
			this.validateForm();

			if (!this.formIsValid) return;

			const formData = {
				first: this.firstName.val,
				last: this.lastName.val,
				desc: this.description.val,
				rate: this.rate.val,
				areas: this.areas.val,
			};

			this.$emit('save-data', formData);
		},
		clearValidity(input) {
			input.isValid = true;
		},
		isEmpty(value) {
			return value === '';
		},
		styleInvalid(value) {
			return { invalid: !value.isValid };
		},
		saveBtnText(){
			if(this.id != undefined){
				return 'Save changes';
			}
			else{
				return 'Add product';
			}
		}
	},
};
</script>

<style scoped>
.form-control {
	margin: 1.6rem 0;
}

label {
	font-weight: bold;
	display: block;
	margin-bottom: 0.5rem;
	font-size: 1.4rem;
}

input[type='checkbox'] + label {
	font-weight: bold;
	display: inline;
	margin-left: 1rem;
}

input,
textarea {
	display: block;
	width: 100%;
	border: 0.2rem solid var(--gray-3);
	font: inherit;
	padding: 0.2em 0.4em;
	border-radius: 0.8rem;
}

input:focus,
textarea:focus {
	background-color: var(--white-1);
	outline: none;
	border-color: var(--gray-3-hover);
}

input[type='checkbox'] {
	display: inline-block;
	width: auto;
	border: none;
	transform: scale(1.2);
}

h3 {
	margin: 0.5rem 0;
	font-size: 1.2rem;
	margin-bottom: 1rem;
}

.invalid label {
	color: #d13b3b;
}

.invalid input,
.invalid textarea {
	border-color: #d13b3b;
}

.errors {
	color: #d13b3b;
	font-weight: bold;
}

.invalid input:focus,
.invalid textarea:focus {
	background: #fce2e2;
}

.checkboxes > div {
	margin: 0.5rem 0;
}
.checkboxes {
	margin-bottom: 2.4rem;
}

p {
	margin-top: 0.2em;
	font-size: 1.4rem;
}

.submit-btn {
	margin-top: 0.5rem;
}
</style>
