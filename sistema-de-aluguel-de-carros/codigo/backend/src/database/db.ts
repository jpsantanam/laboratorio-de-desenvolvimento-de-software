import { Sequelize } from "sequelize";

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/database.sqlite'
});

/* const database = new Sequelize("postgresql://uxwcz1iaclhzha2kqmxy:Qf8jNkl74RA0bOw0ekLWrM8XD5Y5mi@by4nzkqtkk23zzsecxry-postgresql.services.clever-cloud.com:50013/by4nzkqtkk23zzsecxry", {
    dialect: 'postgres',
}); */

export default database;