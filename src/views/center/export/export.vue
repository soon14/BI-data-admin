<template>
  <div style="background: #02004d">
    <!-- 头部仪表盘和卡片 -->
    <div class="top-flex">
      <!-- 仪表盘 -->
      <div class="dashboard-box">
        <div class="panelList">
          <ProgressPanel :data="progressData" />
          <SpeedPanel :data="speedData" />
          <SadPanel :data="sabData" />
        </div>
      </div>
      <!-- 右侧卡片 -->
      
      <Card :list="cardData" @gotoCatSeries="gotoCatSeries" :cardObj="cardObj"/>
    </div>
    <!-- 中间echart -->
    <div class="middle-box">
      <div class="flex-fang">
        <div class="fang-color"></div>
        <div class="fang-color"></div>
      </div>
      <div class="flex-char">
        <!-- <a-spin class="flex-loading" size="large" v-if="showLoading" /> -->
        <div>
          <div class="middle-font left-file">外销日达成趋势图</div>
          <div class="legend">
            <template v-if="echartsLabel">
              <div class="item" v-for="(item, index) in echartsLabel" :key="index">
                <div class="lump" :class="item.class"></div>
                <div class="text">{{ item.text }}</div>
              </div>
            </template>
          </div>
          <div id="main" class="echartsBox"></div>
          <div class="leftData" v-if="AvgTaskAmtList.length<1">暂无数据</div>
        </div>
        <div>
          <div class="middle-font">大区日达成趋势图</div>
          <div class="right-box-qushi">
            <!-- <template v-show="!showLoading"> -->
            <div class="flex-right-bottom" v-for="(item, i) in dhcarr" :key="i">
              <div class="content-cart">
                <div class="border-top-line"></div>
                <div class="border-left-line"></div>
                <div class="flex-echrats-right">
                  <div class="right-font-title">{{ item }}</div>
                  <div :id="i" class="echartsBox-min"></div>
                </div>
                <div class="border-top-line"></div>
                <div class="border-left-line1"></div>
                <div class="border-left-line2"></div>
                <div class="border-left-line3"></div>
              </div>
            </div>
            <!-- </template> -->
          </div>
        </div>
      </div>
      <div class="flex-fang">
        <div class="fang-color"></div>
        <div class="fang-color"></div>
      </div>
      <div class="select-box">
        <selectTime @changeDate="changeDate"/>
      </div>
    </div>

    <!-- 底部表格 -->
    <innerTableCardBox :leftData="tableInner" :rightData="tableOutter" :leftObj="leftObj" :rightObj="rightObj" title1="区域" title2="外销KA"/>
  </div>
</template>
<script>
// import echarts from "echarts";
import ProgressPanel from "@/views/center/panel/ProgressPanel.vue";
import SpeedPanel from "@/views/center/panel/SpeedPanel.vue";
import SadPanel from "@/views/center/panel/SadPanel.vue";
import API from "../../../service/api";
import Card from '@/views/center/components/card/card.vue'; 
import innerTableCardBox from '@/views/center/components/table/innerTableCardBox.vue';
import selectTime from '@/components/selectTime.vue';

