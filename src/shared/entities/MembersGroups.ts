import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Groups } from "./Groups";
import { Members } from "./Members";

@Index("members_groups_pkey", ["memberGroupId"], { unique: true })
@Entity("members_groups", { schema: "congregation" })
export class MembersGroups {
  @PrimaryGeneratedColumn({ type: "integer", name: "member_group_id" })
  memberGroupId: number;

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

  @ManyToOne(() => Groups, (groups) => groups.membersGroups, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "group_id", referencedColumnName: "groupId" }])
  group: Groups;

  @ManyToOne(() => Members, (members) => members.membersGroups, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "member_id", referencedColumnName: "memberId" }])
  member: Members;
}
