import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipalities } from "./Municipalities";

@Index("departments_pkey", ["departmentId"], { unique: true })
@Entity("departments", { schema: "demographics" })
export class Departments {
  @PrimaryGeneratedColumn({ type: "integer", name: "department_id" })
  departmentId: number;

  @Column("character varying", { name: "department_name", length: 30 })
  departmentName: string;

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

  @Column("boolean", { name: "is_active", default: () => "true" })
  isActive: boolean;

  @OneToMany(
    () => Municipalities,
    (municipalities) => municipalities.department
  )
  municipalities: Municipalities[];
}
