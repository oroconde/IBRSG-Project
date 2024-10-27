import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("professions_pkey", ["professionId"], { unique: true })
@Entity("professions", { schema: "demographics" })
export class Professions {
  @PrimaryGeneratedColumn({ type: "integer", name: "profession_id" })
  professionId: number;

  @Column("character varying", {
    name: "profession_name",
    nullable: true,
    length: 30,
  })
  professionName: string | null;

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
}
