const app = getApp()
Page({
  data: {
    senderAnonymous: false,
    studentName: '',
    studentGrade: 9,
    studentClass: 1,
    arrayGrade: ['9', '10'],
    indexGrade: '0',
    arrayClass: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    indexClass: '0',
    product: [
      {name: 'Customized Candles', price: 10, quantity: 0, imgurl: '/resources/candles.png', itemNum: 0, viable: true},
      {name: 'Wax-stamped letters', price: 5, quantity: 0, imgurl: '/resources/letters.png', itemNum: 1, viable: true},
      {name: 'Teddy bear', price: 20, quantity: 0, imgurl: '/resources/teddybear.png', itemNum: 2, viable: true},
      {name: 'Teddy bear gift bag', price: 45, quantity: 0, imgurl: '/resources/teddybeargiftbag.png', itemNum: 3, viable: true},
      {name: 'Keychains', price: 3, quantity: 0, imgurl: '/resources/keychain.png', itemNum: 4, viable: true},
      {name: 'Customized Socks', price: 12, quantity: 0, imgurl: '/resources/socks.png', itemNum: 5, viable: true}
    ],
    recip: [//{ rName: 'a', rGrade: 9, rItem: 0, rClass: 1, rQuantity: 1, deleted: false, assorted other things}
    ]
  },
  onSeeOrder: function(e){
    if (this.data.studentName=="" || this.data.studentName==" ") {
      wx.showModal({
        title: 'error',
        content: 'Please enter your name correctly',
        showCancel: false,
        confirmText: 'Ok'
      })
    } else {
      var check = true
      for (var i = 0; i < this.data.recip.length; i++) {
        if (!this.data.recip[i].deleted && (this.data.recip[i].rName=="" || this.data.recip[i].rName==" ")) {
          check = false
        }
      }
      if (!check) {
        wx.showModal({
          title: 'error',
          content: 'Please enter valid recipient name',
          showCancel: false,
          confirmText: 'Ok'
        })
      } else {
        var endproduct = []
        console.log(this.data.recip)
        for (var i = 0; i < this.data.product.length; i++) {
          var check = false
          for (var j = 0; j < this.data.recip.length; j++) {
            if (this.data.recip[j].rItem==i && !this.data.recip[j].deleted) {
              check = true
            }
          }
          if (!check) {
            this.data.product[i].viable = false
          } else {
            this.data.product[i].viable = true
          }
        }
        for (var i = 0; i < this.data.product.length; i++) {
          if (this.data.product[i].viable) {
            endproduct.push(this.data.product[i])
          }
        }
        console.log(endproduct)
        app.globalData.globalproduct = endproduct
        app.globalData.globalrecip = this.data.recip
        app.globalData.globalsender = {senderName: this.data.studentName, senderAnonymous: this.data.senderAnonymous, senderGrade: this.data.studentGrade, senderClass: this.data.studentClass}
        wx.navigateTo({
          url: '../orderPage/orderPage',
        })
      }
    }
  },
  addRecip: function(e){
    var targetIndex = e.detail.id
    this.data.recip.push({rName: '', rGrade: 9, rClass: 1, rItem: targetIndex, itemName: e.detail.name, rQuantity: 1, deleted: false, price: e.detail.price})
    console.log(this.data.recip)
    var tempRecipients = this.data.recip
    this.setData({
      recip: tempRecipients
    })
  },
  onDeleteRecip: function(e){
    var targetIndex = e.detail.id
    this.data.recip[targetIndex].deleted = true
    this.data.recip[targetIndex].quantity = 0
    var tempRecipients = this.data.recip
    this.setData({
      recip: tempRecipients
    })
    console.log(this.data.recip)
  },
  onImportPic: function(e){
    var targetIndex = e.detail.id
    var cloudurl = e.detail.cloudurl
    var url = e.detail.url
    this.data.recip[targetIndex].customizedimgcloud = cloudurl
    this.data.recip[targetIndex].actualurl = url
    console.log(this.data.recip)
  },
  onTextChange: function(e){
    var targetIndex = e.detail.id
    var text = e.detail.text
    this.data.recip[targetIndex].customizedText = text
    console.log(this.data.recip)
  },
  onRecipientNameInput: function(e) {
    var targetIndex = e.detail.id
    var name = e.detail.name
    this.data.recip[targetIndex].rName = name
    console.log(this.data.recip)
  },
  onRecipientGradeChange: function (e) {
    var targetIndex = e.detail.id
    var changedGrade = Number(e.detail.grade)
    this.data.recip[targetIndex].rGrade = changedGrade
    console.log(this.data.recip)
  },
  onRecipientClassChange: function (e) {
    var targetIndex = e.detail.id
    var changedClass = Number(e.detail.classnum)
    this.data.recip[targetIndex].rClass = changedClass
    console.log(this.data.recip)
  },
  onRecipientQuantityInput: function (e) {
    var targetIndex = e.detail.id
    var changedQuantity = Number(e.detail.quantity)
    if (e.detail.quantity == '') {changedQuantity = 1}
    this.data.recip[targetIndex].rQuantity = changedQuantity
    console.log(this.data.recip)
  },
  onSenderAnonymous:function (e) {
    const currentAnonymous = this.data.senderAnonymous
    this.setData({senderAnonymous:!currentAnonymous})
    if (this.data.senderAnonymous == true) {
      this.setData({
        studentName:"anonymous"
      })
    } else {
      this.setData({
        studentName:""
      })
    }
  },
  bindNameInput: function (e) {
    this.setData({
      studentName: e.detail.value
    })
  },
  bindPickerGradeChange: function (e) {
    const getGrade = Number(this.data.arrayGrade[e.detail.value])
    this.setData({
      indexGrade: e.detail.value,
      studentGrade: getGrade
    })
  },
  bindPickerClassChange: function (e) {
    const getClass = Number(this.data.arrayClass[e.detail.value])
    this.setData({
      indexClass: e.detail.value,
      studentClass: getClass
    })
  },
  onLoad: function() {
    wx.cloud.init()
  },  
  onShow: function() {
  } 
})  