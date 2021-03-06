/*(function() {*/
	var se4sToolkitApp = angular.module('se4sToolkitApp',
		[ 'ngRoute', 'ui.bootstrap', 'ui.router', 'trNgGrid', 'ngSanitize' ])
		.run(function($state, $rootScope) {
			$rootScope.$state = $state;
			TrNgGrid.defaultColumnOptions.displayAlign = "center";			
		});
	
	contactsDirectoryApp.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		
		$locationProvider.html5Mode(true);
		
		$stateProvider
			.state('login', {
				url : '/login',
				templateUrl : 'templates/login.html',
				controller : 'LoginController'
			})
			
			.state('user', {
				url : '/user',
				templateUrl : 'templates/userHome.html',
				controller: 'ShowUsersController'
			})
			
			.state('user.displayUsersList', {
				url : '/displayUsers',
				templateUrl : 'templates/showDetails.html',
				controller: 'ShowUsersController'
			})
			
			.state('user.addNewUser', {
				url : '/addNewUser',
				templateUrl : 'templates/addNewContact.html',
				controller: 'AddNewContactsController'
			})
			
			.state('user.editUser', {
				url : '/editUser',
				templateUrl : 'templates/addNewContact.html',
				controller: 'AddNewContactsController'
			})
			
			.state('user.changePassword', {
				url : '/changePassword',
				templateUrl: 'templates/changePassword.html',
				controller: 'AddNewContactsController'
			})
			
			.state('user.accountPreferences', {
				url : '/accountPreferences',
				templateUrl: 'templates/accountPreferences.html',
				controller: 'AccountPreferencesController'
			})
			
			.state('user.activeSessions', {
				url : '/activeSessions',
				templateUrl: 'templates/userActiveSessions.html',
				controller: 'UserActiveSessionsController'
			});
		
		$urlRouterProvider.otherwise("/login");
		
	}]);
	
	contactsDirectoryApp.controller('LoginController', ['$scope','$state',function($scope, $state) {
		
		$scope.login = function() {
			$state.go('user.displayUsersList');
		};
		
	}]);	
	
	contactsDirectoryApp.controller('AddNewContactsController', ['$scope','$routeParams','$http', '$modal',function($scope, $routeParams, $http, $modal) {
		
		$scope.newContact = {};
		
		if ($routeParams.id != null) {
			var response = $http.get('fetchEmployee/'+$routeParams.id);
			response.success(function(data, status, headers, config) {
				$scope.newContact = data;				
			});
			response.error(function(data, status, headers, config) {
				console.log( "Exception details: " + JSON.stringify({data: data}));
				$scope.errorObject = data;
				$scope.errorsMap = groupElements(data,"field");
				console.log($scope.errorsMap);
			});		
			//$scope.newContact = angular.copy($scope.contacts[$routeParams.id]);
		}
		
		$scope.saveContact = function() {
			
			var dataObj = $scope.newContact;
			$scope.errorObject = new Array();
			
			var response = $http.post('addEmployee', dataObj);
			response.success(function(data, status, headers, config) {
				//$scope.responseData = data;
				var successMessage = "The employee named "+data.firstname+" "+data.lastname+" is successfully saved in the database";
				$scope.errorsMap = {};
				$scope.displaySuccessMessage(successMessage);
			});
			response.error(function(data, status, headers, config) {
				console.log( "Exception details: " + JSON.stringify({data: data}));
				$scope.errorObject = data;
				$scope.errorsMap = groupElements(data,"field");
				console.log($scope.errorsMap);
			});
			
			//Clear the add contacts form
			$scope.newContact = {};
			$scope.empInfo.$setPristine();
			$scope.empInfo.$setUntouched();
		};
		
		
		$scope.displaySuccessMessage = function(messsage) {
			
			var modalInstance = $modal.open({
				templateUrl : 'templates/displayCallbackMessage.html',
				controller : 'ModalInstanceCtrl',
				keyboard : true,
				resolve : {
					items : function() {
						return messsage;
					}
				}
			});
		};
		
	}]);

	contactsDirectoryApp.controller('TabsCtrl', ['$scope','$http',function($scope, $http) {
		$scope.tabs = [
	        {
	            "link": ".displayUsersList",
	            "label": "View Users"
	        },
	        {
	            "link": ".addNewUser",
	            "label": "Create Users"
	        }
	    ];
	
		$scope.selectedTab = $scope.tabs[0];
		$scope.setSelectedTab = function(tab) {
			$scope.selectedTab = tab;
		};
	
		$scope.tabClass = function(tab) {
			if ($scope.selectedTab == tab) {
				return "active";
			} else {
				return "";
			}
		};
	}]);
	
	function groupElements(input, name) {
	    var output = {};
	    Object.keys(input).forEach(function(key) {
	        if(input[key] instanceof Array) {
	            input[key].forEach(function (data) {
	                var fieldName = data[name];
	                var obj = output[fieldName];
	                if (obj == undefined) {
	                    obj = {};
	                }
	                delete data[name];
	                obj = data;		                
	                output[fieldName] = obj;
	            });
	        } else {
	            output[key] = input[key];
	        }
	    });
	    return output;
	};

	contactsDirectoryApp.controller('Datepicker', function($scope) {
		$scope.today = function() {
			$scope.dt = new Date();
		};
		//$scope.today();

		$scope.clear = function() {
			$scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
			return (mode === 'day' && (date.getDay() === 0 || date
					.getDay() === 6));
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			formatYear : 'yy',
			startingDay : 1
		};

		$scope.formats = [ 'dd-MMMM-yyyy', 'yyyy/MM/dd',
				'dd.MM.yyyy', 'shortDate' ];
		$scope.format = $scope.formats[0];
	});
	
	
	contactsDirectoryApp.controller('ImagesController', ['$scope', function($scope) {
		
		$scope.editUserIcon = 'images/edit.png';
		$scope.deactivateUserIcon = 'images/deactivate_user.jpg';
		
	}]);
	
	contactsDirectoryApp.controller('ContactController', ['$scope','$http',function($scope,$http) {									
		$scope.contacts = new Array();
		$scope.newContact = {};
		$scope.errorsMap = {};
		$scope.menus = ["Blog", "Info", "Contacts"];
		//$scope.tabs = $http.get('config/tabs.json');
		
	}]);

	contactsDirectoryApp.controller('UserActiveSessionsController', ['$scope', function($scope) {
		
		$scope.activeUsers = {
			"users" : [{
				"id" : 1,
				"username" : "mbhanot",
				"emailId" : "manav.876@hsc.com",
				"lastLoginTime" : "Thu April 9, 2015"				
			}, {
				"id" : 2,
				"username" : "sgupta",
				"emailId" : "sakshi.gupta@hsc.com",
				"lastLoginTime" : "Mon April 6, 2015"
			}, {
				"id" : 3,
				"username" : "iteshw",
				"emailId" : "itesh.k.walia@hsc.com",
				"lastLoginTime" : "Mon April 6, 2015"
			}, {
				"id" : 4,
				"username" : "hsingh",
				"emailId" : "harpreet1.singh@hsc.com",
				"lastLoginTime" : "Fri April 10, 2015"
			}, {
				"id" : 5,
				"username" : "bmakkar",
				"emailId" : "bharat.makkar@hsc.com",
				"lastLoginTime" : "Sun April 5, 2015"
			}]
		};
		
	}]);
	
	contactsDirectoryApp.directive('validateEmail', function() {
		
		var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+\.com$/i;	
		return {
			require : 'ngModel',
			restrict : '',
			link : function(scope, elm, attrs, ctrl) {
				// only apply the validator if ngModel is present and Angular has
				// added the email validator
				if (ctrl && ctrl.$validators.email) {
	
					// this will overwrite the default Angular email validator
					ctrl.$validators.email = function(modelValue) {
						return ctrl.$isEmpty(modelValue)
								|| EMAIL_REGEXP.test(modelValue);
					};
				}
			}
		};
	});
	
	/*contactsDirectoryApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider.
		when('/DisplayContacts', {
			templateUrl: 'templates/showDetails.html',
			controller: 'ShowUsersController'
		}).
		when('/AddNewContact', {
			templateUrl: 'templates/addNewContact.html',
			controller: 'AddNewContactsController'
		}).
		when('/EditContact/:id', {
			templateUrl: 'templates/addNewContact.html',
			controller: 'AddNewContactsController'
		}).
		when('/ChangePassword', {
			templateUrl: 'templates/changePassword.html',
			controller: 'AddNewContactsController'
		}).
		when('/AccountPreferences', {
			templateUrl: 'templates/accountPreferences.html',
			controller: 'AccountPreferencesController'
		}).
		when('/activeSessions', {
			templateUrl: 'templates/userActiveSessions.html',
			controller: 'UserActiveSessionsController'
		}).
		otherwise({
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		});
	}]);*/
	
	/*contactsDirectoryApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {
		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};
		
		$scope.successMessage = items;
		
		$scope.ok = function () {
			$modalInstance.close($scope.successMessage);
		};
		
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	});*/

	
/*}());*/