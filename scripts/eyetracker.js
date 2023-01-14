document.body.onload = addDiv;

const historyCount = 8;

function addDiv() {
    const newDiv = document.createElement("div");
    
    newDiv.setAttribute("id", "hnr23Blur");
    newDiv.style.cssText="width:50%; height:50%;";
    const p = document.createElement("p");
    document.body.insertBefore(newDiv, document.body.firstChild);
    newDiv.appendChild(p);

    var queue = [];
    var sumX = 0;
    var sumY = 0;
    var idx = 0;
    var posX, posY;

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
        posX = (sumX / historyCount - (parseFloat(newDiv.style.width, 10) / 200) * window.innerWidth) + "px";
        posY = (sumY / historyCount - (parseFloat(newDiv.style.height, 10) / 200) * window.innerHeight) + "px";
        newDiv.style.left = posX;
        newDiv.style.top = posY;
        ++idx;
        if (idx == historyCount)
        {
            idx = 0;
        }
 }).begin();
}

