<script>
	export let name;
	export let getData
	let dowmloadLinks = []
	getData().then(d => dowmloadLinks = d)
</script>

<main>
	<ul>
		{#each dowmloadLinks as downloadLink}
			<li><a href={downloadLink.url}>{downloadLink.display_name}</a></li>
		{/each}
	</ul>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>