import { writable } from "svelte/store";
import { EndpointClient } from "$lib/core/http/endpointClient";

export const endpointClient = writable<EndpointClient>(new EndpointClient(import.meta.env.backendUrl));
