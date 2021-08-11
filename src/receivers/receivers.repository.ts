import { Repository, EntityRepository } from 'typeorm';
import { Receiver } from './receiver.entity';
import { ReceiverDTO } from './dto/receiver.dto';
import { GetReceiversFilterDTO } from './dto/getReceivers.filter.dto';

@EntityRepository(Receiver)
export class ReceiversRepository extends Repository<Receiver> {

  public async saveReceiver(
    receiversDto: ReceiverDTO,
  ): Promise<Receiver> {
    const { id, name, email } = receiversDto;

    const Receiver_ = new Receiver();
    Receiver_.id = id ? id : null;
    Receiver_.name = name;
    Receiver_.email = email;

    return (await Receiver_.save());
  }

  public async getAll(parameters: GetReceiversFilterDTO): Promise<Receiver[]> {
    const { orderBy, sort, like, page, limit } = parameters;

    const query = this.createQueryBuilder('receivers');

    if (like)
      query.andWhere(
        'receivers.name LIKE :like',
        { like: `%${like}%` }
      );

    if (limit) {
      query.limit(limit);

      if (page)
        this.paginate(page, limit, query)
    }

    if (orderBy)
      if (sort) {
        query.orderBy(orderBy, sort);
      } else {
        query.orderBy(orderBy)
      }

    return await query.getMany();
  }

  public async findAll(): Promise<Receiver[]> {
    return await this.find();
  }

  public async getByMonth(month: number): Promise<Receiver[]> {
    console.log(month);
    const data = await this.find();

    console.debug(data);
    const result = data.map(item => {
      if (item.created_at.getMonth() == month) return item;
    });

    return result;
  }

  public async insertMany(values) {
    await this.createQueryBuilder('receivers')
      .insert()
      .values(values)
      .execute();
  }

  public paginate(page, limit, query) {
    query.offset((page - 1) * limit)
  }
}