// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss"],
	css: ["~/assets/main.styl"],
	sourcemap: true,
	runtimeConfig: {
		public: {
			BACKEND_URL: "http://localhost:5000"
		}
	}
});
