import Router from 'next/router'
import axios from 'axios'
import styles from '../../styles/Menu.module.css'
import { parseCookies } from 'nookies'
import Image from 'next/image'
import logo from '../../public/Login/logoSescrita.png'
import { removeCookies } from "cookies-next";

//Função que define o que vai ser feito com usuario
function Nav() {

    async function presence() {
        //validar checkin / checkout

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

    return (
        <div className={styles.navLateral}>
            <Image src={logo} className={styles.logo}></Image>
            <h2 className={styles.navTitulo}>EMAJ</h2>
            <hr></hr>
            <br />
            <button onClick={(event) => presence(event)}>Checkin</button>
            <button>Botão 2</button>
            <button>Botão 3</button>
            <button>Botão 4</button>
            <button className={styles.btnSair} onClick={(event) => logout(event)}>Sair</button>
        </div>
    );
}


export default Nav










