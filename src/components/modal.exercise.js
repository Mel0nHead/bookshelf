import {Dialog, CircleButton} from './lib'
import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'

const ModalContext = React.createContext()

function Modal({children}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ModalContext.Provider value={{isOpen, setIsOpen}}>
      {children}
    </ModalContext.Provider>
  )
}

function callAll(fns) {
  ;[...arguments].forEach(fn => {
    if (typeof fn === 'function') {
      fn()
    }
  })
}

function ModalDismissButton({children}) {
  const {setIsOpen} = React.useContext(ModalContext)
  const closeModal = () => setIsOpen(false)
  const onClick = () => callAll(children.props.onClick, closeModal)

  return React.cloneElement(children, {onClick})
}

function ModalOpenButton({children}) {
  const {setIsOpen} = React.useContext(ModalContext)
  const openModal = () => setIsOpen(true)
  const onClick = () => callAll(children.props.onClick, openModal)

  return React.cloneElement(children, {onClick})
}

function ModalContentBase({children, ...otherProps}) {
  const {setIsOpen, isOpen} = React.useContext(ModalContext)
  const onDismiss = () => setIsOpen(false)

  return (
    <Dialog isOpen={isOpen} onDismiss={onDismiss} {...otherProps}>
      {children}
    </Dialog>
  )
}

function ModalContent({children, title, ...rest}) {
  return (
    <ModalContentBase {...rest}>
      <ModalDismissButton>
        <CircleButton>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </CircleButton>
      </ModalDismissButton>
      <h3 css={{textAlign: 'center', fontSize: '2em'}}>{title}</h3>

      {children}
    </ModalContentBase>
  )
}

export {Modal, ModalDismissButton, ModalOpenButton, ModalContent}
