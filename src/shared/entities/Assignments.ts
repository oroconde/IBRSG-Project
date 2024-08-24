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

@Index('assignments_pkey', ['assignmentId'], { unique: true })
@Entity('assignments', { schema: 'congregation' })
export class Assignments {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'assignment_id' })
  assignmentId: number;

  @Column('date', { name: 'start_date', nullable: true })
  startDate: string | null;

  @Column('date', { name: 'end_date', nullable: true })
  endDate: string | null;

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

  @ManyToOne(() => Members, (members) => members.assignments)
  @JoinColumn([{ name: 'member_id', referencedColumnName: 'memberId' }])
  member: Members;

  @ManyToOne(() => Sermons, (sermons) => sermons.assignments)
  @JoinColumn([{ name: 'sermon_id', referencedColumnName: 'sermonId' }])
  sermon: Sermons;
}
