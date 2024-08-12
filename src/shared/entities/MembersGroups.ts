import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Groups } from "./Groups";
import { Members } from "./Members";

@Index("members_groups_pkey", ["groupId", "memberId"], { unique: true })
@Entity("members_groups", { schema: "congregation" })
export class MembersGroups {
  @Column("integer", { primary: true, name: "member_id" })
  memberId: number;

  @Column("integer", { primary: true, name: "group_id" })
  groupId: number;

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

  @ManyToOne(() => Groups, (groups) => groups.membersGroups)
  @JoinColumn([{ name: "group_id", referencedColumnName: "groupId" }])
  group: Groups;

  @ManyToOne(() => Members, (members) => members.membersGroups)
  @JoinColumn([{ name: "member_id", referencedColumnName: "memberId" }])
  member: Members;
}
