<template>
  <div class="flex-card" >
    <!-- <a-spin class="flex-loading" size="large" v-if="showLoading" />
    <div class="noData" v-if="!showLoading && cardList.length<1">暂无数据</div> -->
    <div class="noData" v-if="cardList.length<1">暂无数据</div>
    <div class="card-box" v-for="(v,i) in cardList" :key="i" v-else>
      <div class="card-font" @click="gotoCatSeries(v[cardObj.title])">{{v[cardObj.title]}} </div>
      <div class="card-border-box">
        <div class="line"></div>
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
        <div class="line4"></div>
        <div class="left-right-box">
          <div style="margin-left: 14px">
            <div class="flex-top-card">
              <div class="top-left-font">实时</div>
              <div class="flex-finish">
                <div class="finish-font">责任制 <span>{{v[cardObj.saleTaskAmt]}}{{$store.state.unit}}</span></div>
                <div class="finish-font">完成率 <span>{{v[cardObj.saleAmtRadio]}}%</span></div>
              </div>
            </div>
            <div class="flex-top-card">
              <div class="card-big-num">{{v[cardObj.cnyAmt]}}<span class="unit">{{$store.state.unit}}</span></div>
               <div class="flex-finish">
                <!-- <div class="finish-font">进度 <span>s</span></div>
                <div class="finish-font">完成率 <span>75%</span></div> -->
              </div>
              <div style="display: flex; align-items: center">
                <div class="finish-font">进度</div>
                <div>
                  <div class="progress">
                    <a-progress
                      :percent="v.dateRadio"
                      :show-info="false"
                      strokeColor="#FF8B2F"
                    />
                  </div>
                  <div class="progress">
                    <a-progress
                      :percent="v[cardObj.saleAmtRadio]"
                      :show-info="false"
                      strokeColor="rgb(102, 255, 255)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
            
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
             
            </div>
           
          </div>
          <div class="mt-border"></div>
 
          <div class="percent">
            <div>
              <span class="percent-title">毛利</span>
              <span class="percent-text">{{!!v[cardObj.grossProfitRadio]?(v[cardObj.grossProfitRadio]*100).toFixed(0):(v.grossProfitRadio*100).toFixed(0)}}%</span>
            </div>
            <!-- {{list}} -->
    
            <span class="percent-title">{{title1}}</span>
            <template v-for="(item,k) in list"> 
              <div :key="k+22" v-if="item[cardObj.cooprLevel1] == title1 && v[cardObj.title] == item[cardObj.title]">
                <span class="percent-text">{{!!item.businessModelCompleteRadio*100?(item.businessModelCompleteRadio*100).toFixed(2):0.00 }}%</span>
              </div>
              <div  :key="k+226" v-else>0%</div>
            </template>
<span class="percent-title">{{title2}}</span>
<template v-for="(item,k) in list"> 
            <div :key="k+223" v-if="item[cardObj.cooprLevel1] == title2 && v[cardObj.title] == item[cardObj.title]">
              <span class="percent-text">{{!!item.businessModelCompleteRadio*100?(item.businessModelCompleteRadio*100).toFixed(2):0.00 }}%</span>
            </div>
            <div  :key="k+224" v-else>0%</div>
          </template>
<!-- <template v-for="(item,k) in list"> 
            <div :key="k+22" v-if="item[cardObj.cooprLevel1] == title1 && v[cardObj.title] == item[cardObj.title]">
  
  
                <span class="percent-title">{{!!item[cardObj.cooprLevel1]?item[cardObj.cooprLevel1]:0}}</span>
                
                <span class="percent-text">{{!!item.businessModelCompleteRadio*100?Number(item.businessModelCompleteRadio*100):0.00}}%</span>
              </div>
              <div :key="k+223" v-if="item[cardObj.cooprLevel1] == title2 && v[cardObj.title] == item[cardObj.title]">
                <span class="percent-title">{{!!item[cardObj.cooprLevel1]?item[cardObj.cooprLevel1]:0}}</span>
                <span class="percent-text">{{!!item.businessModelCompleteRadio*100?(item.businessModelCompleteRadio*100).toFixed(2):0.00 }}%</span>
              </div>
            </template> -->
