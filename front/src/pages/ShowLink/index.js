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
    const [link, setLink] = useState([])
    
    //let { link } = useParams();

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

    async function add_url(){
        await api.post(`/add_url/${match.params.id}`, {link})
            .then(res => {
                console.log(res);
                results();
                return true
            })
            .catch(err => {
                console.log(err);
             });
    }

    useEffect(() => {
        results()
       
    }, [link])
    
    return(
        <main>
            <div className="side">
                <div className="card">
                    <h2>Encurte um link:</h2>
                    <div className="url-field" style = {{justifyContent : 'center', marginLeft: '45px'}}>
                        <input
                            id="url-input"
                            placeholder="http://"
                            onChange={(el) => setLink(el.target.value)}
                        />
                    </div>
                    <br/>
                    <button id="short-btn" type="submit"  onClick={() => add_url()} >
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
                                        <td>{(elem[1])}</td>
                                        <td><a href={'http://localhost:3000/' + elem[2]}>{elem[2]}</a></td>
                                        <td>{elem[4]}</td>
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