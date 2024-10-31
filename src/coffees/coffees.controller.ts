import {
  Body,
  Controller,
  Delete,
  Get,
  // HttpCode,
  // HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  // Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreatCoffeeDto } from './dto/creat-coffee.dto/creat-coffee.dto';
import { UpdateCoffeeDto } from './dto/creat-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly service: CoffeesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  // #Get pagination params by @Query
  //   @Get()
  //   findAll(@Query() paginationQuery) {
  //     const { page, limit } = paginationQuery;
  //     return `retrive page ${page} with size ${limit}`;
  //   }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // passing all params
  //   @Get(':id')
  //   @HttpCode(HttpStatus.OK)
  //   findOne(@Param() params) {
  //     return `find one by id #${params.id}`;
  //   }

  @Post()
  create(@Body() body: CreatCoffeeDto) {
    return this.service.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCoffeeDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
