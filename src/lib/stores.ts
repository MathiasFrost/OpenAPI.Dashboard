import { writable } from "svelte/store";
import { EndpointClient } from "$lib/core/http/EndpointClient";
import type { EndpointDefinition } from "./core/models/EndpointDefinition";
import { writableAsync } from "$lib/store/async/WritableAsync";

const _endpointClient = new EndpointClient(import.meta.env.VITE_BACKEND_URL);

export const endpointClient = writable<EndpointClient>(_endpointClient);

export const endpointsStore = writableAsync<EndpointDefinition[]>(_endpointClient.getApiDefinition.bind(_endpointClient));
