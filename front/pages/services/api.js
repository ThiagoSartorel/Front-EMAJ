import axios from 'axios'

var url = 'http://172.16.248.88:3333/'

axios.post(url,data, 
    {headers:
        {Authorization: `bearer ${token}` }
})