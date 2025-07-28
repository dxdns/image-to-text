<script lang="ts">
	import apiService from "@/services/apiService.js"
	import { Button, FileInput, Textarea } from "@dxdns/feflow-svelte"

	let { data } = $props()

	const api = apiService()

	let isLoading = $state(false)
	let texts = $state([])

	async function handleChange(files: File[]) {
		try {
			isLoading = true
			texts = []
			const formData = new FormData()
			formData.append("file", files[0])
			const response = await api.imageToText(formData)
			if (!response.ok) throw new Error("error")
			const obj = await response.json()
			texts = obj.texts
		} finally {
			isLoading = false
		}
	}
</script>

<svelte:head>
	<title>Image to text | {data.title}</title>
	<meta name="description" content="Convert image to text. PNG | JPG to text" />
</svelte:head>

<div class="container">
	<h1>Image to text</h1>

	<FileInput accept="image/*" onDropEvent={handleChange}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 -960 960 960"
			style="
			display: inline-block; 
			vertical-align: middle; 
			fill: currentColor;
			height: 50px;
			width: 50px;
			"
		>
			<path
				d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z"
			/>
		</svg>
		<p>Drag and drop</p>
		<p>or</p>
		<Button {isLoading} title="browse file" variant="outlined">
			Choose file
		</Button>
	</FileInput>

	{#if texts.length > 0}
		<Textarea
			id="text-output"
			value={texts.join("").trim()}
			style="min-height: 150px;"
			readonly
		/>
	{/if}
</div>

<style>
	.container {
		width: 500px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media screen and (max-width: 768px) {
		.container {
			width: 100%;
		}
	}
</style>
