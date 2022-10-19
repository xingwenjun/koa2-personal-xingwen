function videoControl () {
    this.mediaStream = ''
    this.videoEle = ''
    this.mediaRecorder = ''
    this.videoBuffer = ''
    this.init = async (id)=>{
        this.mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: true
        })
        this.videoEle = document.getElementById(id)
        this.videoEle.srcObject = this.mediaStream //设置视频元素流
        this.mediaRecorder = new MediaRecorder(this.mediaStream, {
            videoBitsPerSecond: 7000000,
            mimeType: 'video/webm;codecs=h264'
        })
    },
    this.start = async () => {
        this.mediaRecorder.start()
        const _this = this
        this.mediaRecorder.ondataavailable = e => {
            _this.download(e.data)
        }
    },
    this.stop = () => {
        this.mediaRecorder.stop()
    },
    this.download = (data) => {
        let blob = new Blob([data], {
            type: data.type
        });
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "test.mp4"; //下载的文件名
        a.click();
        window.URL.revokeObjectURL(url);
    }
    // var mediaRecorder = new MediaRecorder(mediaStream,{
    //        audioBitsPerSecond: 128000, //音频码率
    //        videoBitsPerSecond: 2500000,//视频码率
    //        mimeType: 'video/webm' //录制格式，视不同浏览器而定
    //      })
     
    // let chunks = []
    // mediaRecorder.ondataavailable = function(e) {
    // //这里直接将数据写入了内存，如果录制长视频应该写入到别的地方
    //     chunks.push(e.data);
    // }
}


