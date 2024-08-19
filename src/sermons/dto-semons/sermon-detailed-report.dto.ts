import { ApiProperty } from '@nestjs/swagger';

export class SermonCommentDto {
  @ApiProperty({ example: 'Este sermón me ha ayudado a fortalecer mi fe.' })
  comment: string;

  @ApiProperty({ example: '2024-08-02' })
  commentDate: string;

  @ApiProperty({ example: 'María José' })
  memberName: string;

  // @IsString({ each: true })
  // memberName: Array<string>;
}

export class SermonDetailedReportDto {
  @ApiProperty({ example: 'La Fe que Mueve Montañas' })
  sermonName: string;

  @ApiProperty({ example: 'Juan Carlos Pérez Gómez' })
  preacherName: string;

  @ApiProperty({ type: [SermonCommentDto] })
  comments: SermonCommentDto[];
}
