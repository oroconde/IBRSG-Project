import { PartialType } from '@nestjs/swagger';
import { CreateCommentDTO } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDTO) {}
