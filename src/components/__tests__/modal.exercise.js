import React from 'react'
import {render, screen} from '@testing-library/react'
import {Modal, ModalContents, ModalOpenButton} from '../modal'
import userEvent from '@testing-library/user-event'

test('can be opened and closed', () => {
  render(
    <Modal>
      <ModalOpenButton>
        <button>open modal</button>
      </ModalOpenButton>
      <ModalContents aria-label="Modal contents" title="Modal Title">
        <div>I am modal contents</div>
      </ModalContents>
    </Modal>,
  )

  userEvent.click(screen.getByRole('button', {name: /open modal/i}))

  expect(screen.getByText(/modal title/i)).toBeInTheDocument()
  expect(screen.getByText(/i am modal contents/i)).toBeInTheDocument()

  userEvent.click(screen.getByRole('button', {name: /close/i}))

  expect(screen.queryByText(/modal title/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/i am modal contents/i)).not.toBeInTheDocument()
})
