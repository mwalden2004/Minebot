// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  discordId: string;

  @Column()
  accounts: {
    accounts: string[];
    links: {[guildId: string]: string};
  }

  @Column()
  mainAccount?: string;

  @Column()
  created: Date;

}
