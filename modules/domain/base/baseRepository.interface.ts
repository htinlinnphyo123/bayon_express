export interface BaseRepositoryInterface<T> {
  where(field: string, value: any): BaseRepositoryInterface<T>;
  with(relations: string | string[]): BaseRepositoryInterface<T>;
  notDeleted(): BaseRepositoryInterface<T>;
  select(fields: string | string[]): BaseRepositoryInterface<T>; 
  order(field: string, direction?: 'asc' | 'desc'): BaseRepositoryInterface<T>;
  rawQuery(queryBuilder: (model: any) => Promise<any>): Promise<any>;
  get(): Promise<T[]>;
  getWithPaginate(page?:number, limit?:number, search?:string | null): Promise<any>;
  first(): Promise<T | null>;
  find(id: number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<T>;
  softDelete(id: number, deletedBy?: number): Promise<T>;
}
