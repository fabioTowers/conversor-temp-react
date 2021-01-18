import React from 'react'
import ReactDOM from 'react-dom'

//importando o componente react
import Conversor from './componentes/Conversor'

/*Renderizando dentro da div em index.html com id=root o elemento Conversor */
ReactDOM.render(
    <Conversor></Conversor>,
    document.getElementById('root')
)