export default {
  name: "s",
  components: {
    ProgressPanel,
    SpeedPanel,
    SadPanel,
    Card,
    innerTableCardBox,
    selectTime
  },
  data() {
    return {
      dhcarr: ['暂无数据','暂无数据','暂无数据','暂无数据','暂无数据','暂无数据'],
      Arrnum: [],
      showLoading: false,
      AmericaDate: [],
      AmericaList: [],
      AvgTaskAmtDate: [],
      AvgTaskAmtList: [],
      AvgTaskAmtLine: [],
      AmericaLine: [],
      // koreaData: [],
      // koreaList: [],
      // koreaLine: [],
      progressData: {
        bar1: 0,
        bar2: 0,
        ballTitle: "外销",
        bigBallTitle: "毛利率",
        textLeft: "OBM",
        textRight: "OEM",
        titleTop: "OBM",
        titleBottom: "OEM",
        topGPM: 0,
        bottomGPM: 0,
        ballNum:0,
      },

      speedData: {
        bar: 1,
        speedBar: 0,
        ballTitle: "外销达成",
        ballNum: 0,
        ballLeftTitle: "OBM",
        ballRightTitle: "OEM",
        ballLeftNum: 0,
        ballRightNum: 0,
        bottomNum: 0,
        bottomTitle1: "OBM",
        bottomClose: 0,
        bottomTime: 0,
        bottomTitle2: "OEM",
        bottomClose1: 0,
        bottomTime1: 0,
      },
      sabData: {
        // bar1: 70,
        // bar2: 50,
        // bar3: 30,
        // bar4: 12,
        // bar5: 7,
        ballTitle: "外销",
        top: "OBM",
        bottom: "OEM",
         sabArr: { S: 0, A: 0, B: 0 },
        topArr: { S: 0, A: 0, B: 0  },
        bottomArr: { S: 0, A: 0, B: 0  },
        // sabArr: [{'高端机':32},{'明星机':18},{'入口机':21},{'常规机':9},{'结构及':5}],
        // topArr: [{'高端机':32},{'明星机':18},{'入口机':21},{'常规机':9},{'结构及':5}],
        // bottomArr: [{'高端机':32},{'明星机':18},{'入口机':21},{'常规机':9},{'结构及':5}]
      },
      showLoadingCard:false,
      cardData:[],
      tableOutter:[],
      tableInner:[],
      leftObj:{   
      name:'cooprLevel2',  /*标题*/
      level:'cooprLevel2Manager',/*责任人*/
      tAvgAmt:'tAvgAmt',/*责任制*/
      },
      rightObj:{
      name:'customerName',
      level:'',
      tAvgAmt:'tAvgAmt'
      },
      cardObj:{
       'title':'cooprLevel1',
       'cnyAmt':'cooprLevel1NameAmt',
       'saleTaskAmt':'cooprLevel1TaskAmt',
       'saleAmtRadio':'cooprLevel1AmtRadio'
      },
      echartsLabel: [
        { class: "plan", text: "实际达成" },
        { class: "average", text: "日均线" },
      ],
     };
  },
  computed:{
    ontime(){
      return this.$store.state.year +'-'+ this.$store.state.month;
    },
    showMoney(){
      return this.$store.state.showMoney;
    },
    modelLabel(){
      return this.$store.state.showMoney==true?'亿':'台'
    },
    model(){ /* 获取本部，OEM */
      return this.$store.state.model
    }
    
  },
  watch:{
    ontime:{ /*监听月度 数据更改 调用接口 */
     handler: function (newValue, oldValue) {
        this.init(newValue);
      }
    },
    model:{ /*监听产司 数据更改 调用接口 */
      handler: function(newValue,oldValue){
        this.init(this.ontime);
      }

    },
    showMoney:{ /*监听金额:数量版 数据更改 调用接口 */
      handler:function(newValue,oldValue){
        this.init(this.ontime);
      }
    },
  },
  methods: {
    init(ontime){ /*初始化数据方法*/
    let params = {  /*年月*/
      month_date:ontime
    };
    let listParams = { /*年月日*/
      start_date:`${ontime}-01`,
      end_date:`${ontime}-${this.$store.state.endDay}`
    }
    console.log('params',params,listParams)

    this.getdashboard(params);
    this.queryCardSAB(params);
    this.getCard(params);
    this.getList(listParams);
    this.getList1(listParams);
    this.getTable(params);
    },
    // 三个仪表盘
      //三个仪表盘(左中)
      async getdashboard(params) {
        let obj = {
          code:'sellOutTopDashBoard'
        }
        Object.assign(obj,params);

        try {
          const res = await API.getTotal(obj);
   
 
          if(res.code!=200) return;
          //内销汇总仪表盘左边&&中间
          let panelDataList = res.rows;
          this.clearObj(this.speedData);
        this.clearObj(this.progressData);

        if(res.rows.length<1){  /*处理切换月份数组为空，给数值字段重新赋值为0*/
        return;
        }
          // console.log("res仪表",res); 
          // directProfitRadio: 0.2713  销向毛利率
          this.progressData.ballNum = !!panelDataList[0].directProfitRadio?(
            panelDataList[0].directProfitRadio * 100
          ).toFixed(1):0;
     
          //    
          // ⅵ. directCnyAmt: 5.8799  销向总销售金额
          this.speedData.ballNum =  !!panelDataList[0].directCnyAmt?panelDataList[0].directCnyAmt.toFixed(2):0
          // 销向金额完成率
          // 销向数量完成率
          this.speedData.speedBar = !!panelDataList[0].directAmtRadio?(panelDataList[0].directAmtRadio * 100).toFixed(2):0
          this.speedData.bar = !!panelDataList[0].dateRadio?(panelDataList[0].dateRadio * 100).toFixed(2):0;
     
          //  销向总销售数量
          // this.speedData.ballNum = (panelDataList[0].directsaleVolume / 1000000).toFixed(2)

          // 责任制
          this.speedData.bottomNum = !!panelDataList[0].saleTaskAmt?panelDataList[0].saleTaskAmt.toFixed(2):0
          for (var i = 0; i < panelDataList.length; i++) {
            if (panelDataList[i].obmOem == "OBM") {
              this.progressData.bar1 = !!panelDataList[i].obmOemProfitRadio?(panelDataList[i].obmOemProfitRadio * 100).toFixed(2):0
              this.progressData.topGPM = !!panelDataList[i].obmOemProfitRadio?(panelDataList[i].obmOemProfitRadio * 100).toFixed(2):0
              this.speedData.ballLeftNum =!!panelDataList[i].cnyAmt? panelDataList[i].cnyAmt.toFixed(2):0

              this.speedData.bottomClose =!!panelDataList[i].cnyAmtRadio?Number((panelDataList[i].cnyAmtRadio*100).toFixed(2)):0
              this.speedData.bottomTime =!!panelDataList[i].dateRadio?Number((panelDataList[i].dateRadio*100).toFixed(2)):0

            } else if (panelDataList[i].obmOem == "OEM") {
              this.progressData.bar2 = !!panelDataList[i].obmOemProfitRadio?(panelDataList[i].obmOemProfitRadio * 100).toFixed(2):0
              this.progressData.bottomGPM = !!panelDataList[i].obmOemProfitRadio?(panelDataList[i].obmOemProfitRadio * 100).toFixed(2):0
              this.speedData.ballRightNum =!!panelDataList[i].cnyAmt? panelDataList[i].cnyAmt.toFixed(2):0
              this.speedData.bottomClose1 =!!panelDataList[i].cnyAmtRadio?Number((panelDataList[i].cnyAmtRadio*100).toFixed(2)):0
              this.speedData.bottomTime1 =!!panelDataList[i].dateRadio?Number((panelDataList[i].dateRadio*100).toFixed(2)):0
          }

        }
         

      } catch (error) {
        console.log(error);
      }
    },

    //三个仪表盘(右)
    async queryCardSAB(params) {
      let obj = {
        code:'sellOutTopDashBoardSAB'
      }
      Object.assign(obj,params)
      try {
        const res = await API.getTotal(obj);
        // console.log("右但是,", res);
        if(res.code !=200) return;
        let RightSAB = res.rows;
        this.clearObj(this.sabData);

        if(RightSAB.length<1 ){
          return;
        }

        for (var i = 0; i < RightSAB.length; i++) {
          if (RightSAB[i].obmOem == "OBM") {
            this.sabData.bar1 = (
              RightSAB[i].obmOemPositionRatio * 100
            ).toFixed(1);
            if (RightSAB[i].position == "S") {
              this.sabData.topArr.S = (
                RightSAB[i].obmOemPositionRatio * 100
              ).toFixed(1);
              this.sabData.sabArr.S = (
                RightSAB[i].directPositionRatio * 100
              ).toFixed(1);
            } else if (RightSAB[i].position == "A") {
              this.sabData.topArr.A = (
                RightSAB[i].obmOemPositionRatio * 100
              ).toFixed(1);
              this.sabData.sabArr.A = (
                RightSAB[i].directPositionRatio * 100
              ).toFixed(1);
            } else if (RightSAB[i].position == "B") {
              this.sabData.topArr.B = (
                RightSAB[i].obmOemPositionRatio * 100
              ).toFixed(1);
              this.sabData.sabArr.B = (
                RightSAB[i].directPositionRatio * 100
              ).toFixed(1);
            }
          } else if (RightSAB[i].obmOem == "OEM") {
            this.sabData.bar2 = (
              RightSAB[i].level1QtyPositionRatio * 100
            ).toFixed(1);
            if (RightSAB[i].position == "S") {
              this.sabData.bottomArr.S = (
                RightSAB[i].obmOemPositionRatio * 100
              ).toFixed(1);
            } else if (RightSAB[i].position == "A") {
              this.sabData.bottomArr.A = (
                RightSAB[i].obmOemPositionRatio * 100
              ).toFixed(1);
            } else if (RightSAB[i].position == "B") {
              this.sabData.bottomArr.B = (
                RightSAB[i].obmOemPositionRatio * 100
              ).toFixed(1);
            }
          }
        }
        console.log('this.sabData.sabArr',this.sabData.sabArr)
      } catch (error) {
        console.log(error);
      }
    },
    //中间折线图
    async getList(params) {
      this.showLoading = true;
      let obj = {
        code:'sellOuttotalchart'
      }
      Object.assign(obj,params);
      try {
        const res = await API.getTotal(
          obj
          // 'cooprLevel1'
        );

        if(res.code !=200) return;
        if(res.rows.length<1){
        this.AvgTaskAmtDate = [];
        this.AvgTaskAmtList = [];
        this.AvgTaskAmtLine = ''
      }else{
        this.AvgTaskAmtDate = [];
        this.AvgTaskAmtList = [];
        this.AvgTaskAmtLine = ''
      }

      let ontime = ''; /*过滤数据使用*/
          res.rows.filter((item) => {
          var timeArr = item.orderDate.substr(5);

          // 外销日内
          if (item.totalAmt !== null && ontime !=timeArr) {
            ontime = timeArr;
            this.AvgTaskAmtDate.push(timeArr);
            this.AvgTaskAmtList.push(item.totalAmt);
            this.AvgTaskAmtLine = item.totalAvgTaskAmt || 0;
          }
        });
        this.myEcharts();
        this.showLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    gotoCatSeries(obj){
      this.$router.push({'path':'exprotAreaAll'})
    },
    // 中部边接口
    async getList1(params) {
      this.showLoading = true;
      let chartObj = {
        code:'sellOuttotalchart',
        fields:'cooprLevel1'
      }
      Object.assign(chartObj,params)
      try {
        const res = await API.getChartTotal(chartObj);
        // console.log("res12",res);
        if(res.code !=200) return;
        let sellOutDataList = res.rows;
        this.showLoading = false;
        let obj = res.rows[0];
        var k = 0;
        var arr = [];
        for (var i in obj) {
          if(obj[i][0].cooprLevel1!='isNull'){
          if (k < 6) {
            arr.push(obj[i]);
          }
          k++;
        }
        }
        // console.log("obj", obj);
       
        // this.dhcarr = [];
     
       
        arr.forEach((v,i) => {
          this.dhcarr[i] = v[0].cooprLevel1;
        });
        // console.log("arr", this.dhcarr);
        // this.dhcarr = [1,2,3,4,5];

        for (let j = 0; j < arr.length; j++) {
          var datanum = arr[j];
          // console.log("datanum",datanum);
          let AmericaDate = [];
          let AmericaList = [];
          let AmericaLine = 1;
          let Arrnum = datanum.filter((item) => {
            var timeArr = item.orderDate
              .replace(" ", ":")
              .replace(/\:/g, "-")
              .split("-");
            var yue = timeArr[1];
            var ri = timeArr[2];
            // console.log("sdvsd", timeArr);

            AmericaDate.push(yue + "-" + ri);
            AmericaList.push(item.CnyAmt);
            AmericaLine = item.tAvgAmt || 0;
          });
          // console.log("Arrnum", this.sellOutDataList);

          this.myEcharts2(AmericaList, AmericaDate, AmericaLine, j);
        }
        // 处理空数据
         let noDatalen = 6 -  arr.length;

        for (let j = arr.length; j < noDatalen; j++) {


          this.myEcharts2([], [], '', j);
          this.dhcarr[j] = '暂无数据';


        }



      } catch (error) {
        console.log(error);
      }
    },

    gotoDomestic() {
      this.$router.push("/center/index");
    },
    myEcharts() {
      var myChart = this.$echarts.init(document.getElementById("main"));
      var option = {
        xAxis: {
          axisLabel: {
            formatter: function (val) {
              return "";
            },
          },
        },
        labelData: [
          { class: "plan", text: "实际达成" },
          // { class: 'actual', text: '规划达成' },
          { class: "average", text: "日均线" },
        ],
        // echartsData: {
        textStyle: {
          color: "#3FB0FF",
        },
        color: ["#66FFFF", "#6C02CF", "#FF8B2F"],
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "5%",
          left: "2%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.AvgTaskAmtDate,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          name: "单位：万",
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(45,153,255,.3)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            name: "实际达成",
            type: "line",
            stack: "Total",
            // smooth: true,
            lineStyle: {
              width: 1,
            },
            showSymbol: false,
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "hsla(197, 100%, 50%, .3)", // 0% 处的颜色
                    },
                    {
                      offset: 0.7,
                      color: "hsla(215, 95%, 39%, .3)", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
            data: this.AvgTaskAmtList,
            markLine: {
              data: [
                {
                  yAxis: this.AvgTaskAmtLine,
                  silent: false, //鼠标悬停事件 true没有，false有
                  lineStyle: {
                    //警戒线的样式 ，虚实 颜色
                    type: "dashed", //样式  ‘solid’和'dotted'
                    color: "#FF8B2F",
                    width: 2, //宽度
                  },
                  label: {
                    formatter: "",
                    color: "#FF8B2F",
                    position: "start", //将警示值放在哪个位置，三个值“start”,"middle","end" 开始 中点 结束
                  },
                },
              ],

              symbol: ["none", "none"],
            },
          },
        ],
      };
      myChart.setOption(option,true);
    },
    myEcharts2(data, time, lines, id) {
      var myChart2 = this.$echarts.init(document.getElementById(id));
      var option = {
        xAxis: {
          axisLabel: {
            formatter: function (val) {
              return "";
            },
          },
        },
        textStyle: {
          color: "#3FB0FF",
        },
        color: ["#66FFFF", "#6C02CF", "#FF8B2F"],
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "5%",
          left: "2%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // data: this.AmericaDate,
          // data: ['01-02','03-03','04-04','01-04'],

          data: time,
          axisTick: {
            show: false, //刻度线
          },
          axisLine: {
            show: false, //隐藏y轴
          },
          axisLabel: {
            show: false, //隐藏刻度值
          },
        },
        yAxis: {
          name: "单位：万",
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "rgba(45,153,255,.3)",
            },
          },
          axisTick: {
            show: false, //刻度线
          },
          axisLine: {
            show: false, //隐藏y轴
          },
          axisLabel: {
            show: false, //隐藏刻度值
          },
        },
        series: [
          {
            name: "实际达成",
            type: "line",
            stack: "Total",
            // smooth: true,
            lineStyle: {
              width: 1,
            },
            showSymbol: false,
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "hsla(197, 100%, 50%, .3)", // 0% 处的颜色
                    },
                    {
                      offset: 0.7,
                      color: "hsla(215, 95%, 39%, .3)", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
            // data: this.AmericaList,
            // data:[10,20,100,250],
            data: data,
            // data:data,
            markLine: {
              // data:this.AmericaLine,
              data: [
                {
                  // yAxis: this.AmericaLine,
                  // yAxis:400,
                  yAxis: lines,
                  silent: false, //鼠标悬停事件 true没有，false有
                  lineStyle: {
                    //警戒线的样式 ，虚实 颜色
                    type: "dashed", //样式  ‘solid’和'dotted'
                    color: "#FF8B2F",
                    width: 2, //宽度
                  },
                  label: {
                    formatter: "",
                    color: "#FF8B2F",
                    position: "start", //将警示值放在哪个位置，三个值“start”,"middle","end" 开始 中点 结束
                  },
                },
              ],

              symbol: ["none", "none"],
            },
          },
        ],
      };
      myChart2.setOption(option,true);
    },
   
    online() {
      this.$router.push("/center/onlineSummary");
    },
    offline() {
      this.$router.push("/center/offlineSummary");
    },
       // 右边卡片/
       async getCard(params) {
        let obj = {
          code:'sellOutTopOnline'
        }
        Object.assign(obj,params);
    
        this.showLoadingCard = true;
        let res = await API.getTotal(obj);
    
        let onTitle = '';
        
        let arr = [];
      
       if(res.code !=200) return;

   
       res.rows.length>0 && res.rows.forEach(v=>{
      
      
           if(onTitle!=v.cooprLevel1 && !!v.cooprLevel1){
   
             onTitle = v.cooprLevel1;
          
            arr.push(v);
           }
        })
        arr.splice(6);
        // debugger;
        this.cardData = arr;
    },

    // 底部table/
    async getTable(params) {
      let innerObj = {
        code:"sellOutTotalOnlineBottom"
      }
      Object.assign(innerObj,params);

      let outterObj = {
        code:"sellOutTotalOfflineBottom"
      }
      Object.assign(outterObj,params);
      try {
        let tableInner = await API.getTotal(innerObj);
        let tableOutter = await API.getTotal(outterObj);

        if(tableInner.code!=200) return;
        

        this.tableInner = tableInner.rows;
        this.tableOutter = tableOutter.rows;
        this.rowSpanNumber2 = [this.tableOutter.length - 1];

        this.rowSpanNumber1 = [this.tableInner.length -1];
        // debugger;

        // console.log("this.tableInner", this.rowSpanNumber1, this.tableInner);

        // console.log("this.data", this.data);
      } catch (err) {
        console.log(err);
      }
    },
    changeDate(start,end) { /*echart切换时间*/
        let listParams = { /*年月日*/
       start_date:start,
      end_date:end,
      }
        this.getList(listParams);
        this.getList1(listParams);
      },
   
  },
  created() {
    this.init(this.ontime);
  },

  // mounted() {
  //   this.init(this.model);
  // },
};
</script>
<style scoped>
.flex-char {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 98%;
  margin: 10px auto;
  margin-bottom: 10px;
}

