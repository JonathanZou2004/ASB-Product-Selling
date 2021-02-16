const app = getApp()
Page({
  data: {
    recip: [],
    sender: [],
    product: [],
    total: 0,
  },
  onReturn: function() {
    wx.navigateBack({
      delta: 0,
    })
  },
  onConfirm: function(){
    const db = wx.cloud.database()
    db.collection('ordersDecember').add({
      data: {
        senderName: this.data.sender.senderName,
        senderAnonymous: this.data.sender.senderAnonymous,
        senderGrade: this.data.sender.senderGrade,
        senderClass: this.data.sender.senderClass,
        recipients: this.data.recip,
        total: this.data.total
      },
      success: function(res) {
        wx.showToast({
          title: 'confirmed successfully',
          'icon': 'none',
          duration: 3000
        })
        wx.navigateTo({
          url: '/pages/submitSuccess/submitSuccess',
        })
      },
      fail: function() {
        wx.navigateTo({
          url: '/pages/serverFail/serverrFail'
        })
      }
    })
  },
  onLoad: function (options) {
    
  },
  onShow: function () {
    var temprecip = app.globalData.globalrecip
    var temptotal = 0
    var tempproduct = app.globalData.globalproduct
    for (var i = 0; i < temprecip.length; i++) {
      if (!temprecip[i].deleted) {
        temptotal += temprecip[i].price * temprecip[i].rQuantity
      }
    }
    for (var i = 0; i < tempproduct.length; i++) {
      var individualrecip = []
      for (var j = 0; j < temprecip.length; j++) {
        if (temprecip[j].rItem==tempproduct[i].itemNum && !temprecip[j].deleted) {
          individualrecip.push(temprecip[j])
        }
      }
      tempproduct[i].recip = individualrecip
    }
    this.setData({
      total: temptotal,
      recip: temprecip,
      sender: app.globalData.globalsender,
      product: tempproduct
    })
    console.log(this.data.product)
  }
})