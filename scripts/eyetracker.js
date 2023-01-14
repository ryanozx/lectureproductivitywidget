document.body.onload = addDiv;

function addDiv() {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "hnr23Blur");

    newDiv.style.cssText = 'position:absolute;width:50%;height:50%;opacity:0.05;z-index:100;background:#000;';

    document.addEventListener("mousemove", (e) => {
        newDiv.style.left = (e.pageX - (parseInt(newDiv.style.width, 10) / 200) * window.innerWidth) + "px";
        newDiv.style.top = (e.pageY - (parseInt(newDiv.style.height, 10) / 200) * window.innerHeight) + "px";
    })
    
    document.body.insertBefore(newDiv, document.body.firstChild);
}