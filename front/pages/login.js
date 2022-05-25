import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { useForm } from "react-hook-form";
import styles from '../styles/Home.module.css'
import Login1 from './components/loginRa';

function posicao(num) {
}

function exibeErro(msg) {
  document.getElementById("erro").innerHTML = msg.response.data.error
  return msg
}



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login EMAJ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.telaLogin}>
        <div className={styles.imagemLogin}>
        </div>
        <div className={styles.formLogin}>
          <h1 className={styles.tituloLogin}>LOGIN</h1>
          <div className={styles.formulario}>
            <Login1></Login1>
          </div>
          <footer className={styles.footer}>
              <h4>NIU</h4>
            </footer>
        </div>
      </main>
    </div>
  )
}


{/* <label>Matricula</label><br />
<input className={styles.inputLogin} name="ra" {...register("ra")} required></input>
{exibirInput(0)}
<div id="DivSenha" hidden>
  <label>Senha</label><br />
  <input className={styles.inputLogin} type="password" name="password" {...register("password")}></input>
</div>
<div id="DivCod" hidden>
  <label>Codigo</label><br />
  <input className={styles.inputLogin} name="cod" {...register("cod")}></input>
  <span>Um codigo de confirmação foi enviado para seu email.</span>
  <br />
  <label>Criar senha</label><br />
  <input className={styles.inputLogin} name="senha" {...register("NPassword")}></input>
  <label>Repita a senha</label><br />
  <input className={styles.inputLogin} name="reSenha" {...register("NrePassword")}></input>
</div> */}