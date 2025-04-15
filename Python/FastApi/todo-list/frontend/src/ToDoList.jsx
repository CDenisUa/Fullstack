// Core
import { useEffect, useState } from "react";
import axios from "axios";
import { BiSolidTrash } from "react-icons/bi";
// Styles
import "./ToDoList.css";

function ToDoList({ listId, handleBackButton }) {
    const [listData, setListData] = useState(null);
    const [newLabel, setNewLabel] = useState("");

    // Fetch the to-do list from the backend
    const fetchListData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/list/${listId}`);
            setListData(response.data);
        } catch (err) {
            console.error("Failed to load the list:", err);
        }
    };

    // Load the list when the component mounts or when listId changes
    useEffect(() => {
        fetchListData();
    }, [listId]);

    // Create a new item in the list
    const handleCreateItem = async () => {
        if (!newLabel.trim()) return;

        try {
            await axios.post(`http://localhost:8000/api/lists/${listData.id}/items/`, {
                label: newLabel.trim(),
            });
            setNewLabel("");
            await fetchListData();
        } catch (err) {
            console.error("Failed to create item:", err);
        }
    };

    // Delete an item from the list
    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/lists/${listData.id}/items/${id}`);
            await fetchListData();
        } catch (err) {
            console.error("Failed to delete item:", err);
        }
    };

    // Toggle the checked state of an item
    const handleCheckToggle = async (itemId, newState) => {
        try {
            await axios.patch(`http://localhost:8000/api/lists/${listData.id}/checked_state`, {
                item_id: itemId,
                checked_state: newState,
            });
            await fetchListData();
        } catch (err) {
            console.error("Failed to update checked state:", err);
        }
    };

    // Show loading screen while list is being fetched
    if (listData === null) {
        return (
            <div className="ToDoList loading">
                <button className="back" onClick={handleBackButton}>Back</button>
                Loading to-do list ...
            </div>
        );
    }

    return (
        <div className="ToDoList">
            <button className="back" onClick={handleBackButton}>Back</button>
            <h1>List: {listData.name}</h1>

            {/* Input box to add new items */}
            <div className="box">
                <label>
                    New Item:&nbsp;
                    <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleCreateItem()}
                    />
                </label>
                <button onClick={handleCreateItem}>New</button>
            </div>

            {/* Render all list items */}
            {listData.items.length > 0 ? (
                listData.items.map((item) => (
                    <div
                        key={item.id}
                        className={item.checked ? "item checked" : "item"}
                        onClick={() => handleCheckToggle(item.id, !item.checked)}
                    >
                        <span>{item.checked ? "✅" : "⬜️"}</span>
                        <span className="label">{item.label}</span>
                        <span className="flex"></span>
                        <span
                            className="trash"
                            onClick={(evt) => {
                                evt.stopPropagation();
                                handleDeleteItem(item.id);
                            }}
                        >
                            <BiSolidTrash />
                        </span>
                    </div>
                ))
            ) : (
                <div className="box">There are currently no items.</div>
            )}
        </div>
    );
}

export default ToDoList;
