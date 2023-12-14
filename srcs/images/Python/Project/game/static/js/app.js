const btn = document.getElementById("btn");
const color = document.querySelector(".color")

btn.addEventListener('click', function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    const rgb = "rgba(" + r.toString() + ',' + g.toString() + ',' + b.toString() + ')';
    document.body.style.backgroundColor = rgb;
    console.log(rgb);
    color.textContent = rgb;

    $.ajax({
        type: "POST",
        url: 'update_color/',
        data: {'color': rgb, csrfmiddlewaretoken: csrf_token},
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
    // ajax will be the heart of front to back communication
    // since the front is navigator sided, and back server sided, there isn't any direct communication between them
    // ajax establishes an indirect connection between it and django with the help of a token
    // This is a very rough example, yet the simplest
    // the html file leading to this script has a "color_value" var that is empty to begin with
    // when the user clicks on the button to change the bg color to a random one, ajax sends it to django
    // django then stores it in a model and passes it to "color_value"
    // the goal of this code is to store a value for each user so when they reload the page, their preferences stay
});