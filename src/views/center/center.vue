<template>
  <div class="bg">
    <div class="flex-title">
      <div class="flex-back">
        <div class="back" @click="goBack">
          <a-icon type="left" style="color: #19ecff" />后退
        </div>
        <div class="left-font">当前登录人：{{ userName }}</div>
        <div class="left-font">当前页面：{{ pathName }}</div>
      </div>
      <div class="flex-right">
        <!-- <div class="right-font">
          <a-icon type="printer" style="color: #19ecff; margin-right: 4px" />打印
        </div> -->
        <div class="right-font" @click="changeyear">
          <a-icon type="upload" style="color: #19ecff; margin-right: 4px" />导出数据
        </div>

        <div class="right-font" @click="logout">
          <a-icon type="user" style="color: #19ecff; margin-right: 4px" />退出登录
        </div>
      </div>
    </div>
    <div class="flex-header">
      <div class="flex-font-left">
        <div @click="clickChange(1)" :class="index == 1 ? 'head-box active' : 'head-box'">
          <span>PSI</span>
        </div>
        <div @click="clickChange(2)" :class="index == 2 ? 'head-box active' : 'head-box'">
          <span>S</span>
        </div>
        <div class="head-box"><span>I</span></div>
        <div class="head-box"><span>P</span></div>
        <div class="change-flex" style="margin-left: 14px">
          <div :class="cus == true ? 'change-box active' : 'change-box'" @click="changeNum(1)">
            <span>金额版</span>
          </div>
          <div :class="cus == false ? 'change-box active' : 'change-box'" @click="changeNum(2)">
            <span>数量版</span>
          </div>
        </div>
      </div>
      <div class="title-bg">
        <div class="title">生活电器数智产销中台</div>
      </div>
      <div class="flex-font-left">
        <div class="head-box-right" style="margin-right: 14px">
          <span>{{ land
          }}
            <a-icon type="down" style="padding-left: 3px; font-size: 14px" />
          </span>
          <div class="drop-down">
            <div class="down-font" @click="changeland('本部')">本部</div>
            <div class="down-font" @click="changeland('OEM')">OEM</div>
            <div class="down-font" @click="changeland('所有')">所有</div>
          </div>
        </div>

        <div class="change-flex">
          <div :class="
            direction == '1' ? 'head-box-right active' : 'head-box-right'
          " @click="changedirection(1)">
            <span>销向</span>
          </div>
          <div :class="
            direction == '2' ? 'head-box-right active' : 'head-box-right'
          " @click="changedirection(2)">
            <span>产司</span>
          </div>
        </div>
        <div class="change-flex">
          <div class="head-box-right right-width">
            <!-- <span>{{ year }}</span> -->
            <!-- <div class="drop-down drop-down-year">
              <div class="down-font-year" @click="changeyear('2022')">2022</div>
              <div class="down-font-year" @click="changeyear('2021')">2021</div>
            </div> -->
            <span @click="changeyear">年度</span>
          </div>
          <div class="head-box-right right-width drop-month">
            <span>{{ year }}{{ month }}
              <a-icon type="down" style="padding-left: 3px; font-size: 14px" />
            </span>
            <div class="drop-down drop-down-year">
              <div v-for="(item, i) in timeList" :key="i + 12" class="down-font-year" @click="changemonth(item)">{{ item
              }}
              </div>
              <!-- <div class="down-font-year" @click="changemonth('04')">4</div>
              <div class="down-font-year" @click="changemonth('05')">5</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <a-layout-content class="layout-content">
      <keep-alive include="qualityList,outside,order">
        <router-view />
      </keep-alive>
    </a-layout-content>
  </div>
</template>

