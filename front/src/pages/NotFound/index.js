import React from 'react';
import logo from '../../assets/img/2x/baixados.png';

export default function NotFound() {
    return(
        <div className="card">
            <img src={logo}></img>
            <h2>Essa página não foi encontrada. Tente novamente...</h2>
            <a href="http://localhost:3000/">Ir para o Encurtador</a>
        </div>
    )
}