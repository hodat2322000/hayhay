const TelegramBot = require("node-telegram-bot-api");

const dotenv = require("dotenv");
const { auto } = require("./autoCheckProxy.js");

dotenv.config();
const {
  addProxy,
  proxyList,
  checkProxy,
  isValidProxyFormat,
  removeProxy,
} = require("./checkProxy.js");
// Khởi tạo bot với token
const bot = new TelegramBot(process.env.BOT_API_TELE, {
  polling: true,
});
// Xử lý tin nhắn từ bot
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  // Kiểm tra nếu tin nhắn chứa lệnh "/addproxy" hoặc "/add"
  if (messageText.startsWith("/")) {
    if (messageText.startsWith("/add")) {
      const proxy = messageText.split(" ")[1]; // Lấy phần proxy sau lệnh
      if (!isValidProxyFormat(proxy)) {
        bot.sendMessage(chatId, "Please provide a valid proxy.");
        return;
      }

      const add_Proxy = await addProxy(proxy);
      return bot.sendMessage(chatId, add_Proxy);
    }
    if (messageText.startsWith("/remove")) {
      const proxy = messageText.split(" ")[1]; // Lấy phần proxy sau lệnh
      if (!isValidProxyFormat(proxy)) {
        bot.sendMessage(chatId, "Please provide a valid proxy.");
        return;
      }

      const remove_Proxy = await removeProxy(proxy);
      return bot.sendMessage(chatId, remove_Proxy);
    }
    if (messageText.startsWith("/proxy")) {
      const listProxy = await proxyList();
      return bot.sendMessage(chatId, listProxy);
    }
    if (messageText.startsWith("/guide")) {
      return bot.sendMessage(
        chatId,

        `
        Nhập proxy để kiểm tra hoạt động, định dạng: http://username:password@ip:port
        /proxy: Danh sách Proxy đã add vào bot
        /allCheck: Kiểm tra tất cả proxy mỗi 15 phút
        /add proxy: Thêm proxy vào bot
        /remove proxy: Xóa proxy khỏi bot
        `
      );
    }
  } else if (!isValidProxyFormat(messageText)) {
    return bot.sendMessage(chatId, "Please provide a valid proxy");
  } else {
    const messageCheckProxy = await checkProxy(messageText);
    bot.sendMessage(chatId, messageCheckProxy);
  }
});

const performCheckAndSendMessage = async (chatId) => {
  try {
    // Call the auto function to check all proxies
    const checkAll = await auto();
    // Send the result of the check to the chat
    bot.sendMessage(chatId, checkAll);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error checking all proxies:", error);
    bot.sendMessage(
      chatId,
      "Error checking all proxies. Please try again later."
    );
  }
};

bot.onText(/\/allCheck/, async (msg) => {
  const chatId = msg.chat.id; // Get the chat ID where the message is received
  performCheckAndSendMessage(chatId);
  setInterval(() => {
    performCheckAndSendMessage(chatId);
  }, 15 * 60 * 1000); //
});
