import { TOKEN_NAME } from '@common/constants';
import { PaginationParams, type PaginationRequest } from '@common/libs/pagination';
import { CurrentUser } from '@modules/auth';
import { type JwtPayload } from '@modules/auth/dtos';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { QueryTransactionDto } from './dto/query-transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiBearerAuth(TOKEN_NAME)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
    @PaginationParams() pagination: PaginationRequest<QueryTransactionDto>,
    @Query() query: QueryTransactionDto
  ) {
    return this.transactionsService.findAll(pagination, query, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: CreateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Patch('complete/:id')
  completed(@Param('id') id: string) {
    return this.transactionsService.completed(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
