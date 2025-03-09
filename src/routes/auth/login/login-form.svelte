<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div class="login-container">
	<form method="POST" use:enhance class="login-form">
		<h2>Welcome to Humbird!</h2>
		<Form.Field {form} name="email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Email</Form.Label>
					<Input {...props} bind:value={$formData.email} />
				{/snippet}
			</Form.Control>
			<Form.Description>Enter your email.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="password">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Password</Form.Label>
					<Input type="password" {...props} bind:value={$formData.password} />
				{/snippet}
			</Form.Control>
			<Form.Description>Enter your password.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		
		<!-- remember me checkbox -->
		<div class="remember-me">
			<input type="checkbox" id="remember-me" name="remember-me" />
			<label for="remember-me">Remember Me</label>
		</div>

		<Form.Button>Log In</Form.Button>
	</form>
</div>

<style>
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background: url('/forest-background.jpg') no-repeat center center;
		background-size: cover;
	}

	.login-form {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		max-width: 400px;
	}

	h2 {
		text-align: center;
	}

	.remember-me {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.google-login {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		background: white;
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
		width: 100%;
		margin-top: 1rem;
	}

	.google-icon {
		width: 20px;
		height: 20px;
	}
</style>