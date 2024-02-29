const { proxyList, checkProxy } = require("./checkProxy.js");
const fs = require("fs");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();


const auto = async () => {
  const filePath = path.join(__dirname, "listproxy.json");

  try {
    // Đọc danh sách proxy từ tệp
    const listProxy = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    // Sử dụng Promise.all để chờ cho tất cả các kiểm tra proxy hoàn thành
    const results = await Promise.all(
      listProxy.map( async (proxy) => {
        try {
          // Thực hiện kiểm tra proxy
         const messageCheck = await checkProxy(proxy);
          // Nếu không có lỗi, trả về null
          return `Proxy: ${proxy}, message: ${messageCheck}` ;
        } catch (error) {
          // Nếu có lỗi, trả về proxy cùng với thông báo lỗi
          return `Error with proxy ${proxy}: ${error.message}`;
        }
      })
    );
    // Lọc ra các kết quả chứa lỗi và chỉ in ra proxy lỗi
    const errorResults = results.filter((result) => result.includes("Error"));
    if(errorResults.length === 0) {
        return "All proxy working"
    }
    return errorResults.toString()

  } catch (error) {
    return "Error reading proxy:" + error.message;
  }
};

module.exports = {auto}
