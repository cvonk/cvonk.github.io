// Visualiza Quadratic equation including real and complex roots
// used in https://coertvonk.com/math/pre-calc/quadratic-equations-23869
/*
  Copyright (c) 2018 by Coert Vonk

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

/**
 * configuration
 */

let a = 1, b = -4, c = 5;
const gd = "math-canvas";
const pointCount = 100;
const range = { x: [-10, 10], y: [-10, 10], z: [-10, 20] };
let snapped = false;
let surface = false;

/*
 * real parabola
 */

const _real = {
	parabola: function () {
		x_ = [];
		y_ = [];
		z_ = [];
		const D = b * b - 4 * a * (c - range.z[1]);
		const xmin = Math.max((-b - Math.sqrt(D)) / (2 * a), range.x[0]);
		const xmax = Math.min((-b + Math.sqrt(D)) / (2 * a), range.x[1]);
		for (var ii = 0; ii < pointCount; ii++) {
			const x = xmin + ii * (xmax - xmin) / (pointCount - 1);
			const val = (a * x * x) + (b * x) + c;
			x_.push(x);
			y_.push(0);
			z_.push(val);
		}
		return {
			name: "real parabola",
			type: "scatter3d",
			mode: "lines",
			x: x_, // values calc'ed in for-loop above
			y: y_,
			z: z_,
			line: {
				width: 10,
				color: "black"
			},
			hoverinfo: "x+y+z+name",
			hoverlabel: {
				bgcolor: "rgba(255,0,0,0.4)",
				font: { color: "white", family: 'MathJax_Math' }
			}
		}
	},
	label: function () {
		return {
			showarrow: false,
			x: this.parabola().x[pointCount - 1],  // should really just calc this value instead of the whole array
			y: this.parabola().y[pointCount - 1],  // should really just calc this value instead of the whole array
			z: Math.min(this.parabola().z[pointCount - 1], range.z[1]),  // should really just calc this value instead of the whole array
			text: "f(z<sub>r</sub>)",
			name: "f(z<sub>r</sub>)",
			font: {
				color: "black",
				size: 20,
				family: 'MathJax_Math'
			},
			xanchor: "left",
			yanchor: "top",
			yshift: 0,
			xshift: 10,
			opacity: 0.7
		}
	},
	arglabel: function () {
		return {
			showarrow: false,
			x: range.x[0], // values entered after for-loop below
			y: 0,
			z: 0,
			text: "f(z<sub>r</sub>)",
			name: "f(z<sub>r</sub>)",
			font: {
				color: "rgba(0,0,0,0.5)",
				size: 20,
				family: 'MathJax_Math'

			},
			xanchor: "right",
			yanchor: "center",
			yshift: 10,
			xshift: -10,
			opacity: 0.7
		}
	}
};

/*
 * complex parabola
 */

