import { TransactionType } from "@db/models/transactions.model";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTransactionDto {

    @ApiProperty({ example: '1000.00', description: 'The amount of the transaction', type: 'number' })
    @IsNumber()
    @IsOptional()
    amount: number;

    @ApiProperty({ example: 'Payment for services', description: 'The description of the transaction', type: 'string' })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ example: '2023-12-31', description: 'The expiration date of the transaction', type: 'string', format: 'date' })
    @IsDate()
    @IsOptional()
    expirationDate: Date;

    @ApiProperty({ example: true, description: 'Indicates if the transaction is finished', type: 'boolean' })
    @IsOptional()
    @Type(() => String)
    @IsString()
    finished: boolean;

    @ApiProperty({ description: 'The type of the transaction', enum: TransactionType })
    @IsOptional()
    @IsEnum(TransactionType)
    type: TransactionType;


    @ApiProperty({ example: '1000', description: 'The amount of the transaction', type: 'number' })
    @IsNumber()
    userCurrencyId: number;


}
