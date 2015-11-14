se4sToolkitApp.controller('HomePageCtrl',[ '$scope', function($scope) {
	
	// Changing the currently selected nav li item as active
	$(".nav.nav-pills li").on("click",function(){
		$(".nav.nav-pills li").removeClass("active");
		$(this).addClass("active");
	});
}]);