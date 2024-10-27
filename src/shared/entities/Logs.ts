import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("logs_pkey", ["logId"], { unique: true })
@Entity("logs", { schema: "ccore" })
export class Logs {
  @PrimaryGeneratedColumn({ type: "integer", name: "log_id" })
  logId: number;

  @Column("character varying", { name: "user_token", nullable: true })
  userToken: string | null;

  @Column("character varying", { name: "crud_type", nullable: true })
  crudType: string | null;

  @Column("character varying", { name: "table_name", nullable: true })
  tableName: string | null;

  @Column("character varying", { name: "original_value", nullable: true })
  originalValue: string | null;

  @Column("character varying", { name: "new_value", nullable: true })
  newValue: string | null;

  @Column("character varying", { name: "ip", nullable: true })
  ip: string | null;

  @Column("character varying", { name: "hostname", nullable: true })
  hostname: string | null;

  @Column("integer", { name: "record_id", nullable: true })
  recordId: number | null;

  @Column("timestamp with time zone", {
    name: "audit_creation_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  auditCreationDate: Date;

  @Column("integer", { name: "audit_creation_user" })
  auditCreationUser: number;

  @Column("timestamp with time zone", {
    name: "audit_update_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  auditUpdateDate: Date;

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
}
