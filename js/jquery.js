$(document).ready(function () {
    var socket = io.connect('http://sudanuprising.eu-4.evennode.com/'); // Change to the host and node port

    $(".popup").hide();

    socket.on("stream", function (tweet) {
        $(".content").prepend('<li><img src="' + tweet.icon + '" alt=""><div class="name">' + tweet.name + ' (@' + tweet.username + ')</div><div class="message">' + tweet.text + '</div></li>');
        $(".list").html(tweet.hash);

        var colors = [".3F602B", "#77896C", "#008B8B", "#528B8B", "#567E3A", "#55AE3A", "#458B74", "#174038", "#20BF9F", "#01C5BB", "#457371", "#78AB46", "#FF4040", "#EE5C42", "#CD3700", "#29242", "#B87333", "#8B795E"];
        var rand = Math.floor(Math.random() * colors.length);
        $("li:first-child").css("background-color", colors[rand]);
    });


    socket.on("followers", function (followers) {
        $(".number").text(followers.number);
    });

    $(".change-hash-tag").click(function () {
        $(".popup").fadeToggle();
        $(".hash-tag").focus();
    });


    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $(".popup").fadeOut();
        }
    });

    $(".about").hover(function () {
        $(".about div").stop().fadeToggle();
    });
    socket.emit("hash", {hash: ''});
});
