import { Injectable } from '@nestjs/common';
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
    return this.coffees.find((item) => item.id === +id);
  }

  create(coffeeDto: any) {
    this.coffees.push(coffeeDto);
  }

  remove(id: string) {
    const index = this.coffees.findIndex((item) => item.id === +id);
    if (index >= 0) {
      this.coffees.splice(index, 1);
    }
  }
}
