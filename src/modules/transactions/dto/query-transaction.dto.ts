import { PaginationDto } from "@common/global-dto";
import { TransactionType } from "@db/models/transactions.model";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class QueryTransactionDto extends PaginationDto {

    @ApiProperty({ description: 'The starting price of the transaction', type: 'number', required: false, })
    @IsNumber()
    @IsOptional()
    startPrice: number;

    @ApiProperty({ description: 'The ending price of the transaction', type: 'number', required: false, })
    @IsNumber()
    @IsOptional()
    endPrice: number;

    @ApiProperty({ description: 'The expiration date of the transaction', type: 'string', format: 'date', required: false, })
    @IsDate()
    @IsOptional()
    createStartDate: Date;

    @ApiProperty({ description: 'The expiration date of the transaction', type: 'string', format: 'date', required: false, })
    @IsDate()
    @IsOptional()
    createEndDate: Date;

    @ApiProperty({ description: 'The expiration date of the transaction', type: 'string', format: 'date', required: false, })
    @IsDate()
    @IsOptional()
    expirationStartDate: Date;

    @ApiProperty({ description: 'The expiration date of the transaction', type: 'string', format: 'date', required: false, })
    @IsDate()
    @IsOptional()
    expirationEndDate: Date;

    @ApiProperty({ description: 'Indicates if the transaction is finished', type: 'boolean', required: false, })
    @IsOptional()
    @Type(() => String)
    @IsString()
    finished: boolean;

    @ApiProperty({ description: 'The type of the transaction', enum: TransactionType, required: false, })
    @IsOptional()
    @IsEnum(TransactionType)
    type: TransactionType;

    @ApiProperty({ description: 'The amount of the transaction', type: 'number', required: false, })
    @IsNumber()
    @IsOptional()
    userCurrencyId: number;


}
