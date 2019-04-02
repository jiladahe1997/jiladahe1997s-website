let imageCapture
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
}).catch((e) => {
    alert("获取权限失败！错误代码："+ e)
})

document.getElementById('button').onclick = (e)=>{
    imageCapture.takePhoto().then((blob)=>{
        const fileReader = new FileReader
        fileReader.addEventListener('load', (e)=>{
            document.getElementById('img').src = fileReader.result
        })
        fileReader.readAsDataURL(blob)
        let ajax = new XMLHttpRequest
        ajax.open('post', './test')
        ajax.send(blob)
    })
}