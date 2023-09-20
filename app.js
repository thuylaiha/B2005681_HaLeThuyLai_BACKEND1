const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routers/contact.route");
const ApiError = require("./app/api-error");

const app =express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next) => {
    //se chay khi khong co route nao khop yeu cau. Gọi next() chuyển sang middleware xử 
    //lí lỗi.
    return next(new ApiError(404, "Resource not found"));
});

//define error-handing middleare last, other app.use() and routes calls
app.use((err,req, res, next) => {
    //Middleare xử lí lỗi tập trung
    //Trong các đoạn code xử lý ở các route, gọi next(error)
    //sẽ chuyển về middleware xử lí lỗi này.
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });

});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application"});
});


module.exports = app;