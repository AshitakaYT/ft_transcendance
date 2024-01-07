let PI = Math.PI;

//document.getElementById("test").innerHTML = Width;
//document.getElementById("circle").setAttribute("height", string(Height + 20));
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const homeButton = document.getElementById('homeButton');

startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', pauseGame);

let gameRunning = false;
let gameAnimationFrame;
let isColorChangeEnabled = true;
let isControlSettings = false;


function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        startButton.style.display ='none';
        pauseButton.style.display ='block';
        homeButton.style.display ='none';
        pauseOverlay.style.display = 'none';
        exitControlSettingsMode('up');
        exitControlSettingsMode('down');
        gameAnimationFrame = requestAnimationFrame(frame);
    }
}

function pauseGame() {
    if (gameRunning) {
        gameRunning = false;
        updatePauseOverlay();
        pauseButton.style.display ='none';
        homeButton.style.display ='block';
        startButton.style.display ='block';
        pauseOverlay.style.display = 'block';
        cancelAnimationFrame(gameAnimationFrame);
    }
}

function animateScore(scoreElement) {
    scoreElement.classList.remove('score-animate');
    void scoreElement.offsetWidth;
    scoreElement.classList.add('score-animate');
    setTimeout(() => {
        scoreElement.classList.remove('score-animate');
    }, 500);
}

const pauseOverlay = document.getElementById('pauseOverlay');
window.addEventListener('resize', updatePauseOverlay);
function updatePauseOverlay() {
    const rect = gameContainer.getBoundingClientRect();
    pauseOverlay.style.width = `${rect.width}px`;
    pauseOverlay.style.height = `${rect.height}px`;
    pauseOverlay.style.top = `0px`;
    pauseOverlay.style.left = `0px`;
}

var data =
{
    t: 0.1,
    up: false,
    down: false,
    ball:
    {
        x: 0,
        y: 0,
        r: 25,
        rv: ballv,
        tv: 0,
    },
    paddleR:
    {
        x: width / 2 - paddled - paddlew,
        y: - paddleh / 2,
        vy: 0,
        recover: 1,
        score: 0
    },
    paddleL:
    {
        x: paddled - width / 2,
        y: - paddleh / 2,
        vy: 0,
        recover: 1,
        score: 0
    }
};

let upKey = 'w';
let downKey = 's';
let keyDownHandler;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('upControl').addEventListener('click', function() {
        enterControlSettingsMode('up');
    });

    document.getElementById('downControl').addEventListener('click', function() {
        enterControlSettingsMode('down');
    });
});

function enterControlSettingsMode(control) {
    if (isControlSettings) {
        return;
    }
    isControlSettings = true;
    document.querySelector(`#${control}Control`).classList.add('active');
    waitForNextKeyPress(control);
}

function waitForNextKeyPress(control) {
    keyDownHandler = function(e) {
        if (!e.repeat) {
            updateControl(control, e.key);
            exitControlSettingsMode(control);
        }
    };
    document.addEventListener('keydown', keyDownHandler);
}

function updateControl(control, key) {
    switch (control) {
        case 'up':
            upKey = key;
            document.querySelector('#upControl span').textContent = key;
            break;
        case 'down':
            downKey = key;
            document.querySelector('#downControl span').textContent = key;
            break;
    }
}

function exitControlSettingsMode(control) {
    document.removeEventListener('keydown', keyDownHandler);
    document.querySelector(`#${control}Control`).classList.remove('active');
    isControlSettings = false;
}

document.addEventListener("keydown", (e) => {
    if (e.key == upKey && !e.repeat)
        data.up = true;
    if (e.key == downKey && !e.repeat)
        data.down = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key == upKey && !e.repeat)
        data.up = false;
    if (e.key == downKey && !e.repeat)
        data.down = false;
});



function frame() {

    if (!simulate()) {
        //draw();
        animate();
        if (gameRunning == true)
            window.requestAnimationFrame(frame);
    }
    //setInterval(frame(), 20);

}

