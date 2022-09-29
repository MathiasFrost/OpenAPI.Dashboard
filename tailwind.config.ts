/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./**/*.vue", "./**/*.styl"], theme: {
		extend: {
			colors: {
				gray: {
					100: "#ffffff",
					200: "#a0a0a0",
					300: "#7e7e7e",
					400: "#606060",
					500: "#323232",
					600: "#292929",
					700: "#252525",
					800: "#0e0e0e",
					900: "#010101"
				}
			}
		}
	}, plugins: []
};

