import express from 'express';
import connect from "./utilities/connectDatabase.js";
import userRouter from "./routers/route.user.js"



const app = express();
app.use(express.json());

// connect to the database
connect();


app.use('/api/users/',userRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({status: "error", data: null, msg: "NOT FOUND ROUT"});
})


app.use((error, req, res, next) => {
    res
        .status(error.statusCode || 400)
        .json({
            status: error.statusMessage || 'error',
            message: error.message ,
            data: [null],
            code: error.statusCode,
            appName: error.name
        });
    // next(error);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
})