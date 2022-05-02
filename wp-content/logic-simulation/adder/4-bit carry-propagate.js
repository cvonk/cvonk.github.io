// 4-bit carry-propagate adder
// used in https://coertvonk.com/technology/logic/computer-math-inquiry-4245/7
/*
Copyright (c) 2017 by Coert Vonk

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

var circuitCpa = {};  // carry-propagate adder Name Space
(function() {
  let queueDftDelay = 350; // msec
  var input = {};
  var output = {};

  // resize the fonts when the window is resized
  this.resizeFonts = function() {
    for (let key in input) {
      let obj = input[key];
      obj.style.fontSize = obj.clientWidth * 0.8 + "px";
    }
    for (let key in output) {
      let obj = output[key];
      obj.style.fontSize = obj.clientWidth * 0.8 + "px";
    }
  };

  this.toggle = function(obj) {
    obj = obj || window.event;
    obj.innerHTML = (Number(obj.innerHTML) + 1) % 2;
    circuitCpa.updateOutputs();
  };

  this.init = function() {
    console.log("init");
    jQuery('.circuit-container#circuit-cpa > .circuit-input').each(function(ii, obj) {
      input[obj.id] = obj;
      obj.innerHTML = 0;
      obj.onclick = function() {
        circuitCpa.toggle(this);
      };
      obj.style.height = "9%";
      obj.style.width = "4%";
      //obj.style.visibility = "visible";  // test only
    });
    jQuery('.circuit-container#circuit-cpa > .circuit-output').each(function(ii, obj) {
      output[obj.id] = obj;
      obj.style.height = "9%";
      obj.style.width = "4%";
      //obj.style.visibility = "visible";  // test only
    });
    circuitCpa.updateOutputs();
    circuitCpa.resizeFonts();
    if (window != window.top && parent.jQuery.fancybox) {
      resizeIframe();
    }
  }

  this.updateOutputs = function() {
    var a0 = +input.a0.innerHTML;
    var a1 = +input.a1.innerHTML;
    var a2 = +input.a2.innerHTML;
    var a3 = +input.a3.innerHTML;
    var b0 = +input.b0.innerHTML;
    var b1 = +input.b1.innerHTML;
    var b2 = +input.b2.innerHTML;
    var b3 = +input.b3.innerHTML;
    
    let c0 = (a0 && b0) || (0 && (a0 ^ b0)) ? 1 : 0;
    circuitQueue.insert( output.c0, c0, queueDftDelay);
    circuitQueue.insert( output.s0, a0 ^ b0 ^ 0 ? 1 : 0, 0);
    
    let c1 = (a1 && b1) || (c0 && (a1 ^ b1)) ? 1 : 0;
    circuitQueue.insert( output.c1, c1, queueDftDelay );
    circuitQueue.insert( output.s1, a1 ^ b1 ^ c0 ? 1 : 0, 0);

    let c2 = (a2 && b2) || (c1 && (a2 ^ b2)) ? 1 : 0;
    circuitQueue.insert( output.c2, c2, queueDftDelay );
    circuitQueue.insert( output.s2, a2 ^ b2 ^ c1 ? 1 : 0, 0);

    let c3 = (a3 && b3) || (c2 && (a3 ^ b3)) ? 1 : 0;
    circuitQueue.insert( output.c3, c3, queueDftDelay );
    circuitQueue.insert( output.s3, a3 ^ b3 ^ c2 ? 1 : 0, 0 );
    circuitQueue.insert( output.s4, c3 ? 1 : 0, 0 );
    circuitQueue.play(); // play the queued UI changes while respecting the requested delays
  };
}).apply(circuitCpa);

window.addEventListener('load', circuitCpa.init);
window.addEventListener('resize', circuitCpa.resizeFonts);
