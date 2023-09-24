<script lang="ts">
	import Alert from '$core/classes/Alert';
	import UserController from '$features/accountManager/infrastructure/controllers/UserController';

	const prueba = async () => {
		try {
			await UserController.prueba();
		} catch (error) {
			Alert.error(error);
		}
	};
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button class="btn btn-sm btn-primary" on:click={prueba}>Test</button>
