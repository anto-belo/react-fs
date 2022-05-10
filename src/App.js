import StorageManager from "./components/StorageManager/StorageManager";

function App() {
    let structure = {
        "name": "FS",
        "files": [
            "colors.png",
            "george.png"
        ],
        "folders": [
            {
                "name": "Hey",
                "files": [
                    "hey_1.jpg",
                    "hey_2.jpg",
                    "hey_3.jpg"
                ],
                "folders": [
                    {
                        "name": "Heys",
                        "files": [
                            "heys_1.jpg",
                            "heys_2.jpg",
                            "heys_3.jpg"
                        ]
                    }
                ]
            },
            {
                "name": "Hey2",
                "files": [
                    "hey_21.jpg",
                    "hey_22.jpg",
                    "hey_23.jpg"
                ]
            }
        ]
    };

    return (
        <div className="App">
            <StorageManager initStructure={structure} initRoot="Hey/Heys"/>
        </div>
    );
}

export default App;