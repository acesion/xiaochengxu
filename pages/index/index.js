// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    dataList: [],
    context: '',
    reset:'',

  },

  onLoad() {
    this.getList();

  },

  getList() {
    wx.cloud.database().collection('F_rules')
      .get()
      .then(res => {
        this.setData({
          dataList: res.data[0].content,
          //reset:''
        })
      })
  },

  getInput(event) {
    this.setData({
      context: event.detail.value
    })
  },
  click(e){
    console.log(e)
    let that=this
    var index=e.currentTarget.dataset.id;
    this.getList();
    // wx.setClipboardData({
    //   data: e.currentTarget.dataset.text,
    // })
    // .then(res=>{
    //   wx.getClipboardData({
    //     success: (option) => {
    //       console.log(option)
    //       that.setData({
    //         reset:option.data
    //       })
    //     },
    //   })
    // })
    //console.log(that.data.dataList)
    wx.showModal({
      title: '提示',
      content: '确定要删除此家规吗？',
      success(res) {
        if (res.confirm) {
          that.data.dataList.splice(index, 1)
          var target2 = that.delete_null(that.data.dataList)
          wx.cloud.database().collection('F_rules').doc('f6e08a6462f71c76130d68593a1b43bf')
            .update({
              data: {
                content: target2
              },
              success(res) {
                
                //console.log(res)
                wx.showToast({
                  icon: 'none',
                  title: '删除成功',
                })
                wx.setClipboardData({
                  data: e.currentTarget.dataset.text,
                })
                .then(res=>{
                  wx.getClipboardData({
                    success: (option) => {
                      //console.log(option)
                      that.setData({
                        reset:option.data
                      })
                    },
                  })
                })
                that.getList()
              }
            })
        } else if (res.cancel) {
            that.setData({
              reset:''
            })
        }
      }
    })
  },

  issue() {
    let that = this
    if (that.data.context == '') {
      wx.showToast({
        icon: 'none',
        title: '请先输入内容',
      })
    } else {
      wx.cloud.database().collection('F_rules')
        .get()
        .then(res => {
          //console.log(res)
          var actions = res.data[0]
          //console.log(actions.content)
          let comment = {};
          comment.neirong = this.data.context;
          actions.content.push(comment)
          wx.cloud.database().collection('F_rules').doc('f6e08a6462f71c76130d68593a1b43bf')
            .update({
              data: {
                content: actions.content
              },
              success(res) {
                wx.showToast({
                  title: '增加成功',
                })
                that.getList()
              }
            })
        })
    }
  },
  delete_null(target) {
    let target2 = []
    let j = 0
    for (let i = 0; i < target.length; i++) {
      if (target[i] == null) {
        continue;
      } else {
        target2[j] = target[i]
        j++
      }
    }
    return target2
  },
})