function edgesColl(tr) {
    if (data.ball.x + ballvx(data.ball) * tr.dt < data.ball.r - width / 2 - lengoal) {
        tr.ntv = 0;
        tr.nrv = ballv;
        tr.restart = true;
        // tr.ntv = sanangle(PI - data.ball.tv);
        tr.dt = (data.ball.r - width / 2 - lengoal - data.ball.x) / ballvx(data.ball)
    }
    if (data.ball.x + ballvx(data.ball) * tr.dt > width / 2 - data.ball.r + lengoal) {
        tr.ntv = PI;
        tr.nrv = ballv;
        tr.restart = true;
        // tr.ntv = sanangle(PI - data.ball.tv);
        tr.dt = (width / 2 - data.ball.r + lengoal - data.ball.x) / ballvx(data.ball)
    }

    if (data.ball.y + ballvy(data.ball) * tr.dt < data.ball.r - height / 2 && Math.sin(data.ball.tv) < 0) {
        tr.ntv = sanangle(- data.ball.tv);
        tr.dt = (data.ball.r - height / 2 - data.ball.y) / ballvy(data.ball)
    }
    if (data.ball.y + ballvy(data.ball) * tr.dt > height / 2 - data.ball.r && Math.sin(data.ball.tv) > 0) {
        tr.ntv = sanangle(- data.ball.tv);
        tr.dt = (height / 2 - data.ball.r - data.ball.y) / ballvy(data.ball)
    }
    return (tr);
}

function paddlesColl(tr) {
    var dtc;
    var paddle;
    var side;

    for (let i = 0; i < 4; i++) {
        switch (i) {
            case 0:
                side = 1;
                paddle = data.paddleL;
                dtc = (data.paddleL.x + paddlew - data.ball.x + data.ball.r) / ballvx(data.ball);
                break;
            case 1:
                side = - 1;
                dtc = (data.paddleL.x - data.ball.x - data.ball.r) / ballvx(data.ball);
                break;
            case 2:
                side = 1;
                paddle = data.paddleR;
                dtc = (data.paddleR.x + paddlew - data.ball.x + data.ball.r) / ballvx(data.ball);
                break;
            case 3:
                side = -1;
                dtc = (data.paddleR.x - data.ball.x - data.ball.r) / ballvx(data.ball);
                break;
        }
        if (dtc >= 0 && dtc <= tr.dt && data.ball.y + ballvy(data.ball) * dtc > paddle.y + paddle.vy * dtc
            && data.ball.y + ballvy(data.ball) * dtc < paddle.y + paddle.vy * dtc + paddleh
            && Math.cos(data.ball.tv) * side < 0) {
            tr.rv = data.ball.rv / ballfriction;
            tr.dt = dtc;
            tr.ntv = sanangle(((2 * (data.ball.y + ballvy(data.ball) * dtc - (paddle.y + dtc * paddle.vy)) / paddleh) - 1) * PI / 4);
            if (side == -1)
                tr.ntv = sanangle(PI - tr.ntv);
            //document.getElementById("test").innerHTML = (data.ball.y + ballvy(data.ball) * dtc - (paddle.y + dtc * paddle.vy)) / paddleh;
        }
    }
    return (tr);
}

function spheres(sphere1, sphere2) {
    let dx = sphere1.x - sphere2.x;
    let dy = sphere1.y - sphere2.y;
    let dvx = ballvx(sphere1) - ballvx(sphere2);
    let dvy = ballvy(sphere1) - ballvy(sphere2);

    let a = Math.pow(dvx, 2) + Math.pow(dvy, 2);
    if (a == 0)
        return (-1);
    let b = 2 * (dx * dvx + dy * dvy);
    let c = Math.pow(dx, 2) + Math.pow(dy, 2) - Math.pow(sphere1.r + sphere2.r, 2);

    let delta = Math.pow(b, 2) - 4 * a * c;

    if (delta < 0)
        return (-1);
    return ((- b - Math.sqrt(delta)) / (2 * a));
}


function allSpheresColl(tr) {
    var coll;
    var little =
    {
        x: data.paddleL.x + paddlew / 2,
        y: data.paddleL.y,
        r: paddlew / 2,
        rv: data.paddleL.vy,
        tv: PI / 2
    };
    coll = spheres(little, data.ball);
    //document.getElementById("test").innerHTML = coll;
    //logMessage(coll);
    if (coll >= 0 && coll <= tr.dt) {
        tr.nrv *= smash;
        tr.dt = coll;
        tr.ntv = sanangle(- PI / 4);
        tr.nlvy = recoil;
        data.paddleL.recover = 0;
    }

    little.y = data.paddleL.y + paddleh;

    coll = spheres(little, data.ball);
    if (coll >= 0 && coll <= tr.dt) {
        tr.nrv *= smash;
        tr.dt = coll;
        tr.ntv = sanangle(PI / 4);
        tr.nlvy = - recoil;
        data.paddleL.recover = 0;
    }

    little.x = data.paddleR.x + paddlew / 2;
    little.y = data.paddleR.y;
    little.rv = data.paddleR.vy;

    coll = spheres(little, data.ball);
    if (coll >= 0 && coll <= tr.dt) {
        tr.nrv *= smash;
        tr.dt = coll;
        tr.ntv = sanangle(- 3 * PI / 4);
        tr.nrvy = recoil;
        data.paddleR.recover = 0;
    }

    little.y = data.paddleR.y + paddleh;

    coll = spheres(little, data.ball);
    if (coll >= 0 && coll <= tr.dt) {
        tr.nrv *= smash;
        tr.dt = coll;
        tr.ntv = sanangle(3 * PI / 4);
        tr.nrvy = - recoil;
        data.paddleR.recover = 0;
    }
    return (tr);
}

