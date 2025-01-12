import { getMetadataStorage } from "../metadata/getMetadataStorage";
import { SymbolKeysNotSupportedError } from "../errors";
import { ParameterDecorator } from "../interfaces/LegacyDecorators";

export function Ctx(propertyName?: string): ParameterDecorator {
  return (prototype, propertyKey, parameterIndex) => {
    if (typeof propertyKey === "symbol") {
      throw new SymbolKeysNotSupportedError();
    }

    getMetadataStorage().collectHandlerParamMetadata({
      kind: "context",
      target: prototype.constructor,
      methodName: propertyKey,
      index: parameterIndex,
      propertyName,
    });
  };
}
