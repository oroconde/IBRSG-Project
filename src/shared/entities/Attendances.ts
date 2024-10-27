import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Events } from "./Events";
import { Members } from "./Members";

@Index("attendances_pkey", ["attendanceId"], { unique: true })
@Entity("attendances", { schema: "congregation" })
export class Attendances {
  @PrimaryGeneratedColumn({ type: "integer", name: "attendance_id" })
  attendanceId: number;

  @Column("timestamp with time zone", {
    name: "date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  date: Date | null;

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

  @ManyToOne(() => Events, (events) => events.attendances)
  @JoinColumn([{ name: "event_id", referencedColumnName: "eventId" }])
  event: Events;

  @ManyToOne(() => Members, (members) => members.attendances)
  @JoinColumn([{ name: "member_id", referencedColumnName: "memberId" }])
  member: Members;
}
