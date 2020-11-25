import React from "react";
import './styles/SelectItem.css';

interface Props {
    description: string,
    id: string,

    selectChangeValue(): void,

    convertCurrencies(): void
}

class SelectItem extends React.Component <Props, {}> {

    constructor(props: Props) {
        super(props);
        this.methodForSelectItems = this.methodForSelectItems.bind(this);
    }

    methodForSelectItems = () => {
        this.props.selectChangeValue();
        this.props.convertCurrencies();
    };

    render() {
        return (
            <div className='selectItem'>
                <p className="description">{this.props.description}</p>
                <select
                    id={this.props.id}
                    onChange={this.methodForSelectItems}
                />
            </div>
        );
    }
}

export default SelectItem;