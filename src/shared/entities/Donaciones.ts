import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Miembros } from "./Miembros.entity";

@Index("miembro_id", ["miembroId"], {})
@Entity("Donaciones", { schema: "ibrsgDB" })
export class Donaciones {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "miembro_id", nullable: true })
  miembroId: number | null;

  @Column("decimal", { name: "cantidad", precision: 10, scale: 2 })
  cantidad: string;

  @Column("decimal", { name: "Concepto", precision: 10, scale: 2 })
  concepto: string;

  @Column("timestamp", {
    name: "fecha",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  fecha: Date | null;

  @ManyToOne(() => Miembros, (miembros) => miembros.donaciones, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "miembro_id", referencedColumnName: "id" }])
  miembro: Miembros;
}
