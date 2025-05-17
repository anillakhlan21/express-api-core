import { Model } from 'mongoose';
import { IBaseService, IObject } from '../../interfaces/IBaseService.interface';

export class BaseService<TRowDocType> implements IBaseService<TRowDocType> {
  model: Model<any>;
  constructor(model: Model<any>) {
    this.model = model;
  }

  async getAll(filter?: IObject) {
    if (filter) return this.model.find(filter);
    return this.model.find();
  }

  getById(id: string) {
    return this.model.findById(id);
  }

  create(reqBody: any) {
    return this.model.create(reqBody);
  }

  updateById(id: string, reqBody: Partial<TRowDocType>) {
    return this.model.findByIdAndUpdate(id, reqBody);
  }

  deleteById(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
