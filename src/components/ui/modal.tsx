import React from 'react'

interface ModalProps {
  isOpen: boolean
  children: React.ReactNode
  className?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden w-1/3'>
        <div className='p-4'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
