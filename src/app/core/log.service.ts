import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class LogService
{
	public logs: string[] = [];
	
	public add(log: string): void
	{
		this.logs.push(log);
	}
	
	public clear(): void
	{
		this.logs = [];
	}
}
