import React, {ChangeEvent} from 'react';

type UniversalCheckboxPropsType = {
    callback: (checkedValue:boolean) => void
    checked: boolean
}


export const UniversalCheckbox: React.FC<UniversalCheckboxPropsType> = ({callback, checked}) => {
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
    }
    return (
        <input type="checkbox" onChange={onChangeHandler} checked={checked}/>
    );
};

