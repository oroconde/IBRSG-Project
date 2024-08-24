import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Members } from './Members';

@Index('tokens_members_pkey', ['tokenMemberId'], { unique: true })
@Entity('tokens_members', { schema: 'congregation' })
export class TokensMembers {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'token_member_id' })
  tokenMemberId: number;

  @Column('character varying', {
    name: 'token_member',
    nullable: true,
    length: 255,
  })
  tokenMember: string | null;

  @Column('timestamp with time zone', {
    name: 'creation_date',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date | null;

  @Column('timestamp with time zone', {
    name: 'expiration_date',
    nullable: true,
  })
  expirationDate: Date | null;

  @Column('character varying', {
    name: 'token_type',
    nullable: true,
    length: 255,
  })
  tokenType: string | null;

  @Column('timestamp with time zone', {
    name: 'audit_creation_date',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  auditCreationDate: Date | null;

  @Column('integer', { name: 'audit_creation_user', nullable: true })
  auditCreationUser: number | null;

  @Column('timestamp with time zone', {
    name: 'audit_update_date',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  auditUpdateDate: Date | null;

  @Column('integer', { name: 'audit_update_user', nullable: true })
  auditUpdateUser: number | null;

  @Column('timestamp with time zone', {
    name: 'audit_deletion_date',
    nullable: true,
  })
  auditDeletionDate: Date | null;

  @Column('integer', { name: 'audit_deletion_user', nullable: true })
  auditDeletionUser: number | null;

  @Column('boolean', {
    name: 'is_active',
    nullable: true,
    default: () => 'true',
  })
  isActive: boolean | null;

  @ManyToOne(() => Members, (members) => members.tokensMembers)
  @JoinColumn([{ name: 'member_id', referencedColumnName: 'memberId' }])
  member: Members;
}
