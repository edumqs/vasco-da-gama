const sequelize = require('./index');

const syncDb = () => {
    return sequelize.sync().catch((err) => {
        console.error('Something went wrong with the Database sync!', err);
        process.exit(1);
    });
};

syncDb();
