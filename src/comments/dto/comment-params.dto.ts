import { IsOptional, IsInt, IsNumber } from 'class-validator';
import { GenericParamsDTO } from 'src/shared/dto/generic-params.dto';

export class CommentParamsDTO extends GenericParamsDTO {
  @IsOptional()
  @IsInt()
  @IsNumber()
  sermonId?: Number;

  @IsOptional()
  @IsInt()
  @IsNumber()
  memberId?: Number;
}
