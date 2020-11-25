import React from 'react';
import './App.css';
import PageDescription from "./components/PageDescription";
import SelectGroup from "./components/SelectGroup";
import InputGroup from "./components/InputGroup";
import InformationGroup from "./components/InformationGroup";

interface State {
    sell: string,
    buy: string
}

interface Props {

}

class App extends React.Component<Props, State> {
    state: State = {
        sell: '',
        buy: ''
    };

    constructor(props: Props) {
        super(props);

        this.changeValue = this.changeValue.bind(this);
    }

    changeValue = (sellNew: string, buyNew: string) => {
        this.setState({
            sell: sellNew,
            buy: buyNew
        })
    };

    render() {
        return (
            <div className='allPage'>
                <PageDescription/>
                <SelectGroup onChangeValue={this.changeValue}/>
                <InputGroup onChangeValue={this.changeValue}/>
                <InformationGroup/>
            </div>
        );
    }
}

export default App;
