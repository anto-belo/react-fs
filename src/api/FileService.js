import axios from "axios";
import {API_URL} from "./config";

export default class FileService {
    static getFSStructure() {
        return axios.get(`${API_URL}/fs/static`);
    }

    static uploadFiles(files, path) {
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }

        return axios.post(`${API_URL}/fs/upload`, data, {
            params: {
                path: path
            }
        });
    }

    static createFolder(path) {
        return axios.post(`${API_URL}/fs/create-folder`, {}, {
            params: {
                path: path
            }
        });
    }

    static deleteFile(path) {
        return axios.delete(`${API_URL}/fs/delete`, {
            params: {
                path: path
            }
        });
    }
}