const User = require('../../models/User');
const Verify = require('../../models/Verify');

function getUser(idx) {
  const data = [
    {
      email: 'admin@gmail.com',
      password: '123456',
      fullname: 'Admin',
      city: 'HCM',
      district: 'Q12',
      ward: 'TCH',
      street: '70/10 Tô Ký',
      phone: '0988888888',
    },
    {
      email: 'admin2@gmail.com',
      password: '123456',
      fullname: 'Admin2',
      city: 'HN',
      district: 'Nam Từ Liêm',
      ward: 'Mỹ Đình',
      street: '20 Phạm Hùng',
      phone: '0966633678',
    },
  ];
  return data[idx];
}

async function populate() {
  const user = await User.create({
    ...getUser(1),
  });

  const verify = await Verify.create({
    code: '1ABcd',
    user: user.id,
  });
}

module.exports = {
  getUser,
  populate,
};
