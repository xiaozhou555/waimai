/**
 * Created by QZ on 2018/3/7.
 */
import axios from 'axios'
export default {
  api(){
    return axios.get('./static/data.json');
  }
}


 // const api_url = './static/data.json'
