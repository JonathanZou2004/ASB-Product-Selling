const app = getApp()
Component({
  /**
   * Component properties
   */
  properties: {
    recipientName:{
      type: String,
      value: ''
    },
    recipientGrade: {
      type: Number,
      value: 9
    },
    recipientClass: {
      type: Number,
      value: 1
    },
    quantity:{
      type: Number,
      value: 1
    },
    recipientNumber:{
      type: Number,
    },
    itemNum:{
      type: Number,
      value: 1
    },
    itemPrice:{
      type: Number,
      value: 0
    },
    removable: Boolean
  },
  data: {
    name: "",
    arrayGrade: ['9', '10'],
    indexGrade: '0',
    arrayClass: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    indexClass: '0',
    bigImg: "/resources/socks.jpg",
    actualurl: ''
  },

  methods: {
    onDelete: function () {
      var myEventDetail = {
        "id": this.properties.recipientNumber,
      }
      var myEventOption = {}
      this.triggerEvent('ondelete', myEventDetail, myEventOption)
    },
    onCustomizedTextChange: function(e){
      var myEventDetail = {
        "id": this.properties.recipientNumber,
        "text": e.detail.value
      }
      var myEventOption = {}
      this.triggerEvent('textchange', myEventDetail, myEventOption)
    },
    onImportPic: function(e){
      let that = this;
      let openid = app.globalData.openid || wx.getStorageSync('openid');
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          wx.showLoading({
            title: 'uploading',
          });
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let filePath = res.tempFilePaths[0];
          const name = Math.random() * 1000000;
          const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
          console.log(cloudPath)
          wx.cloud.uploadFile({
            cloudPath,//云存储图片名字
            filePath,//临时路径
            success(res) {
              console.log('[上传图片] 成功：', res)
              that.setData({
                bigImg: res.fileID
              })
              wx.cloud.getTempFileURL({
                fileList: [{
                  fileID: res.fileID
                }],
                success(res) {
                  console.log(res.fileList[0].tempFileURL)
                  that.setData({
                    actualurl: res.fileList[0].tempFileURL
                  })
                  var myEventDetail = {
                    "id": that.properties.recipientNumber,
                    "cloudurl": that.data.bigImg,
                    "url": that.data.actualurl
                  }
                  var myEventOption = {}
                  that.triggerEvent("importpic", myEventDetail, myEventOption)
                  let fileID = res.fileID;
                  const db = wx.cloud.database();
                    db.collection("pictures").add({
                      data: {
                        bigImg: fileID
                      },
                      success: function () {
                        wx.showToast({
                          title: 'imported successfully',
                          'icon': 'none',
                          duration: 3000
                        })
                      },
                      fail: function () {
                        wx.showToast({
                          title: 'import failed',
                          'icon': 'none',
                          duration: 3000
                        })
                        wx.navigateTo({
                          url: '/pages/serverFail/serverFail'
                        })
                      }
                    }); 
                },
                fail(res) {
                  console.log(res)
                }
              })
            },
             fail: e => {
              console.error('[上传图片] 失败：', e)
            },
            complete: () => {
              wx.hideLoading()
            }
          });
        }
      })
      var temppic = that.data.bigImg
      that.setData({
        bigImg: temppic
      })
    },
    onNameInput:function (e) {
      console.log(e.detail.value)
      var myEventDetail = { 
        "id": this.properties.recipientNumber,
        "name": e.detail.value,
      }
      var myEventOption = {}
      this.triggerEvent('nameinput', myEventDetail, myEventOption)
    },
    onGradeChange: function (e) {
      const getGrade = this.data.arrayGrade[e.detail.value];
      this.setData({
        indexGrade: e.detail.value,
        studentGrade: getGrade
      })
      console.log(this.properties.recipientNumber)
      var myEventDetail = {
        "id": this.properties.recipientNumber,
        "grade": getGrade
      }
      var myEventOption = {}
      this.triggerEvent('gradechange', myEventDetail, myEventOption)
    },
    onClassChange: function (e) {
      const getClass = this.data.arrayClass[e.detail.value];
      this.setData({
        indexClass: e.detail.value,
        studentClass: getClass
      })
      console.log(this.properties.recipientNumber)
      var myEventDetail = {
        "id": this.properties.recipientNumber,
        "classnum": getClass
      }
      var myEventOption = {}
      this.triggerEvent('classchange', myEventDetail, myEventOption)
    },
    onQuantityInput: function (e) {
      var myEventDetail = {
        "id": this.properties.recipientNumber,
        "quantity": e.detail.value,
      }
      var myEventOption = {}
      this.triggerEvent('inputquantity', myEventDetail, myEventOption)
    },
  },
})
