import { Button } from "primereact/button"
import React, { useState, useEffect, useCallback } from "react"
import styles from "./Counter.module.scss"
import { useDebounce } from '@/utils/hooks/useDebounce';

type Props = {
    string : string,
    search? : any,
    searchKey: string
}

const Counter = (props: Props) => {
    const [counter, setCounter] = useState(0);
    const debounceCounter = useDebounce(counter);
    const min = 0;
    const max = 10;
    const search = props.search;
    const increment = () => {
        if (counter == max) return;
        setCounter(counter + 1);
    }
    const decrement = () => {
        if (counter == min) return;
        setCounter(counter-1);
    }
    useEffect(() => {
        if (debounceCounter) {
            search({
                key: props.searchKey,
                value: debounceCounter
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceCounter]);
    return(
       <React.Fragment>
           <div className="p-grid">
                <div className="p-md-2 p-lg-2">
                    <Button icon="pi pi-minus" className="p-button-rounded"
                        disabled={!counter && true}
                        onClick={decrement}/>
                </div>
                <div className="p-md-8 p-lg-8">
                    <div className={styles.counter}>
                        <span>{counter}</span><span className="p-pl-1">{props.string}</span>
                    </div>
                </div>
                <div className="p-md-2 p-lg-2">
                    <Button icon="pi pi-plus" className="p-button-rounded"
                        disabled={counter == max && true} 
                        onClick={increment}/>
                </div>
            </div>
       </React.Fragment> 
    )
}

export default Counter;