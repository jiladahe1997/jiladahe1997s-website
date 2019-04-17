<template>
  <div>
    <Split>
      <div slot="left">
        <video src="" ref='video' width='640px' height='480px'></video>
      </div>
      <div slot="right"></div>
    </Split>
  </div>
</template>

<script> 
const axios = require('axios')
export default {
  data() {
    return {}
  },
  created() {
    navigator.mediaDevices.getUserMedia({video: true}).then((videoStream) => {
      let videoRef = this.$refs.video
      videoRef.srcObject = videoStream
      videoRef.play()
      let imageCapture = new ImageCapture(videoStream.getVideoTracks()[0])    
      setTimeout(2000, ()=>console.log(1))
      setTimeout(pooling_fetch.bind(this), 2000)
      async function pooling_fetch(){
        let imageBlob = await this.take_a_photo(imageCapture)
        debugger
        let rectangle = (await this.get_face_rectangle(imageBlob)).data.faces[0].face_rectangle
        debugger
        let age = await this.get_face_age(imageBlob, rectangle)
        debugger
        // todo 渲染到页面上
        setTimeout(pooling_fetch.bind(this),2000)
      } 
    })
  },
  methods: {
    take_a_photo(imageCapture){
      return imageCapture.takePhoto()
    },
    get_face_rectangle(imageBlob){
        let formData = new FormData
        formData.append('api_key', '6DFr5_bY1JT6-oXoImJHxUSN_dqb85Wn')
        formData.append('api_secret', 'CEwmBPfSBG-ZOsFhHLfFsErZ0MENaRhm')
        formData.append('image_file', imageBlob)
        formData.append('return_attributes', 'gender,age')
        return axios.post('https://api-cn.faceplusplus.com/facepp/v3/detect', formData)
    },
    get_face_age(imageBlob, rectangle){
      let img = document.createElement('img')
      img.src = URL.createObjectURL(imageBlob)
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, rectangle.left, rectangle.top, rectangle.width, rectangle.height, 0, 0,rectangle.width, rectangle.height)
      let resizedImg = canvas.toDataURL()
      return axios.post('/ml/img_upload', resizedImg)
    }
  },
}
</script>

<style lang="">
  
</style>

