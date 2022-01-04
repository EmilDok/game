function handleMouseMove(event) {
    var Point = {
        posX: event.clientX - (window.innerWidth - 800)/2,
        posY: event.clientY - (window.innerHeight - 442)/2
    }
    return Point;
}

//variables
const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 442;
const ctx = canvas.getContext('2d');

let curX = 0;
let curY = 0;

let frstX = 0;
let frstY = 0;

let scndX = 0;
let scndY = 0;
let curLineNumber = 0;
let linesPointsArr = [];
let specFunc;
let normalCoords = [];

//Start levels

function startFirstLevel() {
    curLineNumber = 0;
    linesPointsArr = [];
    normalCoords = [];
    console.clear();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.removeEventListener("click", specFunc);
    specFunc = setFirstPoint(followMouse(drawCircle), checkCollision, 1);
    canvas.addEventListener("click", specFunc);
    drawCircle();
}

function startSecondLevel() {
    curLineNumber = 0;
    linesPointsArr = [];
    normalCoords = [];
    console.clear();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.removeEventListener("click", specFunc);
    specFunc = setFirstPoint(followMouse(drawRect), checkCollision2, 2);
    canvas.addEventListener("click", specFunc);
    drawRect();
}

function startThirdLevel() {
    curLineNumber = 0;
    linesPointsArr = [];
    console.clear();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.removeEventListener("click", specFunc);
    specFunc = setFirstPoint(followMouse(drawRect2), checkCollision3, 4);
    canvas.addEventListener("click", specFunc);
    drawRect2();
}

function startFourthLevel() {
    curLineNumber = 0;
    linesPointsArr = [];
    normalCoords = [];
    console.clear();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.removeEventListener("click", specFunc);
    specFunc = setFirstPoint(followMouse(drawRect3), checkCollision4, 4);
    canvas.addEventListener("click", specFunc);
    drawRect3();
}

//First level functions

function setFirstPoint(funcOnMouse, funcToCheck, linesNumber) {

    return function name(event) {
        //Если это конечный клик
        if (curLineNumber == linesNumber*2) {
            
            scndX = handleMouseMove(event).posX;
            scndY = handleMouseMove(event).posY;

            var Point1 = {
                posX: scndX,
                posY: scndY
            }

            linesPointsArr.push(Point1)

            funcToCheck();
            curLineNumber = 0;
            linesPointsArr = [];
        }
        //Если это первый клик
        if (curLineNumber % 2 == 0) {

            frstX = handleMouseMove(event).posX;
            frstY = handleMouseMove(event).posY;

            var Point1 = {
                posX: frstX,
                posY: frstY
            }

            linesPointsArr.push(Point1)
            document.onmousemove = funcOnMouse;
            curLineNumber++;
        //Если это второй клик
        } else {
            curLineNumber++;
            scndX = handleMouseMove(event).posX;
            scndY = handleMouseMove(event).posY;

            var Point1 = {
                posX: scndX,
                posY: scndY
            }
            linesPointsArr.push(Point1)

            funcToCheck();
        }

    };
}

function followMouse(drawFigure) {
    return function name1(event) {
        if (curLineNumber % 2 != 0) {

            curX = handleMouseMove(event).posX;
            curY = handleMouseMove(event).posY;
    
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawFigure();

            let fp = 0;
            let sp = 1;
            if (curLineNumber > 1) {
                while (sp <= linesPointsArr.length - 1) {
                    ctx.beginPath();
                    ctx.moveTo(linesPointsArr[fp].posX, linesPointsArr[fp].posY);
                    ctx.lineTo(linesPointsArr[sp].posX, linesPointsArr[sp].posY);
                    ctx.closePath();
                    ctx.stroke();
                    fp += 2;
                    sp += 2;
                }
            }
            ctx.beginPath();
            ctx.moveTo(frstX, frstY);
            ctx.lineTo(curX, curY);
            ctx.closePath();
            ctx.stroke();
            
        }
    }
}

//First level functions

function drawCircle() {
    ctx.beginPath();
    ctx.arc(400, 221, 50, 0, 2 * Math.PI);
    ctx.stroke();
}

