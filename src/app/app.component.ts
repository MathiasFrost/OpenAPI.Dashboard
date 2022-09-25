import { Component, OnInit } from "@angular/core";
import { EndpointDefinition } from "./endpoints/shared/endpoint-definition";
import { ApiDescriptionService } from "./endpoints/shared/api-description.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit
{
	public endpoints: EndpointDefinition[] = [];
	
	public constructor(private api: ApiDescriptionService)
	{
	}
	
	public ngOnInit(): void
	{
		console.log("test");
		this.api.getApiDefinition()
			.subscribe(endpoints => this.endpoints = endpoints);
	}
}
