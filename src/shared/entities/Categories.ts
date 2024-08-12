import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SermonSeries } from "./SermonSeries";
import { Sermons } from "./Sermons";

@Index("categories_pkey", ["categoryId"], { unique: true })
@Entity("categories", { schema: "congregation" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "integer", name: "category_id" })
  categoryId: number;

  @Column("character varying", { name: "category_name", length: 256 })
  categoryName: string;

  @Column("character varying", {
    name: "category_description",
    nullable: true,
    length: 256,
  })
  categoryDescription: string | null;

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

  @OneToMany(() => SermonSeries, (sermonSeries) => sermonSeries.category)
  sermonSeries: SermonSeries[];

  @OneToMany(() => Sermons, (sermons) => sermons.category)
  sermons: Sermons[];
}
