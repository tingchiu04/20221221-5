var colors = "f7d1cd-e8c2ca-d1b3c4-b392ac-735d78".split("-").map(a=>"#"+a)
var colors_r = "7b2cbf-9d4edd-c77dff-e0aaff".split("-").map(a=>"#"+a)
var colors_r_r = "10002b-240046-3c096c-5a189a".split("-").map(a=>"#"+a)
var clr,clr_r,clr_r_r
//宣告陣列資料，記錄每一朵花的基本資料
var positionListX =[]  //所有花的X軸位置，List串列，array陣列
var positionListY =[]  //所有花的Y軸位置
var clrList=[]      //所有花瓣顏色
var clr_r_List = []  //所有花圓心顏色
var clr_r_r_List =[]
var sizeList =[]  //所有花的大小

//+++++++++++++++++++++++手勢辨識++++++++++++++++++++++
let handpose;
let video; //攝影機取得影像，放影像資料
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d
let pointerX14,pointerY14,pointerX16,pointerY16
//++++++++++++++++++++++++++++++++++++++++++++++++++++


function setup() {
  createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);//將方位度數改為角度模式
  for(var j=0;j<10;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)
    //紀錄資料
    positionListX.push(random(width)) //把花X位置存入到positionListX list資料內
    positionListY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
		clr_r_r_List.push(colors_r_r[int(random(colors_r_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionListX[j],positionListY[j]) //花的座標，原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
		  clr_r_r = clr_r_r_List[j]
      drawFlower(clr,clr_r,clr_r_r,sizeList[j]) 
    pop()
    }
	
	//++++++++++++取得攝影機影像並連線辨識++++++++++++++++++++
	video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
      predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
	//++++++++++++++++++++++++++++++++++++++++++++++++++++
	
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {  //一秒進到function執行60次
	
	translate(width, 0);
  scale(-1, 1);
	
  background(255); 
	
	image(video,0,0,width, height)
	 
	d= dist(pointerX8,pointerY8,pointerX4,pointerY4) //算出大拇指與食指的距離
	
  for(var j=0;j<positionListX.length;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)    
    //畫圖
    // push()  
    //   translate(positionListX[j],positionListY[j]) //花的座標，原點移到視窗的中心點
    //   rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
    //   clr = clrList[j]
    //   clr_r = clr_r_List[j]
    //   drawFlower(clr,clr_r,map(mouseX,0,width,sizeList[j],sizeList[j]+1)) 
    // pop()
		r_Flower(clrList[j], clr_r_List[j],clr_r_r_List[j],sizeList[j],positionListX[j],positionListY[j])
  }
  

	{
    }
	
	drawKeypoints(); //取得手指位置
  
}

function drawFlower(clr,clr_r,clr_r_r,size=1){  
  
  push()
    scale(size) //縮放
      noStroke()
      fill(clr)
      ellipse(0,0,350,320) //頭

      ellipse(-130,-140,145) //左耳
      ellipse(130,-140,145) //右耳

        beginShape()  //左腳
        curveVertex(-75,305)
        curveVertex(-90,345)
        curveVertex(-90,355)
        curveVertex(-80,375)
        curveVertex(-60,385)
        curveVertex(-35,385)
        curveVertex(-20,365)
        curveVertex(-15,330)
  
    endShape(CLOSE)
    beginShape()  //右腳
        curveVertex(75,305)
        curveVertex(90,345)
        curveVertex(90,355)
        curveVertex(80,375)
        curveVertex(60,385)
        curveVertex(35,385)
        curveVertex(20,365)
        curveVertex(15,330)
  
    endShape(CLOSE)
  
      fill("#ffeedd")
      ellipse(0,210,270,280) //身體
      
      fill(clr)
      beginShape()  //
        curveVertex(-135,210)
        curveVertex(-20,0)
        curveVertex(20,0)
        curveVertex(135,210)
    endShape(CLOSE)
    beginShape()  
        curveVertex(135,210)
        curveVertex(20,0)
        curveVertex(-20,0)
        curveVertex(-135,210)
    endShape(CLOSE)
  
      fill("#ffeedd")
      ellipse(0,30,305,250) //臉中淺色部分
      
      fill(255)//左眼框
      ellipse(-60,15,70)  
      fill("#f08080") 
      arc(-60, 20, 80, 80, 160, 320)      
      fill(255)
      arc(-58, 20, 70, 75, 160, 320) 
  
      fill(255)//右眼框
      ellipse(60,15,70) 
      fill("#f08080")
      arc(60, 20, 80, 80, 220, 20)     
      fill(255)
      arc(58, 20, 70, 75, 220, 20)  
  
      fill(clr_r) //左眼珠
      ellipse(-55+map(mouseX,0,width,-12,5),15+map(mouseY,0,height,-7,10),50)
      fill(clr_r_r)
      ellipse(-55+map(mouseX,0,width,-12,5),15+map(mouseY,0,height,-7,10),30)
      fill(255)
      ellipse(-50+map(mouseX,0,width,-5,12),10+map(mouseY,0,height,-7,10),15)
  
      fill(clr_r) //右眼珠
      ellipse(55+map(mouseX,0,width,-5,12),15+map(mouseY,0,height,-7,10),50)
      fill(clr_r_r)
      ellipse(55+map(mouseX,0,width,-5,12),15+map(mouseY,0,height,-7,10),30)
      fill(255)
      ellipse(65+map(mouseX,0,width,-5,12),10+map(mouseY,0,height,-7,10),15)
  
      fill("#f08080") //鼻子
      ellipse(0,30,15,10)
  
      // fill("#5fa8d3") //嘴
      // ellipse(0+m_x/150,90+m_y/150,35,30)
  
  
      fill(clr)
      beginShape()  //左手
        curveVertex(-105,125)
        curveVertex(-210,190)
        curveVertex(-200,230)
        curveVertex(-145,215)
        curveVertex(-90,180)
  
    endShape(CLOSE)
    beginShape()  //右手
        curveVertex(105,125)
        curveVertex(210,190)
        curveVertex(200,230)
        curveVertex(145,215)
        curveVertex(90,180)
  
    endShape(CLOSE)

    if(mouseIsPressed)
    {
      fill("#5fa8d3") //嘴
      ellipse(0,90,35,30)
    }
    else
    {
      fill("#5fa8d3") //嘴
      ellipse(0,90,30,10)
    
    }
  pop()    
}


function mousePressed(){
//紀錄資料
positionListX.push(mouseX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
positionListY.push(mouseY)
clrList.push(colors[int(random(colors.length))])
clr_r_List.push(colors_r[int(random(colors_r.length))])
clr_r_r_List.push(colors_r_r[int(random(colors_r_r.length))])
sizeList.push(random(0.5,1.5))
let data_length = positionListX.length
//畫圖
push() 
  translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
  clr = clrList[data_length-1]
  clr_r = clr_r_List[data_length-1]
	clr_r_r = clr_r_r_List[data_length-1]
  drawFlower(clr,clr_r,clr_r_r,sizeList[data_length-1]) 
pop()
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      // noStroke();
      if (j == 8) {				
				pointerX8 = map(keypoint[0],0,640,0,width)
				pointerY8 = map(keypoint[1],0,480,0,height)
        pointerZ8 = keypoint[2]
        console.log(pointerZ8)
        if(pointerZ8<-40)
        {
          R_draw(pointerX8,pointerY8)
        }
				
				ellipse(pointerX8, pointerY8, 30, 30);
      } else
      if (j == 4) {   
		fill(255,0,0)
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
				// pointerZ = keypoint[2]
				// print(pointerZ)
        ellipse(pointerX4, pointerY4, 30, 30);
		
      } else
      if (j == 14) {
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 16) {
        pointerX16 = keypoint[0];
        pointerY16 =  keypoint[1];
      }
			
    }
  
  }
}


function r_Flower(F_clr,F_clr_r,F_clr_r_r,F_size,F_x,F_y){
	push()
		translate(F_x,F_y);
	if(pointerY14<pointerY16){
		drawFlower(F_clr,F_clr_r,F_clr_r_r,map(d,0,600,F_size-0.2,F_size+0.6))
	}else
	{
		//無名指沒有彎曲，張開無名指，花旋轉
		rotate(frameCount/20)
		drawFlower(F_clr,F_clr_r,F_clr_r_r,F_size)
			
	}
	pop()
}

function R_draw(handX,handY)
{
positionListX.push(handX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
positionListY.push(handY)
clrList.push(colors[int(random(colors.length))])
clr_r_List.push(colors_r[int(random(colors_r.length))])
clr_r_r_List.push(colors_r_r[int(random(colors_r_r.length))])
sizeList.push(random(0.5,1.5))
let data_length = positionListX.length
//畫圖
push() 
  translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
  clr = clrList[data_length-1]
  clr_r = clr_r_List[data_length-1]
	clr_r = clr_r_r_List[data_length-1]
  drawFlower(clr,clr_r,clr_r_r,sizeList[data_length-1]) 
pop()

}