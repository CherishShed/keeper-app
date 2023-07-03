import axios from "axios";

const getData = () => {
    const data = axios.get("https://jsonplaceholder.typicode.com/posts");
    return data.then(response => response.data);
}

const data = await getData()
export default data;