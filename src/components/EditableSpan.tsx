import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callback:(newTitle:string) =>void
}

export const EditableSpan = (props: EditableSpanType) => {
    let [newTitle, setNewTitle] = useState(props.title)
    let [edit,setEdit] = useState(false)

    const turnOnHandler = () => {
        setEdit(true)
    }

    const turnOffHandler = () => {
        setEdit(false)
        props.callback(newTitle)
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit ?
            <input value={newTitle} autoFocus onBlur={turnOffHandler} onChange={onChangeHandler}/>
            : <span onDoubleClick={turnOnHandler}>{props.title}</span>
    );
};
