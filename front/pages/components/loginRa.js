import Router from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import styles from '../../styles/Login.module.css'
import { useForm } from "react-hook-form";
import { parseCookies, setCookie, destroyCookie } from 'nookies'

function logado(token) {
  setCookie(null, 'emaj', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
  Router.push('/home')
}

//Função para enviar a parcial do email para a tela
function exibeEmail(email) {
  var poss = email.indexOf("@") //Pega a posição do @
  var primeiro = email.slice(0, poss)//separa a primeira parte do email
  var segundo = email.slice(poss)//separa a segunda parte do email
  for (var i = 0; i < (primeiro.length) / 2; i++) {
    primeiro = primeiro.replace(primeiro[i], "*") //Subistitui a metade da primeira parte por *
  }
  return primeiro + segundo //concatena novamente o email
}
//Função que define o que vai ser feito com usuario
function Validation() {
  const { register, handleSubmit } = useForm()
  var email = "" //variavel que irá receber o email do usuario com *

  async function login(body) {

    var primeiro_login = ""

    if (body.ra != "" && body.Nsenha == "" && body.Rsenha == "" && body.senha == "" && body.codigo == "") {
      //consulta para validar RA
      //1 - Consulta ra
      document.getElementById("Mensagem").innerHTML = "";
      try {
        document.getElementById("loading").hidden = false;
        // --------- CONSULTA RA
        var retorno = await axios.post(process.env.BACKEND + "aluno/login", {
          'ra': body.ra
        })
        document.getElementById("loading").hidden = true;
        if (retorno.status == 200) {
          primeiro_login = retorno.data.usuario.primeiro_login;
          email = retorno.data.aluno.EMAIL
        }
      } catch (e) {
        console.log("Erro ao buscar matricula")
        document.getElementById("Mensagem").innerHTML = "Matrícula incorreta ou inexistente!"
        primeiro_login = 3
      }

    } else if (body.ra != "" && body.Nsenha != "" && body.Rsenha != "" && body.senha == "" && body.codigo != "") {
      //2 - Consulta para registrar usuario 
      document.getElementById("Mensagem").innerHTML = "";
      if (body.Nsenha == body.Rsenha) {
        console.log("registrando")
        try {
          // --------- CONSULTA CODIGO / DEFINIR SENHA
          retorno = await axios.post(process.env.BACKEND + "aluno/register", {
            'ra': body.ra,
            'codigo_ativacao': body.codigo,
            'password': body.Nsenha
          })
          if (retorno.status == 200) {
            primeiro_login = retorno.data.usuario.primeiro_login
          }
        } catch (e) {
          console.log("Codigo de verificação incorreto")
          document.getElementById("Mensagem").innerHTML = "Codigo incorreto!"
          primeiro_login = 1;
        }

      } else {
        //alertar o usuario que as 2 senhas estão diferentes
        document.getElementById("Mensagem").innerHTML = "As senhas não são iguais!"
        primeiro_login = 1;
      }
    } else {
      //consulta para validar login
      document.getElementById("Mensagem").innerHTML = "";
      console.log("Logando")
      try {
        retorno = await axios.post(process.env.BACKEND + "login", {
          'ra': body.ra,
          'password': body.senha
        }).catch(console.error)
        if (retorno.status == 200) {
          //usuario logado
          console.log("Logado com sucesso")
          logado(retorno.data.token);
        }
      } catch (e) {
        //Informar ao usuario erro no login
        console.log("Erro ao tentar efetuar o login")
        document.getElementById("Mensagem").innerHTML = "Usuário ou senha incorretos!"
      }
    }

    if (primeiro_login == 0) { //primeiro
      //retornar que a primeira parte do login deu boa
      //solicitar senha
      document.getElementById("ra").disabled = true
      document.getElementById("senha").hidden = false
      document.getElementById("codigo").hidden = true
    } else if (primeiro_login == 1) {
      //retornar que a aprimeira parte do login deu boa
      //solicitar codigo + senhas
      document.getElementById("email").innerHTML = "Um codigo foi enviado para " + exibeEmail(email)

      document.getElementById("ra").disabled = true
      document.getElementById("codigo").hidden = false
      document.getElementById("senha").hidden = true
    }

  }
  return (
    <div className='menu'>
      <form onSubmit={handleSubmit(login)}>
        <label>Matricula</label>
        <input id="ra" type="number" className={styles.inputLogin} name="ra" {...register("ra")}></input>
        <div id="senha" hidden>
          <label>Senha</label>
          <input type="password" className={styles.inputLogin} name="senha" {...register("senha")}></input>
        </div>
        <div id="codigo" hidden>
          <span id="email"></span>
          <br></br>
          <label>Insira o codigo</label>
          <input id="cod" type="text" className={styles.inputLogin} name="codigo" {...register("codigo")}></input>

          <br />
          <label>Crie sua senha</label>
          <input id="pass1" type="password" className={styles.inputLogin} name="Nsenha" {...register("Nsenha")}></input>
          <label>Re-Senha</label>
          <input id="pass2" type="password" className={styles.inputLogin} name="Rsenha" {...register("Rsenha")}></input>
        </div>
        <p id="Mensagem"></p>
        <div id="loading" className={styles.loader} hidden></div>
        <button type="submit" className={styles.btnLoginavancar}>Avançar</button>
      </form>
    </div>
  );
}


export default Validation










