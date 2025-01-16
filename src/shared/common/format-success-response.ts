import { PaginationResponseDTO } from '../dto/pagination.dto';

export class SuccessResponse<T> {
  data: T;
  description: string;
  statusCode: number;
  statusText: string;
  pagination?: object;

  constructor(
    data: T,
    description: string,
    statusCode: number,
    statusText: string,
    pagination?: PaginationResponseDTO,
  ) {
    this.data = data;
    this.description = description;
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.pagination = pagination;
  }
}
