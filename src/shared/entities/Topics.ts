import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("topics_pkey", ["topicId"], { unique: true })
@Entity("topics", { schema: "congregation" })
export class Topics {
  @PrimaryGeneratedColumn({ type: "integer", name: "topic_id" })
  topicId: number;

  @Column("character varying", { name: "topic_name", length: 256 })
  topicName: string;

  @Column("character varying", {
    name: "topic_description",
    nullable: true,
    length: 256,
  })
  topicDescription: string | null;

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

  @Column("boolean", { name: "active_record", default: () => "true" })
  activeRecord: boolean;
}
