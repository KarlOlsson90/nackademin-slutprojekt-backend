const mongoose = require("mongoose");
require("dotenv").config();

let mongoDatabase;

switch (process.env.ENV) {
  case "test":
    const { MongoMemoryServer } = require("mongodb-memory-server");
    mongoDatabase = new MongoMemoryServer({ binary: { version: "4.4.1" } });
    break;
  case "dev":
    mongoDatabase = {
      getUri: async () =>
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    };
    break;
}

async function connect(){
    
    let uri = await mongoDatabase.getUri()
    try {
        var connection = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        if(connection){
            return {success: "Connected to database"}
        }
    } catch {
        return {success: "Connection to database failed"}
    }
}

async function disconnect() {
  await mongoose.disconnect().then(() => {
    console.log(`Disconnected from database!`);
  });

  // if(process.env.ENV == 'test' || process.env.ENV == 'dev'){
  // await mongoDatabase.stop()
  // }
}

module.exports = {
  connect,
  disconnect,
};
