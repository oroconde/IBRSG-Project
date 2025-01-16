import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Members } from './Members';
import { SermonSeries } from './SermonSeries';
import { Sermons } from './Sermons';

@Index('preachers_pkey', ['preacherId'], { unique: true })
@Entity('preachers', { schema: 'congregation' })
export class Preachers {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'preacher_id' })
  preacherId: number;

  @Column('timestamp with time zone', {
    name: 'audit_creation_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  auditCreationDate: Date;

  @Column('integer', { name: 'audit_creation_user' })
  auditCreationUser: number;

  @Column('timestamp with time zone', {
    name: 'audit_update_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  auditUpdateDate: Date;

  @Column('integer', { name: 'audit_update_user', nullable: true })
  auditUpdateUser: number | null;

  @Column('timestamp with time zone', {
    name: 'audit_deletion_date',
    nullable: true,
  })
  auditDeletionDate: Date | null;

  @Column('integer', { name: 'audit_deletion_user', nullable: true })
  auditDeletionUser: number | null;

  @Column('boolean', { name: 'is_active', default: () => 'true' })
  isActive: boolean;

  @ManyToOne(() => Members, (members) => members.preachers)
  @JoinColumn([{ name: 'member_id', referencedColumnName: 'memberId' }])
  member: Members;

  @OneToMany(() => SermonSeries, (sermonSeries) => sermonSeries.preacher)
  sermonSeries: SermonSeries[];

  @OneToMany(() => Sermons, (sermons) => sermons.preacher)
  sermons: Sermons[];
}
