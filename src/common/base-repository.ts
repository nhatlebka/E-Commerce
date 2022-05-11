import { Document, Model, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  protected abstract entityDocument: T & Document;

  constructor(protected readonly entityModel: Model<T>) {}

  async findAll(query: FilterQuery<T>, sort?: string): Promise<T[] | null> {
    return this.entityModel.find(query).sort(sort).exec();
  }

  async findOne(query: FilterQuery<T>): Promise<T | null> {
    return this.entityModel.findOne(query).exec();
  }

  async paginate(
    query: FilterQuery<T>,
    limit: number,
    page: number,
    sort?: string,
  ): Promise<T[] | null> {
    const skip = (page - 1) * limit;
    return this.entityModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .exec();
  }

  async findWithRelation(
    from: any,
    localField: any,
    foreignField: any,
    as: any,
    match?: FilterQuery<T>,
  ): Promise<any[]> {
    return this.entityModel.aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from,
          localField,
          foreignField,
          as,
        },
      },
    ]);
  }

  async create(data: unknown): Promise<T> {
    return this.entityModel.create(data);
  }

  async update(
    query: FilterQuery<T>,
    data: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(query, data, {
      new: true,
    });
  }

  async delete(query: FilterQuery<T>): Promise<any> {
    const deleteResult = await this.entityModel.deleteOne(query);
    if (deleteResult.deletedCount)
      return {
        status: 'success',
        message: 'Deleted successfully',
      };

    return false;
  }
}
