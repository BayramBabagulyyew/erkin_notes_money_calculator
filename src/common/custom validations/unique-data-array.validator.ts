import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsArrayUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isArrayUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          if (!Array.isArray(value)) {
            return false;
          }
          const uniqueItems = new Set(value);
          return uniqueItems.size === value.length;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must contain unique elements`;
        },
      },
    });
  };
}
