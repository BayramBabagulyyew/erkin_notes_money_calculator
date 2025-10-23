import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCurrencyDto {

    @ApiProperty({ required: true, description: 'Currency code, e.g. USD, EUR', example: 'USD' })
    @IsString()
    name: string;
}