function paddles(tr) {
    if (data.paddleL.y + data.paddleL.vy * tr.dt - paddlew / 2 < - height / 2) {
        tr.dt = (- height / 2 - data.paddleL.y + paddlew / 2) / data.paddleL.vy;
        tr.nlvy = 0;
    }
    else if (data.paddleL.y + data.paddleL.vy * tr.dt + paddleh + paddlew / 2 > height / 2) {
        tr.dt = (height / 2 - data.paddleL.y - paddlew / 2 - paddleh) / data.paddleL.vy;
        tr.nlvy = 0;
    }
    if (data.paddleR.y + data.paddleR.vy * tr.dt - paddlew / 2 < - height / 2) {
        tr.dt = (- height / 2 - data.paddleR.y + paddlew / 2) / data.paddleR.vy;
        tr.nrvy = 0;
    }
    else if (data.paddleR.y + data.paddleR.vy * tr.dt + paddleh + paddlew / 2 > height / 2) {
        tr.dt = (height / 2 - data.paddleR.y - paddlew / 2 - paddleh) / data.paddleR.vy;
        tr.nrvy = 0;
    }
    return (tr);
}

function input() {
    data.paddleL.vy /= paddlefriction; // Deplacer pour que ce soit en fonction du t et dans la simulation
    data.paddleR.vy /= paddlefriction;
    data.ball.rv /= ballfriction;
    if (data.ball.rv < ballv)
        data.ball.rv = ballv;
    data.paddleL.recover += data.t / recovertime;
    data.paddleR.recover += data.t / recovertime;
    if (data.paddleL.recover > 1)
        data.paddleL.recover = 1;
    if (data.paddleR.recover > 1)
        data.paddleR.recover = 1; //
    if (data.down == true) {
        data.paddleL.vy -= paddlespeed * data.paddleL.recover * data.t;
        data.paddleR.vy -= paddlespeed * data.paddleR.recover * data.t;
    }
    if (data.up == true) {
        data.paddleL.vy += paddlespeed * data.paddleL.recover * data.t;
        data.paddleR.vy += paddlespeed * data.paddleR.recover * data.t;
    }

    //IA input


}

function sanangle(angle) { return angle % (2 * PI) }
function ballvx(ball) { return ball.rv * Math.cos(ball.tv); }
function ballvy(ball) { return ball.rv * Math.sin(ball.tv); }

function simulate() {
    input();
    var i = 0;
    var inter;
    var final;
    while (data.t > 0 && i < 10000) {
        let tr = {
            dt: data.t,
            nrv: data.ball.rv,
            ntv: data.ball.tv,
            nlvy: data.paddleL.vy,
            nrvy: data.paddleR.vy,
            restart: false
        }
        final = { ...tr };
        // document.getElementById("test").innerHTML = JSON.stringify(data) + "<br>";
        // logMessage("final.dt = " + final.dt);

        inter = paddles({ ...tr });
        tr.dt = inter.dt;
        if (inter.dt < final.dt)
            final = { ...inter };
        inter = edgesColl({ ...tr });
        tr.dt = inter.dt;
        if (inter.dt < final.dt)
            final = { ...inter };
        inter = paddlesColl({ ...tr });
        tr.dt = inter.dt;
        if (inter.dt < final.dt)
            final = { ...inter };
        inter = allSpheresColl({ ...tr });
        tr.dt = inter.dt;
        if (inter.dt < final.dt)
            final = { ...inter };

        data.ball.x += ballvx(data.ball) * final.dt;
        data.ball.y += ballvy(data.ball) * final.dt;
        if (final.restart) {
            if (data.ball.x > 0) {
                data.paddleL.score++;
                document.getElementById('player1Score').textContent = data.paddleL.score;
                animateScore(document.getElementById('player1Score'));
            }
            else {
                data.paddleR.score++;
                document.getElementById('player2Score').textContent = data.paddleR.score;
                animateScore(document.getElementById('player2Score'));
            }
            data.ball.x = 0;
            data.ball.y = 0;
        }
        data.paddleL.y += data.paddleL.vy * final.dt;
        data.paddleR.y += data.paddleR.vy * final.dt;

        data.ball.rv = final.nrv;
        data.ball.tv = final.ntv;
        if (data.ball.rv > 1000000)
            data.ball.rv = 1000000;

        data.paddleL.vy = final.nlvy;
        data.paddleR.vy = final.nrvy;
        data.t -= final.dt;

        i++;
        // logMessage("i = " + i);
        if (i == 100000) {
            return (1);
        }
    }
    data.t = 0.1;
    return (0);
}

