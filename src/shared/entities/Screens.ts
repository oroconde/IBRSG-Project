import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolesPermissions } from './RolesPermissions';

@Index('screens_pkey', ['screenId'], { unique: true })
@Entity('screens', { schema: 'congregation' })
export class Screens {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'screen_id' })
  screenId: number;

  @Column('character varying', {
    name: 'screen_name',
    nullable: true,
    length: 255,
  })
  screenName: string | null;

  @Column('character varying', {
    name: 'screen_path',
    nullable: true,
    length: 100,
  })
  screenPath: string | null;

  @Column('character varying', {
    name: 'screen_icon',
    nullable: true,
    length: 100,
  })
  screenIcon: string | null;

  @Column('boolean', {
    name: 'screen_menu_element',
    nullable: true,
    default: () => 'false',
  })
  screenMenuElement: boolean | null;

  @Column('timestamp with time zone', {
    name: 'audit_creation_date',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  auditCreationDate: Date | null;

  @Column('integer', { name: 'audit_creation_user' })
  auditCreationUser: number;

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

  @OneToMany(
    () => RolesPermissions,
    (rolesPermissions) => rolesPermissions.screen,
  )
  rolesPermissions: RolesPermissions[];
}
