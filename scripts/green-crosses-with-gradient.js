// Startwerte f�r A und C
var A = 0.25;
var C = 0.9997;

// Anzahl Formen
var N = 2560;

// max. Anzahl Versuche, eine Form unterzubringen
var MAX_TRIALS = 60;

// "Breite" der Form
var S = 0;

// proceed() wird bei jeder Iteration vor dem Platzieren einer weiteren Form aufgerufen
function proceed()
{
    A = A * C;
    S = A / 2;
}

var X;
var Y;

// getShape() liefert den QPainterPath f�r die zu platzierende Form
function getShape(x0, y0)
{
    X = x0;
    Y = y0;
    var path = new PainterPath;
    path.moveTo(x0-S/6, y0-S/2);
    path.lineTo(x0+S/6, y0-S/2);
    path.lineTo(x0+S/6, y0-S/6);
    path.lineTo(x0+S/2, y0-S/6);
    path.lineTo(x0+S/2, y0+S/6);
    path.lineTo(x0+S/6, y0+S/6);
    path.lineTo(x0+S/6, y0+S/2);
    path.lineTo(x0-S/6, y0+S/2);
    path.lineTo(x0-S/6, y0+S/6);
    path.lineTo(x0-S/2, y0+S/6);
    path.lineTo(x0-S/2, y0-S/6);
    path.lineTo(x0-S/6, y0-S/6);
    path.lineTo(x0-S/6, y0-S/6);
    var tx1 = new Transform;
    tx1.translate(-x0, -y0);
    tx1.rotate(7*Math.random()-3.5, 0);
    var tx2 = new Transform;
    tx2.translate(x0, y0);
    return tx2.map(tx1.map(path));
}

// getColor() liefert die Farbe, in der die Form gezeichnet werden soll
function getColor() 
{
    var dx = X-0.5;
    var dy = Y-0.5;
    var d = 1-Math.sqrt(dx*dx+dy*dy);
    return new Color(0, 255*d , 20);
}

MainWindow.setBackgroundColor(new Brush(15, 15, 15));
