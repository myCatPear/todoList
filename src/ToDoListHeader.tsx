import React from 'react';

type ToDoListHeaderPropsType = {
    title:string
}

const ToDoListHeader = (props:ToDoListHeaderPropsType) => {
    return (
        <div>
            <h3> {props.title}</h3>
        </div>
    );
};

export default ToDoListHeader;