import type { LayoutServerLoad } from "./$types"

export const load = (async () => {
	return {
		title: "dxdns"
	}
}) satisfies LayoutServerLoad
