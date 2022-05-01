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

// if running in iFrame
function resizeIframe() {
    if (window != window.top && parent.jQuery.fancybox) {
	let dWidth = 500; //jQuery(document).width();
	let dHeight = 500; // jQuery(document).height();
	console.log(dWidth, dHeight);
	let vpWidth = parent.document.documentElement.clientWidth;
	let vpHeight = parent.document.documentElement.clientHeight;
	console.log(vpWidth,vpHeight);
	scale = vpWidth / dWidth;
	console.log(scale);
	if ( dHeight * scale > vpHeight ) {
            vpHeight = vpHeight * 0.8;
            vpWidth = vpHeight * dWidth / dHeight;
	} else {
            vpWidth = vpWidth * 0.8;
            vpHeight = vpWidth * dHeight / dWidth;
	}
	vpWidth += 30;
	vpHeight += 30;
	console.log(vpWidth,vpHeight);
	parent.jQuery("#fancybox-outer").height(vpHeight);
	parent.jQuery("#fancybox-outer").width(vpWidth);
	parent.jQuery("#fancybox-content").height(vpHeight);
	parent.jQuery("#fancybox-content").width(vpWidth);
	//parent.jQuery.fancybox.resize();
	parent.jQuery.fancybox.center();
    }
}

// resize all LaTeX Display elements to they fit in on screen
function cvonk_ResizeMathJax() {
    jQuery('.MathJax_Display').each(function(ii, obj) {
	    var latex = obj.children[0];
	    var w = latex.offsetWidth;
	    var h = latex.offsetHeight;	   
	    var W = obj.offsetWidth;
	    var H = obj.offsetHeight;
	    if (w > W) {
	        obj.style.fontSize = 95 * W / w + "%";
	    }
    });
}
window.MathJax = {
    AuthorInit: function() {
	MathJax.Hub.Register.StartupHook("Begin", function() {
	    MathJax.Hub.Queue(function() {
		cvonk_ResizeMathJax();
	    });
	});
    },
    jax: ["input/TeX", "output/HTML-CSS", "output/NativeMML"],
    extensions: ["tex2jax.js"]
};
window.addEventListener("resize", function() {
    cvonk_ResizeMathJax();  
});
