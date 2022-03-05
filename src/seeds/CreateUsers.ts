import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../users/user.entity';
 
export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
       {name: 'test', user_name: 'tesst', password: '$2b$12$pUuEgWIrTTKQ4kELWamQO.41Nks.vc1rp4t68Ps.z66Zo5ZM/IZ4q' }
      ])
      .execute()
  }
}