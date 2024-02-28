// app.ts
import express from "express";
import path from "path";
import bodyParser from "body-parser";

import indexRouter from "./routers/";

const app = express();
const port = 3000;

// Cấu hình để phục vụ các tệp tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, "public")));
// Đặt cấu hình cho ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Sử dụng body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
