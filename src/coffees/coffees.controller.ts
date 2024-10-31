import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly service: CoffeesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
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
  create(@Body() body) {
    return this.service.create(body);
  }

  //   @Patch()
  //   update(@Body() data) {
  //     //
  //   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