const _complex = {
	parabola: function () {
		x_ = [];
		y_ = [];
		z_ = [];
		const constant = -(b * b) / (4 * a) + c;
		const cXvalue = -b / (2 * a);
		const ymin = Math.max(-Math.sqrt((constant - range.z[0]) / a), range.y[0]);
		const ymax = Math.min(Math.sqrt((constant - range.z[0]) / a), range.y[1]);
		for (ii = 0; ii < pointCount; ii++) {
			const y = ymin + ii * (ymax - ymin) / (pointCount - 1);
			const val = -a * y * y + constant;
			x_.push(cXvalue);
			y_.push(y);
			z_.push(val);
		}
		return {
			visible: !snapped,
			name: "complex parabola",
			type: "scatter3d",
			mode: "lines",
			x: x_,
			y: y_,
			z: z_,
			line: {
				width: 10,
				color: "rgba(0,0,0,0.5)"
			},
			hoverinfo: "x+y+z+name",
			hoverlabel: {
				bgcolor: "rgba(255,0,0,0.4)",
				font: { color: "white", family: 'MathJax_Math' }
			}
		};
	},
	surface: function () {
		x_ = [];
		y_ = [];
		z_ = [];
		c_ = [];
		const D = b * b - 4 * a * (c - range.z[1]);
		const xmin = range.x[0]; // Math.max((-b - Math.sqrt(D)) / (2 * a), range.x[0]);
		const xmax = range.x[1]; // Math.min((-b + Math.sqrt(D)) / (2 * a), range.x[1]);
		const constant = -(b * b) / (4 * a) + c;
		const cXvalue = -b / (2 * a);
		const ymin = range.y[0]; // Math.max(-Math.sqrt((constant-range.z[0])/a), range.y[0]);
		const ymax = range.y[1]; // Math.min(Math.sqrt((constant-range.z[0])/a), range.y[1]);
		for (ii = 0; ii < pointCount; ii++) {
			x_row = [];
			y_row = [];
			z_row = [];
			c_row = [];
			const x = xmin + ii * (xmax - xmin) / (pointCount - 1);
			for (jj = 0; jj < pointCount; jj++) {
				const y = ymin + jj * (ymax - ymin) / (pointCount - 1);
				const re = a * x * x - a * y * y + b * x + c;
				const im = y * (2 * a * x + b);
				const modulus = Math.sqrt(re * re + im * im);
				const phi = Math.atan2(im, re);
				x_row.push(x);
				y_row.push(y);
				z_row.push(modulus);
				c_row.push(phi);
			}
			x_.push(x_row);
			y_.push(y_row);
			z_.push(z_row);
			c_.push(c_row);
		}
		return {
			type: "surface",
			x: x_,
			y: y_,
			z: z_,
			surfacecolor: c_,
			opacity: 0.6,
			showscale: false,
			hoverinfo: "none",
			visible: surface
		}
	},
	label: function () {
		return {
			showarrow: false,
			x: this.parabola().x[pointCount - 1],   // should really just calc this value instead of the whole array
			y: this.parabola().y[pointCount - 1],    // should really just calc this value instead of the whole array
			z: Math.max(this.parabola().z[pointCount - 1], range.z[0]),  // should really just calc this value instead of the whole array
			text: "f(z<sub>c</sub>)",
			name: "f(z<sub>c</sub>)",
			font: {
				color: "rgba(0,0,0,0.5)",
				size: 20,
				family: 'MathJax_Math'
			},
			xanchor: "left",
			yanchor: "center",
			yshift: 10,
			xshift: 10,
			opacity: 0.7,
			visible: !snapped
		};
	},
	arg: function () {
		const cXvalue = -b / (2 * a);
		return {
			type: "scatter3d",
			mode: "lines",
			x: [cXvalue, cXvalue],
			y: range.y,
			z: [0, 0],
			line: {
				width: 2,
				color: "rgba(0,0,0,0.5)"
			},
			hoverinfo: "none",
			visible: !snapped

		};
	},
	arglabel: function () {
		const cXvalue = -b / (2 * a);
		return snapped ? {} : {
			showarrow: false,
			x: cXvalue, // values entered after for-loop below
			y: range.y[1],
			z: 0,
			text: "z<sub>c</sub>=" + cXvalue + "+jy",
			name: "z<sub>c</sub>",
			font: {
				color: "rgba(0,0,0,0.5)",
				size: 20,
				family: 'MathJax_Math'
			},
			xanchor: "left",
			yanchor: "center",
			yshift: 10,
			xshift: 10,
			opacity: 0.7,
			visible: !snapped
		};
	},
	plane: function () {
		/* doesn't pass the opacity from surfacecolor 
			 type: "scatter3d",
			 mode: "lines",
			 x: [range.x[0], range.x[1], range.x[1], range.x[0], range.x[0]],
			 y: [range.y[0], range.y[0], range.y[1], range.y[1], range.y[0]],
			 z: [0, 0, 0, 0,0],
			 line: {
			 width: 0,
			 color: "white"
			 },
			 hoverinfo: "none",
			 surfaceaxis:2,
			 surfacecolor: "rgba(128,128,128,0.2)" */
		return {
			type: "surface",
			x: range.x,
			y: range.y,
			z: [[0, 0], [0, 0]],
			opacity: 0.6,
			showscale: false,
			hoverinfo: "none",
			visible: !snapped
		}
	}
};

/*
 * axis lines
 */

