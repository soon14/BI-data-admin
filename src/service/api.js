import request from "./request";
import { api } from "@/config/index";
import store from './../store';
export default class ApiService {
  static getApiPre(type) {
    switch (type) {
      case "admin":
        return api.adminUrl;
      default:
        return api.adminUrl;
    }
  }


  //总的接口
  static getData(code, date) {
    return request.get(api.adminUrl + `query?code=${code}&parameter=${date}`);
  }
  static getChartQuery(code, date, fields) {
    return request.get(api.adminUrl + `chartQuery?code=${code}&parameter=${date}&fields=${fields}`);
  }

  static getTotal(params) {

    let obj = {
      sql_type:store.state.showMoney==true?'AMT':'QTY',
      prod_area_name:store.state.model
    };
    Object.assign(params,obj);

    return request.get( api.adminUrl +`query?`,
    params
    );
  }

  // axios.get('/user', {
  //   params: {
  //     ID: 12345
  //   }
  // })

  //登录接口
  static login(data) {
    return request.post(api.adminUrl + `login`, data);
  }
}