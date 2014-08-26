
(function(){

	var app = angular.module("researchApp", ["firebase", "youtube-embed", "readableTime"]);
	
	app.controller('vidCtrl', function ($scope, $youtube) {
	  
	  $scope.researchVid = 'cb_JmjetgxQ';
	  
	  
	  $scope.$on('youtube.player.ready', function () {
	    $youtube.player.playVideo();
	  });
	  
	  $scope.checkTime = function(){
	  	$scope.time = $youtube.player.getCurrentTime();
		$scope.$parent.$broadcast('checkTime', $scope.time); // going down!
	  }
	  
	  $scope.$on('seek', function (event, data) {
	      $youtube.player.seekTo((data));
		  $youtube.player.playVideo();
	    });
	  
	  $scope.timer = setInterval($scope.checkTime,1000);
	  
	});

	
	app.controller("messagesCtrl", function($scope, $firebase) {
		
	  var ref = new Firebase("https://blistering-torch-4438.firebaseio.com/messages");
	  var sync = $firebase(ref);
	  
	  $scope.time;
	  $scope.messages = sync.$asArray();
	  
	  $scope.addMessage = function(text) {
	    $scope.messages.$add({text: text, time : $scope.time});
		$scope.newMessageText = "";
	  }
	  
	  $scope.$on('checkTime', function (event, data) {
	      $scope.time = data;
	    });
		
  	  $scope.seekTo = function(time){
  		  $scope.$parent.$broadcast('seek', time); // going down!
  	  }
	  
	  $scope.setSelected = function() {
	     if ($scope.lastSelected) {
	       $scope.lastSelected.selected = '';
	     }
	     this.selected = 'selected';
	     $scope.lastSelected = this;
	  }
	  
	  $scope.toggleEdit = function(){
		  if(!this.edit){
			  this.edit = true;
			  this.editState = "Done";
		  }
		  else {
			  this.edit= false;
			  this.editState = "Edit";
}
	  }
	  
	});

})();