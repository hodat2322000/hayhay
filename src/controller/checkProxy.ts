import axios from "axios";
import fs from "fs"
import path from "path"

const proxy = (req: any, res: any) => {
  res.render("checkProxy");
};

const handleCheckProxy = (req: any, res: any) => {
  res.json({ checkProxy: "check" });
};
const listProxy = async() => {
    const listProxy: any = await axios.get("http://localhost:3000/listProxy.json");
    return listProxy.data
}

const checkProxy = async (proxy: string) => {
    
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
        console.log(response.data);
        
      return {
        data: response.data,
        message: "Proxy is working. Status is 200"
      }
    } else {
        return {
            data: response.data,
            message: `Status is ${response.status}`
          }
    }
  } catch (error: any) {
    return "Error: " + error.message;
  }
};
function isValidProxyFormat(proxy: string) {
  // Biểu thức chính quy để kiểm tra định dạng proxy
  const proxyRegex =
    /^(http|https):\/\/[^\s@]+:[^\s@]+@[a-zA-Z0-9-_.]+:[0-9]+$/;
  // Kiểm tra xem proxy có khớp với định dạng không
  return proxyRegex.test(proxy);
}

export default { proxy, handleCheckProxy, checkProxy, isValidProxyFormat, listProxy };
