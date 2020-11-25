import React from "react";
import './styles/PageDescription.css';

class PageDescription extends React.Component<any, any> {
    render() {
        return (
            <div className='pageDescription'>
                <h1 className='webTitle'>Always get the real exchange rate.</h1>
                <p className='webSubtitle'>Banks markup the exchange rate when you spend or transfer money
                    abroad. We don't.</p>
            </div>
        );
    }
}

export default PageDescription;