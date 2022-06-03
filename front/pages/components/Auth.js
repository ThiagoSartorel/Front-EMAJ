import axios from 'axios'
import { parseCookies } from 'nookies'

//Função para autoruzação do usuario
async function Auth() {
  try {
    const token = parseCookies().emaj
    const response = await axios.get(process.env.BACKEND + 'logado/me',
      {
        headers:
          { Authorization: `bearer ${token}` }
      }
    )
   return response.data
  }catch (e) {
    return false
  }
}

export default Auth










