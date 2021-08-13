

let submitButton;
let locationData;



function setup(){
    let capture;
    noCanvas();
    capture = createCapture(VIDEO);
    capture.size(160,120);

    const boton = document.getElementById('miBoton');

    boton.addEventListener('click', async event=>{
        capture.loadPixels();
        const image64 =  capture.canvas.toDataURL();
        const data = {lat,lon,image64};
    
        let message = JSON.stringify(data);
        console.log(message);
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:  message,
          };
          const response = await fetch('/api', options);
          const json = await response.json();
          console.log(json);
    
    });

    if('geolocation' in navigator){
        console.log("Geo available");
        navigator.geolocation.getCurrentPosition(position=>{
             lat = position.coords.latitude.toString();
             lon =  position.coords.longitude.toString();

    
        });
    }else{
        console.log("Geo not available");
    }
    

    
}

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const root = document.createElement('p');
    const image = document.createElement('img');

    
    image.src = item.image64;
   

    root.append(image);
    document.body.append(root);
  }
  console.log(data);
}