import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Miembros } from "./Miembros.entity";
import { Eventos } from "./Eventos";

@Index("miembro_id", ["miembroId"], {})
@Index("evento_id", ["eventoId"], {})
@Entity("Asistencia", { schema: "ibrsgDB" })
export class Asistencia {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "miembro_id", nullable: true })
  miembroId: number | null;

  @Column("int", { name: "evento_id", nullable: true })
  eventoId: number | null;

  @Column("timestamp", {
    name: "fecha",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fecha: Date | null;

  @ManyToOne(() => Miembros, (miembros) => miembros.asistencias, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "miembro_id", referencedColumnName: "id" }])
  miembro: Miembros;

  @ManyToOne(() => Eventos, (eventos) => eventos.asistencias, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "evento_id", referencedColumnName: "id" }])
  evento: Eventos;
}
