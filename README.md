# Awesomity Backend Challenge

Create a Restful API and database for an employee management system. The API should allow the following operations:


## Project setup

### Clone Repository
`git clone https://github.com/mahamealfred/awesomitybackend`
`cd awesomitybackend`

### Sequelize ORM setup
1. ***Configuring ```.env```***
   * Download and install [pgAdmin](https://www.postgresql.org/download/)
   * Create two databases, one for testing and another for development.
   * Navigate to ./database/config/config.js to edit database access details
       eg: 
       `development:  {
                   username:"postgres" ,
                   password:  "mahame",
                   database:  "EmployeesDb",
                    host:  "localhost",
                    dialect:  'postgres',
                    port:  5432,
              },`
   * Edit them with your real database user, password and database name.
2. ***Running Migrations***
   * Run ``` npm run migrateDb ``` in terminal to fire up migration
3. ***Undoing Migrations***
  * Run ``` npm run revertMigration ``` to undo all migrations
4. Running Seeds
 * Run ``` npm run seedDb ``` in terminal to run all seeds
5. Undoing Seeds
 * Run ``` npm run revertSeed ``` in termninal to undo all seeds data from the database

### Running server
   * Run `npm run dev` in terminal
### Running tests
   * Run `npm run test` in terminal

### Api Documentation
[Swagger Documentation](http://localhost:8000/api-docs/)