import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MembersRoles } from './MembersRoles';
import { RolesPermissions } from './RolesPermissions';

@Index('roles_pkey', ['roleId'], { unique: true })
@Entity('roles', { schema: 'auth' })
export class Roles {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'role_id' })
  roleId: number;

  @Column('character varying', {
    name: 'role_description',
    nullable: true,
    length: 50,
  })
  roleName: string | null;

  @Column('character varying', {
    name: 'role_description',
    nullable: true,
    length: 255,
  })
  roleDescription: string | null;

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

  @OneToMany(() => MembersRoles, (membersRoles) => membersRoles.role)
  membersRoles: MembersRoles[];

  @OneToMany(
    () => RolesPermissions,
    (rolesPermissions) => rolesPermissions.role,
  )
  rolesPermissions: RolesPermissions[];
}
