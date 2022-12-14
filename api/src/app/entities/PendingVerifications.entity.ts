import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class PendingVerifications extends BaseEntity {

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  uuid: string;

  @Column()
  discordId: string;

  @Column()
  verificationCode: string;

  @Column()
  verified?: boolean;

  @Column()
  created: Date;
}
