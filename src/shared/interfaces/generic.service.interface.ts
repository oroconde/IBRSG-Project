import { ResponseModel } from '../providers/format-success-response';

export interface IGenericService {
  /* CRUD Service functions
   * * LOgiC CRUD to database
   * @param createdto
   */

  genericCreate<U, T>(createDTO: U): Promise<ResponseModel<T>>;
  genericFindAll<T>(queries: any): Promise<ResponseModel<T>>;
  genericFindOne<T>(props: object): Promise<ResponseModel<T>>;
  genericUpdate<T, U>(prop: object, dto: U): Promise<T>;
  // inactive<T>( id: string ): Promise‹›;
}
