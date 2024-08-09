import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Asignaciones } from './Asignaciones';
import { Asistencia } from './Asistencia';
import { Donaciones } from './Donaciones';
import { Grupos } from './Grupos';

@Entity('Miembros', { schema: 'ibrsgDB' })
export class Miembros {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nombre', length: 100 })
  nombre: string;

  @Column('varchar', { name: 'apellido', length: 100 })
  apellido: string;

  @Column('date', { name: 'fecha_nacimiento', nullable: true })
  fechaNacimiento: string | null;

  @Column('varchar', { nullable: true, length: 100 })
  genero: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 100 })
  email: string | null;

  @Column('varchar', { name: 'telefono', nullable: true, length: 20 })
  telefono: string | null;

  @Column('varchar', { name: 'direccion', nullable: true, length: 255 })
  direccion: string | null;

  @Column('timestamp', {
    name: 'fecha_registro',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaRegistro: Date | null;

  @OneToMany(() => Asignaciones, (asignaciones) => asignaciones.miembro)
  asignaciones: Asignaciones[];

  @OneToMany(() => Asistencia, (asistencia) => asistencia.miembro)
  asistencias: Asistencia[];

  @OneToMany(() => Donaciones, (donaciones) => donaciones.miembro)
  donaciones: Donaciones[];

  @OneToMany(() => Grupos, (grupos) => grupos.lider)
  grupos: Grupos[];
}
