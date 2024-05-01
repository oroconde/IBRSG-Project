import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Sermones", { schema: "ibrsgDB" })
export class Sermones {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "titulo", length: 100 })
  titulo: string;

  @Column("varchar", { name: "Maestro", nullable: true, length: 100 })
  maestro: string | null;

  @Column("date", { name: "fecha", nullable: true })
  fecha: string | null;

  @Column("text", { name: "descripcion", nullable: true })
  descripcion: string | null;
}
