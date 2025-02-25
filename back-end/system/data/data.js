// import { MongoClient } from  'mongodb';
// // or as an es module:
// // import { MongoClient } from 'mongodb'
//
// // Connection URL
// const url = 'mongodb+srv://mohamedelsary960:010993060moel.@cluster0.v7jn0.mongodb.net/first';
// const client = new MongoClient(url);
//
// // Database Name
// const dbName = 'first';
//
// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('one');
//     await collection.insertOne({
//         name: 'jana',
//         age: 20
//     })
//     // the following code examples can be pasted here...
//     const findResult = await collection.find().toArray();
//     console.log('Found documents =>', findResult);
//     return 'done.';
// }
//
// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());

import mongoose from 'mongoose';

// Connection URL
const url = 'mongodb+srv://mohamedelsary960:010993060moel.@cluster0.v7jn0.mongodb.net/first';

mongoose.connect(url, {
}).then(() => {
    console.log('Connected to database');
})

//let data = [
//     {
//         id: 1,
//         name: 'John',
//         age: 30
//     },
//     {
//         id: 2,
//         name: 'Doe',
//         age: 25
//     },
//     {
//         id: 3,
//         name: 'mohamed',
//         age: 28
//     }];