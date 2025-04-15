import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ListTodoLists from "./ListTodoLists.jsx";
import ToDoList from "./ToDoList.jsx";

function App() {
    const [listSummaries, setListSummaries] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        reloadData().catch(console.error);
    }, []);

    async function reloadData() {
        const response = await axios.get('http://localhost:8000/api/lists');
        const data = await response.data;
        setListSummaries(data);
    }

    function handleNewToDoList(newName) {
        const updateData = async () => {
            const newListData = {
                name: newName,
            };

            await axios.post(`http://localhost:8000/api/list`, newListData);
            reloadData().catch(console.error);
        };
        updateData();
    }

    function handleDeleteToDoList(id) {
        const updateData = async () => {
            await axios.delete(`http://localhost:8000/api/list/${id}`);
            reloadData().catch(console.error);
        };
        updateData();
    }

    function handleSelectList(id) {
        console.log("Selecting item", id);
        setSelectedItem(id);
    }

    function backToList() {
        setSelectedItem(null);
        reloadData().catch(console.error);
    }

    if (selectedItem === null) {
        return (
            <div className="App">
                <ListTodoLists
                    listSummaries={listSummaries}
                    handleSelectList={handleSelectList}
                    handleNewToDoList={handleNewToDoList}
                    handleDeleteToDoList={handleDeleteToDoList}
                />
            </div>
        );
    } else {
        return (
            <div className="App">
                <ToDoList listId={selectedItem} handleBackButton={backToList} />
            </div>
        );
    }
}

export default App;