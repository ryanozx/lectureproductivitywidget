// const { SupportedPackages } = require("./webgazer");

if ('speechSynthesis' in window) {
  // Speech Synthesis supported 🎉
 }else{
   // Speech Synthesis Not Supported 😣
   alert("Sorry, your browser doesn't support text to speech!");
 }




navigator.mediaDevices.getDisplayMedia({audio: true}).then(stream => {
    if(!api_key) return alert('You must provide a Deepgram API Key in the options page.')

    else if(stream.getAudioTracks().length == 0) {
        alert('You must share your tab with audio. Refresh the page.');
        location.reload();
    } else {
        const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })

        socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=general-enhanced', ['token', api_key])

        recorder.addEventListener('dataavailable', evt => {
            if(evt.data.size > 0 && socket.readyState == 1) socket.send(evt.data)
        })

        const videos = Array.from(document.getElementsByTagName("video"));
        videos.map(video => video.addEventListener("play", (e) => {
            video.volume = 0.01;
        }))

        socket.onopen = () => { recorder.start(250) }

        socket.onmessage = msg => {
            const { transcript } = JSON.parse(msg.data).channel.alternatives[0]
            if(transcript) {

                updateSubs(transcript)
                speakForProf(transcript)

            }

        }
    }

})

function updateSubs(transcript) {
  console.log(transcript)
  var p = document.querySelector("#hnr23Blur p");

  if (p !== null)
  {
    p.innerHTML = transcript
  }

}
var voices = window.speechSynthesis.getVoices();

function speakForProf(transcript) {
  var msg = new SpeechSynthesisUtterance();
  var random = Math.random()
  msg.text = transcript

  msg.voice = voices[Math.floor(random * 6)]
  msg.pitch = random * 2
  msg.volume = 1.75
  msg.rate = 1.2
  // msg.lang = 'es';
  window.speechSynthesis.speak(msg);
}


