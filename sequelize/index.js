import {Sequelize, Op, Model, DataTypes} from "sequelize";

const sequelize = new Sequelize('postgres', 'postgres', '010993060MoEl.', {
    host: 'localhost',
    dialect: 'postgres',
    // logging: console.log,
    logging: false
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
// try {
//     sequelize.close().then(function () {
//         console.log('Connection has been closed.');
//     })
// } catch (error) {
//     console.error('Unable to close the database connection:', error);
// }