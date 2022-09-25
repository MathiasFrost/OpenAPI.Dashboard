import { Component, OnInit } from "@angular/core";
import { ApiDefinitionService } from "./shared/api-definition.service";
import { EndpointDefinition } from "./shared/endpoint-definition";
import { TypeCode } from "./shared/type-code";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit
{
	public endpoints: EndpointDefinition[] = [];
	
	public constructor(private api: ApiDefinitionService)
	{
	}
	
	public ngOnInit(): void
	{
		this.api.getApiDefinition()
			.subscribe(endpoints => this.endpoints = endpoints);
	}
	
	public getName(typeCode: TypeCode): string
	{
		switch (typeCode)
		{
			case TypeCode.Empty:
				return "void";
			case TypeCode.Object:
				return "object";
			case TypeCode.DBNull:
				return "null";
			case TypeCode.Boolean:
				return "bool";
			case TypeCode.Char:
				return "char";
			case TypeCode.SByte:
				return "sbyte";
			case TypeCode.Byte:
				return "byte";
			case TypeCode.Int16:
				return "short";
			case TypeCode.UInt16:
				return "ushort";
			case TypeCode.Int32:
				return "int";
			case TypeCode.UInt32:
				return "uint";
			case TypeCode.Int64:
				return "long";
			case TypeCode.UInt64:
				return "ulong";
			case TypeCode.Single:
				return "float";
			case TypeCode.Double:
				return "double";
			case TypeCode.Decimal:
				return "decimal";
			case TypeCode.DateTime:
				return "DateTime";
			case TypeCode.String:
				return "string";
		}
	}
}
