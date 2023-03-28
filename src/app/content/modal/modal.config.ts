export interface ModalConfig {
    modalTitle: string
    dismissButtonLabel?: string
    closeButtonLabel?: string
    shouldClose?: boolean
    shouldDismiss?(): Promise<boolean> | boolean
    onClose?(): Promise<boolean> | boolean
    onDismiss?(): Promise<boolean> | boolean
    disableCloseButton?(): boolean
    disableDismissButton?(): boolean
    hideCloseButton?(): boolean
    hideDismissButton?(): boolean
    index?:number

    
}