// Partie de Julien
import * as THREE from 'three';
let my = 0;
let light_pow = 100
let fov_deg = 1;
let fov_rad = fov_deg * PI / 180;



const scene = new THREE.Scene();
scene.background = new THREE.Color(0.01, 0.01, 0.01);

const camera = new THREE.PerspectiveCamera(fov_deg, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(0, 0, Math.max(width, height) / (2. * Math.tan(fov_rad / 2.)));
camera.lookAt(0, 0, 0);

const gameContainer = document.getElementById('gameContainer');
const renderer = new THREE.WebGLRenderer();
gameContainer.appendChild(renderer.domElement);
gameContainer.appendChild(pauseOverlay);
const gameElement = renderer.domElement;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
//document.addEventListener("mousemove",mouseevent);
window.addEventListener("resize", windowsresize);

const geometry_pad = new THREE.CapsuleGeometry(paddlew / 2., paddleh, 10, 30);
const geometry_ball = new THREE.SphereGeometry(data.ball.r, 10, 30);
const geometry_edge = new THREE.CylinderGeometry(paddlew, paddlew, width * 2., 60);
const material_lit = new THREE.MeshPhongMaterial({ color: 0xffffff });
const material_unlit = new THREE.MeshBasicMaterial({ color: 0x0000ff });

let arrball = [];
let len = 10;
arrball.length = len;
for (let i = 0; i < len; ++i) {
    arrball[i] = new THREE.Mesh(geometry_ball, material_unlit);
    arrball[i].scale.set((i + 1) / len, (i + 1) / len, (i + 1) / len);
    scene.add(arrball[i]);
}

const padl = new THREE.Mesh(geometry_pad, material_lit);
scene.add(padl);
padl.castShadow = true;

const padr = new THREE.Mesh(geometry_pad, material_lit);
scene.add(padr);
padr.castShadow = true;

const edgeu = new THREE.Mesh(geometry_edge, material_lit);
scene.add(edgeu);
edgeu.receiveShadow = true;
edgeu.rotation.z = 3.1415926535 / 2;
edgeu.position.y = height / 2 + paddlew;

const edged = new THREE.Mesh(geometry_edge, material_lit);
scene.add(edged);
edged.receiveShadow = true;
edged.rotation.z = 3.1415926535 / 2;
edged.position.y = -height / 2 - paddlew;

const light = new THREE.PointLight(0x0000ff, data.ball.r * data.ball.r * light_pow);
light.castShadow = true;
scene.add(light);

const amblight = new THREE.AmbientLight(0xffffff, .01);
scene.add(amblight);

let rot = 0;


function animate() {
    if (isColorChangeEnabled) {
        light.color.offsetHSL(0.003, 0, 0);
        material_unlit.color.offsetHSL(0.003, 0, 0);
    }
    for (let i = 0; i < len - 1; ++i) {
        arrball[i].position.set(arrball[i + 1].position.x, arrball[i + 1].position.y, arrball[i + 1].position.z,);
    }
    arrball[len - 1].position.set(data.ball.x, data.ball.y, 0);
    light.position.set(data.ball.x, data.ball.y, 0);
    padl.position.set(data.paddleL.x + paddlew / 2, data.paddleL.y + paddleh / 2, 0);
    padr.position.set(data.paddleR.x + paddlew / 2, data.paddleR.y + paddleh / 2, 0);

    rot += 0.002;
    //camera.position.set(Math.sin(rot)*5,0,Math.cos(rot)*5);
    //camera.up.set(Math.cos(rot)*5,0,Math.sin(rot)*-5);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

function mouseevent(event) {
    my = event.clientY / window.innerHeight * -2 + 1;
}

function windowsresize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

document.addEventListener('DOMContentLoaded', function() {
    const toggleColorChangeCheckbox = document.getElementById('toggleColorChange');

    toggleColorChangeCheckbox.addEventListener('change', function() {
        isColorChangeEnabled = this.checked;
    });
});

frame();