img="";
status="";
objects=[];

function setup()
{
    canvas = createCanvas( 350 , 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    
}

function start()
{
    objectDetector = ml5.objectDetector( 'cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    objectname = document.getElementById("enter_object").value;
}

function draw()
{
    image(video , 0 , 0 , 350 , 350);
    
    if(status !="")
    {
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill('#ff0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+20);
            noFill();
            stroke('#ff0000');
            rect(objects[i].x-15 , objects[i].y , objects[i].width , objects[i].height);

            if(objects[i].label == objectname)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("results").innerHTML = objectname + "Found"
                synth = window.speechSynthesis; utterThis = new SpeechSynthesisUtterance(object_name + "Found"); synth.speak(utterThis);
                
            }
            else 
            {
                document.getElementById("results").innerHTML = objectname + "Not Found"
            }
        }
    }
}

function modelLoaded()
{
    console.log('Model Is Loaded');
    status = true;
    objectDetector.detect(img , gotResult);
}

function gotResult(error , results)
{
      if(error)
{
      console.log(error);
}
      console.log(results);
      objects=results;
}

