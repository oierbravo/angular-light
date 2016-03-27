'use strict';

/**
 * @ngdoc function
 * @name angularLightApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularLightApp
 */
angular.module('angularLightApp')
  .controller('MainCtrl', ['$scope','$http','Feathers',function ($scope,$http,Feathers) {

  	var Datos = Feathers.service('arduinos');

    $scope.Datos = Datos.refresh({}).then(function(data){
    	data.forEach(function(el,ind){
    		$scope[el.id] = el.value;

    	});
    });


    $scope.toggleRelay1 = function(){
    	console.log('toggle1');
    	var out;
    	if($scope.relay1 === 'off'){
    		//$scope.relay1 = 1;
    		out = 'on';
    		$http.put('http://entzun.jazar.org:3030/arduinos/relay1',{value:'on'});
    	} else {
    		//$scope.relay1 = 0;
    		out = 'off';
    		$http.put('http://entzun.jazar.org:3030/arduinos/relay1',{value:'off'});
    	}

    	Datos.update({id:'relay1',value:out});
    }
    $scope.toggleRelay2 = function(){
    	console.log('toggle2');
    	var out;
    	if($scope.relay2 === 'off'){
    		//$scope.relay1 = 1;
    		out = 'on';
    		$http.put('http://entzun.jazar.org:3030/arduinos/relay2',{value:'on'});
    	} else {
    		//$scope.relay1 = 0;
    		out = 'off';
    		$http.put('http://entzun.jazar.org:3030/arduinos/relay2',{value:'off'});
    	}

    	Datos.update({id:'relay2',value:out});
    }
    Feathers.on('connect',function(data){
    	console.log('Lumak On!');
    	//console.log(Datos[0]);

    });
    Datos.on('updated',function(data){
    	console.log('updated',data);

    	$scope[data.id] = data.value;
    });
    Datos.on('before update',function(data){
    	console.log('before-update',data);
    //	$scope[data.id] = data.value;
    });
    //Datos.update('relay1',{value:100});
  }]);
