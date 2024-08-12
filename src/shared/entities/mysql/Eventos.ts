import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Asistencia } from "./Asistencia";

@Entity("Eventos", { schema: "ibrsgDB" })
export class Eventos {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @OneToMany(() => Asistencia, (asistencia) => asistencia.evento)
  asistencias: Asistencia[];
}
