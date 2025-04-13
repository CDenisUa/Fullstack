// Core
import {useRef} from "react";
import {BiSolidTrash} from "react-icons/bi";
import cx from 'classnames';
// Styles
import styles from "./styles.module.css";

const ListToDoLists = (props) => {
    const {
        listSummaries,
        handleSelectList,
        handleNewToDoList,
        handleDeleteToDoList,
    } = props;

    const labelRef = useRef(null);

    if (listSummaries === null) {
        return (
            <div className={cx(
                styles["ListToDoLists"],
                styles["loading"]
            )}
            >
                Loading to-do lists ...
            </div>);
    } else if (listSummaries.length === 0) {
        return (
            <div className={styles["ListToDoLists"]}>
                <div className={styles["box"]}>
                    <label>
                        New To-Do List:&nbsp;
                        <input id={labelRef} type="text"/>
                    </label>
                    <button
                        onClick={() =>
                            handleNewToDoList(document.getElementById(labelRef).value)
                        }
                    >
                        New
                    </button>
                </div>
                <p>There are no to-do lists!</p>
            </div>
        );
    }
    return (
        <div className={styles["ListToDoLists"]}>
            <h1>All To-Do Lists</h1>
            <div className={styles["box"]}>
                <label>
                    New To-Do List:&nbsp;
                    <input id={labelRef} type="text"/>
                </label>
                <button
                    onClick={() =>
                        handleNewToDoList(document.getElementById(labelRef).value)
                    }
                >
                    New
                </button>
            </div>
            {listSummaries.map((summary) => {
                return (
                    <div
                        key={summary.id}
                        className={styles["summary"]}
                        onClick={() => handleSelectList(summary.id)}
                    >
                        <span className={styles["name"]}>{summary.name} </span>
                        <span className={styles["count"]}>({summary.item_count} items)</span>
                        <span className={styles["flex"]}></span>
                        <span
                            className={styles["trash"]}
                            onClick={(evt) => {
                                evt.stopPropagation();
                                handleDeleteToDoList(summary.id);
                            }}
                        >
              <BiSolidTrash/>
            </span>
                    </div>
                );
            })}
        </div>
    );
}

export default ListToDoLists;