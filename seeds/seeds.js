const sequelize = require('../config/connection');
const {  } = require('../models');

const  = require('./.json');
const  = require('./.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const  = await .bulkCreate(Data, {
    individualHooks: true,
    returning: true,
  });

  for (const post of Data) {
    await create({
      ...
    //   user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
