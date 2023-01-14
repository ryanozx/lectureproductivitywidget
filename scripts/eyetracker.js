document.body.onload = addDiv;

function addDiv() {
    const newDiv = document.createElement("div");
    
    newDiv.setAttribute("id", "hnr23Blur");

    newDiv.style.cssText = 'position:fixed;width:50%;height:50%;opacity:0.9;z-index:100;background:#000;border-radius:50%';

    document.body.insertBefore(newDiv, document.body.firstChild);

    const historyCount = 8;

    var queue = [];
    var sumX = 0;
    var sumY = 0;
    var idx = 0;

    for (var i = 0; i < historyCount; ++i)
    {
        queue.push([newDiv.style.left, newDiv.style.top]);
        sumX += queue[i][0];
        sumY += queue[i][1];
    }

    webgazer.setGazeListener(function(data, elapsedTime) {
        if (data == null) {
            return;
        }
        sumX -= queue[idx][0];
        sumY -= queue[idx][1];
        queue[idx][0] = data.x;
        queue[idx][1] = data.y;
        sumX += data.x;
        sumY += data.y;
        newDiv.style.left = (sumX / historyCount - (parseInt(newDiv.style.width, 10) / 200) * window.innerWidth) + "px";
        newDiv.style.top = (sumY / historyCount - (parseInt(newDiv.style.height, 10) / 200) * window.innerHeight) + "px";
        ++idx;
        if (idx == historyCount)
        {
            idx = 0;
        }
        setTimeout(50);
    }).begin();
}