const _axis = {
	x: {
		line: {
			type: "scatter3d",
			mode: "lines",
			x: range.x,
			y: [0, 0],
			z: [0, 0],
			line: {
				width: 2,
				color: "red"
			},
			hoverinfo: "none"
		},
		label: {
			showarrow: false,
			x: 10,
			y: 0,
			z: 0,
			text: "x-axis",
			font: {
				color: "red",
				size: 20,
				family: 'MathJax_Math'
			},
			xanchor: "left",
			xshift: 10,
			opacity: 0.7
		}
	}, // end of _axis.x
	y: {
		line: {
			type: "scatter3d",
			mode: "lines",
			x: [0, 0],
			y: range.y,
			z: [0, 0],
			line: {
				width: 2,
				color: "green"
			},
			hoverinfo: "none"
		},
		label: {
			showarrow: false,
			x: 0,
			y: 10,
			z: 0,
			text: "y-axis",
			font: {
				color: "green",
				size: 20,
				family: 'MathJax_Math'
			},
			xanchor: "center",
			yshift: 5,
			opacity: 0.7
		}
	}, // end of _axis.y
	z: {
		line: {
			type: "scatter3d",
			mode: "lines",
			x: [0, 0],
			y: [0, 0],
			z: range.z,
			line: {
				width: 2,
				color: "blue"
			},
			hoverinfo: "none"
		},
		label: {
			showarrow: false,
			x: 0,
			y: 0,
			z: 20,
			text: "", //"f(x+jy)=real",
			name: "", //"f(x+jy)=real",
			font: {
				color: "blue",
				size: 20,
				family: 'MathJax_Math'
			},
			xanchor: "top",
			yshift: 10,
			opacity: 0.7
		}
	} // of _axis.z
}; // of axis

/*
 * roots
 */

const _root = {
	discr: function () {
		return b * b - 4 * a * c;
	},
	root: function (id) {
		const constant = -(b * b) / (4 * a) + c;
		const cXvalue = -b / (2 * a);
		if (id == 0) {
			return this.discr() >= 0
				? [(-b - Math.sqrt(this.discr())) / (2 * a), 0]
				: [cXvalue, -Math.sqrt(constant / a)];
		} else {
			return this.discr() >= 0
				? [(-b + Math.sqrt(this.discr())) / (2 * a), 0]
				: [cXvalue, Math.sqrt(constant / a)];
		}
	},
	value: function (id) {
		return {
			name: id == 0 ? "r1" : "r2",
			type: "scatter3d",
			mode: "markers",
			x: [this.root(id)[0]],
			y: [this.root(id)[1]],
			z: [0],
			marker: {
				size: 10,
				color: "rgba(255,128,0,0.7)",
				opacity: 0.6
			},
			hoverinfo: "x+y+z+name",
			hoverlabel: {
				bgcolor: "rgba(255,0,0,0.4)",
				font: { color: "white", family: 'MathJax_Math' }
			},
			visible: !snapped || this.discr() >= 0
		};
	},
	label: function (id) {
		return {
			showarrow: false,
			x: this.root(id)[0],
			y: this.root(id)[1],
			z: 0,
			text: "r<sub>" + (id + 1) + "</sub>=" +
				this.root(id)[0].toFixed(3) +
				(this.root(id)[1] == 0 ? "" : (this.root(id)[1] > 0 ? "+" : "") + this.root(id)[1].toFixed(3) + "j"),
			font: {
				color: "black",
				size: 25,
				family: 'MathJax_Math'
			},
			xanchor: id == 0 ? "right" : "left",
			xshift: id == 0 ? -10 : 10,
			opacity: 0.7,
			visible: !snapped || this.discr() >= 0
		};
	}
};

/*
 * layout
 */

