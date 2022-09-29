<template>
	<div>
		<Head>
			<Title>Personal Website</Title>
			<Meta content="Mathias Amandus Andvik Løken - Personal website" name="description" />
			<Meta lang="en" />
		</Head>
		
		<NuxtLayout name="standard">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style lang="stylus">
@require "assets/variables.styl";

body
	margin: 0;
	background-color: primary;
	color: lightest;

h1
	font-family: Arial, sans-serif;
	font-weight: 200;
	letter-spacing: 0.1rem;
</style>
