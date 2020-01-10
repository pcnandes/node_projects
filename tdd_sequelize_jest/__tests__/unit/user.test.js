const bcrypt = require('bcryptjs');

const { User } = require ('../../src/app/models');

const truncate = require('../utils/truncate')

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('deve logar com usuario e senha', async () => {
    const user = await User.create({
      name: 'Paulo',
      email: 'aaa@ee.com',
      password: '1234'
    });

    const hash = await bcrypt.hash('1234', 8);
    // expect(user.password.password_hash).toBe(hash);
    expect(await bcrypt.compare(user.password, user.password_hash)).toBe(true);
  });
});