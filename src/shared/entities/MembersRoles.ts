import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Members } from "./Members";
import { Roles } from "./Roles";

@Index("members_roles_unique", ["memberId", "roleId"], { unique: true })
@Index("members_roles_pkey", ["memberRoleId"], { unique: true })
@Entity("members_roles", { schema: "auth" })
export class MembersRoles {
  @PrimaryGeneratedColumn({ type: "integer", name: "member_role_id" })
  memberRoleId: number;

  @Column("integer", { name: "member_id", nullable: true, unique: true })
  memberId: number | null;

  @Column("integer", { name: "role_id", nullable: true, unique: true })
  roleId: number | null;

  @Column("timestamp with time zone", {
    name: "audit_creation_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  auditCreationDate: Date | null;

  @Column("integer", { name: "audit_creation_user", nullable: true })
  auditCreationUser: number | null;

  @Column("timestamp with time zone", {
    name: "audit_update_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  auditUpdateDate: Date | null;

  @Column("integer", { name: "audit_update_user", nullable: true })
  auditUpdateUser: number | null;

  @Column("timestamp with time zone", {
    name: "audit_deletion_date",
    nullable: true,
  })
  auditDeletionDate: Date | null;

  @Column("integer", { name: "audit_deletion_user", nullable: true })
  auditDeletionUser: number | null;

  @Column("boolean", {
    name: "is_active",
    nullable: true,
    default: () => "true",
  })
  isActive: boolean | null;

  @ManyToOne(() => Members, (members) => members.membersRoles)
  @JoinColumn([{ name: "member_id", referencedColumnName: "memberId" }])
  member: Members;

  @ManyToOne(() => Roles, (roles) => roles.membersRoles)
  @JoinColumn([{ name: "role_id", referencedColumnName: "roleId" }])
  role: Roles;
}
