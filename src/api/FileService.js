import axios from "axios";
import {API_URL} from "./config";

export default class FileService {
    static getFSStructure() {
        return axios.get(`${API_URL}/fs/static`);
    }

    static uploadFiles(files, path) {
        var data = new FormData();
        data.append('files', fs.createReadStream('/C:/Users/Anton.Belausau/Downloads/images/upd1.jpg'));
        data.append('files', fs.createReadStream('/C:/Users/Anton.Belausau/Downloads/images/upd2.jpg'));
        data.append('files', fs.createReadStream('/C:/Users/Anton.Belausau/Downloads/images/upd3.jpg'));
        data.append('files', files);
        data.append('path', path);

        var config = {
            method: 'post',
            url: 'localhost:8080/fs/upload',
            headers: {
                ...data.getHeaders()
            },
            data : data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        /*
        const imageUploadDto = new FormData();
        // for (let i = 0; i < files.length; i++) {
        //     imageUploadDto.append(`files[${i}]`, files[i]);
        // }
        imageUploadDto.append('path', path);
        imageUploadDto.append('files', files);

        return axios.post(`${API_URL}/fs/upload`, imageUploadDto, {});
         */
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