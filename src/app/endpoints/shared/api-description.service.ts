import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { EndpointDefinition } from "./endpoint-definition";
import { LogService } from "../../core/log.service";

@Injectable({
	providedIn: "root"
})
export class ApiDescriptionService
{
	private baseUrl: string = "https://localhost:5001/V1/Test";
	
	private httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
	
	public constructor(private http: HttpClient, private log: LogService)
	{
	}
	
	public getApiDefinition(): Observable<EndpointDefinition[]>
	{
		return this.http.get<EndpointDefinition[]>(`${this.baseUrl}/Endpoints`, this.httpOptions)
			.pipe(
				tap(_ => this.log.add("Endpoints fetched")),
				catchError(this.handleError<EndpointDefinition[]>(this.getApiDefinition.name, [])));
	}
	
	private handleError<T>(operation = "operation", result?: T)
	{
		return (error: any): Observable<T> =>
		{
			
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead
			
			// TODO: better job of transforming error for user consumption
			this.log.add(`${operation} failed: ${error.message}`);
			
			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
