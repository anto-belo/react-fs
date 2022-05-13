import StorageManager from "./components/StorageManager/StorageManager";
import FileService from "./api/FileService";
import {useEffect, useState} from "react";

function App() {
    const [structure, setStructure] = useState();

    useEffect(() => {
        async function fetchStructure() {
            return await FileService.getFSStructure();
        }

        fetchStructure().then(r => setStructure(r.data));
    }, []);

    return (
        <div className="App">
            <StorageManager structure={structure} setStructure={setStructure}/>
        </div>
    );
}

export default App;