function checkCollision()
{
    if (linesPointsArr.length == 2) {
        let x = 0;
        let y = 0;

        normalCoords = [];
        linesPointsArr.forEach(el => {
            var Point = {
                posX: (el.posX - 400),
                posY: - (el.posY - 221)
            }
            normalCoords.push(Point)
        });

        a = (normalCoords[0].posY-normalCoords[1].posY)/(normalCoords[1].posX-normalCoords[0].posX);
        c = (normalCoords[1].posX*normalCoords[0].posY-normalCoords[0].posX*normalCoords[1].posY)/(normalCoords[0].posX-normalCoords[1].posX);
        b = 1;
        radius = 50;

        let dist = (Math.abs(a * x + b * y + c)) / Math.sqrt(a * a + b * b);

        if (radius >= dist && Math.sqrt(normalCoords[0].posX*normalCoords[0].posX + normalCoords[0].posY*normalCoords[0].posY) >= radius
        &&  Math.sqrt(normalCoords[1].posX*normalCoords[1].posX + normalCoords[1].posY*normalCoords[1].posY) >= radius){
            console.log("chetko");
            console.log(Math.abs(100 - dist/radius*100));
        }
        else{
            console.log("hujnya");
        }
    }
}

//Second level functions

function drawRect() {
    ctx.beginPath();
    ctx.rect(325, 146, 150, 150, 150);
    ctx.stroke();
}

function checkCollision2()
{
    if (linesPointsArr.length == 4) {
        normalCoords = [];
        
        let firstCheck = true;

        linesPointsArr.forEach(el => {
            var Point = {
                posX: (el.posX - 400),
                posY: - (el.posY - 221)
            }
            normalCoords.push(Point)
        });
        
        let b1 = 0;
        let b2 = 0;
        let k1 = 0;
        let k2 = 0;

        b1 = (normalCoords[0].posX*normalCoords[1].posY-normalCoords[0].posY*normalCoords[1].posX)/(normalCoords[0].posX-normalCoords[1].posX);
        k1 = normalCoords[0].posY/normalCoords[0].posX - b1*(1/normalCoords[0].posX);

        b2 = (normalCoords[2].posX*normalCoords[3].posY-normalCoords[2].posY*normalCoords[3].posX)/(normalCoords[2].posX-normalCoords[3].posX);
        k2 = normalCoords[2].posY/normalCoords[2].posX - b2*(1/normalCoords[2].posX);

        let innerX = (b2-b1)/(k1-k2);
        let innerY = k2*innerX + b2;

        normalCoords.forEach(element => {
            if ((element.posX <= 75 && element.posY <= 75 && element.posX >= -75 && element.posY >= -75)) {
                firstCheck = false;
            }
        });

        if (innerX <= 75 && innerY <= 75 && innerX >= -75 && innerY >= -75 && firstCheck == true) {
            console.log('chetko')
        } else {
            console.log('hujnya')
        }
    }
}

//Third level functions

function drawRect2() {
    t1 = 100;
    t2 = 100;

    ctx.beginPath();
    ctx.moveTo(400, 221-t1);
    ctx.lineTo(400+t2, 221);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400+t2, 221);
    ctx.lineTo(400, 221+t1);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400, 221+t1);
    ctx.lineTo(400-t2, 221);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400-t2, 221);
    ctx.lineTo(400, 221-t1);
    ctx.closePath();
    ctx.stroke();
}

function checkCollision3()
{
    let amountOfInners = 0;
    normalCoords = [];
    let firstCheck = true;
    
    if (linesPointsArr.length == 8) {

        linesPointsArr.forEach(el => {
            var Point = {
                posX: (el.posX - 400),
                posY: - (el.posY - 221)
            }
            normalCoords.push(Point)
        });
        
        for (let i = 0; i <= 6; i = i+2) {

            for (let j = i + 1; j <= 6; j = j+2) {

                if (checkIfLinesCrossedInRomb(normalCoords[i], normalCoords[i+1], normalCoords[j+1], normalCoords[j+2]))
                    amountOfInners++;
                
            }
            
        }

        normalCoords.forEach(element => {
            if (checkIfPointInRomb(element)) {
                firstCheck = false;
            }
        });

        if (amountOfInners != 4 || firstCheck == false){
            console.log('fignya')
        }
        else 
            console.log('chetko')
        
        

    }
}

function checkIfLinesCrossedInRomb(point1, point2, point3, point4) {

    let b1 = 0;
    let b2 = 0;
    let k1 = 0;
    let k2 = 0;
    let innerX = 0;
    let innerY = 0;

    k1 = (point2.posY - point1.posY)/(point2.posX - point1.posX)
    b1 = point1.posY - k1*point1.posX

    k2 = (point4.posY - point3.posY)/(point4.posX - point3.posX)
    b2 = point3.posY - k2*point3.posX

    innerX = (b2-b1)/(k1-k2);
    innerY = k1*innerX + b1;
    

    if (innerY < (innerX + 100) && innerY > (- innerX - 100) && innerY < (-innerX  + 100) && innerY > (innerX  - 100))
        return true;
    else
        return false;

}

