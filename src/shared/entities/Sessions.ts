import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Members } from "./Members";

@Index("sessions_pkey", ["sessionId"], { unique: true })
@Entity("sessions", { schema: "auth" })
export class Sessions {
  @PrimaryGeneratedColumn({ type: "integer", name: "session_id" })
  sessionId: number;

  @Column("character varying", { name: "token", nullable: true, length: 255 })
  token: string | null;

  @Column("timestamp with time zone", { name: "fecha_inicio", nullable: true })
  fechaInicio: Date | null;

  @Column("timestamp with time zone", {
    name: "fecha_expiracion",
    nullable: true,
  })
  fechaExpiracion: Date | null;

  @Column("character varying", {
    name: "ip_address",
    nullable: true,
    length: 255,
  })
  ipAddress: string | null;

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

  @ManyToOne(() => Members, (members) => members.sessions)
  @JoinColumn([{ name: "member_id", referencedColumnName: "memberId" }])
  member: Members;
}
