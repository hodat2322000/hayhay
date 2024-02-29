import axios from "axios";
import fs from "fs";
import path from "path";

const listProxy = async () => {
  const listProxy: any = await axios.get(
    "http://localhost:3000/listProxy.json"
  );
  return listProxy.data;
};
const addProxy = () => {
    const filePath = path.join(__dirname, "listProxy.json");
    const dataNew = "prox3"; // Thêm dấu phẩy sau "prox3"

    try {
        const listProxy = fs.readFileSync(filePath, 'utf-8');
        const newDataJson = JSON.parse(listProxy);
        newDataJson.push(dataNew);
        console.log(newDataJson);

        fs.writeFileSync(filePath, JSON.stringify(newDataJson, null, 4), 'utf8'); // Sử dụng JSON.stringify đúng cách
        console.log('Data has been written to ', filePath);
    } catch (err: any) {
        console.error('Error writing to file:', err.message);
    }
};

export default { listProxy, addProxy };
