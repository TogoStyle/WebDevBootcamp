import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Contacto } from '../components/Contacto'
import { Listado } from '../components/Listado';

export const RouterPrincipal = ({ listState, setListState }) => {
  return (
    <Routes>
      <Route path='/' element={<Listado listState={listState} setListState={setListState} />} />
      <Route path='/contacto' element={<Contacto />} />
      <Route path='*' element={<h1> Error 404</h1>} />
    </Routes>
  )
}
