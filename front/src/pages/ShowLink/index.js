import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import podium from '../../assets/img/2x/podium.png';
import chevronLeft from '../../assets/img/SVG/chevron-left-solid.svg';
import api from '../../services/api';
import './style.css';

//This page is responsible for show to user the shortened generated link 
export default function ShowLink({match}) {
    console.log("show")
    const [rank, setRank] = useState([])
    
    let { link } = useParams();

    async function results(){
        await api.get(`/show/${match.params.id}`, {'method': 'GET'})
        .then(res => {
            setRank(res.data)
        })
        .catch(err => {
            console.log(err);
            //alert(err); //See this error
        });
    }

    useEffect(() => {
        results()
       
    }, [])
    
    return(
        <main>
            <div className="side">
                <div className="card">
                    <h2>Encurte um link:</h2>
                    <h2 id="link">
                        <a href={`/${link}`}>
                            {`petit.com/${link}`}
                        </a>
                    </h2>
                    <br/>
                    <button id="short-btn" type="submit" >
                        Encurtar
                    </button>
                </div>
                <div id="ranking">
                    <h2>Todos as URLS</h2>
                    <table>
                        <thead>
                            <th></th>
                            <th>Endereço Original</th>
                            <th>Novo Link</th>
                            <th>Data Criação</th>
                        </thead>
                        <tbody>
                            {rank.map((elem, it) => {
                                return (
                                    <tr>
                                        <td>{it+1})</td>
                                        <td>{(elem[0])}</td>
                                        <td><a href={'http://localhost:8880/' + elem[2]}>petit.com/{elem[2]}</a></td>
                                        <td>{elem[1]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <img src={podium} id="podium-img" alt="podium"/>
        </main>
    )
}