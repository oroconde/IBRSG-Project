import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Members } from './Members';
import { Roles } from './Roles';

@Index('members_roles_pkey', ['memberId', 'roleId'], { unique: true })
@Entity('members_roles', { schema: 'congregation' })
export class MembersRoles {
  @Column('integer', { primary: true, name: 'member_id' })
  memberId: number;

  @Column('integer', { primary: true, name: 'role_id' })
  roleId: number;

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

  @ManyToOne(() => Members, (members) => members.membersRoles)
  @JoinColumn([{ name: 'member_id', referencedColumnName: 'memberId' }])
  member: Members;

  @ManyToOne(() => Roles, (roles) => roles.membersRoles)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'roleId' }])
  role: Roles;
}
