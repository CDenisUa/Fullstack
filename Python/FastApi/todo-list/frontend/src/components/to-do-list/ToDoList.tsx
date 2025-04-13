// Core
import axios from "axios";
import {useEffect, useState, useRef} from "react";
import {BiSolidTrash} from "react-icons/bi";
import cx from "classnames";
// Styles
import styles from "./styles.module.css";

const ToDoList = (props) => {
    const {listId, handleBackButton} = props;

    const [listData, setListData] = useState(null);
    let labelRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/lists/${listId}`);
            const newData = await response.data;
            setListData(newData);
        };
        fetchData();
    }, [listId]);

    const handleCreateItem = (label) => {
        const updateData = async () => {
            const response = await axios.post(`/api/lists/${listData.id}/items/`, {
                label: label,
            });
            setListData(await response.data);
        };
        updateData();
    }

    const handleDeleteItem = (id) => {
        const updateData = async () => {
            const response = await axios.delete(
                `/api/lists/${listData.id}/items/${id}`
            );
            setListData(await response.data);
        };
        updateData();
    }

    const handleCheckToggle = (itemId, newState) => {
        const updateData = async () => {
            const response = await axios.patch(
                `/api/lists/${listData.id}/checked_state`,
                {
                    item_id: itemId,
                    checked_state: newState,
                }
            );
            setListData(await response.data);
        };
        updateData();
    }

    if (listData === null) {
        return (
            <div className="ToDoList loading">
                <button className="back" onClick={handleBackButton}>
                    Back
                </button>
                Loading to-do list ...
            </div>
        );
    }

    return (
        <div className="ToDoList">
            <button className="back" onClick={handleBackButton}>
                Back
            </button>
            <h1>List: {listData.name}</h1>
            <div className="box">
                <label>
                    New Item:&nbsp;
                    <input id={labelRef} type="text"/>
                </label>
                <button
                    onClick={() =>
                        handleCreateItem(document.getElementById(labelRef).value)
                    }
                >
                    New
                </button>
            </div>
            {listData.items.length > 0 ? (
                listData.items.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className={cx(styles.item, { [styles.checked]: item.checked })}
                            onClick={() => handleCheckToggle(item.id, !item.checked)}
                        >
                            <span>{item.checked ? "✅" : "⬜️"} </span>
                            <span className="label">{item.label} </span>
                            <span className="flex"></span>
                            <span
                                className="trash"
                                onClick={(evt) => {
                                    evt.stopPropagation();
                                    handleDeleteItem(item.id);
                                }}
                            >
                                <BiSolidTrash/>
                            </span>
                        </div>
                    );
                })
            ) : (
                <div className="box">There are currently no items.</div>
            )}
        </div>
    );
}

export default ToDoList;