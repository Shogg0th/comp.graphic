var plotter;


document.onkeyup = function (event) {
    let arrow = "Arrow";

    let codes = [{
        name: arrow + "Right",
        offset: {
            x: 10,
            y: 0
        }
    },
    {
        name: arrow + "Down",
        offset: {
            x: 0,
            y: -10
        }
    },

    {
        name: arrow + "Left",
        offset: {
            x: -10,
            y: 0
        }
    },
    {
        name: arrow + "Up",
        offset: {
            x: 0,
            y: 10
        }
    }]

    if (plotter) {

        let cur = codes.filter(item => {
            return item.name == event.code;
        })[0];

        if (cur)
            plotter.move(cur.offset.x, -cur.offset.y);

    }


}


window.onload = () => {
    plotter = new Plotter(document.querySelector(".graph"));
    plotter.drawGrid();
    plotter.drawFigure();

    let btn = document.querySelector("button[name='aff']");
    btn.onclick = () => {

        let a = +document.querySelector('input[name="a"]').value,
            b = +document.querySelector('input[name="b"]').value,
            c = +document.querySelector('input[name="c"]').value,
            d = +document.querySelector('input[name="d"]').value;

        plotter.initAff(a, b, c, d);
    };

    btn = document.querySelector("button[name='projective']");
    btn.onclick = () => {

        let x0 = +document.querySelector('input[name="x0"]').value,
            y0 = +document.querySelector('input[name="y0"]').value,
            w0 = +document.querySelector('input[name="w0"]').value,
            xx = +document.querySelector('input[name="xx"]').value,
            xy = +document.querySelector('input[name="xy"]').value,
            wx = +document.querySelector('input[name="wx"]').value,
            yx = +document.querySelector('input[name="yx"]').value,
            yy = +document.querySelector('input[name="yy"]').value,
            wy = +document.querySelector('input[name="wy"]').value;


        plotter.initProjective(x0, y0, w0, xx, xy, wx, yx, yy, wy);
    };


    btn = document.querySelector("button[name='restore']");
    btn.onclick = () => {
        plotter.restore();
    }

    btn = document.querySelector("button[name='figure']");


    btn.onclick = () => {

        let tags = [{ tag: "fA", div: 9 }, { tag: "fR1", div: 4 }, { tag: "fR2", div: 2 }, { tag: "fR3", div: 3 }],
            values = [];

        tags.map(tag => {

            let inp = document.getElementsByName(tag.tag)[0],
                val = +inp.value;

            if (val % tag.div !== 0) {
                inp.classList.add("form-invalid");
            }
            else {
                inp.classList.remove("form-invalid");
                values.push(val);
            }
        })

        if (values.length === 4)
            plotter.init.apply(plotter, values);
    }

    btn = document.querySelector("button[name='offset']");
    btn.onclick = () => {

        let oX = +document.querySelector('input[name="oX"]').value,
            oY = +document.querySelector('input[name="oY"]').value;

        plotter.move(oX, -oY);
    }


    btn = document.querySelector("button[name='rotate']");
    btn.onclick = () => {

        let x = +document.querySelector('input[name="rX"]').value,
            y = +document.querySelector('input[name="rY"]').value,
            angle = +document.querySelector('input[name="angle"]').value;

        plotter.initRotate(x, y, angle);
    }



};


Element.prototype.setAttributes = function (attributes = {}) {
    Object.keys(attributes).forEach(name => {
        this.setAttribute(name, attributes[name]);
    });
};



