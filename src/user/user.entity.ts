
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';


@Entity({name: "users"})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
  
  async validatePassword(password: string) {
    return await bcrypt.compare(password,  this.password);
  }

 
}