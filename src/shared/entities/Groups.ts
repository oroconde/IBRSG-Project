import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MembersGroups } from "./MembersGroups";

@Index("groups_pkey", ["groupId"], { unique: true })
@Entity("groups", { schema: "congregation" })
export class Groups {
  @PrimaryGeneratedColumn({ type: "integer", name: "group_id" })
  groupId: number;

  @Column("character varying", { name: "group_name", length: 100 })
  groupName: string;

  @Column("character varying", { name: "address", nullable: true, length: 255 })
  address: string | null;

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
    name: "active_record",
    nullable: true,
    default: () => "true",
  })
  activeRecord: boolean | null;

  @OneToMany(() => MembersGroups, (membersGroups) => membersGroups.group)
  membersGroups: MembersGroups[];
}
