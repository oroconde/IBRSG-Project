import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './Categories';
import { Preachers } from './Preachers';
import { SermonSeriesAssociation } from './SermonSeriesAssociation';

@Index('sermon_series_pkey', ['sermonSerieId'], { unique: true })
@Entity('sermon_series', { schema: 'congregation' })
export class SermonSeries {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'sermon_serie_id' })
  sermonSerieId: number;

  @Column('character varying', { name: 'serie_title', length: 100 })
  serieTitle: string;

  @Column('date', { name: 'start_date', nullable: true })
  startDate: string | null;

  @Column('date', { name: 'end_date', nullable: true })
  endDate: string | null;

  @Column('timestamp with time zone', {
    name: 'audit_creation_date',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  auditCreationDate: Date | null;

  @Column('integer', { name: 'audit_creation_user', nullable: true })
  auditCreationUser: number | null;

  @Column('timestamp with time zone', {
    name: 'audit_update_date',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  auditUpdateDate: Date | null;

  @Column('integer', { name: 'audit_update_user', nullable: true })
  auditUpdateUser: number | null;

  @Column('timestamp with time zone', {
    name: 'audit_deletion_date',
    nullable: true,
  })
  auditDeletionDate: Date | null;

  @Column('integer', { name: 'audit_deletion_user', nullable: true })
  auditDeletionUser: number | null;

  @Column('boolean', {
    name: 'is_active',
    nullable: true,
    default: () => 'true',
  })
  isActive: boolean | null;

  @ManyToOne(() => Categories, (categories) => categories.sermonSeries)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'categoryId' }])
  category: Categories;

  @ManyToOne(() => Preachers, (preachers) => preachers.sermonSeries)
  @JoinColumn([{ name: 'preacher_id', referencedColumnName: 'preacherId' }])
  preacher: Preachers;

  @OneToMany(
    () => SermonSeriesAssociation,
    (sermonSeriesAssociation) => sermonSeriesAssociation.sermonSeries,
  )
  sermonSeriesAssociations: SermonSeriesAssociation[];
}