<script>
import Vue from "vue";
import API from "../../service/api";
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      searchKeys: [this.$route.path, this.$route.meta.preMenuUrl || ""],
      // index: 1,
      // title: "总裁PSI页",
      // cus: 1,
      land: "产地",
      // direction: 1,
      year: new Date().getFullYear(),
      month: '01',
      date: new Date(),
      userName: "",
      timeList: [],/*月度选项列表*/
    };
  },
  computed: {
    titleNav() {
      return this.$route.meta.title;
    },
    path() {
      return this.$route.name;
    },
    pathName() {
      return this.$store.state.currPath;
    },
    direction() {
      return this.$store.state.direction;
    },
    index() {
      return this.$store.state.index;
    },
    cus() {
      return this.$store.state.showMoney
    }
  },
  watch: {
    $route: function (val) {
      if (val.meta.preMenuUrl || this.$route.path) {
        this.searchKeys = [this.$route.path, val.meta.preMenuUrl || ""];
        console.log("路由", val.name, val.name.indexOf('epartment'));
        if (val.name.indexOf('epartment') > 0) {
          this.$store.commit('setDirection', 2); /*产司*/
        } else {
          this.$store.commit('setDirection', 1);/*销向*/
        }
        if (val.name == 'psi') {
          this.$store.commit('setIndex', 1);
        } else {
          this.$store.commit('setIndex', 2);
        }
        this.getPageName(val.name);
      }
    },
  },
  methods: {
    getPageName(path) {
      switch (path) {
        case "psi":

          this.$store.commit("setCurrPath", "总裁PSI页");
          break;
        case "index":

          this.$store.commit("setCurrPath", "销向汇总页");
          break;
        case "department":

          this.$store.commit("setCurrPath", "产司汇总页");
          break;

        case "productCo":

          this.$store.commit("setCurrPath", "品类汇总");
          break;
        case "domestic":

          this.$store.commit("setCurrPath", "内销汇总");
          break;
        case "export":

          this.$store.commit("setCurrPath", "外销汇总");
          break;
        case "onlineSummary":

          this.$store.commit("setCurrPath", "内销线上汇总");
          break;
        case "catSeries":

          this.$store.commit("setCurrPath", "合作模式二负责人");
          break;

        case "modeCo":

          this.$store.commit("setCurrPath", "  合作模式三负责人 ");
          break;
        case "onlineModeCo":

          this.$store.commit("setCurrPath", "  合作模式四负责人 ");
          break;

        case "offlineSummary":

          this.$store.commit("setCurrPath", "内销线下汇总");
          break;

        case "offlineCatSeries":

          this.$store.commit("setCurrPath", "  合作模式二负责人 ");
          break;
        case "offlineCode":

          this.$store.commit("setCurrPath", " 合作模式三负责人  ");
          break;
        /*外销*/
        case "exprotAreaAll":

          this.$store.commit("setCurrPath", " 外销大区汇总页");
          break;

        case "exprotProductCo":

          this.$store.commit("setCurrPath", " 外销大区产司汇总页  ");
          break;

        case "domesticDepartment":

          this.$store.commit("setCurrPath", " 内销汇总产司页  ");
          break;

        case "onlineSummaryDepartment":

          this.$store.commit("setCurrPath", " 内销线上汇总产司页  ");
          break;

        case "offlineSummaryDepartment":

          this.$store.commit("setCurrPath", " 内销线下汇总产司页  ");
          break;

        case "exportDepartment":

          this.$store.commit("setCurrPath", " 外销产司汇总页  ");
          break;
        case "exprotAreaAllDepartment":

          this.$store.commit("setCurrPath", " 外销大区产司汇总页  ");
          break;

        default:

          this.$store.commit("setCurrPath", "总裁PSI页");
        // this.direction = 1
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    changeland(item) {
      // if (item == "所有") {
      //   this.land = "所有";
      // } else {
      this.land = item;
      // }
      switch (item) {
        case "本部":
          this.$store.commit("setModel", "本部");
          break;
        case "OEM":
          this.$store.commit("setModel", "OEM");
          break;
        case "所有":
          this.$store.commit("setModel", "本部,OEM,待定");
          break;
      }
    },

    async menuInfo() {
      let res = await API.menuList();
      localStorage.setItem("menu", JSON.stringify(res))
    },

    changedirection(index) {   /*1:销向  2:产司*/
      this.$store.commit('setDirection',index);
    
      let urlName = this.$route.name;
      console.log('exprotAreaAll',index == "2" && urlName == "exprotAreaAll",this.$route.query.key);
      
      if (index == "1" && urlName.includes('Department')==false) {  /*销向页点销向 */
        this.$router.push("/center/index");
        
      }
      if (index == "2" && urlName == "psi" || urlName == "index") {
        this.$router.push("/center/department");

      } else if (index == "2" && urlName == "domestic") {
        this.$router.push("/center/domesticDepartment");

      } else if (index == "2" && urlName == "onlineSummary") {
        this.$router.push("/center/onlineSummaryDepartment");

      } else if (index == "2" && urlName == "offlineSummary") {
        this.$router.push("/center/offlineSummaryDepartment");

      } else if (index == "2" && urlName == "export") {
        this.$router.push("/center/exportDepartment");

      } else if (index == "2" && urlName == "exprotAreaAll") {
    
        this.$router.push({ name: 'exprotAreaAllDepartment', query: { key: this.$route.query.key } });
        
      } else if (index == "1" && urlName.includes('Department')) { /*产司切换回销向*/

        if(urlName == 'exprotAreaAllDepartment'){
          this.$router.push({ name: 'exprotAreaAll', query: { key: this.$route.query.key } });
        }else{
          this.$router.push({name:urlName.replace('Department','')});
        }
      }
      // else {

      // }
    },

    async logout() {
      let token = localStorage.getItem("token")
      await API.loginout(token);
      localStorage.removeItem("token")
      Cookies.remove('mip_sso_id');
      location.href = "https://signin.midea.com/logout?service=http://p.midea.com"
    },

    changeyear(item) {
      this.$message({
        message: '模块建设中...',
        type: 'success'
      });
      // this.year = item;
      // this.$store.commit("setYear", item);
    },
    changemonth(item) {
      this.month = item.substr(4); /*获取选项里的月份*/
      let year = item.substr(0, 4);
      let val = this.month.length < 2 ? "0" + this.month : this.month;

      // this.$store.commit("setYear",'2022');
      this.$store.commit("setMonth", val);

      let end = new Date(year, val, '0').getDate();
      console.log('year', year, val, '0', end)

      this.$store.commit('setEndDay', end);
      // let date = new Date()


    },
    changeNum(index) {
      this.cus = index;
      if (index == 2) {
        this.$store.commit("setShowMoney", false);
      } else {
        this.$store.commit("setShowMoney", true);
      }
    },
    clickChange(i) {
      this.$store.commit('setIndex', i);
      this.$store.commit('setDirection', 1);
      if (i == 1) {
        this.$router.push("/center/psi");

      } else {
        this.$router.push("/center/index");

      }
    },

  },
  mounted() {
    this.menuInfo();
    localStorage.removeItem("showMoney");
    this.userName = localStorage.getItem("userName");
  },
  created() {
    let month = this.date.getMonth() + 1;
    let day = this.date.getDate();
    if(day == 1){
      month--;
    }
    let currMonth = month >= 10 ? month : '0' + month;
    this.month = currMonth;

    this.$store.commit('setEndDay', new Date(this.year, currMonth, '0').getDate());

    for (var i = 1; i <= month; i++) {
      let onMonth = i >= 10 ? i : '0' + i;
      // debugger
      this.timeList.push(`${this.year}${onMonth}`)
    }
  }
};
</script>
<style lang="scss" scoped>
.bg {
  background: linear-gradient(180deg, #162770 0%, #1c2b72 41%, #0d182e 100%);
  background-repeat: no-repeat;
}

.title {
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 8px;
  color: #fff;
  width: 100%;
  position: relative;
  top: -16px;
}

.flex-title {
  display: flex;
  justify-content: space-between;
}

.left-font {
  color: #fff;
  letter-spacing: 2px;
  font-size: 18px;
  margin-left: 16px;
}

.back {
  color: #19ecff;
  font-size: 18px;
  cursor: pointer;
}

.flex-back {
  display: flex;
  margin-left: 16px;
  white-space: nowrap;
  margin-top: 10px;
}

.flex-right {
  color: #19ecff;
  display: flex;
  font-size: 18px;
  white-space: nowrap;
  margin-top: 10px;
}

.right-font {
  margin-right: 16px;
  cursor: pointer;
}

.title-bg {
  background: url("../../assets/img/navIcon.svg");
  background-size: 100% 100%;
  width: 100%;
  margin: 0 auto;
}

.flex-header {
  display: flex;
}

.head-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 44px;
  transform: skewX(18deg);
  border: 1px solid #00f9ff;
  color: #19ecff;
  background: linear-gradient(0deg, #0e5fff 0%, rgba(28, 0, 255, 0) 100%);
  font-size: 18px;
  margin-left: 14px;
}

.head-box span {
  transform: skewX(-18deg);
}

.flex-font-left {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.head-box {
  cursor: pointer;
  opacity: 0.5;
}

.head-box:hover {
  opacity: 1;
}

.change-box {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: skewX(18deg);
  border: 1px solid #00f9ff;
  color: #19ecff;
  background: linear-gradient(0deg, #0e5fff 0%, rgba(28, 0, 255, 0) 100%);
  font-size: 18px;
  width: 110px;
  height: 44px;
  opacity: 0.5;
}

.active {
  opacity: 1 !important;
}

.change-box:hover {
  opacity: 1;
}

.change-box span {
  transform: skewX(-18deg);
}

.change-flex {
  display: flex;
  align-items: center;
  margin-right: 14px;
}

.head-box-right {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: skewX(-18deg);
  border: 1px solid #00f9ff;
  color: #19ecff;
  background: linear-gradient(0deg, #0e5fff 0%, rgba(28, 0, 255, 0) 100%);
  font-size: 18px;
  width: 110px;
  height: 44px;
  cursor: pointer;
  opacity: 0.5;
}

.head-box-right:hover {
  opacity: 1;
}

.head-box-right span {
  transform: skewX(18deg);
}

.right-width {
  width: 90px !important;
}

.change-box {
  cursor: pointer;
}

.drop-down {
  display: none;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(0deg, #0e5fff 0%, rgba(28, 0, 255, 0) 100%);
  width: 110px;
  text-align: center;
  // padding-bottom: 6px;
}

.head-box-right:hover .drop-down {
  display: block;
  font-size: 18px;
  color: #fff;
  position: absolute;
  top: 40px;
  left: 7px;
  transform: skewX(18deg);
}

.down-font {
  // padding-top: 6px;
}

.down-font:hover {
  background-color: #0e5fff;
  color: #f1f1f1;
  display: block;
}

.drop-down-year {
  width: 90px;
}

.down-font-year:first-child {
  // padding-top: 10px;
}

.down-font-year {
  // padding-bottom: 10px;
}

.down-font-year:hover {
  background-color: #0e5fff;
  color: #f1f1f1;
  display: block;
}

.drop-down-month {
  // padding-top: 10px;
}

.drop-month {
  left: 80px !important;
}
</style>