.echartsBox {
  width: 607px;
  height: 280px;
}

.flex-fang {
  display: flex;
  justify-content: space-between;
}

.fang-color {
  width: 10px;
  height: 10px;
  background-color: hsla(188, 100%, 50%, 1);
}

.middle-box {
  width: 98%;
  /* margin: 10px 20px 10px 10px; */
  border: 1px solid hsla(210, 86%, 39%, 0.66);
  margin: 20px auto;
  margin-bottom: 10px;
}

.flex-font-middle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  color: #fff;
}

.middle-font {
  font-size: 18px;
  color: #fff;
  font-weight: 600;
  text-align: center;
  margin-bottom: 6px;
}

.flex-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 98%;
  margin: 0 auto;
  padding-bottom: 20px;
}

.execl {
  background: url("../../../assets/img/tableVBackround.svg");
  width: 905px;
  height: 324px;
  background-color: rgba(2, 0, 77, 0.4);
  box-shadow: inset 0px 0px 34px 0px rgba(17, 40, 255, 0.66);
  border: 2px solid #0d53b7;
  border-radius: 0 0 10px 10px;
}

::v-deep .ant-table-thead > tr > th {
  background: rgb(4, 19, 112);
  border-bottom: 1px solid rgb(55, 56, 112);
  border-right: 1px solid rgb(55, 56, 112);
}

