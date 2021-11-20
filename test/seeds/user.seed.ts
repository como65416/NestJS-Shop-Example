import { UserRole } from '../../src/enum';
import { UserRepository } from '../../src/repositories';

export class UserSeed {
  static async insertCommonProducts(userRepository: UserRepository) {
    await userRepository.save([
      {
        username: 'bob.accounnt',
        password:
          '$2a$10$cD/73CjuSWSIEftAFOKDR.e8YdyQ7Lodd0STwGHnM86RhgdI0PJMO',
        name: 'Bob',
        role: UserRole.Member,
        email: 'bob@example.com',
      },
    ]);
  }
}
