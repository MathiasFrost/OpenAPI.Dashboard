export enum TypeCode
{
	Empty = 0,          // Null reference
	Object = 1,         // Instance that isn't a value
	DBNull = 2,         // Database null value
	Boolean = 3,        // Boolean
	Char = 4,           // Unicode character
	SByte = 5,          // Signed 8-bit integer
	Byte = 6,           // Unsigned 8-bit integer
	Int16 = 7,          // Signed 16-bit integer
	UInt16 = 8,         // Unsigned 16-bit integer
	Int32 = 9,          // Signed 32-bit integer
	UInt32 = 10,        // Unsigned 32-bit integer
	Int64 = 11,         // Signed 64-bit integer
	UInt64 = 12,        // Unsigned 64-bit integer
	Single = 13,        // IEEE 32-bit float
	Double = 14,        // IEEE 64-bit double
	Decimal = 15,       // Decimal
	DateTime = 16,      // DateTime
	String = 18,        // Unicode character
}

export function getTypeName(typeCode: TypeCode): string
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
