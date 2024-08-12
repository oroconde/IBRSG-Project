import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Asignaciones } from "./Asignaciones";

@Entity("Roles", { schema: "ibrsgDB" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;

  @OneToMany(() => Asignaciones, (asignaciones) => asignaciones.rol)
  asignaciones: Asignaciones[];
}
