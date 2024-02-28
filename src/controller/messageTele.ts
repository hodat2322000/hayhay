import TelegramBot from "node-telegram-bot-api";
import checkProxy from "../controller/checkProxy";

const token = "6227455990:AAHLwozgVe2QtA_oGy0sHCmKhpOhKPJQWb0";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const proxy = msg.text;

  if (!proxy) return bot.sendMessage(chatId, "Please enter proxy");
  if (proxy === "/proxy") {
    const listProxy: any = await checkProxy.listProxy();
    return bot.sendMessage(chatId,`${listProxy[1]}`);
  }
   
  if (!checkProxy.isValidProxyFormat(proxy))
    return bot.sendMessage(chatId, 'Proxy is not valid, please try again');
  const messCheckProxy: any = await checkProxy.checkProxy(proxy);
  if (messCheckProxy.error) {
    return bot.sendMessage(chatId, messCheckProxy.error);
  }
  bot.sendMessage(chatId, `Status is 200`);
  bot.sendMessage(chatId, JSON.stringify(messCheckProxy.data));
  return;
});

export default bot;
