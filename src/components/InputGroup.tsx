import React from "react";
import './styles/InputGroup.css';
import SelectGroup from "./SelectGroup";

class InputGroup extends SelectGroup {
    render() {
        return (
            <div className="inputGroup">
                <input
                    type='number'
                    className='formControl'
                    id='amount'
                    aria-label='Amount'
                    min='0'
                    defaultValue='100'
                    onChange={this.convertCurrencies}
                />
                <p id="result" className="formControl">100</p>
            </div>
        );
    }
}

export default InputGroup;