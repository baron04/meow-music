Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist: {
      type: Object
    }
  },

  // 监听计算歌单右上角播放量 
  observers: {
    ['playlist.playCount'](count) {
      this.setData({
        _count: this._transformNum(count,2)
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    _count: 0,  // 歌单播放量
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 歌单跳转到歌单的歌曲列表页面
    goToMusicList(){
      wx.navigateTo({
        url: `../../pages/musiclist/musiclist?playlistId=${this.properties.playlist.id}`,
      })
    },

    //  格式化歌单播放量数字
    _transformNum(num, point) {
      let numStr = num.toString().split('.')[0];
      if (numStr.length < 6) {
        return numStr;
      } else if (numStr.length >= 6 && numStr.length <= 8) {
        let pointNum = numStr.substring(numStr.length - 6, numStr.length - 6 + point);
        return parseInt(num / 10000) + '.' + pointNum + '万';
      } else if (numStr.length > 8) {
        let pointNum = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
        return parseInt(num / 100000000) + '.' + pointNum + '亿';
      }
    }
  }
})