import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  // NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatCoffeeDto } from './dto/creat-coffee.dto/creat-coffee.dto';
import { UpdateCoffeeDto } from './dto/creat-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private readonly repo: Repository<Coffee>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const coffee = await this.repo.findOne({ where: { id: +id } });
    if (!coffee) {
      throw new HttpException(`item not found`, HttpStatus.NOT_FOUND);
      //throw new NotFoundException(`item not found`);
    }

    return coffee;
  }

  create(coffeeDto: CreatCoffeeDto) {
    const coffee = this.repo.create(coffeeDto);

    return this.repo.save(coffee);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: string, coffeeDto: UpdateCoffeeDto) {
    const coffee = await this.repo.preload({ id: +id, ...coffeeDto });

    if (!coffee) {
      throw new NotFoundException(`coffee #${id} not found`);
    }

    return this.repo.save(coffee);
  }

  async remove(id: string) {
    const coffe = await this.findOne(id);
    return this.repo.remove(coffe);
  }
}
