let allBalls = document.querySelectorAll('.ball');
allBalls.forEach(function (ball) {
    let widthX = ball.clientWidth;
    let heightX = ball.clientHeight;
    ball.addEventListener('mouseover', function (e) {
        e.target.style.width = widthX + 100 + 'px';
        e.target.style.height = heightX + 100 + 'px';
    });
    ball.addEventListener('mouseout', function (e) {
        e.target.style.width = widthX + 'px';
        e.target.style.height = heightX + 'px';
    });
});