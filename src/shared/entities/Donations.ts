import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DonationTypes } from "./DonationTypes";
import { Members } from "./Members";

@Index("donations_pkey", ["donationId"], { unique: true })
@Entity("donations", { schema: "congregation" })
export class Donations {
  @PrimaryGeneratedColumn({ type: "integer", name: "donation_id" })
  donationId: number;

  @Column("numeric", { name: "amount", precision: 10, scale: 2 })
  amount: string;

  @Column("timestamp with time zone", {
    name: "date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  date: Date | null;

  @Column("timestamp with time zone", {
    name: "audit_creation_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  auditCreationDate: Date | null;

  @Column("integer", { name: "audit_creation_user", nullable: true })
  auditCreationUser: number | null;

  @Column("timestamp with time zone", {
    name: "audit_update_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  auditUpdateDate: Date | null;

  @Column("integer", { name: "audit_update_user", nullable: true })
  auditUpdateUser: number | null;

  @Column("timestamp with time zone", {
    name: "audit_deletion_date",
    nullable: true,
  })
  auditDeletionDate: Date | null;

  @Column("integer", { name: "audit_deletion_user", nullable: true })
  auditDeletionUser: number | null;

  @Column("boolean", {
    name: "active_record",
    nullable: true,
    default: () => "true",
  })
  activeRecord: boolean | null;

  @ManyToOne(() => DonationTypes, (donationTypes) => donationTypes.donations)
  @JoinColumn([
    { name: "donation_type_id", referencedColumnName: "donationTypeId" },
  ])
  donationType: DonationTypes;

  @ManyToOne(() => Members, (members) => members.donations)
  @JoinColumn([{ name: "member_id", referencedColumnName: "memberId" }])
  member: Members;
}
