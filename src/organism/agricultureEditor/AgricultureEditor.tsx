import React, {FC} from 'react';
import { AgricultureEditorProps } from './AgricultureEditorTypes';
import {translate} from "../../helpers/translate/translate";

const AgricultureEditor: FC<AgricultureEditorProps> = (props) => {
    return (
        <div>
            {translate('agriculture editor')}
        </div>
    );
};

export {AgricultureEditor}