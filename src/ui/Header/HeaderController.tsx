import { useState } from 'react'
import { Header } from './Header'
import { useNavigate } from 'react-router'

export const HeaderController = () => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  const handleIsVisible = () => {
    setVisible((prev) => !prev)
  }

  const handleClose = () => setVisible(false)

  const handleSelectGenre = (genreId: number) => {
    navigate(`/genre/${genreId}`)
    handleClose()
  }

  return (
    <Header
      handleIsVisible={handleIsVisible}
      visible={visible}
      onClose={handleClose}
      handleSelectGenre={handleSelectGenre}
    />
  )
}
