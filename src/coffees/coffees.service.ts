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
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee) private readonly repo: Repository<Coffee>,
    @InjectRepository(Flavor) private readonly flavorRepo: Repository<Flavor>,
  ) {
    // repo = datasource.getRepository(Coffee)
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.repo.find({
      relations: { flavors: true },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.repo.findOne({
      where: { id: +id },
      relations: { flavors: true },
    });
    if (!coffee) {
      throw new HttpException(`item not found`, HttpStatus.NOT_FOUND);
      //throw new NotFoundException(`item not found`);
    }

    return coffee;
  }

  async create(coffeeDto: CreatCoffeeDto) {
    const flavors = await Promise.all(
      coffeeDto.flavors.map((name) => this.preloadFlavors(name)),
    );

    const coffee = this.repo.create({ ...coffeeDto, flavors });

    return this.repo.save(coffee);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: string, coffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      coffeeDto.flavors.map((name) => this.preloadFlavors(name)),
    );

    const coffee = await this.repo.preload({ id: +id, ...coffeeDto, flavors });

    if (!coffee) {
      throw new NotFoundException(`coffee #${id} not found`);
    }

    return this.repo.save(coffee);
  }

  async remove(id: string) {
    const coffe = await this.findOne(id);
    return this.repo.remove(coffe);
  }

  async preloadFlavors(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepo.findOneBy({ name });
    if (flavor) {
      return flavor;
    }

    return this.flavorRepo.create({ name });
  }
}
