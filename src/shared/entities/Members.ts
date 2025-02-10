import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Assignments } from './Assignments';
import { Attendances } from './Attendances';
import { Donations } from './Donations';
import { DocumentTypes } from './DocumentTypes';
import { MembersGroups } from './MembersGroups';
import { MembersRoles } from './MembersRoles';
import { Preachers } from './Preachers';
import { RestrictedMembers } from './RestrictedMembers';
import { SermonComments } from './SermonComments';
import { Sessions } from './Sessions';
import { TokensMembers } from './TokensMembers';

@Index('members_pkey', ['memberId'], { unique: true })
@Entity('members', { schema: 'auth' })
export class Members {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'member_id' })
  memberId: number;

  @Column('character varying', { name: 'document_number', length: 40 })
  documentNumber: string;

  @Column('character varying', {
    name: 'member_password',
    nullable: true,
    length: 256,
  })
  memberPassword: string | null;

  @Column('character varying', {
    name: 'password_recovery_token',
    nullable: true,
    length: 255,
  })
  passwordRecoveryToken: string | null;

  @Column('timestamp with time zone', {
    name: 'password_expiration_date',
    nullable: true,
  })
  passwordExpirationDate: Date | null;

  @Column('boolean', { name: 'temporary_password', nullable: true })
  temporaryPassword: boolean | null;

  @Column('integer', {
    name: 'failed_attempts',
    nullable: true,
    default: () => '0',
  })
  failedAttempts: number | null;

  @Column('character varying', {
    name: 'first_name',
    nullable: true,
    length: 100,
  })
  firstName: string | null;

  @Column('character varying', {
    name: 'middle_name',
    nullable: true,
    length: 100,
  })
  middleName: string | null;

  @Column('character varying', {
    name: 'last_name',
    nullable: true,
    length: 100,
  })
  lastName: string | null;

  @Column('character varying', {
    name: 'second_last_name',
    nullable: true,
    length: 100,
  })
  secondLastName: string | null;

  @Column('character varying', { name: 'email', nullable: true, length: 50 })
  email: string | null;

  @Column('character varying', { name: 'landline', nullable: true, length: 20 })
  landline: string | null;

  @Column('character varying', {
    name: 'mobile_phone',
    nullable: true,
    length: 20,
  })
  mobilePhone: string | null;

  @Column('date', { name: 'birth_date', nullable: true })
  birthDate: string | null;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'audit_creation_date',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  auditCreationDate: Date | null;

  @Column('integer', {
    name: 'audit_creation_user',
    nullable: true,
    select: false,
  })
  auditCreationUser: number | null;

  @UpdateDateColumn({
    type: 'timestamp with time zone', // Configuramos el tipo con zona horaria
    name: 'audit_update_date',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP', // Usamos CURRENT_TIMESTAMP para manejar la hora actual en UTC
    select: false,
  })
  auditUpdateDate: Date | null;

  @Column('integer', {
    name: 'audit_update_user',
    nullable: true,
    select: false,
  })
  auditUpdateUser: number | null;

  @Column('timestamp with time zone', {
    name: 'audit_deletion_date',
    nullable: true,
    select: false,
  })
  auditDeletionDate: Date | null;

  @Column('integer', {
    name: 'audit_deletion_user',
    nullable: true,
    select: false,
  })
  auditDeletionUser: number | null;

  @Column('boolean', {
    name: 'is_active',
    nullable: true,
    default: () => 'true',
  })
  isActive: boolean | null;

  @OneToMany(() => Assignments, (assignments) => assignments.member)
  assignments: Assignments[];

  @OneToMany(() => Attendances, (attendances) => attendances.member)
  attendances: Attendances[];

  @OneToMany(() => Donations, (donations) => donations.member)
  donations: Donations[];

  @ManyToOne(() => DocumentTypes, (documentTypes) => documentTypes.members)
  @JoinColumn([
    { name: 'document_type_id', referencedColumnName: 'documentTypeId' },
  ])
  documentType: DocumentTypes;

  @OneToMany(() => MembersGroups, (membersGroups) => membersGroups.member)
  membersGroups: MembersGroups[];

  @OneToMany(() => MembersRoles, (membersRoles) => membersRoles.member)
  membersRoles: MembersRoles[];

  @OneToMany(() => Preachers, (preachers) => preachers.member)
  preachers: Preachers[];

  @OneToMany(
    () => RestrictedMembers,
    (restrictedMembers) => restrictedMembers.member,
  )
  restrictedMembers: RestrictedMembers[];

  @OneToMany(() => SermonComments, (sermonComments) => sermonComments.member)
  sermonComments: SermonComments[];

  @OneToMany(() => Sessions, (sessions) => sessions.member)
  sessions: Sessions[];

  @OneToMany(() => TokensMembers, (tokensMembers) => tokensMembers.member)
  tokensMembers: TokensMembers[];
}
