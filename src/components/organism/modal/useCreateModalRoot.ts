export const useCreateModalRoot = (elementId: string) => {
    let modalDom = document.getElementById(elementId)
    if (modalDom) {
        return modalDom
    }
    modalDom = document.createElement("div")
    modalDom.id = elementId
    document.body.appendChild(modalDom)

    return modalDom
}