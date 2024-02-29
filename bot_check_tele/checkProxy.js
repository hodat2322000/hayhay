const fs = require("fs");
const path = require("path");
const axios = require("axios");

const checkProxy = async (proxy) => {
  try {
    const proxyUrl = new URL(proxy);
    const targetUrl = "http://ip-api.com/json";
    const axiosConfig = {
      proxy: {
        protocol: "http",
        host: proxyUrl.hostname,
        port: Number(proxyUrl.port),
        auth: {
          username: proxyUrl.username,
          password: proxyUrl.password,
        },
      },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    };

    const response = await axios.get(targetUrl, axiosConfig);
    if (response.status === 200) {
      return `Proxy working, ${JSON.stringify(response.data)}`;
    }
    return `Proxy status is ${response.status}`;
  } catch (error) {
    return "Error: " + error.message;
  }
};
function isValidProxyFormat(proxy) {
  // Biểu thức chính quy để kiểm tra định dạng proxy
  const proxyRegex =
    /^(http|https):\/\/[^\s@]+:[^\s@]+@[a-zA-Z0-9-_.]+:[0-9]+$/;
  // Kiểm tra xem proxy có khớp với định dạng không
  return proxyRegex.test(proxy);
}
function addProxy(proxy) {
  const filePath = path.join(__dirname, "listproxy.json");

  try {
    // Đọc danh sách proxy từ tệp
    const listProxy = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (listProxy.includes(proxy)) {
      return "Proxy duplicated, check all proxies /proxy";
    }
    listProxy.push(proxy);
    // Ghi lại danh sách proxy đã được cập nhật vào tệp
    fs.writeFileSync(filePath, JSON.stringify(listProxy, null, 4), "utf-8");
    return "Proxy has been added successfully. Check all proxies /proxy";
  } catch (error) {
    return "Error adding proxy:" + error.messag;
  }
}

function removeProxy(proxy) {
    const filePath = path.join(__dirname, "listproxy.json");
  
    try {
      // Đọc danh sách proxy từ tệp
      const listProxy = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      if (!listProxy.includes(proxy)) {
        return "Not found proxy, check all proxies /proxy";
      }
      listProxyRemove = listProxy.filter(proxys => proxys !== proxy)
      // Ghi lại danh sách proxy đã được cập nhật vào tệp
      fs.writeFileSync(filePath, JSON.stringify(listProxyRemove, null, 4), "utf-8");
      return "Proxy has been updated successfully. Check all proxies /proxy";
    } catch (error) {
      return "Error adding proxy: " + error.message;
    }
  }

function proxyList() {
  const filePath = path.join(__dirname, "listproxy.json");

  try {
    // Đọc danh sách proxy từ tệp
    const listProxy = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return listProxy.toString();
  } catch (error) {
    return "Error reading proxy:" + error.message;
  }
}
module.exports = { isValidProxyFormat, checkProxy, addProxy, proxyList, removeProxy };
