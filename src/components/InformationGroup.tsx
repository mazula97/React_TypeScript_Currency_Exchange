import React from "react";
import './styles/InformationGroup.css';

class InformationGroup extends React.Component<any, any> {
    render() {
        return (
            <div className="informationGroup">
                <div className="informationGroupRate">
                    <div>
                        <p className="description">Current rate</p>
                        <p className="information" id="currentRate">1</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default InformationGroup;