import { Repository, EntityRepository } from 'typeorm';
import { New } from './news.entity';
import { NewDTO } from './dto/new.dto';
import { GetNewsFilterDTO } from './dto/getNews.filter.dto';

@EntityRepository(New)
export class NewsRepository extends Repository<New> {

  public async saveNew(
    newsDto: NewDTO,
  ): Promise<New> {
    const { id, title, body } = newsDto;

    const New_ = new New();
    New_.id = id ? id : null;
    New_.title = title;
    New_.body = body;

    return (await New_.save());
  }

  public async getAll(parameters: GetNewsFilterDTO) {
    const { orderBy, sort, like, page, limit } = parameters;

    const query = this.createQueryBuilder('news');

    if (like)
      query.andWhere(
        'news.name LIKE :like',
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

  public async findAll(): Promise<New[]> {
    return await this.find();
  }

  public async getByMonth(month: number) {
    const data = await this.find();

    const result = data.map(item => {
      if (item.created_at.getMonth() == month) return item;
    });

    return result;
  }

  public async insertMany(values) {
    await this.createQueryBuilder('news')
      .insert()
      .values(values)
      .execute();
  }

  public paginate(page, limit, query) {
    query.offset((page - 1) * limit)
  }
}