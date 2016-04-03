'use strict';

/**
 * @ngdoc function
 * @name angularLightApp.controller:LightCtrl
 * @description
 * # LightCtrl
 * Controller of the angularLightApp
 */
angular.module('angularLightApp')
  .controller('LightCtrl',['$scope','$http','Feathers',
  function($scope,$http,Feathers){
   var Datos = Feathers.service('arduinos');

    $scope.Datos = Datos.refresh({}).then(function(succed){
    	succed.forEach(function(el,ind){
    		$scope[el.id] = el.value;

    	});
    },function(reject){
    	console.log(reject);
    });
    $scope.onColorChange = function($event,color){
    	console.log(color);
    	Datos.update({id:'color',value:color});
    	
    };
    $scope.toggleRelay = function(relayId){
    	var out =  $scope['relay' + relayId];
    	if(out === 'off'){
    		out = 'on';
    	} else {
    		out = 'off';
    	}

    	//$scope['relay' + relayId] = out;
    	Datos.update({id:'relay' + relayId,value:out});

    }
  
    Feathers.on('connect',function(data){
    	console.log('Lumak On!');
    	//console.log(Datos[0]);

    });
    Datos.on('updated',function(data){
    	console.log('updated',data);

    	$scope[data.id] = data.value;
    });
    //Datos.update('relay1',{value:100});
  }]);