import React, {FC} from 'react';
import {ChemicalAtom} from "../../../models/chemicalAtom";

interface AtomConstructorProps {
    atom: ChemicalAtom
}

const AtomConstructor: FC<AtomConstructorProps> = ({atom}) => {
    return (
        <div>
            atom name: {atom.chemicalUnit.name}
        </div>
    );
};

export {AtomConstructor}