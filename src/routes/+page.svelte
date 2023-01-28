<script lang="ts">
    import EndpointTable from "$lib/core/EndpointTable.svelte";
    import type {EndpointDefinition} from "$lib/core/models/EndpointDefinition";
    import Sidebar from "$lib/sidebar/Sidebar.svelte";
    import {onMount} from "svelte";

    let endpoint: EndpointDefinition | null = null;

    onMount(async () => {
		const res = await fetch("http://localhost:5000/WeatherForecast", {redirect: "manual"});
    })
</script>

<section>
    <div class="container-md">
        <h1 class="title">ASP.NET Core API Dashboard</h1>
    </div>
    <EndpointTable bind:endpoint/>
    <Sidebar bind:endpoint/>

    <form action="http://localhost:5000/WeatherForecast">
        <button>go</button>
    </form>
</section>
