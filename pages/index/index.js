//index.js
//获取应用实例

var app = getApp()

Page({
  data: {

    // 地址数据库
    addressData: [], 
    
    // 选择器数据源
    provinceArray: [],
    cityArray: [],
    districtArray: [],
    
    // 选择器选中结果的索引
    provinceIndex: 0,
    cityIndex: 0,
    districtIndex: 0,
    
    // 所选结果
    province:'',
    city:'',
    district:'',

  },

  onLoad: function (params) {
    this.initAddressPicker()

  },

  initAddressPicker: function(){
    // 初始化地址选择器数据
    var addressData = wx.getStorageSync(app.globalData.addressDataKey)
    this.setData({
      addressData: addressData,
    })
    this.setData({     
      provinceIndex: 0,
      cityIndex:0,
      districtIndex:0,
    })
    this.refreshPicker();

  },

  getProvinceArray: function(){
    var provinceArray = []
    this.data.addressData.forEach(function(i){
      provinceArray.push(i.name)
    })
    provinceArray.push('其它')  
    return provinceArray  
  },

  getDistrictArray: function(provinceIndex, cityIndex){
    console.log('this.data.addressData', this.data.addressData)
    console.log('get city array, pindex,', provinceIndex)    
    var districtArray = []
    this.data.addressData[provinceIndex].city[cityIndex].county.forEach(function(i){
      districtArray.push(i.name)
    })
    districtArray.push('其它')   
    return districtArray 
  },

  getCityArray: function(provinceIndex){

    var cityArray = []
    this.data.addressData[provinceIndex].city.forEach(function(i){
      cityArray.push(i.name)
    })
    cityArray.push('其它')   
    return cityArray 
  },

  refreshPicker: function(){
    // 根据index的变动，刷新选择器以及下一级array的数据
    
    var provinceIndex = this.data.provinceIndex
    var cityIndex = this.data.cityIndex
    var districtIndex = this.data.districtIndex

    var provinceArray = this.getProvinceArray()
    var cityArray = this.getCityArray(provinceIndex)
    var districtArray = this.getDistrictArray(provinceIndex, cityIndex)

    console.log('provinceArray ', provinceArray)
    console.log('cityArray ', cityArray)
    console.log('districtArray', districtArray)

    console.log('provinceIndex', provinceIndex)
    console.log('cityIndex ', cityIndex)
    console.log('districtIndex ', districtIndex)


    this.setData({
      provinceArray: provinceArray,
      cityArray: cityArray,       
      districtArray: districtArray,

      provinceIndex: provinceIndex,
      cityIndex: cityIndex,
      districtIndex: districtIndex,

      province:  provinceArray[provinceIndex],
      city: cityArray[cityIndex],
      district: districtArray[districtIndex],
    })    
  },

  provinceChange: function(e){
    var provinceIndex = parseInt(e.detail.value)
    this.setData({
      provinceIndex: provinceIndex,
      cityIndex: 0,
      districtIndex: 0,
    })
    this.refreshPicker()

  },

  cityChange: function(e){
    var cityIndex = e.detail.value
    this.setData({
      cityIndex: cityIndex,
      districtIndex: 0,
    })
    this.refreshPicker()
  },

  districtChange: function(e){
    var districtIndex = e.detail.value
    this.setData({
      districtIndex: districtIndex,
    })
    this.refreshPicker()

  },


})
