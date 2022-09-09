import React, {useState} from 'react';

import './style.css';
import api from '../../services/api';

import logo from '../../assets/img/2x/baixados.png';

/*
 * Home component that returns the homepage of PetitLink
 */
export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    var pasteLink = ''

    /*
    * This function validates short-string
    */
    async function loginShort(){
        if(user == '') {
            alert("Digite o email")
            return true
        }

        if(password == '') {
            alert("Digite a senha")
            return true
        }
        console.log("hello" )
        await api.post(`/login`, {user, password})
            .then(res => {
                res = Number(res.data)
                console.log("aqi",  typeof res, typeof res == Number)
                if(res > 0){
                    console.log("aq")
                    window.location = `/show/${res}`
    
                }
                else {
                    alert("Usuário inválido")
                    return true
                }
            })
            .catch(err => {
                console.log(err);
                //alert(err); //See this error
             });
    }



    return(
        <main>
            <div className="side card">
                <img id="logo" src={logo} alt="logo"></img>
                <div id="slogan">Entre no Sistema!
                    <br/>
                </div>
                
                <div id="short-bar">
                    <div className="url-field">
                        <input
                            id="url-input"
                            placeholder="email@hotmail.com"
                            onChange={(el) => setUser(el.target.value)}
                        />
                    </div>
                    <div className="url-field">
                        <input
                            id="url-input"
                            placeholder="senha"
                            type="password"
                            onChange={(el) => setPassword(el.target.value)}
                        />
                    </div>

                    <button id="short-btn" type="submit" onClick={() => loginShort()} >
                        Logar
                    </button>
                </div>
            </div>
        </main>
    )
}