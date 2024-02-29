import TelegramBot from "node-telegram-bot-api";
import checkProxy from "../controller/checkProxy";
import handleProxy from "../controller/proxy";
import path from "path";
import fs from "fs";

const token = "6751554989:AAGOVB99Ks1aczGHhOsw_og1EXgm79EXeYw";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const proxy = msg.text;

  if (!proxy) return bot.sendMessage(chatId, "Please enter proxy");
  if (proxy === "/proxy") {
    const listProxy: any = await handleProxy.listProxy();
    return bot.sendMessage(chatId, `${listProxy}`);
  }
  bot.onText(/\/add/, (msg) => {
    // Gọi hàm addProxy để thêm proxy mới vào danh sách
    handleProxy.addProxy();
  });

  if (!checkProxy.isValidProxyFormat(proxy))
    return bot.sendMessage(chatId, "Proxy is not valid, please try again");
  const messCheckProxy: any = await checkProxy.checkProxy(proxy);

  if (messCheckProxy.error) {
    return bot.sendMessage(chatId, messCheckProxy);
  }

  return bot.sendMessage(chatId, JSON.stringify(messCheckProxy));
});

export default bot;
