    let i = 0;
    let j = 0;
    let dx = 1;
    let dy = 1;
    function redirectToURL() {
            window.location.href = 'https://0.0.0.0:8000/';
        }
        document.getElementById('redirectButton').addEventListener('click', redirectToURL);
    function draw()
    {
        var canvas = document.getElementById('circle');
        if (canvas.getContext)
            {

                var ctx = canvas.getContext('2d'); 
                ctx.clearRect(0, 0, 1700, 700);
                var X = (canvas.width / 2 + 4 * i) % canvas.width;
                var Y = (canvas.height / 2  + 4 * j) % canvas.height;
                var R = 25;

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.rect(10, 10, 1680, 680);
                ctx.strokeStyle = '#000000';

                ctx.stroke();

                ctx.beginPath();
                ctx.fillStyle = '#FF0000';
                ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
                ctx.fill();


                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.rect(20, (700 - 200) / 2, 20, 200);
                ctx.fillStyle = '#0000FF';
                ctx.fill();

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.rect(1680 - 20, (500 - 200) / 2, 20, 200);
                ctx.fillStyle = '#0000FF';
                ctx.fill();
                if (X < 10 + R || X > 1690 - R)
                    dx *= -1;
                if (Y < 10 + R || Y > 690 - R)
                    dy *= -1;
                if (i > 203 || i < -203)
                {
                    i = 0;
                    j = 0;
                }
                i += dx;
                j += dy;
                document.getElementById("test").innerHTML = i;
                window.requestAnimationFrame(draw);
            }
}