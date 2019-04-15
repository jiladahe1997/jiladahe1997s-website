let imageCapture
let canvas = document.createElement('canvas')
canvas.width = 640
canvas.height = 480
let ctx = canvas.getContext('2d')
// 获取摄像头权限
navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
    let video = document.getElementById('video')
    video.srcObject = stream
    const track = stream.getVideoTracks()[0]
    debugger
    imageCapture = new ImageCapture(track)
    video.onloadedmetadata = (e)=>{
        video.play()
    }

    document.getElementById('button').onclick = (e)=>{
        imageCapture.takePhoto().then((blob)=>{
            const fileReader = new FileReader
            fileReader.addEventListener('load', (e)=>{
                document.getElementById('img').src = fileReader.result
            })
            fileReader.readAsDataURL(blob)
            let ajax = new XMLHttpRequest
            ajax.open('post', 'https://api-cn.faceplusplus.com/facepp/v3/detect')
            let formData = new FormData
            formData.append('api_key', '6DFr5_bY1JT6-oXoImJHxUSN_dqb85Wn')
            formData.append('api_secret', 'CEwmBPfSBG-ZOsFhHLfFsErZ0MENaRhm')
            formData.append('image_file', blob)
            formData.append('return_attributes', 'gender,age')
            ajax.onreadystatechange = ()=>{
              if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                  debugger
                  // 裁剪图片并发送到后端
                  let res = JSON.parse(ajax.response).faces[0].face_rectangle
                  ctx.drawImage(video, res.left, res.top, res.width, res.height ,0 ,0,res.width,res.height)
                  // ctx.drawImage(video, 0,0)
                  let img = document.createElement('img')
                  img.src = canvas.toDataURL()
                  document.body.append(img)
                }
              }
            }
            ajax.send(formData)
        })
    }
    document.querySelector('#button2').onclick = (e)=> {
      debugger
      let img = ctx.drawImage(video, 0, 0)
    }
}).catch((e) => {
    alert("获取权限失败！错误代码："+ e)
})




