import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from '../shared/dto/create-member.dto';
import { UpdateMemberDto } from '../shared/dto/update-member.dto';

@Injectable()
export class MembersService {
  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
