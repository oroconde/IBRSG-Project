import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Members } from './Members';
import { Sermons } from './Sermons';

@Index('sermon_comments_pkey', ['sermonCommentId'], { unique: true })
@Entity('sermon_comments', { schema: 'congregation' })
export class SermonComments {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'sermon_comment_id' })
  sermonCommentId: number;

  @Column('character varying', { name: 'comment', length: 256 })
  comment: string;

  @Column('date', { name: 'comment_date', nullable: true })
  commentDate: string | null;

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

  @ManyToOne(() => Members, (members) => members.sermonComments)
  @JoinColumn([{ name: 'member_id', referencedColumnName: 'memberId' }])
  member: Members;

  @ManyToOne(() => Sermons, (sermons) => sermons.sermonComments)
  @JoinColumn([{ name: 'sermon_id', referencedColumnName: 'sermonId' }])
  sermon: Sermons;
}
