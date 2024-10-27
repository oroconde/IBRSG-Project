import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolesPermissions } from "./RolesPermissions";

@Index("permissions_pkey", ["permissionId"], { unique: true })
@Entity("permissions", { schema: "auth" })
export class Permissions {
  @PrimaryGeneratedColumn({ type: "integer", name: "permission_id" })
  permissionId: number;

  @Column("character varying", { name: "permission_name", length: 100 })
  permissionName: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

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

  @OneToMany(
    () => RolesPermissions,
    (rolesPermissions) => rolesPermissions.permission
  )
  rolesPermissions: RolesPermissions[];
}
