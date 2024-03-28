const sequelize = require('../config/connection');
const { Book } = require('../models/Book');

const  bookData = require('./bookData.json');
// const  = require('./.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const books = await Book.bulkCreate(Data, {
    individualHooks: true,
    returning: true,
  });

  // for (const post of Data) {
  //   await create({
  //     ...
  //   //   user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
