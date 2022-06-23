
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Checkbox } from 'primereact/checkbox';

type Props = {
    title: string,
    name: string,
    options: any,
    onChange: any

}
const MiscCheckbox = (props: Props) => {

    const options = props.options || [];
    const [checked, setChecked] = useState<string[]>([]);

    const onChange = (e : any) => {
        let selected = [...checked];
        if (e.checked)
            selected.push(e.value);
        else
            selected.splice(selected.indexOf(e.value), 1);
    
        setChecked(selected);
        props.onChange(selected);
    }
    
    const optionTemplate = (item: any) => {
        return (
            <div className="p-col-6">
                <Checkbox 
                    inputId={`${props.name}_${item.id}`} 
                    onChange={onChange} 
                    checked={checked.includes(item.id)}
                    value={item.id}/>
                <label htmlFor={`${props.name}_${item.id}`} className="p-checkbox-label p-pl-2">{item.name}</label>
            </div>
        )
    }

    const renderOptions = () => {
        let Jsx: JSX.Element[] = [];
        options.forEach((item: any) => {
            Jsx.push(optionTemplate(item));
        });

        return Jsx;
    };

    return (
        <>
            <h4>{props.title}</h4>

            <div className="p-grid">
                {renderOptions()}
            </div>
        </>
    );
}

export default MiscCheckbox