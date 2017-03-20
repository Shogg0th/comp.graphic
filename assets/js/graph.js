class Plotter {
    constructor(svg) {
        this._useAff = false;
        this._useProject = false;
        this._rotate = false;


        this.rotateConfig = {
            x: 0,
            y: 0,
            angle: 0
        }

        this.affConfig = {
            a: 0,
            b: 0,
            c: 0,
            d: 0
        };

        this.projectiveConfig = {
            pX0: 0,
            pY0: 0,
            pW0: 1,
            pXx: 0,
            pXy: 1,
            pWx: 0,
            pYx: 1,
            pYy: 0,
            pWy: 0
        }

        // const
        this.svg = svg;
        this.max = 510;
        this.maxX = 480;
        this.minX = 30;
        this.maxY = 480;
        this.minY = 30;
        this.unit = 15;

        this.x0 = (this.max) / 2.0;
        this.y0 = (this.max) / 2.0;

        // variables
        this.r1 = 40;
        this.r2 = 20;
        this.r3 = 30;
        this.a = 90;
    }

    get useRotation() {
        return this._rotate;
    }

    set useRotation(value) {
        this._rotate = value;
        this.drawFigure();

    }

    get useAff() {
        return this._useAff;
    }

    set useAff(value) {
        this._useAff = value;
        this._useProject = false;
        this.drawGrid();
        this.drawFigure();

    }

    get useProject() {
        return this._useProject;
    }

    set useProject(value) {
        this._useProject = value;
        this._useAff = false;
        this.drawGrid();
        this.drawFigure();
    }



    restore() {
        this.x0 = (this.max) / 2.0;
        this.y0 = (this.max) / 2.0;

        // variables
        this.r1 = 40;
        this.r2 = 20;
        this.r3 = 30;
        this.a = 90;

        this._useAff = false;
        this._useProject = false;
        this._rotate = false;
        this.rotate.angle = 0;
        this.drawGrid();
        this.drawFigure();
    }

    move(x, y) {
        this.x0 += x;
        this.y0 += y;
        this.drawFigure();
    }



    create(tag, attributes) {
        let el = document.createElementNS('http://www.w3.org/2000/svg', tag);
        el.setAttributes(attributes);
        return el;
    }

    getPoint(x, y) {
        return {
            x: x,
            y: y
        };
    }

    init(a, r1, r2, r3) {
        this.a = a;
        this.r1 = r1;
        this.r2 = r2;
        this.r3 = r3;
        this.drawGrid();
        this.drawFigure();

    }

    drawFigure() {



        if (this.figure) {
            this.figure.remove();
        }

        let g = this.create('g', {
            role: 'figure',
            "shape-rendering": "geometricPrecision"
        });


        // r1
        g.append(this.drawCircle(this.r1, this.x0, this.y0, 0, 360, 'figure'));
        // // r2
        g.append(this.drawCircle(this.r2, this.x0 + this.a, this.y0, 0, 360, 'figure'));
        g.append(this.drawCircle(this.r2, this.x0 - this.a, this.y0, 0, 360, 'figure'));
        g.append(this.drawCircle(this.r2, this.x0, this.y0 + this.a, 0, 360, 'figure'));
        g.append(this.drawCircle(this.r2, this.x0, this.y0 - this.a, 0, 360, 'figure'));

        let quarterStep = this.a - this.r2 - this.r1;

        // quarters
        g.append(this.drawCircle(this.r1, this.x0 + quarterStep, this.y0 + quarterStep, 0, 90, 'figure'));
        g.append(this.drawCircle(this.r1, this.x0 - quarterStep, this.y0 + quarterStep, 90, 180, 'figure'));
        g.append(this.drawCircle(this.r1, this.x0 - quarterStep, this.y0 - quarterStep, 180, 270, 'figure'));
        g.append(this.drawCircle(this.r1, this.x0 + quarterStep, this.y0 - quarterStep, 270, 360, 'figure'));


        // semicircles
        g.append(this.drawCircle(this.r3, this.x0, this.y0 + this.a, 0, 180, 'figure'));
        g.append(this.drawCircle(this.r3, this.x0 - this.a, this.y0, 90, 270, 'figure'));
        g.append(this.drawCircle(this.r3, this.x0, this.y0 - this.a, 180, 360, 'figure'));
        g.append(this.drawCircle(this.r3, this.x0 + this.a, this.y0, 270, 450, 'figure'));

        g.append(this.drawLine(this.x0 + this.a,
            this.x0 + this.a - this.r2,
            this.y0 + this.r3,
            this.y0 + this.r3, 'figure'));

        g.append(this.drawLine(this.x0 + this.a,
            this.x0 + this.a - this.r2,
            this.y0 - this.r3,
            this.y0 - this.r3, 'figure'));


        g.append(this.drawLine(this.x0 + this.r3,
            this.x0 + this.r3,
            this.y0 + this.a - this.r2,
            this.y0 + this.a, 'figure'));

        g.append(this.drawLine(this.x0 - this.r3,
            this.x0 - this.r3,
            this.y0 + this.a - this.r2,
            this.y0 + this.a, 'figure'));


        g.append(this.drawLine(this.x0 - this.a,
            this.x0 - this.a + this.r2,
            this.y0 + this.r3,
            this.y0 + this.r3, 'figure'));

        g.append(this.drawLine(this.x0 - this.a,
            this.x0 - this.a + this.r2,
            this.y0 - this.r3,
            this.y0 - this.r3, 'figure'));


        g.append(this.drawLine(this.x0 + this.r3,
            this.x0 + this.r3,
            this.y0 - this.a + this.r2,
            this.y0 - this.a, 'figure'));

        g.append(this.drawLine(this.x0 - this.r3,
            this.x0 - this.r3,
            this.y0 - this.a + this.r2,
            this.y0 - this.a, 'figure'));



        this.figure = g;

        this.svg.append(g);
    }


    drawLine(x1, x2, y1, y2, brush, denyRotation) {
        let p1 = this.getPoint(x1, y1),
            p2 = this.getPoint(x2, y2);

        if (this.useRotation && !denyRotation) {
            p1 = this.rotate(p1);
            p2 = this.rotate(p2);
        }

        if (this.useAff) {
            p1 = this.aff(p1);
            p2 = this.aff(p2);
        }

        if (this.useProject) {
            p1 = this.projective(p1);
            p2 = this.projective(p2);
        }




        let line = this.create('line', {
            x1: Math.round(p1.x),
            x2: Math.round(p2.x),
            y1: Math.round(p1.y),
            y2: Math.round(p2.y)
        });

        if (brush) {
            line.setAttribute("class", brush);
        }

        return line;
    }

    drawCircle(r, x, y, startDegree, endDegree, brush) {

        let g = this.create("g"),
            points = [];
        for (let degree = startDegree; degree <= endDegree; degree += 10) {
            let rad = degree !== 0 ? degree * Math.PI / 180 : 0;


            let point = {
                x: Math.cos(rad) * r + x,
                y: Math.sin(rad) * r + y
            };

            points.push(point);
        }


        for (let i = points.length - 1; i !== 0; i--) {
            let cur = points[i],
                next = points[i - 1],
                line = this.drawLine(cur.x, next.x, cur.y, next.y, brush);

            g.appendChild(line);
        }

        return g;
    }

    drawGrid() {

        if (this.grid) {
            this.grid.remove();
        }

        let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('role', 'grid');



        for (let x = this.minX; x < this.max - 15; x += 15) {
            let cl = 'grid';
            // if (Math.abs(x - 30 - (this.maxX - this.minX) / 2.0) < 15) {
            //     cl = 'main';
            // }
            g.appendChild(this.drawLine(x, x, this.minY, this.maxY, cl, true));
        }

        for (let y = this.minY; y < this.max - 15; y += 15) {
            let cl = 'grid';
            // if (Math.abs(y - 30 - (this.maxY - this.minY) / 2.0) < 15) {
            //     cl = 'main';
            // }
            g.appendChild(this.drawLine(this.minX, this.maxX, y, y, cl, true));
        }


        this.grid = g;
        this.svg.prepend(g);
    }

    initRotate(x, y, angle) {
        if (x != null && y != null && angle != null) {
            angle += this.rotateConfig.angle;
            x += this.x0;
            y += this.y0;
            this.rotateConfig = {
                x,
                y,
                angle
            }
            this.useRotation = true;
        }
    }


    initAff(a, b, c, d) {
        if (a != null && b != null && c != null && d != null) {


            this.affConfig = {
                a,
                b,
                c,
                d
            };

            this.useAff = true;
        }
    }

    initProjective(pX0, pY0, pW0, pXx, pXy, pWx, pYx, pYy, pWy) {

        this.projectiveConfig = {
            pX0: pX0 * this.unit,
            pY0: pY0 * this.unit,
            pXx: pXx * this.unit,
            pXy: pXy * this.unit,
            pYx: pYx * this.unit,
            pYy: pYy * this.unit,
            pW0,
            pWx,
            pWy
        };

        this.useProject = true;
    }

    aff(point) {
        let par = 7,
            oldX = point.x - par * 50,
            oldY = point.y - par * 50,
            x = (this.affConfig.a * oldX + this.affConfig.b * oldY) + par * 50,
            y = (this.affConfig.c * oldX + this.affConfig.d * oldY) + par * 50;

        return { x, y };


    }

    projective(point) {

        let proj = this.projectiveConfig,
            x, y;
        // proj.pX0 *= this.unit; proj.pY0 *= this.unit;
        // proj.pXx *= this.unit; proj.pXy *= this.unit;
        // proj.pYx *= this.unit; proj.pYy *= this.unit;

        x = (proj.pX0 * proj.pW0 + proj.pXx * proj.pWx * point.x + proj.pYx * proj.pWy * point.y)
            / (proj.pW0 + proj.pWx * point.x + proj.pWy * point.y);

        y = this.max - (proj.pY0 * proj.pW0 + proj.pXy * proj.pWx * point.x + proj.pYy * proj.pWy * point.y)
            / (proj.pW0 + proj.pWx * point.x + proj.pWy * point.y);

        if (isNaN(x) || isNaN(y)) {
            throw new Error("NAAAAAAAN");
        }

        return { x, y };
    }



    rotate(point) {
        let conf = this.rotateConfig,
            par = 7,
            x = point.x,
            y = point.y,
            scale = 50,
            rad = Math.PI * conf.angle / 180.0;

        x = conf.x + (x - conf.x) * Math.cos(rad) - (y - conf.y) * Math.sin(rad);
        y = conf.y + (y - conf.y) * Math.cos(rad) + (point.x - conf.x) * Math.sin(rad);


        // x = par * scale + conf.x + (x - par * scale + conf.x) * Math.cos(Math.PI * conf.angle / 180.0) -
        //     (y - par * scale + conf.y) * Math.sin(Math.PI * conf.angle / 180.0)
        // y = par * scale + conf.y + (y - par * scale + conf.y) * Math.cos(Math.PI * conf.angle / 180.0) +
        //     (x - par * scale + conf.x) * Math.sin(Math.PI * conf.angle / 180.0)

        return { x, y };

    }
}