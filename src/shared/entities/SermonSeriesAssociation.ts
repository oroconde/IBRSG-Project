import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sermons } from "./Sermons";
import { SermonSeries } from "./SermonSeries";

@Index("sermon_series_association_pkey", ["id"], { unique: true })
@Entity("sermon_series_association", { schema: "congregation" })
export class SermonSeriesAssociation {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

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

  @ManyToOne(() => Sermons, (sermons) => sermons.sermonSeriesAssociations)
  @JoinColumn([{ name: "sermon_id", referencedColumnName: "sermonId" }])
  sermon: Sermons;

  @ManyToOne(
    () => SermonSeries,
    (sermonSeries) => sermonSeries.sermonSeriesAssociations
  )
  @JoinColumn([
    { name: "sermon_series_id", referencedColumnName: "sermonSerieId" },
  ])
  sermonSeries: SermonSeries;
}
