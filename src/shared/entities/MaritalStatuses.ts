import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('marital_statuses_pkey', ['maritalStatusId'], { unique: true })
@Entity('marital_statuses', { schema: 'demographics' })
export class MaritalStatuses {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'marital_status_id' })
  maritalStatusId: number;

  @Column('character varying', { name: 'marital_status_name', length: 25 })
  maritalStatusName: string;

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
}
