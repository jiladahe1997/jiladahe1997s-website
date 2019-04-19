<template>
  <div>
    <Split>
      <div slot="left">
        <video src="" ref='video' width='640px' height='480px'></video>
      </div>
      <div slot="right">
        <p>论文model预测年龄：</p>
        <p>{{my_predict_age}}</p>
        <p>face++预测年龄</p>
        <p>{{facePlus_predic_age}}</p>  
      </div>
      <div ref='test'></div>
    </Split>
  </div>
</template>

<script> 
const axios = require('axios')
export default {
  data() {
    return {
      my_predict_age: 0,
      facePlus_predic_age: 0
    }
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
        let {attributes, face_rectangle} = (await this.get_face_rectangle(imageBlob)).data.faces[0]
        debugger
        let age = (await this.get_face_age(imageBlob, face_rectangle)).data
        debugger
        // todo 渲染到页面上
        this.my_predict_age = parseInt(age)
        this.facePlus_predic_age = attributes.age.value
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
      this.$refs.test.append(img)
      return axios.post('/ml/img_upload', {base64_img:resizedImg})
    }
  },
}
</script>

<style lang="">
  
</style>

