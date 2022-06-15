import Router from 'next/router'
import axios from 'axios'
import styles from '../../styles/Menu.module.css'
import { parseCookies } from 'nookies'
import Image from 'next/image'
import logo from '../../public/Login/logoSescrita.png'
import { removeCookies } from "cookies-next";
import Auth from '../components/auth'

//Função que define o que vai ser feito com usuario
function Nav() {

    async function presence() {
        //validar checkin / checkout

    }

    async function permissions(){
        //validar permissões
        var user = await Auth();
        try{
        switch (user.loggedInUser.permissao_id){
            case 3:
                console.log("aluno")
                document.getElementById("Atividade").hidden = false;
                document.getElementById("BancoHoras").hidden = false;
                document.getElementById("Calendario").hidden = false;
                document.getElementById("Checkin").hidden = false;
                break;
        }
        return user
        }catch{
            console.log("Erro ao buscar permição")
        }
    }

    async function logout() {
        const token = parseCookies().emaj
        const resposta = await axios.post(process.env.BACKEND + 'logado/logout', 'data',
            {
                headers:
                    { Authorization: `bearer ${token}` }
            }
        )
        if (resposta.status == 200) {
            removeCookies('emaj')
            Router.push('/login')
        }
    }

    function atividade() {
        Router.push('atividade')
    }
    
    function home() {
        Router.push('home')
    }

    permissions();

    return (
        <div className={styles.navLateral}>
            <Image src={logo} className={styles.logo}></Image>
            <h2 className={styles.navTitulo}>EMAJ</h2>
            <hr></hr>
            <br />
            <button id="Home" onClick={(event) => home(event)}>Home</button>
            <button id="Atividade" onClick={(event) => atividade(event)} hidden>Atividades</button>
            <button id="BancoHoras" hidden>Banco de horas</button>
            <button id="Calendario" hidden>Calendário</button>
            <button id="Checkin" onClick={(event) => presence(event)} hidden>Checkin/out</button>
            <button hidden>Casos</button>
            <button hidden>Alunos</button>
            <button hidden>Agenda</button>
            <button hidden>Validações</button>
            <a className={styles.btnSair} onClick={(event) => logout(event)}>Sair</a>
        </div>
    );
}


export default Nav










