import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Departments } from './Departments';

@Index('municipalities_pkey', ['municipalityId'], { unique: true })
@Entity('municipalities', { schema: 'demographics' })
export class Municipalities {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'municipality_id' })
  municipalityId: number;

  @Column('character varying', { name: 'municipality_name', length: 30 })
  municipalityName: string;

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

  @ManyToOne(() => Departments, (departments) => departments.municipalities)
  @JoinColumn([{ name: 'department_id', referencedColumnName: 'departmentId' }])
  department: Departments;
}