function checkIfPointInRomb(point) {
    if (point.posY < (point.posX + 100) && point.posY > (- point.posX - 100) && point.posY < (-point.posX  + 100) && point.posY > (point.posX  - 100))
        return true;
    else
        return false;
}

//Fourth level functions

function drawRect3() {
    let indent = 70;
    let squareSize = 80;

    ctx.beginPath();
    ctx.rect(400 - indent - squareSize/2, 221 - indent - squareSize/2, squareSize, squareSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(400 - indent - squareSize/2, 221 + indent - squareSize/2, squareSize, squareSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(400 + indent - squareSize/2, 221 + indent - squareSize/2, squareSize, squareSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(400 + indent - squareSize/2, 221 - indent - squareSize/2, squareSize, squareSize);
    ctx.stroke();
}   

function checkCollision4()
{
    let linesCrossedPoints = [];
    let linesAreInSquares = [0, 0, 0, 0];
    let crossedCounter = 0;
    let firstCheck = true;

    if (linesPointsArr.length == 8) {
        normalCoords = [];

        linesPointsArr.forEach(el => {
            var Point = {
                posX: (el.posX - 400),
                posY: - (el.posY - 221)
            }
            normalCoords.push(Point)
        });
        
        for (let i = 0; i <= 6; i = i+2) {

            for (let j = i + 1; j <= 6; j = j+2) {
                linesCrossedPoints.push(getCrossingPoint(normalCoords[i], normalCoords[i+1], normalCoords[j+1], normalCoords[j+2]))
            }
            
        }

        for (let i = 0; i < linesCrossedPoints.length; i++) {
            if (linesCrossedPoints[i].posX >= -110 && linesCrossedPoints[i].posY >= 30 && linesCrossedPoints[i].posX <= -30 && linesCrossedPoints[i].posY <= 110) {
                linesAreInSquares[0]++;
                linesCrossedPoints.splice(i, 1)
            }
        }
        
        for (let i = 0; i < linesCrossedPoints.length; i++) {
            if (linesCrossedPoints[i].posX >= 30 && linesCrossedPoints[i].posY >= 30 && linesCrossedPoints[i].posX <= 110 && linesCrossedPoints[i].posY <= 110) {
                linesAreInSquares[1]++;
                linesCrossedPoints.splice(i, 1)
            }
        }
        
        for (let i = 0; i < linesCrossedPoints.length; i++) {
            if (linesCrossedPoints[i].posX >= 30 && linesCrossedPoints[i].posY >= -110 && linesCrossedPoints[i].posX <= 110 && linesCrossedPoints[i].posY <= -30) {
                linesAreInSquares[2]++;
                linesCrossedPoints.splice(i, 1)
            }
        }
        
        for (let i = 0; i < linesCrossedPoints.length; i++) {
            if (linesCrossedPoints[i].posX >= -110 && linesCrossedPoints[i].posY >= -110 && linesCrossedPoints[i].posX <= -30 && linesCrossedPoints[i].posY <= -30) {
                linesAreInSquares[3]++;
                linesCrossedPoints.splice(i, 1)
            }
        }

        normalCoords.forEach(element => {
            if ((element.posX >= -110 && element.posY >= 30 && element.posX <= -30 && element.posY <= 110) || 
                (element.posX >= 30 && element.posY >= 30 && element.posX <= 110 && element.posY <= 110) || 
                (element.posX >= 30 && element.posY >= -110 && element.posX <= 110 && element.posY <= -30) || 
                (element.posX >= -110 && element.posY >= -110 && element.posX <= -30 && element.posY <= -30)
            ) {
                firstCheck = false
            }
        });

        if (linesAreInSquares[0] == 1 && linesAreInSquares[1] == 1 && linesAreInSquares[2] == 1 && linesAreInSquares[3] == 1 && firstCheck == true) {
            console.log('chetko')
        } else{
            console.log('hujnya')
            console.log(linesCrossedPoints)
        }
    }
}

function getCrossingPoint(point1, point2, point3, point4) {

    let b1 = 0;
    let b2 = 0;
    let k1 = 0;
    let k2 = 0;
    let innerX = 0;
    let innerY = 0;

    k1 = (point2.posY - point1.posY)/(point2.posX - point1.posX)
    b1 = point1.posY - k1*point1.posX

    k2 = (point4.posY - point3.posY)/(point4.posX - point3.posX)
    b2 = point3.posY - k2*point3.posX

    innerX = (b2-b1)/(k1-k2);
    innerY = k1*innerX + b1;
    
    var Point = {
        posX: innerX,
        posY: innerY
    }

    return Point;
}
