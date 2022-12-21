// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Guilds extends BaseEntity {

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  guildId: string;

  @Column()
  nicknameTemplate?: string;

  @Column()
  verifiedRole?: string;

  @Column()
  unverifiedRole?: string;

  @Column()
  inServer: boolean;

  @Column()
  joinMessages?: {
    unverified?: string;
    verified?: string;
  };

  @Column()
  created: Date;

}
