export interface HTTPConfig {
	headers: Headers;
}

export function defaultHTTPConfig(): HTTPConfig {
	return {
		headers: new Headers()
	};
}

export default function () {
	const config = ref<HTTPConfig>(defaultHTTPConfig());
	onUnmounted(() => {
		const str = window.localStorage.getItem("http_config");
		if (!str) {
			return;
		}
		config.value = JSON.parse(str) as HTTPConfig;
	});
	return useState("foo", () => config);
}
