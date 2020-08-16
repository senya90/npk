import React from "react";

export type DispensingContextType = {
    onVolumeChanged: (volume: number) => void
}

export const DispensingContext = React.createContext<DispensingContextType>({
    onVolumeChanged(volume: number): void {
    }
})