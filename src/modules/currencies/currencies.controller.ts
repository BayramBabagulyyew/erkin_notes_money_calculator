import { TOKEN_NAME } from '@common/constants';
import { PaginationDto } from '@common/global-dto';
import { PaginationParams, type PaginationRequest } from '@common/libs/pagination';
import { CurrentUser } from '@modules/auth';
import { type JwtPayload } from '@modules/auth/dtos';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Controller('currencies')
@ApiTags('Currencies')
@ApiBearerAuth(TOKEN_NAME)
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) { }

  @Post()
  create(@Body() createCurrencyDto: CreateCurrencyDto, @CurrentUser() user: JwtPayload) {
    return this.currenciesService.create(createCurrencyDto, user);
  }

  @Get()
  findAll(
    @PaginationParams() pagination: PaginationRequest<PaginationDto>,
    @Query() query: PaginationDto
  ) {
    return this.currenciesService.findAll(pagination, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currenciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurrencyDto: CreateCurrencyDto) {
    return this.currenciesService.update(+id, updateCurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currenciesService.remove(+id);
  }
}
