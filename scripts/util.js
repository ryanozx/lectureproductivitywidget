//chrome.extension.getBackgroundPage().
alert("foo")
console.log("foo")


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
    }
  };

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    console.log("Let's get thity started")
}

const stream = navigator.mediaDevices.getUserMedia(constraints);
console.log(typeof(stream))