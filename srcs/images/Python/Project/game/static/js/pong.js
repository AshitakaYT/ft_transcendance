let width=1000;
let height=620;
let paddleh=200;
let paddlew=50;
let paddled=20;
let paddlespeed=50;

    //document.getElementById("test").innerHTML = Width;
    //document.getElementById("circle").setAttribute("height", string(Height + 20));

    var data =
    {
        h : height,
        w : width,
        t : 0.1,
        up : false,
        down : false,
        ball :
        {
            x : 0,
            y : 0,
            r : 25,
            vx : 50,
            vy : 50
        },
        paddleR :
        {
            x : width / 2 - paddled - paddlew,
            y : - paddleh / 2,
            w : paddlew,
            h : paddleh,
            vy : 0
        },
        paddleL :
        {
            x : paddled - width / 2,
            y : - paddleh / 2,
            w : paddlew,
            h : paddleh,
            vy : 0,
        }
    };
    
    function frame()
    {

        if (!simulate())
        {
            draw();
            window.requestAnimationFrame(frame);
        }
        //setInterval(frame(), 20);

    }

    function edgesColl(tr)
    {
        if (data.ball.x + data.ball.vx * tr.dt < data.ball.r - data.w / 2)
        {
            tr.nvx = - data.ball.vx;
            tr.dt = (data.ball.r - data.w / 2 - data.ball.x) / data.ball.vx
        }
        if (data.ball.x + data.ball.vx * tr.dt > data.w / 2 - data.ball.r)
        {
            tr.nvx = - data.ball.vx;
            tr.dt = (data.w / 2 - data.ball.r - data.ball.x) / data.ball.vx
        }

        if (data.ball.y + data.ball.vy * tr.dt < data.ball.r - data.h / 2)
        {
            tr.nvy = - data.ball.vy;
            tr.dt = (data.ball.r - data.h / 2 - data.ball.y) / data.ball.vy
        }
        if (data.ball.y + data.ball.vy * tr.dt > data.h / 2 - data.ball.r)
        {
            tr.nvy = - data.ball.vy;
            tr.dt = (data.h / 2 - data.ball.r - data.ball.y) / data.ball.vy
        }
    }

    function paddlesColl(tr)
    {
        let dtc = (data.paddleL.x + paddlew - data.ball.x + data.ball.r) / data.ball.vx;
        if (dtc > 0 && dtc <= tr.dt && data.ball.y + data.ball.vy * dtc > data.paddleL.y && data.ball.y + data.ball.vy * dtc < data.paddleL.y + paddleh)
        {
            tr.dt = dtc;
            tr.nvx = - data.ball.vx;
        }

        dtc = (data.paddleL.x - data.ball.x - data.ball.r) / data.ball.vx;
        if (dtc > 0 && dtc <= tr.dt && data.ball.y + data.ball.vy * dtc > data.paddleL.y && data.ball.y + data.ball.vy * dtc < data.paddleL.y + paddleh)
        {
            tr.dt = dtc;
            tr.nvx = - data.ball.vx;
        }

        dtc = (data.paddleR.x + paddlew - data.ball.x + data.ball.r) / data.ball.vx;
        if (dtc > 0 && dtc <= tr.dt && data.ball.y + data.ball.vy * dtc > data.paddleR.y && data.ball.y + data.ball.vy * dtc < data.paddleR.y + paddleh)
        {
            tr.dt = dtc;
            tr.nvx = - data.ball.vx;
        }

        dtc = (data.paddleR.x - data.ball.x - data.ball.r) / data.ball.vx;
        if (dtc > 0 && dtc <= tr.dt && data.ball.y + data.ball.vy * dtc > data.paddleR.y && data.ball.y + data.ball.vy * dtc < data.paddleR.y + paddleh)
        {
            tr.dt = dtc;
            tr.nvx = - data.ball.vx;
        }
    }

    function spheres(sphere1, sphere2)
    {
        let dx = sphere1.x - sphere2.x;
        let dy = sphere1.y - sphere2.y;
        let dvx = sphere1.vx - sphere2.vx;
        let dvy = sphere1.vy - sphere2.vy;
    
        let a = Math.pow(dvx, 2) + Math.pow(dvy, 2);
        let b = 2 * (dx * dvx + dy * dvy);
        let c = Math.pow(dx, 2) + Math.pow(dy, 2) - Math.pow(sphere1.r + sphere2.r, 2);

        let delta = Math.pow(b, 2) - 4 * a * c;

        if (delta < 0)
            return (-1);
        return ((- b - Math.sqrt(delta)) / (2 * a));
    }

    function allSpheresColl(tr)
    {
        var coll;
        var smash = 1;
        var little =
        {
            x : data.paddleL.x + paddlew / 2,
            y : data.paddleL.y,
            r : paddlew / 2,
            vx : 0,
            vy : data.paddleL.vy
        };

        coll = spheres(little, data.ball);
        if (coll > 0 && coll <= tr.dt)
        {
            tr.dt = coll;
            if (data.ball.x >= little.x && data.ball.vx < 0)
                tr.nvx = - smash * data.ball.vx;
            tr.nvy = 2 * data.paddleL.vy - data.ball.vy;
            tr.nlvy = data.paddleL.vy + 5;
        }

        little.y = data.paddleL.y + paddleh;

        coll = spheres(little, data.ball);
        if (coll > 0 && coll <= tr.dt)
        {
            tr.dt = coll;
            if (data.ball.x >= little.x && data.ball.vx < 0)
                tr.nvx = - smash * data.ball.vx;
            tr.nvy = 2 * data.paddleL.vy - data.ball.vy;
            tr.nlvy = data.paddleL.vy - 5;
        }

        little.x = data.paddleR.x + paddlew / 2;
        little.y = data.paddleR.y;
        little.vy = data.paddleR.vy;

        coll = spheres(little, data.ball);
        if (coll > 0 && coll <= tr.dt)
        {
            tr.dt = coll;
            if (data.ball.x <= little.x && data.ball.vx > 0)
                tr.nvx = - smash * data.ball.vx;
            tr.nvy = 2 * data.paddleR.vy - data.ball.vy;
            tr.nrvy = data.paddleR.vy + 5;
        }

        little.y = data.paddleR.y + paddleh;

        coll = spheres(little, data.ball);
        if (coll > 0 && coll <= tr.dt)
        {
            tr.dt = coll;
            if (data.ball.x <= little.x && data.ball.vx > 0)
                tr.nvx = - smash * data.ball.vx;
            tr.nvy = 2 * data.paddleR.vy - data.ball.vy;
            tr.nrvy = data.paddleR.vy - 5;
        }
    }

    function paddles(tr)
    {
        if (data.paddleL.y + data.paddleL.vy * tr.dt - paddlew / 2 < - height / 2)
        {
            tr.dt = (- height / 2 - data.paddleL.y + paddlew / 2) / data.paddleL.vy;
            tr.nlvy = 0;
        }
        else if (data.paddleL.y + data.paddleL.vy * tr.dt + paddleh + paddlew / 2 > height / 2)
        {
            tr.dt = (height / 2 - data.paddleL.y - paddlew / 2 - paddleh) / data.paddleL.vy;
            tr.nlvy = 0;
        }
        if (data.paddleR.y + data.paddleR.vy * tr.dt - paddlew / 2 < - height / 2)
        {
            tr.dt = (- height / 2 - data.paddleR.y + paddlew / 2) / data.paddleR.vy;
            tr.nrvy = 0;
        }
        else if (data.paddleR.y + data.paddleR.vy * tr.dt + paddleh + paddlew / 2 > height / 2)
        {
            tr.dt = (height / 2 - data.paddleR.y - paddlew / 2 - paddleh) / data.paddleR.vy;
            tr.nrvy = 0;
        }
    }

    function input()
    {
        data.paddleL.vy /= 1.2;
        data.paddleR.vy /= 1.2;
        if (data.up == true)
        {

            data.paddleL.vy -= paddlespeed;
            data.paddleR.vy -= paddlespeed;
        }
        if (data.down == true)
        {
            data.paddleL.vy += paddlespeed;
            data.paddleR.vy += paddlespeed;
        }
    }

    function simulate()
    {
        input();
        var i = 0;
        while (data.t > 0 && i < 10000)
        {
            let tr = {
                dt : data.t,
                nvx : data.ball.vx,
                nvy : data.ball.vy,
                nlvy : data.paddleL.vy,
                nrvy : data.paddleR.vy,
            }
            document.getElementById("test").innerHTML = " tr.dt = " + tr.dt + " data.t = " + data.t;
            paddles(tr);
            logMessage("tr.dt = " + tr.dt);
            edgesColl(tr);
            logMessage("tr.dt = " + tr.dt);
            paddlesColl(tr);
            logMessage("tr.dt = " + tr.dt);
            allSpheresColl(tr);
            logMessage("tr.dt = " + tr.dt);

            data.ball.x += data.ball.vx * tr.dt;
            data.ball.y += data.ball.vy * tr.dt;
            data.paddleL.y += data.paddleL.vy * tr.dt;
            data.paddleR.y += data.paddleR.vy * tr.dt;

            data.ball.vx = tr.nvx;
            data.ball.vy = tr.nvy;
            data.paddleL.vy = tr.nlvy;
            data.paddleR.vy = tr.nrvy;
            data.t -= tr.dt;
            i++;
            if (i == 10000)
            {
                logMessage("crash");
                return (1);
            }
        }
        data.t = 0.1;
        return (0);
    }

    function logMessage(message) {
        document.getElementById('test').innerHTML += `${message}<br>`;
    }

    document.getElementById('game').addEventListener("keydown", (e) => {
            if (e.key == 'w' && !e.repeat)
                data.up = true;
            if (e.key == 's' && !e.repeat)
                data.down = true;
        });

    document.getElementById('game').addEventListener("keyup", (e) => {
            if (e.key == 'w' && !e.repeat)
                data.up = false;
            if (e.key == 's' && !e.repeat)
                data.down = false;
        });

    function draw()
    {
        var canvas = document.getElementById('game');

        if (canvas.getContext)
            {
                var ctx = canvas.getContext('2d'); 
                ctx.clearRect(0, 0, canvas.width , canvas.height);
                
                // Rectangle game

                ctx.beginPath();
                ctx.moveTo((canvas.width - data.w) / 2, (canvas.height - data.h) / 2);
                ctx.lineTo((canvas.width + data.w) / 2 + data.w, (canvas.height - data.h) / 2);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo((canvas.width - data.w) / 2, (canvas.height + data.h) / 2);
                ctx.lineTo((canvas.width + data.w) / 2, (canvas.height + data.h) / 2);
                ctx.stroke();

                // ctx.beginPath();
                // ctx.lineWidth = 3;
                // ctx.rect((canvas.width - data.w) / 2, (canvas.height - data.h) / 2, data.w, data.h);
                // ctx.strokeStyle = '#000000';
                // ctx.stroke();
                
                //Ball

                ctx.beginPath();
                ctx.fillStyle = '#FF0000';
                ctx.arc(data.ball.x + canvas.width / 2, data.ball.y + canvas.height / 2, data.ball.r, 0, 2 * Math.PI, false);
                ctx.fill();

                // Left Paddle

                ctx.beginPath();
                ctx.fillStyle = '#0000FF';
                ctx.arc((canvas.width + data.paddleL.w) / 2 + data.paddleL.x, canvas.height / 2 + data.paddleL.y, data.paddleL.w / 2, 0, 2 * Math.PI, false);
                ctx.fill();

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.rect(canvas.width / 2 + data.paddleL.x, canvas.height / 2 + data.paddleL.y, data.paddleL.w, data.paddleL.h);
                ctx.fillStyle = '#0000FF';
                ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = '#0000FF';
                ctx.arc((canvas.width + data.paddleL.w) / 2 + data.paddleL.x, canvas.height / 2 + data.paddleL.y + data.paddleL.h, data.paddleL.w / 2, 0, 2 * Math.PI, false);
                ctx.fill();

                //Right Paddle

                        ctx.fillStyle = '#0000FF';
                ctx.arc((canvas.width + data.paddleR.w) / 2 + data.paddleR.x, canvas.height / 2 + data.paddleR.y, data.paddleR.w / 2, 0, 2 * Math.PI, false);
                ctx.fill();

                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.rect(canvas.width / 2 + data.paddleR.x, canvas.height / 2 + data.paddleR.y, data.paddleR.w, data.paddleR.h);
                ctx.fillStyle = '#0000FF';
                ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = '#0000FF';
                ctx.arc((canvas.width + data.paddleR.w) / 2 + data.paddleR.x, canvas.height / 2 + data.paddleR.y + data.paddleR.h, data.paddleR.w / 2, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.beginPath();
            }
    }     //ctx.beginPath();
   
function goHome() {
    window.location.href = 'https://localhost:8000/';
}
document.getElementById('redirectButton').addEventListener('click', goHome);