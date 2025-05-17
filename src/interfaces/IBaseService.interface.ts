export interface IBaseService<TRowDocType> {
  getAll(filter?: IObject): Promise<TRowDocType[]>;
  getById(id: string): Promise<TRowDocType>;
  create(reqBody: Partial<TRowDocType>): Promise<TRowDocType>;
  updateById(id: string, reqBody: Partial<TRowDocType>): Promise<TRowDocType>;
  deleteById(id: string): Promise<TRowDocType>;
}

export interface IObject {
  [key: string]: unknown;
}
