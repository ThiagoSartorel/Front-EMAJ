
import { useState } from 'react'
import axios from 'axios'
import styles from '../../styles/Home.module.css'
import { useForm } from "react-hook-form";

function Login1() {
  const { register, handleSubmit } = useForm()

  async function loginRa(body) {
    console.log(body)

    if (body.ra != "" && body.Nsenha == "" && body.Rsenha == "" && body.senha == "" && body.codigo == "") {
      //consulta para validar RA
      var retorno = await axios.post(process.env.BACKEND + "aluno/login", {
        'ra': body.ra
      })//.then(response => { }).catch((error) => console.log(error))
    }else if (body.ra != "" && body.Nsenha == "" && body.Rsenha == "" && body.senha != "" && body.codigo == ""){
      //consulta para validar login
    }else if (body.ra != "" && body.Nsenha != "" && body.Rsenha == "" && body.senha == "" && body.codigo != ""){
      //consulta para registrar usuario 
      if(body.Nsenha == body.Rsenha){
        console.log("registrando")
        var retorno = await axios.post(process.env.BACKEND + "aluno/register", {
          'ra': body.ra,
          'codigo_ativacao': body.codigo,
          'password': body.Nsenha
        })
        //Limpar os campos codigo e N/Rsenha do body
      }else{
        //alertar senha incorreta
      }
    }
    
    console.log(retorno)



    if (retorno === "") {
      console.log("Erro ao validar a matricula")
      //exibir mensagem de erro para o usuario
    } else if (retorno == 0) { //.data.usuario.primeiro_login
      //retornar que a primeira parte do login deu boa
      //solicitar senha
      document.getElementById("senha").hidden = false
      document.getElementById("codigo").hidden = true
    } else {
      //retornar que a aprimeira parte do login deu board
      //solicitar codigo mais senhas
      document.getElementById("codigo").hidden = false
      document.getElementById("senha").hidden = true
    }

  }
  return (
    <div className='menu'>
      <form onSubmit={handleSubmit(loginRa)}>
        <label>Matricula</label>
        <input type="number" className={styles.inputLogin} name="ra" {...register("ra")}></input>
        <div id="senha" hidden>
          <label>Senha</label>
          <input type="text" className={styles.inputLogin} name="senha" {...register("senha")}></input>
        </div>
        <div id="codigo" hidden>
          <label>Codigo</label>
          <input type="text" className={styles.inputLogin} name="codigo" {...register("codigo")}></input>
          <span>Um codigofoi enviado para seu email.</span>
          <br />
          <label>Senha</label>
          <input type="text" className={styles.inputLogin} name="Nsenha" {...register("Nsenha")}></input>
          <label>Re-Senha</label>
          <input type="text" className={styles.inputLogin} name="Rsenha" {...register("Rsenha")}></input>
        </div>
        <button type="submit" className={styles.btnLoginavancar}>Avançar</button>
      </form>
    </div>
  );
}


export default Login1










