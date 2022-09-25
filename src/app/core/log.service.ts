import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class LogService
{
	public logs: string[] = [];
	
	public add(log: string): void
	{
		console.log(log);
		this.logs.push(log);
	}
	
	public clear(): void
	{
		console.log("Logs cleared");
		this.logs = [];
	}
}
