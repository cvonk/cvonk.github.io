window.addEventListener("load", function() {
    jQuery("article").each(function(ii,obj) {
	obj.onclick = function() {
            jQuery("article")[ii].setAttribute("data-clicked", "1");
	};
    });
});