::v-deep .ant-table-thead > tr > th .ant-table-header-column {
  color: #fff;
  font-size: 14px;
}

::v-deep .ant-table-bordered .ant-table-tbody > tr > td {
  border: 1px solid rgb(55, 56, 112);
  color: #fff;
}

::v-deep
  .ant-table-tbody
  > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
  > td {
  background: transparent;
}

::v-deep .ant-spin-nested-loading {
  margin: 14px;
}

::v-deep .ant-table-thead > tr:first-child > th:first-child {
  background: linear-gradient(
    to right,
    rgb(80, 192, 255),
    rgb(90, 255, 163),
    rgb(102, 255, 255)
  );
}

.top-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 98%;
  margin: 0 auto;
}

.dashboard-box {
  /* width: 50%; */
  position: relative;
}

.card-box {
  height: 248px;
  width: 545px;
  background-image: url("../../../assets/img/bigCardBackground.svg");
  background-repeat: no-repeat;
  margin-left: 20px;
}

.card-font {
  font-size: 16px;
  color: #fff;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  color: #19ecff;
}

.flex-card {
  display: flex;
  margin-top: 20px;
}

.flex-top-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-left-font {
  font-size: 14px;
  color: #fff;
  margin-right: 20px;
}

.card-border-box {
  margin: 14px;
  border: 1px solid rgba(13, 83, 183, 0.7);
  position: relative;
}

