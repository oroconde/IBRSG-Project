import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("blood_types_pkey", ["bloodTypeId"], { unique: true })
@Entity("blood_types", { schema: "demographics" })
export class BloodTypes {
  @PrimaryGeneratedColumn({ type: "integer", name: "blood_type_id" })
  bloodTypeId: number;

  @Column("character varying", { name: "blood_type_name", length: 25 })
  bloodTypeName: string;

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
}
