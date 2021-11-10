const app = require('../src/app');
const port = 65535;
// const syncDatabase = require('./sync-database');


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);

    // syncDatabase().then(() => {
    //     console.log("Database sync");
    // });
})