//chrome.extension.getBackgroundPage().
alert("foo")
console.log("foo")

const api_key = "ed3dbcdd87df8db0333bcdfae82be6805988853d"

const constraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440
      },
      facingMode: 'user'
    },
  };

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log("working")
}

const vidStream = navigator.mediaDevices.getUserMedia(constraints)
navigator.mediaDevices.getDisplayMedia({audio: true}).then(stream => {
    if(!api_key) return alert('You must provide a Deepgram API Key in the options page.')
    if(stream.getAudioTracks().length == 0) return alert('You must share your tab with audio. Refresh the page.')
    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })

    socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=general-enhanced', ['token', api_key])

    recorder.addEventListener('dataavailable', evt => {
        if(evt.data.size > 0 && socket.readyState == 1) socket.send(evt.data)
    })


socket.onopen = () => { recorder.start(250) }

socket.onmessage = msg => {
    const { transcript } = JSON.parse(msg.data).channel.alternatives[0]
    if(transcript) {
        console.log(transcript)
        // chrome.storage.local.get('transcript', data => {
        //     chrome.storage.local.set({ transcript: data.transcript += ' ' + transcript })

        //     // Throws error when popup is closed, so this swallows the errors.
        //     chrome.runtime.sendMessage({ message: 'transcriptavailable' }).catch(err => ({}))
        // })
    }
}
})

