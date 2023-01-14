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
        
        updateSubs(transcript)
    }
}
})

function updateSubs(transcript) {
  // var cursor = document.getElementById("hnr23Blur")
  console.log(transcript)
  var p = document.querySelector("#hnr23Blur p");
  
  p.innerHTML = transcript

}

