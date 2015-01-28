"use strict";angular.module("qaApp",["ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/setting",{templateUrl:"views/setting.html",controller:"SettingCtrl"}).when("/help",{templateUrl:"views/help.html",controller:"HelpCtrl"}).when("/financical",{templateUrl:"views/financical.html",controller:"FinancicalCtrl"}).when("/logout",{templateUrl:"views/logout.html",controller:"LogoutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("qaApp").controller("LoginCtrl",["$scope","$location","accountAPIservice",function(a,b,c){a.coverEffect=!0,a.__cxGlobalItemTitle="快快回答",a.login={},a.loadingClosed=!0,a.checkUser=function(){a.loadingClosed=!1;var d=a.login.userEmail,e=a.login.userPassword;return void 0===d||void 0===e?(console.log("please enter email or password"),!1):(c.checkAccount(d,e).success(function(c){return a.loadingClosed=!0,c.password===e?b.path("/main"):void(c.password!==e?(a.login.passwordError=!0,a.login.userPassword=void 0):console.log("Unknown error"))}).error(function(){a.loadingClosed=!0,console.log("登录失败")}),void console.log("end"))},a.addUser=function(){console.log("addUser click"),a.loadingClosed=!1;var d=a.login.userEmail,e=a.login.userPassword;return void 0===d||void 0===e?(console.log("please enter email or password"),!1):void c.addAccount(d,e).success(function(c){return a.loadingClosed=!0,0===c?b.path("/main"):void console.log(500===c?"create error":"Unknown error")}).error(function(){a.loadingClosed=!0,console.log("register error...")})},a.sendEmail=function(){a.lodingClosed=!1;var b=a.forgetEmail;return void 0===b?!1:void c.forgetCode(b).success(function(b){a.lodingClosed=!0,0===b?a.sendEmailSuccess=!0:500===b&&(a.sendEmailError=!0)}).error(function(){a.lodingClosed=!0,a.internetError=!0})}}]),angular.module("qaApp").controller("MainCtrl",["$scope","robotListService",function(a,b){a.myRobotTitle="我的机器人",a.btns=[{name:"信息"},{name:"管理员"},{name:"代码"}],a.robotList=[],b.getItems().success(function(b){a.robotList=b}),a.loadingClosed=!0,a.showRobotModal=function(b){a.modalOpened=!0,a.modalIsShowing=!0;var c=b;0===c?a.tabInfoShowing=!0:1===c?a.tabManegerShowing=!0:2===c&&(a.tabCodeShowing=!0),a.robotModal=this.$parent.robot},a.addRobotModal=function(){a.robotModal="",a.modalOpened=!0,a.modalIsShowing=!0,a.tabInfoShowing=!0}}]),angular.module("qaApp").controller("SettingCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("qaApp").controller("HelpCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("qaApp").controller("FinancicalCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("qaApp").controller("LogoutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("qaApp").service("robotListService",["$http",function(a){var b={},c="http://202.118.250.16:48006",d=c+"//coming";return b.getItems=function(){return a({method:"JSONP",url:d+"?callback=JSON_CALLBACK"})},b}]),angular.module("qaApp").service("accountAPIservice",["$http",function(a){var b={},c="/user.json";return b.checkAccount=function(b,d){return a({method:"GET",url:c+"?"+b+"&"+d})},b.addAccount=function(b,d){return a({method:"GET",url:c+"?"+b+"&"+d})},b.forgetCode=function(b){return a({method:"GET",url:c+"?"+b})},b}]),angular.module("qaApp").directive("loading-img",function(){return{template:'<img id="loading" ng-hide="loadingClosed" src="images/loader.gif">',restrict:"A",replace:!0,link:function(){var a=document.getElementById("loading");a.style.top=(window.innerHeight-16)/2+"px",a.style.left=(window.innerWidth-16)/2+"px"}}}),angular.module("qaApp").directive("login",function(){return{templateUrl:"views/template/login-btn.html",restrict:"E",replace:!0,link:function(a){a.state="login",a.switchToLogin=function(){a.state="login",a.hasRepeat===!0?a.showImg=!0:a.hasRepeat===!1&&(a.showImg=!1)},a.switchToRegister=function(){a.state="register",a.hasRepeat===!0?a.showImg=!1:a.hasRepeat===!1&&(a.showImg=!0)},a.forgetCode=function(){a.anotherState="forgetCode",a.modalOpened=!0,a.sendEmailSuccess=!1,a.forgetCodeClicked=!0},a.modalClosed=function(){a.forgetCodeClicked=!1,a.modalOpened=!1,a.anotherState=""},a.returnLogin=function(){a.state="login",a.modalClosed()},a.returnRegister=function(){a.state="register",a.modalClosed()}}}}),angular.module("qaApp").directive("navbar",function(){return{templateUrl:"views/template/navbar.html",restrict:"A",link:function(a){a.showMenu=function(){a.menuIsShowing=!a.menuIsShowing}}}}),angular.module("qaApp").directive("ensureEmailUnique",["$http",function(a){return{require:"ngModel",link:function(b,c,d){b.$watch(d.ngModel,function(){var c;"forgetCode"===b.anotherState?c=b.forgetCode.email:("register"===b.state||"login"===b.state)&&(c=b.login.userEmail),void 0===c||a({method:"GET",url:"/user.json?"+c}).success(function(a){a.email!==c?(b.hasRepeat=!1,"register"===b.state?b.showImg=!0:("login"===b.state||"forgetCode"===b.state)&&(b.showImg=!1)):a.email===c&&(b.hasRepeat=!0,"register"===b.state?b.showImg=!1:("login"===b.state||"forgetCode"===b.state)&&(b.showImg=!0))})})}}}]),angular.module("qaApp").directive("robotModal",function(){return{templateUrl:"views/template/robot-modal.html",restrict:"A",link:function(a){a.closeRobotModal=function(){a.modalIsShowing=!1,a.modalOpened=!1,a.tabInfoShowing=!1,a.tabManegerShowing=!1,a.tabCodeShowing=!1},a.showTabInfo=function(){a.tabManegerShowing=!1,a.tabCodeShowing=!1,a.tabInfoShowing=!0},a.showTabManager=function(){a.tabCodeShowing=!1,a.tabInfoShowing=!1,a.tabManegerShowing=!0},a.showTabCode=function(){a.tabInfoShowing=!1,a.tabManegerShowing=!1,a.tabCodeShowing=!0}}}}),angular.module("qaApp").directive("robotModalTabInformation",function(){return{templateUrl:"views/template/robot-information.html",restrict:"A",replace:!0}}),angular.module("qaApp").directive("robotModalTabManager",function(){return{templateUrl:"views/template/robot-manager.html",restrict:"A",replace:!0}}),angular.module("qaApp").directive("robotModalTabGetCode",function(){return{templateUrl:"views/template/robot-getcode.html",restrict:"A",replace:!0}}),angular.module("qaApp").directive("checkInput",function(){return{require:"ngModel",link:function(a,b,c){a.$watch(c.ngModel,function(){a.login.passwordError=!1})}}});