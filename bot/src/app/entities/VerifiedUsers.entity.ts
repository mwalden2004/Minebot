// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class VerfiedUsers extends BaseEntity {

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  minecraftUUID: string;

  @Column()
  accounts: string[];

}
