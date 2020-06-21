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
        canvas.width=canvasWidth;
        canvas.height=canvasHeight;

        location.hash = seed;

        const stepMax = 2.5;
        const stepChange = 1.0;
        const heightMax = canvasHeight*9/10;

        let height = generator.random() * heightMax;
        let slope = generator.random() * stepChange * 2 - stepChange;

        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        ctx.strokeWidth = 1;
        ctx.strokeStyle = "#000000";
        ctx.beginPath();

        Array.from(new Array(canvasWidth).keys()).forEach(x => {
            height += slope;
            slope += generator.random() * stepChange * 2 - stepChange;

            slope = Math.max(-stepMax, slope);
            slope = Math.min(stepMax, slope);

            if (height > heightMax) {
                height = heightMax;
                slope *= -1;
            }
            if (height < 0) {
                height = 0;
                slope *= -1;
            }

            ctx.moveTo(x, canvasHeight);
            ctx.lineTo(x, height);
            ctx.stroke();
        });
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
