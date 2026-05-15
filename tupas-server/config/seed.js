const bcrypt = require('bcryptjs');
const Article = require('../models/Article');
const User = require('../models/User');

const seedUsers = [
  {
    firstName: 'Admin',
    lastName: 'Tupas',
    age: '25',
    gender: 'male',
    contactNumber: '09171234567',
    email: 'admin@tupas.dev',
    role: 'admin',
    username: 'admintupas',
    password: 'Admin123!',
    address: 'Manila, Philippines',
    isActive: true,
  },
  {
    firstName: 'Editor',
    lastName: 'Tupas',
    age: '24',
    gender: 'female',
    contactNumber: '09182345678',
    email: 'editor@tupas.dev',
    role: 'editor',
    username: 'editortupas',
    password: 'Editor123!',
    address: 'Quezon City, Philippines',
    isActive: true,
  },
];

const seedArticles = [
  {
    title: 'Home Alone',
    desc: 'A young boy accidentally left behind must use his wits and creativity to defend his home from two burglars during Christmas.',
    fullDesc: "Eight-year-old Kevin McCallister has become the man of the house, overnight. Two burglars try to break in, and Kevin rigs a battery of booby traps to welcome them.",
    img: 'https://i.pinimg.com/1200x/95/f5/ab/95f5ab9aaab5b15b61165ec01500a772.jpg',
    director: 'Chris Columbus',
    year: '1990',
    genre: 'Comedy/Family',
    status: 'published',
  },
  {
    title: 'Toy Story',
    desc: 'When a new toy arrives, a jealous cowboy must work together with him to ensure both make it back to their owner.',
    fullDesc: "Woody sees his position as Andy's favorite toy jeopardized when Buzz Lightyear arrives. The two toys must work together and return home.",
    img: 'https://i.pinimg.com/1200x/8e/bd/48/8ebd48f66f760c1066bb7f82204d8866.jpg',
    director: 'John Lasseter',
    year: '1995',
    genre: 'Animation/Adventure',
    status: 'published',
  },
  {
    title: 'Cars',
    desc: 'A hotshot race car gets stranded in a small town and discovers that friendship and community are more important than winning.',
    fullDesc: 'Lightning McQueen discovers that life is about the journey when he is unexpectedly detoured in Radiator Springs.',
    img: 'https://i.pinimg.com/736x/11/75/b5/1175b5b020ee694988ef85f529de6dcc.jpg',
    director: 'John Lasseter',
    year: '2006',
    genre: 'Animation/Comedy',
    status: 'published',
  },
];

const seedDatabase = async () => {
  const userCount = await User.countDocuments();
  if (!userCount) {
    const users = await Promise.all(
      seedUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      })),
    );
    await User.insertMany(users);
  }

  const articleCount = await Article.countDocuments();
  if (!articleCount) {
    await Article.insertMany(seedArticles);
  }
};

module.exports = seedDatabase;
