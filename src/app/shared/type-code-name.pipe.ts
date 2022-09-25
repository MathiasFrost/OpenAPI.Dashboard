import { Pipe, PipeTransform } from "@angular/core";
import { TypeCode } from "./type-code";
import { TypeDefinition } from "./type-definition";

@Pipe({
	name: "typeName"
})
export class TypeNamePipe implements PipeTransform
{
	transform(value: TypeDefinition, ...args: never[]): string
	{
		let arr = value.isArray ? "[]" : "";
		switch (value.typeCode)
		{
			case TypeCode.Empty:
				return "void" + arr;
			case TypeCode.Object:
				return "object" + arr;
			case TypeCode.DBNull:
				return "null" + arr;
			case TypeCode.Boolean:
				return "bool" + arr;
			case TypeCode.Char:
				return "char" + arr;
			case TypeCode.SByte:
				return "sbyte" + arr;
			case TypeCode.Byte:
				return "byte" + arr;
			case TypeCode.Int16:
				return "short" + arr;
			case TypeCode.UInt16:
				return "ushort" + arr;
			case TypeCode.Int32:
				return "int" + arr;
			case TypeCode.UInt32:
				return "uint" + arr;
			case TypeCode.Int64:
				return "long" + arr;
			case TypeCode.UInt64:
				return "ulong" + arr;
			case TypeCode.Single:
				return "float" + arr;
			case TypeCode.Double:
				return "double" + arr;
			case TypeCode.Decimal:
				return "decimal" + arr;
			case TypeCode.DateTime:
				return "DateTime" + arr;
			case TypeCode.String:
				return "string" + arr;
		}
	}
	
}
