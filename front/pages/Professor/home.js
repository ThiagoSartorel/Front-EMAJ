import axios from 'axios';
import Head from 'next/head'
import styles from '../../styles/Menu.module.css'
import { parseCookies, setCookie } from 'nookies'
import { removeCookies } from "cookies-next";
import Router from 'next/router'
import Nav from '../components/navMenu'
import Auth from '../components/auth'

var userName = ""
var user = ""

async function validaUser() {
  user = await Auth()
  if (user == false) {
    Router.push('/login')
  } else {
    userName = user.aluno.NOME
    document.getElementById("Nome").innerHTML = userName
  }
}

export default function Home() {
  validaUser()
  return (
    <div className={styles.container}>
      <Head>
        <title>EMAJ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.telaHome}>
        <div className={styles.bodyHome}>
          <Nav></Nav>
          <div className={styles.board}>
            <div className={styles.conteudo}>
              <h2>Bem vindo </h2><p id="Nome"></p>
            </div>
            <footer className={styles.footer}>
              <h4>NIU</h4>
            </footer>
          </div>
        </div>
      </main >
    </div >
  )
}