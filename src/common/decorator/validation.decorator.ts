import { Transform } from '@nestjs/class-transformer';
import { IsNotEmpty } from '@nestjs/class-validator';
import { applyDecorators } from '@nestjs/common';

export function IsNotEmptyTypeCast(
  constructor:
    | BigIntConstructor
    | StringConstructor
    | NumberConstructor
    | DateConstructor,
) {
  return applyDecorators(
    IsNotEmpty(),
    Transform(({ value }) =>
      value instanceof Array
        ? value.map((v) => constructor(v))
        : constructor(value),
    ),
  );
}
