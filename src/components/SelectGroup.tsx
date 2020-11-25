import React from "react";
import './styles/SelectGroup.css';
import {mockCurrency} from "../mocks";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExchangeAlt} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SelectItem from "./SelectItem";

export interface Currency {
    id: number,
    symbol: string,
    name: string
}

interface Props {
    onChangeValue(sell: string, buy: string): void
}

interface State {
    sell: string,
    buy: string
}

class SelectGroup extends React.Component<Props, State> {

    state: State = {
        sell: '',
        buy: ''
    };

    constructor(props: Props) {
        super(props);

        this.selectChangeValue = this.selectChangeValue.bind(this);
        this.replaceValuesInSelect = this.replaceValuesInSelect.bind(this);
        this.convertCurrencies = this.convertCurrencies.bind(this);
        this.methodForButton = this.methodForButton.bind(this);
    }

    componentDidMount(): void {
        const sell: HTMLSelectElement = document.getElementById('sold') as HTMLSelectElement;

        for (let i = 0; i < mockCurrency.length; i++) {
            const option = document.createElement('option');
            option.text = `${mockCurrency[i].symbol} - ${mockCurrency[i].name}`;
            sell?.add(option);
        }

        const buy: HTMLSelectElement = document.getElementById('bought') as HTMLSelectElement;

        for (let i = 0; i < mockCurrency.length; i++) {
            const o = document.createElement("option");
            o.text = `${mockCurrency[i].symbol} - ${mockCurrency[i].name}`;
            buy?.add(o);
        }

        this.props.onChangeValue(sell.value, buy.value);

        this.setState({
            sell: sell.value,
            buy: buy.value
        })
    };

    // updating the value in the component
    selectChangeValue = () => {
        const sold = (document.getElementById('sold') as HTMLSelectElement).value;
        const bought = (document.getElementById('bought') as HTMLSelectElement).value;

        this.props.onChangeValue(sold, bought);

        this.setState({
            sell: sold,
            buy: bought
        })
    };

    // changing the select value by pressing the button
    replaceValuesInSelect = () => {
        const {sell, buy} = this.state;

        (document.getElementById('bought') as HTMLSelectElement).value = sell;
        (document.getElementById('sold') as HTMLSelectElement).value = buy;

        this.props.onChangeValue(buy, sell);

        this.setState({
            sell: buy,
            buy: sell
        });
    };

    // currency calculator according to the value of the exchange rate taken from api
    convertCurrencies = () => {
        const soldName = (document.getElementById('sold') as HTMLSelectElement).value.slice(0, 3);
        const boughtName = (document.getElementById('bought') as HTMLSelectElement).value.slice(0, 3);

        axios.get(`https://api.exchangeratesapi.io/latest?base=${soldName}&symbols=${boughtName}`)
            .then(response => {
                const {rates: boughtPrice} = response.data;
                const price = boughtPrice[boughtName];

                const amount: number = parseFloat((document.getElementById("amount") as HTMLInputElement).value);
                const result = amount * price;
                (document.getElementById("result") as HTMLElement).innerHTML = result.toFixed(2);
                (document.getElementById("currentRate") as HTMLElement).innerHTML = price.toFixed(4);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    methodForButton = () => {
        this.selectChangeValue();
        this.replaceValuesInSelect();
        this.convertCurrencies();
    };

    render() {

        return (
            <div className="selectGroup">
                <SelectItem
                    description='From'
                    id='sold'
                    selectChangeValue={this.selectChangeValue}
                    convertCurrencies={this.convertCurrencies}
                />
                <div>
                    <button
                        type='button'
                        id='changeCurrency'
                        onClick={this.methodForButton}>
                        <FontAwesomeIcon icon={faExchangeAlt} size='3x'/>
                    </button>
                </div>
                <SelectItem
                    description='To'
                    id='bought'
                    selectChangeValue={this.selectChangeValue}
                    convertCurrencies={this.convertCurrencies}
                />
            </div>
        );
    }
}

export default SelectGroup;