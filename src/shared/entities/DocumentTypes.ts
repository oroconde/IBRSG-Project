import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Members } from "./Members";

@Index("document_types_pkey", ["documentTypeId"], { unique: true })
@Entity("document_types", { schema: "congregation" })
export class DocumentTypes {
  @PrimaryGeneratedColumn({ type: "integer", name: "document_type_id" })
  documentTypeId: number;

  @Column("character varying", {
    name: "document_type_name",
    nullable: true,
    length: 100,
  })
  documentTypeName: string | null;

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

  @OneToMany(() => Members, (members) => members.documentType)
  members: Members[];
}
