import React from 'react'
import ReactDOM from 'react-dom/client'
import Cadastro from './pages/Cadastro/'
import { Toaster } from 'react-hot-toast'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Cadastro />
    <Toaster />
  </React.StrictMode>
)
