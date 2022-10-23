import { writable } from "svelte/store";
import { EndpointClient } from "$lib/core/http/EndpointClient";
import { writableFetch } from "./core/http/WritableFetch";
import type { EndpointDefinition } from "./core/models/EndpointDefinition";

const _endpointClient = new EndpointClient(import.meta.env.VITE_BACKEND_URL);

export const endpointClient = writable<EndpointClient>(_endpointClient);

export const endpointsStore = writableFetch<EndpointDefinition[]>(_endpointClient.getEndpoints.bind(_endpointClient));
