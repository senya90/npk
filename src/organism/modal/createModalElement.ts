import {IdGenerator} from "../../helpers/idGenerator/IdGenerator";

export const createModalElement = (modalDom: HTMLElement): {element: HTMLElement, id: string} => {
    const element = document.createElement('div')
    const id = IdGenerator.generate()
    element.id = id
    modalDom.appendChild(element)

    return {element, id}
}