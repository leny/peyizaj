/* leny/peyizaj
 *
 * /script/peyizaj - main script
 *
 * coded by leny@flatLand!
 * started at 21/06/2020
 */

// adapted from https://gamedev.stackexchange.com/a/93531

(() => {
    let canvas, ctx;

    const draw = seed => {
        const generator = new MersenneTwister(seed);
        const {clientWidth: canvasWidth, clientHeight: canvasHeight} = canvas;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        location.hash = seed;

        const stepMax = 0.25 + generator.random() * 2.25;
        const stepChange = 0.75 + generator.random() * 0.5;
        const maxHeight = canvasHeight * (0.5 + generator.random() * 0.3);
        const minHeight = canvasHeight - maxHeight;

        let height = generator.random() * maxHeight,
            slope = generator.random() * stepChange * 2 - stepChange;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "skyblue";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "darkgreen";
        ctx.moveTo(0, canvasHeight);
        ctx.beginPath();

        Array.from(new Array(canvasWidth + 1).keys()).forEach(x => {
            height += slope;
            slope += generator.random() * stepChange * 2 - stepChange;

            slope = Math.max(-stepMax, slope);
            slope = Math.min(stepMax, slope);

            if (height > maxHeight) {
                height = maxHeight;
                slope *= -1;
            }
            if (height < minHeight) {
                height = minHeight;
                slope *= -1;
            }

            ctx.lineTo(x, height);
        });

        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.lineTo(0, canvasHeight);
        ctx.closePath();
        ctx.fill();
    };

    const init = () => {
        let seed;

        canvas = document.querySelector("canvas");

        if (!(ctx = canvas.getContext("2d"))) {
            throw new Error("Seriously, dude? No support for canvas?");
        }

        if (location.hash) {
            seed = parseInt(location.hash.replace("#", ""));
        }

        seed = isNaN(seed)
            ? Math.round(Math.random() * 1000000000 * 1000000000)
            : seed;

        draw(seed);

        document
            .querySelector(".frame")
            .addEventListener(
                "click",
                evt => (
                    evt.preventDefault(),
                    draw(Math.random() * 1000000000 * 1000000000)
                ),
            );
    };

    window.addEventListener("DOMContentLoaded", init);
})();
