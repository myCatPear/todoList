import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField id="outlined-basic" label="Title is required" variant="outlined" value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
                   size={'small'}
                   error={error}
        />
        {/* <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />*/}
        {/*<button onClick={addItem}>+</button>*/}
        <Button onClick={addItem} variant="contained" size="small"
                style={{
                    maxWidth: "40px",
                    maxHeight: "40px",
                    minWidth: "40px",
                    minHeight: "40px",
                    backgroundColor: "black"
                }}
        >+</Button>

        {error && <div className="error-message">{error}</div>}
    </div>
}

//-----------------------------------
// import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
// import {Button, TextField} from "@mui/material";
//
// type AddItemFormPropsType = {
//     addItem: (title: string) => void
// }
//
// export function AddItemForm(props: AddItemFormPropsType) {
//
//     let [title, setTitle] = useState("")
//     let [error, setError] = useState<string | null>(null)
//
//     const addItem = () => {
//         if (title.trim() !== "") {
//             props.addItem(title);
//             setTitle("");
//         } else {
//             setError("Title is required");
//         }
//     }
//
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setTitle(e.currentTarget.value)
//     }
//
//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         setError(null);
//         if (e.charCode === 13) {
//             addItem();
//         }
//     }
//
//     return <div>
//         <TextField id="outlined-basic" label="Outlined" variant="outlined" value={title}
//                    onChange={onChangeHandler}
//                    onKeyPress={onKeyPressHandler}
//                    className={error ? "error" : ""}
//                    size={'small'}
//         />
//         {/* <input value={title}
//                onChange={onChangeHandler}
//                onKeyPress={onKeyPressHandler}
//                className={error ? "error" : ""}
//         />*/}
//         {/*<button onClick={addItem}>+</button>*/}
//         <Button onClick={addItem} variant="contained" size="small"
//                 style={{
//                     maxWidth: "40px",
//                     maxHeight: "40px",
//                     minWidth: "40px",
//                     minHeight: "40px",
//                     backgroundColor: "black"
//                 }}
//         >+</Button>
//
//         {error && <div className="error-message">{error}</div>}
//     </div>
// }