function _defaultLayout(snapped) {
	const eye = {
		x: snapped ? 0 : 0.25,
		y: -1.25,
		z: 0
	};
	const aspectratio = {
		x: 1,
		y: snapped ? 1e-10 : 1,
		z: 1
	};
	const discr = b * b - 4 * a * c;
	_axis.y.label.visible = !snapped;
	_axis.z.label.visible = !snapped;
	return {
		showlegend: false,
		paper_bgcolor: "rgba(0,0,0,0)",
		plot_bgcolor: "rgba(0,0,0,0)",
		scene: {
			xaxis: {
				title: "",
				showgrid: false,
				range: range.x,
				showline: false, // false,
				showticklabels: false,
				zeroline: false,
				showspikes: false,
				hoverformat: ".3r"
			},
			yaxis: {
				title: "",
				range: range.y,
				showgrid: false,
				visible: snapped ? false : true,
				showline: false,
				showticklabels: false,
				zeroline: false,
				showspikes: false,
				hoverformat: ".3r"
			},
			zaxis: {
				title: "",
				range: range.z,
				showgrid: false,
				showline: false,
				showticklabels: false,
				zeroline: false,
				showspikes: false,
				hoverformat: ".3r"
			},
			annotations: [
				_axis.x.label,
				_axis.y.label,
				_axis.z.label,
				_real.label(),
				_real.arglabel(),
				_complex.label(),
				!snapped ? _complex.arglabel() : [],
				_root.label(0),
				_root.label(1)
			],
			aspectratio: aspectratio,
			camera: {
				center: {
					// no translation about the center of the scene
					x: 0,
					y: 0,
					z: 0
				},
				eye: eye,
				up: {
					x: 0,
					y: 0,
					z: 1 // z-axis is up
				}
			}
		},  // end scene

		margin: {
			t: 20, // top margin
			l: 20, // left margin
			r: 20, // right margin
			b: 20, // bottom margin
			p: 0 // padding
		}  // end margin
	};
}


const mathQuadratic = {

	plot: function () {
		Plotly.newPlot(
			gd,
			[
				_complex.plane(),
				_axis.x.line,
				_axis.y.line,
				_axis.z.line,
				_real.parabola(),
				_complex.arg(),
				_complex.parabola(),
				_complex.surface(),
				_root.value(0),
				_root.value(1)
			],
			_defaultLayout(snapped)
		);
	},

	init: function () {
		snapped = false;
		if (window != window.top && parent.jQuery.fancybox) {
			resizeIframe();
		}
		Plotly.plot(
			gd,
			[
				_complex.plane(),
				_axis.x.line,
				_axis.y.line,
				_axis.z.line,
				_real.parabola(),
				_complex.arg(),
				_complex.parabola(),
				_complex.surface(),
				_root.value(0),
				_root.value(1)
			],
			_defaultLayout(snapped)
		);

		jQuery(".range-container > .range-slider").each(function (ii, obj) {
			$(this).find("span").each(function () {
				var value = $(this).prev().attr("value");
				$(this).html(obj.id + " = " + value);
			});
			$(this).find("input").on("input", function () {
				$(this).next("span").html(obj.id + " = " + this.value);
			});
			$(this).find("input").on("change", function () {
				mathQuadratic.set(obj.id, this.value);
			});
		});

		window.onresize = function () {
			Plotly.Plots.resize(gd);
		};

	},

	show: function (value) {
		if (value == "f(zr)") {
			snapped = true;
			surface = false;
		} else if (value == "f(zc)") {
			snapped = false;
			surface = false;
		} else if (value == "f(z)") {
			snapped = false;
			surface = true;
		}
		this.plot();
	},

	fzr: function () {
		snapped = true;
		this.plot();
	},

	fzc: function () {
		snapped = false;
		this.plot();
	},

	fzc: function () {
		surface = true;
		this.plot();
	},

	set: function (variable, value) {
		const v = Number(value);
		if (variable == "c") {
			c = v;
		} else if (variable == "b") {
			b = v;
		} else if (variable == "a") {
			a = v;
		}
		console.log("vis", _complex.parabola().visible);
		this.plot();
	}

};

window.addEventListener('load', mathQuadratic.init);

// resize fonts with class "resize-font"
function cvonk_ResizeFont() {
	jQuery('.resize-font').each(function (ii, obj) {
		var latex = obj;
		var w = latex.offsetWidth;
		var h = latex.offsetHeight;
		var W = obj.offsetWidth;
		var H = obj.offsetHeight;
		if (w > W) {
			obj.style.fontSize = 95 * W / w + "%";
		}
	});
}
window.addEventListener("resize", function () {
	cvonk_ResizeFont();
});
