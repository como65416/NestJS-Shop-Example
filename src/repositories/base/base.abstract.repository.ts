import { DeleteResult, Repository } from 'typeorm';

export abstract class BaseAbstractRepository<T> extends Repository<T> {
  public async findOneById(id: number): Promise<T> {
    return await this.findOne(id);
  }

  public async findAll(): Promise<T[]> {
    return await this.find();
  }

  public async removeById(id: number): Promise<DeleteResult> {
    return await this.delete(id);
  }
}
