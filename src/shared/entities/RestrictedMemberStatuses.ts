import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RestrictedMembers } from "./RestrictedMembers";

@Index("restricted_member_statuses_pkey", ["restrictedMemberStatusId"], {
  unique: true,
})
@Entity("restricted_member_statuses", { schema: "auth" })
export class RestrictedMemberStatuses {
  @PrimaryGeneratedColumn({
    type: "integer",
    name: "restricted_member_status_id",
  })
  restrictedMemberStatusId: number;

  @Column("character varying", {
    name: "restricted_member_status_name",
    nullable: true,
    length: 100,
  })
  restrictedMemberStatusName: string | null;

  @Column("timestamp with time zone", {
    name: "audit_creation_date",
    nullable: true,
  })
  auditCreationDate: Date | null;

  @Column("integer", { name: "audit_creation_user", nullable: true })
  auditCreationUser: number | null;

  @Column("timestamp with time zone", {
    name: "audit_update_date",
    nullable: true,
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
    () => RestrictedMembers,
    (restrictedMembers) => restrictedMembers.restrictedMemberStatus
  )
  restrictedMembers: RestrictedMembers[];
}
