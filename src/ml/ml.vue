<template>
  <div class="ml-main">
    <Split v-model="split">
      <div slot="left">
        <video src="" ref='video' width='640px' height='480px'></video>
      </div>
      <div class="ml-right" slot="right">
        <p>论文model预测年龄：</p>
        <p>{{my_predict_age}}</p>
        <p>face++预测年龄</p>
        <p>{{facePlus_predic_age}}</p>  
      </div>
    </Split>
    <div ref='test'></div>
  </div>
</template>

<script> 
const axios = require('axios')
export default {
  data() {
    return {
      split: 0.5,
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
        let {attributes, face_rectangle} = (await this.get_face_rectangle(imageBlob)).data.faces[0]
        let {response, resizedImg} = await this.get_face_age(imageBlob, face_rectangle)
        let age = response.data

        this.my_predict_age = parseInt(age)
        this.facePlus_predic_age = attributes.age.value
        this.$emit('img-predicted', resizedImg, new Date, this.my_predict_age, this.facePlus_predic_age)
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
      return new Promise((resolve, reject) => {
        let img = document.createElement('img')
        img.onload = async () => {
          // this.$refs.test.append(img)
          let canvas = document.createElement('canvas')
          // this.$refs.test.append(canvas)
          canvas.width=640
          canvas.height=480
          let ctx = canvas.getContext('2d')
          canvas.width=rectangle.width+150,
          canvas.height=rectangle.height+150
          ctx.drawImage(img, rectangle.left-75, rectangle.top-75, rectangle.width+150, rectangle.height+150, 0, 0,rectangle.width+150, rectangle.height+150)
          let resizedImg = canvas.toDataURL()
          let response = await axios.post('/ml/img_upload', {base64_img:resizedImg})
          resolve({response, resizedImg})
        }
        img.src = URL.createObjectURL(imageBlob)
      })
    }
  },
}
</script>

<style >
  .ml-main{
    height: 600px
  }
  .ml-right{
    padding-left: 10px
  }
</style>