.line {
  height: 10px;
  border-left: 2px solid rgb(102, 255, 255);
  border-right: 2px solid rgb(102, 255, 255);
}

.line1 {
  border-top: 2px solid rgb(102, 255, 255);
  width: 10px;
  position: absolute;
  top: 0;
  left: 0;
}

.line2 {
  border-top: 2px solid rgb(102, 255, 255);
  width: 10px;
  position: absolute;
  top: 0;
  right: 0;
}

.line3 {
  border-top: 2px solid rgb(102, 255, 255);
  width: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.line4 {
  border-top: 2px solid rgb(102, 255, 255);
  width: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
}

.left-right-box {
  display: flex;
  justify-content: space-between;
}

.flex-finish {
  display: flex;
}

.finish-font {
  color: #fff;
  opacity: 0.6;
  font-size: 12px;
  margin-right: 4px;
}

.finish-font span {
  color: #66ffff;
  margin-left: 2px;
}

.mt-border {
  border: 1px solid rgba(255, 255, 255, 0.24);
  width: 1px;
}

.card-big-num {
  color: #66ffff;
  font-size: 28px;
}

.progress {
  width: 120px;
  height: 10px;
}

.progress:last-child {
  margin-bottom: 12px;
}

.progress-middle {
  width: 34px;
  height: 10px;
}

.progress-middle:last-child {
  margin-bottom: 12px;
}

::v-deep .ant-progress-bg {
  height: 4px !important;
  border-radius: 200px !important;
}

.card-middle-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-bottoms {
  display: flex;
  align-items: center;
  color: #a0a3c0;
  font-size: 12px;
}

.light-blue {
  color: #66ffff;
  opacity: 1;
}

::v-deep .ant-table-bordered .ant-table-body > table {
  border: none;
}

.flex-echrats-right {
  display: flex;
  align-items: center;
  padding: 4px 1px 4px 8px;
}

.echartsBox-min {
  width: 305px;
  height: 100px;
}

.right-font-title {
  font-size: 15px;
  color: #fff;
  text-align: center;
  /* margin-right: 1px; */
  width: 45%;
}
.content-cart {
  width: 100%;
}
.flex-right-bottom {
  display: flex;
  /* align-items: center; */
  /* justify-content: space-between; */
  width: 32%;
  flex-wrap: wrap;
  border: 1px solid hsla(210, 86%, 39%, 0.66);
  position: relative;
  margin-left: 10px;
  margin-top: 10px;
}

.border-left-line {
  border-top: 1px solid rgb(102, 255, 255);
  border-bottom: 1px solid rgb(102, 255, 255);
  width: 10px;
  position: absolute;
  top: 0;
  left: 0;
}

.border-left-line1 {
  border-top: 1px solid rgb(102, 255, 255);
  border-bottom: 1px solid rgb(102, 255, 255);
  width: 10px;
  position: absolute;
  top: 0;
  right: 0;
}

.border-left-line2 {
  border-top: 1px solid rgb(102, 255, 255);
  border-bottom: 1px solid rgb(102, 255, 255);
  width: 10px;
  position: absolute;
  bottom: 0;
  right: 0;
}

.border-left-line3 {
  border-top: 1px solid rgb(102, 255, 255);
  border-bottom: 1px solid rgb(102, 255, 255);
  width: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.border-top-line {
  border-left: 1px solid rgb(102, 255, 255);
  border-right: 1px solid rgb(102, 255, 255);
  height: 10px;
}

.right-box-qushi {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
}

/* 仪表盘样式 */
.main {
  height: 230px;
}

::v-deep .ant-table-thead > tr:first-child > th:first-child {
  background: linear-gradient(
    to right,
    rgb(80, 192, 255),
    rgb(90, 255, 163),
    rgb(102, 255, 255)
  );
}

.content {
  width: 192px;
  height: 192px;
  top: 7%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.big-round {
  width: 105px;
  height: 105px;
  border-radius: 50%;
  box-shadow: inset 0px 0px 20px 0px rgba(102, 255, 255, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
}

.round {
  width: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  background: #0c098b;
  box-shadow: inset 0px 0px 20px 0px rgba(102, 255, 255, 0.52);
  border: 1px solid rgba(50, 197, 255, 0.22);
}

.round-title {
  font-size: 12px;
  color: #32c5ff;
  letter-spacing: -0.01px;
  text-align: center;
  font-weight: 500;
}

.sort {
  font-size: 24px;
  color: #ffffff;
  letter-spacing: -0.01px;
  text-align: center;
  font-weight: 600;
}

.title {
  position: absolute;
  bottom: 20px;
  opacity: 0.8;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 17px;
  font-weight: 400;
}

.bottom {
  text-align: center;
  margin-top: 18px;
}

.bottom-color {
  width: 8px;
  height: 8px;
  margin-left: 5px;
  display: inline-block;
}

.bottom-title {
  opacity: 0.8;
  padding-left: 5px;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 17px;
  font-weight: 400;
}

.bottom-text {
  margin-top: 3px;
  opacity: 0.7;
  font-size: 10px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 10px;
  font-weight: 400;
}

.bottom-text span {
  margin-left: 5px;
}

.card-big-num {
  color: #66ffff;
  font-size: 28px;
}

.progress {
  width: 120px;
  height: 10px;
}

.progress:last-child {
  margin-bottom: 12px;
}

.progress-middle {
  width: 34px;
  height: 10px;
}

.progress-middle:last-child {
  margin-bottom: 12px;
}

::v-deep .ant-progress-bg {
  height: 4px !important;
  border-radius: 200px !important;
}

.card-middle-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-bottoms {
  display: flex;
  align-items: center;
  color: #a0a3c0;
  font-size: 12px;
}

.light-blue {
  color: #66ffff;
  opacity: 1;
}

::v-deep .ant-table-bordered .ant-table-body > table {
  border: none;
}

.panelList {
  height: 258px;
  width: 760px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.panelList {
  height: 258px;
  width: 760px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.flex-loading {
  position: relative;
  left: 50%;
  right: 50%;
}
</style>