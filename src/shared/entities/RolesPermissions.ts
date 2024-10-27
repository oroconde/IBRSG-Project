import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permissions } from "./Permissions";
import { Roles } from "./Roles";
import { Screens } from "./Screens";

@Index("roles_permissions_unique", ["permissionId", "roleId", "screenId"], {
  unique: true,
})
@Index("roles_permissions_pkey", ["rolePermissionId"], { unique: true })
@Entity("roles_permissions", { schema: "auth" })
export class RolesPermissions {
  @PrimaryGeneratedColumn({ type: "integer", name: "role_permission_id" })
  rolePermissionId: number;

  @Column("integer", { name: "role_id", unique: true })
  roleId: number;

  @Column("integer", { name: "permission_id", unique: true })
  permissionId: number;

  @Column("integer", { name: "screen_id", unique: true })
  screenId: number;

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

  @ManyToOne(() => Permissions, (permissions) => permissions.rolesPermissions)
  @JoinColumn([{ name: "permission_id", referencedColumnName: "permissionId" }])
  permission: Permissions;

  @ManyToOne(() => Roles, (roles) => roles.rolesPermissions)
  @JoinColumn([{ name: "role_id", referencedColumnName: "roleId" }])
  role: Roles;

  @ManyToOne(() => Screens, (screens) => screens.rolesPermissions)
  @JoinColumn([{ name: "screen_id", referencedColumnName: "screenId" }])
  screen: Screens;
}
