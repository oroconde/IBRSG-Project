import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Members } from "./Members";
import { RestrictedMemberStatuses } from "./RestrictedMemberStatuses";

@Index("restricted_members_pkey", ["restrictedMemberId"], { unique: true })
@Entity("restricted_members", { schema: "auth" })
export class RestrictedMembers {
  @PrimaryGeneratedColumn({ type: "integer", name: "restricted_member_id" })
  restrictedMemberId: number;

  @Column("character varying", { name: "restriction_reason", length: 255 })
  restrictionReason: string;

  @Column("timestamp with time zone", { name: "start_date" })
  startDate: Date;

  @Column("timestamp with time zone", { name: "end_date", nullable: true })
  endDate: Date | null;

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

  @ManyToOne(() => Members, (members) => members.restrictedMembers)
  @JoinColumn([{ name: "member_id", referencedColumnName: "memberId" }])
  member: Members;

  @ManyToOne(
    () => RestrictedMemberStatuses,
    (restrictedMemberStatuses) => restrictedMemberStatuses.restrictedMembers
  )
  @JoinColumn([
    {
      name: "restricted_member_status_id",
      referencedColumnName: "restrictedMemberStatusId",
    },
  ])
  restrictedMemberStatus: RestrictedMemberStatuses;
}
