import React, {FunctionComponent} from 'react';
import {DosageViewProps} from "./DosageViewTypes";

const DosageView:FunctionComponent<DosageViewProps> = ({dosage}) => {
    return (
        <div>
            {dosage.fertilizer.name}
            <br/>
            {dosage.value}
        </div>
    );
};

export default DosageView;