import React from 'react'
import {Routes, Route, NavLink, BrowserRouter} from 'react-router-dom'
import { Inicio } from '../components/Inicio'
import { Contacto } from '../components/Contacto'
import { Articulos } from '../components/Articulos'


export const RouterPrincipal = () => {
  return (
    <BrowserRouter> 
        <Routes>
            <Route path='/' element={<Inicio />}></Route>

            <Route path='/Inicio' element={<Inicio />}></Route>

            <Route path='/Contacto' element={<Contacto />}></Route>

            <Route path='/Articulos' element={<Articulos />}></Route>

            <Route path='*' element={<h1> Error 404</h1>} />
        </Routes>
    </BrowserRouter>
  )
}
 