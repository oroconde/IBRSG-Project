import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Miembros } from "./Miembros.entity";
import { Roles } from "./Roles";

@Index("miembro_id", ["miembroId"], {})
@Index("rol_id", ["rolId"], {})
@Entity("Asignaciones", { schema: "ibrsgDB" })
export class Asignaciones {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "miembro_id", nullable: true })
  miembroId: number | null;

  @Column("int", { name: "rol_id", nullable: true })
  rolId: number | null;

  @Column("date", { name: "fecha_inicio", nullable: true })
  fechaInicio: string | null;

  @Column("date", { name: "fecha_fin", nullable: true })
  fechaFin: string | null;

  @ManyToOne(() => Miembros, (miembros) => miembros.asignaciones, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "miembro_id", referencedColumnName: "id" }])
  miembro: Miembros;

  @ManyToOne(() => Roles, (roles) => roles.asignaciones, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "rol_id", referencedColumnName: "id" }])
  rol: Roles;
}