</div>
<div class="mt-border"></div>
<div class="sab">
    <div class="">
        <div class="sab-title">{{title1}}SAB</div>
        <span class="sab-title2">S</span>
        <span class="sab-text">{{cardSabObj[v[cardObj.title]+title1+'S'] || 0}}%</span>
        <span class="sab-title2">A</span>
        <span class="sab-text">{{cardSabObj[v[cardObj.title]+title1+'A'] || 0}}%</span>
        <span class="sab-title2">B</span>
        <span class="sab-text">{{cardSabObj[v[cardObj.title]+title1+'B'] || 0}}%</span>

    </div>
    <div class="">
        <div class="sab-title">{{title2}}SAB</div>
        <span class="sab-title2">S</span>
        <span class="sab-text">{{cardSabObj[v[cardObj.title]+title2+'S'] || 0}}%</span>
        <span class="sab-title2">A</span>
        <span class="sab-text">{{cardSabObj[v[cardObj.title]+title2+'A'] || 0}}%</span>
        <span class="sab-title2">B</span>
        <span class="sab-text">{{cardSabObj[v[cardObj.title]+title2+'B'] || 0}}%</span>
    </div>
</div>
</div>

</div>
</div>
</div>
</template>

<script>
    export default {
        name: 'DataCard',
        props: {
            list: {
                type: Array,
                default: function() {
                    return []
                }
            },
            cardSab: {
                type: Array,
                default: function() {
                    return []
                }
            },
            cardObj: {
                type: Object,
                default: function() {
                    return {
                        'title': 'cooprLevel2',
                        /*标题*/
                        'cnyAmt': 'cnyAmt',
                        /*金额*/
                        'saleTaskAmt': 'saleTaskAmt',
                        /*责任制金额*/
                        'saleAmtRadio': 'saleAmtRadio',
                        /*金额完成率*/
                        'grossProfitRadio': 'grossProfitRadio',
                        /*毛利率*/
                        'cooprLevel1': 'cooprLevel1',
                        /*线上/线下 中间sab名称对应的字段*/
                        'businessModelCompleteRadio': '' /*线上/线下 中间sab名称后面的完成率*/


                    }
                },
            },
            title1: {
                type: String,
                default: '线上'
            },
            title2: {
                type: String,
                default: '线下'
            },
        },
        data() {
            return {
                pathObj: {
                    'export': 'exprotAreaAll'
                },
                cardList: [],
                /*卡片分类*/
                cardSabList: [0, 1, 2, 3, 4, 5],
                /*sab分类*/
                cardSabObj: {},
                /*sab对象分类*/

                showLoading: true,
            }
        },
        computed: {
            name() {
                return this.$route.name;
            }



        },
        watch: {
            cardObj: {
                handler: function(newValue, oldValue) {
                    console.log('newValue', newValue);
                }
            },
            list: {
                handler: function(newValue, oldValue) {
                    console.log('newValue11', newValue);
                    let title = '';

                    if (newValue.length < 1) {
                        this.cardList = [];
                        this.showLoading = false;
                        return
                    } else {
                        this.cardList = [];
                        newValue && newValue.length > 0 && newValue.forEach(v => { /*划分6个卡片*/
                            if (v[this.cardObj.title] != title && !!v[this.cardObj.title]) {
                                // v[this.cardObj.cnyAmt] =  v[this.cardObj.cnyAmt].toFixed(1);
                                v[this.cardObj.cnyAmt] = !!v[this.cardObj.cnyAmt] ? v[this.cardObj.cnyAmt].toFixed(2) : 0;
                                v[this.cardObj.saleTaskAmt] = !!v[this.cardObj.saleTaskAmt] ? v[this.cardObj.saleTaskAmt].toFixed(2) : 0;
                                v[this.cardObj.saleAmtRadio] = !!v[this.cardObj.saleAmtRadio] ? Number((v[this.cardObj.saleAmtRadio] * 100).toFixed(2)) : 0;
                                // v.grossProfitRadio = Number((v.grossProfitRadio*100).toFixed(0));
                                // debugger;
                                // if(v[this.cardObj.saleAmtRadio]>100){  v[this.cardObj.saleAmtRadio] = 100 };
                                v.dateRadio = !!v.dateRadio ? Number((v.dateRadio * 100).toFixed(0)) : 0; /*时间进度*/
                                if (this.cardList.length < 6) { /*只显示6条*/
                                    this.cardList.push(v);
                                }
                                title = v[this.cardObj.title];
                            }
                        });
                    }

                    this.showLoading = false;
                }
            },
            cardSab: {
                handler: function(newValue, oldValue) {
                    // debugger;
                    if (!!newValue && newValue.length > 0) {
                        newValue.forEach(v => {

                            this.cardSabObj[v[this.cardObj.title] + this.title1 + v.position] = !!v.positionRatio ? (v.positionRatio * 100) > 100 ? 100 : (v.positionRatio * 100).toFixed(0) : 0;

                        })

                    }
                    console.log('this.cardSabObj', this.cardSabObj);
                }

            }

        },

        created() {

            // console.log('this.name',this.name)

        },
        methods: {
            gotoCatSeries(val) {

                // this.$store.commit('setCurrTitle', val);
                // this.$router.push({
                //     name: this.pathObj[this.name],
                //     query: {
                //         key: val
                //     }
                // });


                this.$emit('gotoCatSeries', val)


            }
        }

    }
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
        height: 240px;
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
        background: url("../../../../assets/img/tableVBackround.svg");
        width: 905px;
        height: 324px;
        background-color: rgba(2, 0, 77, 0.4);
        box-shadow: inset 0px 0px 34px 0px rgba(17, 40, 255, 0.66);
        border: 2px solid #0d53b7;
        border-radius: 0 0 10px 10px;
    }
    
     ::v-deep .ant-table-thead>tr>th {
        background: rgb(4, 19, 112);
        border-bottom: 1px solid rgb(55, 56, 112);
        border-right: 1px solid rgb(55, 56, 112);
    }
    
     ::v-deep .ant-table-thead>tr>th .ant-table-header-column {
        color: #fff;
        font-size: 14px;
    }
    
     ::v-deep .ant-table-bordered .ant-table-tbody>tr>td {
        border: 1px solid rgb(55, 56, 112);
        color: #fff;
    }
    
     ::v-deep .ant-table-tbody>tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)>td {
        background: transparent;
    }
    
     ::v-deep .ant-spin-nested-loading {
        margin: 14px;
    }
    
     ::v-deep .ant-table-thead>tr:first-child>th:first-child {
        background: linear-gradient(to right, rgb(80, 192, 255), rgb(90, 255, 163), rgb(102, 255, 255));
    }
    
    .top-flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 98%;
        margin: 0 auto;
    }
    
    .dashboard-box {
        width: 50%;
        position: relative;
    }
    
    .card-box {
        background-image: url("../../../../assets/img/smallCardBackground.svg");
        background-repeat: no-repeat;
        /* margin-right: 20px; */
        background-size: 100%;
        width: 33%;
    }
    
    .card-font {
        font-size: 16px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        cursor: pointer;
        color: #19ecff;
        padding-top: 3px;
    }
    
    .flex-card {
        display: flex;
        margin-top: 10px;
        align-items: center;
        justify-content: inherit;
        flex-wrap: wrap;
        position: relative;
        min-width: 56%;
        min-height: 100px;
    }
    
    .flex-top-card {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    
    .top-left-font {
        font-size: 14px;
        color: #fff;
        margin-right: 10px;
    }
    
    .card-border-box {
        /* margin: 10px px 30px 4px; */
        margin: 10px 3px 30px 3px;
        position: relative;
        /* border: 1px solid red; */
        /* border: 1px solid hsla(210, 86%, 39%, 0.66); */
        min-width: 89%;
        /* height: 70%;
}
.line {
  height: 10px;
  /* border-left: 2px solid rgb(102, 255, 255);
  border-right: 2px solid rgb(102, 255, 255); */
    }
    
    .line1 {
        /* border-top: 2px solid rgb(102, 255, 255); */
        width: 10px;
        position: absolute;
        top: 0;
        left: 0;
    }
    
    .line2 {
        /* border-top: 2px solid rgb(102, 255, 255); */
        width: 10px;
        position: absolute;
        top: 0;
        right: 0;
    }
    
    .line3 {
        /* border-top: 2px solid rgb(102, 255, 255); */
        width: 10px;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    
    .line4 {
        /* border-top: 2px solid rgb(102, 255, 255); */
        width: 10px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
    
    .left-right-box {
        display: flex;
        /* justify-content: space-between; */
    }
    
    .left-right-box .flex-top-card {
        align-items: flex-start;
        padding-top: 5px;
    }
    
    .finish-font {
        color: #fff;
        opacity: 0.6;
        font-size: 12px;
        margin-right: 4px;
        display: flex;
    }
    
    .finish-font span {
        color: #66ffff;
        margin-left: 2px;
        display: inline-block;
        /* width:34px; */
    }
    
    .mt-border {
        border: 1px solid rgba(255, 255, 255, 0.24);
        width: 1px;
    }
    
    .card-big-num {
        color: #66ffff;
        font-size: 18px;
    }
    
    .progress {
        width: 60px;
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
    
     ::v-deep .ant-table-bordered .ant-table-body>table {
        border: none;
    }
    
    .flex-echrats-right {
        display: flex;
        align-items: center;
        padding: 4px 8px 4px 8px;
    }
    
    .echartsBox-min {
        width: 300px;
        height: 100px;
    }
    
    .right-font-title {
        font-size: 15px;
        color: #fff;
        margin-right: 40px;
        font-size: 15px;
        color: #fff;
        width: 80px;
        white-space: nowrap;
    }
    
    .flex-right-bottom {
        display: flex;
        /* align-items: center; */
        justify-content: space-between;
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
    
    .panelList {
        height: 258px;
        width: 760px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    
    .left-file {
        position: relative;
        bottom: 20px;
    }
    
    .percent {
        height: 100%;
        margin-left: 5px;
        margin-right: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .percent-title {
        opacity: 0.5;
        font-size: 12px;
        color: #FFFFFF;
        text-align: right;
        font-weight: 400;
        display: inline-block;
        width: 28px;
    }
    
    .percent-text {
        font-size: 12px;
        color: #66FFFF;
        text-align: center;
        font-weight: 400;
        display: inline-block;
        width: 30px;
    }
    
    .sab {
        height: 100%;
        margin-left: 5px;
        margin-right: 5px;
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        /* width:120px; */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .sab-title {
        font-size: 12px;
        color: #FFFFFF;
        font-weight: 400;
        font-weight: 400;
        line-height: 17px;
        margin-left: 2px !important;
        width: 60px;
        margin: 0;
    }
    
    .sab-title2 {
        margin-left: 1px;
        opacity: 0.5;
        font-size: 11px;
        color: #FFFFFF;
        text-align: center;
        font-weight: 400;
    }
    
    .sab-text {
        margin-left: 2px;
        font-size: 10px;
        color: #66FFFF;
        text-align: center;
        font-weight: 400;
        display: inline-block;
        /* width:27px; */
    }
    
    .title2 {
        font-size: 12px;
        color: #FFFFFF;
        font-weight: 400;
        font-weight: 400;
        line-height: 17px;
    }
    
    .flex-loading {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
</style>