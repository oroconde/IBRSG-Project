import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Miembros } from "./Miembros";

@Index("lider_id", ["liderId"], {})
@Entity("Grupos", { schema: "ibrsgDB" })
export class Grupos {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("int", { name: "lider_id", nullable: true })
  liderId: number | null;

  @Column("varchar", { name: "direccion", nullable: true, length: 255 })
  direccion: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @ManyToOne(() => Miembros, (miembros) => miembros.grupos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "lider_id", referencedColumnName: "id" }])
  lider: Miembros;
}
