import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Assignments } from "./Assignments";
import { SermonComments } from "./SermonComments";
import { SermonSeriesAssociation } from "./SermonSeriesAssociation";
import { Categories } from "./Categories";
import { Preachers } from "./Preachers";

@Index("sermons_pkey", ["sermonId"], { unique: true })
@Entity("sermons", { schema: "congregation" })
export class Sermons {
  @PrimaryGeneratedColumn({ type: "integer", name: "sermon_id" })
  sermonId: number;

  @Column("character varying", { name: "sermon_name", length: 100 })
  sermonName: string;

  @Column("date", { name: "sermon_date", nullable: true })
  sermonDate: string | null;

  @Column("text", { name: "summary", nullable: true })
  summary: string | null;

  @Column("interval", { name: "duration", nullable: true })
  duration: any | null;

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

  @OneToMany(() => Assignments, (assignments) => assignments.sermon)
  assignments: Assignments[];

  @OneToMany(() => SermonComments, (sermonComments) => sermonComments.sermon)
  sermonComments: SermonComments[];

  @OneToMany(
    () => SermonSeriesAssociation,
    (sermonSeriesAssociation) => sermonSeriesAssociation.sermon
  )
  sermonSeriesAssociations: SermonSeriesAssociation[];

  @ManyToOne(() => Categories, (categories) => categories.sermons)
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Categories;

  @ManyToOne(() => Preachers, (preachers) => preachers.sermons)
  @JoinColumn([{ name: "preacher_id", referencedColumnName: "preacherId" }])
  preacher: Preachers;
}
