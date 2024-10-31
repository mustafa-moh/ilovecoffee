import {
  HttpException,
  HttpStatus,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Expresso',
      brand: 'late',
      flavors: ['l1', 'l2'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new HttpException(`item not found`, HttpStatus.NOT_FOUND);
      //throw new NotFoundException(`item not found`);
    }
  }

  create(coffeeDto: any) {
    this.coffees.push(coffeeDto);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, coffeeDto: any) {
    // update
  }

  remove(id: string) {
    const index = this.coffees.findIndex((item) => item.id === +id);
    if (index >= 0) {
      this.coffees.splice(index, 1);
    }
  }
}
