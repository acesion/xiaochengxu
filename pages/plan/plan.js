// pages/plan/plan.js
let CY=new Date().getFullYear()
let CM = new Date().getMonth()
let CD = new Date().getDate()
let changeBgColor = `dayStyle[0].color`;
let changeBg = `dayStyle[0].background`;
let changeDay = `dayStyle[0].day`;
let changeEndBg = `dayStyle[0].background`;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayStyle: [{
        month: 'current',
        day: CD,
        color: 'red',
        background: 'yellow'
      },
      // {
      //   month: 'current',
      //   day: new Date().getDate(),
      //   color: 'red',
      //   background: 'yellow'
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    CM = CM + 1;
    this.isRecord()
    console.log(CY+"-"+CM+"-"+CD)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  dayClick: function (event) {
    console.log(event)
    let clickDay = event.detail.day;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "white",
      [changeBgColor]: "red",
      [changeEndBg]: "yellow"
    })
  },

  //监听点击下个月事件
  next: function (event) {
    if (event.detail.currentMonth != CM) {//非当前月
      this.judgeMonth()
    } else {
      this.setData({
        [changeDay]: CD,
        [changeBgColor]: "red",
        [changeEndBg]: "yellow"
      })
    }
  },
  //监听点击上个月事件
  prev: function (event) {
    console.log(event)
   /*  if (event.detail.currentMonth != CM) {
      this.judgeMonth()
    } else {
      this.setData({
        [changeDay]: CD,
        [changeBgColor]: "red",
        [changeEndBg]: "yellow"
      })
    } */
  },
  // 监听点击日历标题日期选择器事件
  dateChange: function (event) {
    console.log(event.detail);
  },
  judgeMonth(e) {
    this.setData({
      [changeBgColor]: "black",
      [changeEndBg]: "white"
    })
  },

  //判断是否有记录,传入年份，月份参数
  isRecord(){
    wx.cloud.database().collection("CAL").get().then(
      res=>{
        console.log(res.data[0].time)
      }
    )
  }
})