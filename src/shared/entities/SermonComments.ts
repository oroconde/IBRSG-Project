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
import { Exclude, Expose } from 'class-transformer';

@Index('sermon_comments_pkey', ['sermonCommentId'], { unique: true })
@Entity('sermon_comments', { schema: 'congregation' })
export class SermonComments {
  // @Expose()
  @PrimaryGeneratedColumn({ type: 'integer', name: 'sermon_comment_id' })
  sermonCommentId: number;

  // @Expose()
  @Column('integer', { name: 'member_id', nullable: true })
  memberId: number;

  // @Expose()
  @Column('integer', { name: 'sermon_id', nullable: true })
  sermonId: number;

  // @Expose()
  @Column('character varying', { name: 'comment', length: 256 })
  comment: string;

  // @Expose()
  @Column('date', { name: 'comment_date', nullable: true })
  commentDate: string | null;

  // @Exclude()
  // @Column('timestamp with time zone', {
  //   name: 'audit_creation_date',
  //   nullable: true,
  //   default: () => 'CURRENT_TIMESTAMP',
  //   select: false,
  // })
  // auditCreationDate: Date | null;

  // @Exclude()
  // @Column('integer', {
  //   name: 'audit_creation_user',
  //   nullable: true,
  //   select: false,
  // })
  // auditCreationUser: number | null;

  // @Exclude()
  // @Column('timestamp with time zone', {
  //   name: 'audit_update_date',
  //   nullable: true,
  //   default: () => 'CURRENT_TIMESTAMP',
  //   select: false,
  // })
  // auditUpdateDate: Date | null;

  // @Exclude()
  // @Column('integer', {
  //   name: 'audit_update_user',
  //   nullable: true,
  //   select: false,
  // })
  // auditUpdateUser: number | null;

  // @Exclude()
  // @Column('timestamp with time zone', {
  //   name: 'audit_deletion_date',
  //   nullable: true,
  //   select: false,
  // })
  // auditDeletionDate: Date | null;

  // @Exclude()
  // @Column('integer', {
  //   name: 'audit_deletion_user',
  //   nullable: true,
  //   select: false,
  // })
  // auditDeletionUser: number | null;

  // @Exclude()
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
