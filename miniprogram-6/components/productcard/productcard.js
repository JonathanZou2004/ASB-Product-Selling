// components/productcard/productcard.js
Component({
  /**
   * Component properties
   */
  properties: {
    name: {
      type: String,
      value: 'Item'
    },
    price: {
      type: Number,
      value: 0
    },
    imgurl: {
      type: String,
      value: '/'
    },
    itemnum:{
      type: Number,
      value: 0
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    addRecip: function(e){
      var myEventDetail = {
        "id": this.properties.itemnum,
        "name": this.properties.name,
        "price": this.properties.price
      }
      this.triggerEvent('addrecip', myEventDetail)
    }
  }
})
