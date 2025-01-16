import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseDTO } from 'src/shared/dto/common-responses.dto';
import { PaginationResponseDTO } from 'src/shared/dto/pagination.dto';
import { Sermons } from 'src/shared/entities/Sermons';

export class SermonDetailedResponse {
  @ApiProperty()
  sermonId: number;

  @ApiProperty({ example: 'La Fe que Mueve Montañas' })
  sermonName: string;

  @ApiProperty({
    example: {
      preacherId: 1,
      preacherName: 'Juan Carlos Pérez Gómez',
    },
  })
  preacher: {
    preacherId: number;
    preacherName: string;
  };

  constructor(sermon: Sermons) {
    this.sermonId = sermon.sermonId;
    this.sermonName = sermon.sermonName;
    this.preacher = sermon.preacher?.member
      ? {
          preacherId: sermon.preacher.preacherId,
          preacherName: `${sermon.preacher.member.firstName} ${sermon.preacher.member.lastName}`,
        }
      : null;
  }
}

export class SermonsListResponses200DTO extends ApiResponseDTO<
  SermonDetailedResponse[]
> {
  @ApiProperty({
    type: [SermonDetailedResponse],
  })
  data: SermonDetailedResponse[];

  @ApiProperty({
    type: PaginationResponseDTO,
  })
  paginacion: PaginationResponseDTO;
}
