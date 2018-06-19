/**
 * Created by cong on 2018/6/14.
 */
var app = angular.module('myApp' , []);
app.controller('mainCtr', function ($scope) {

    //获取本周第i天日期
    function getWeek(i) {
        var now = new Date();
        var firstDay=new Date(now - (now.getDay() - 1 ) * 86400000);
        firstDay.setDate(firstDay.getDate() + i);
        mon = Number(firstDay.getMonth()) + 1;
        return now.getFullYear() + "/" + mon + "/" + firstDay.getDate();
    }

//    更新本周日期
    $scope.updateList = function () {
        $scope.dataList = [];
        for(var a = 0; a < 7; a++){
            var dateItem = {};
            dateItem.date = getWeek(a);
            dateItem.entry = [];
            switch (a){
                case 0:
                    dateItem.day = '周一';
                    break;
                case 1:
                    dateItem.day = '周二';
                    break;
                case 2:
                    dateItem.day = '周三';
                    break;
                case 3:
                    dateItem.day = '周四';
                    break;
                case 4:
                    dateItem.day = '周五';
                    break;
                case 5:
                    dateItem.day = '周六';
                    break;
                case 6:
                    dateItem.day = '周日';
                    break;
            }
            $scope.dataList.push(dateItem);
        }
        console.log($scope.dataList,'新建');
        $scope.writeStorage();
    };



//    添加纪录
    $scope.addItem = function (index) {
        $scope.dataList[index].entry.push({content:'', status:false});
        console.log($scope.dataList);
        $scope.writeStorage();
        setTimeout(function () {
            $('.aDay:nth-child(' + (index + 1) + ')').find('.oneEnty:last-child').find('textarea').focus();
            console.log('.aDay:nth-child(' + (index + 1) + ')')
        },100)
    };

    //删除记录
    $scope.remove = function (index, outerIndex) {
        $scope.dataList[outerIndex].entry.splice(index, 1);
        $scope.writeStorage()
    };

    //标记已完成
    $scope.finished = function () {
        $scope.writeStorage()
    };

    $scope.autoTextAreaHeight = function () {
        $scope.writeStorage()
    };

//    写localStorage
    $scope.writeStorage = function () {
        localStorage.setItem("weekList",JSON.stringify($scope.dataList));
    };
//    读localStorage
    $scope.getStorage = function () {
        $scope.dataList = JSON.parse(localStorage.getItem("weekList"));
    };

//    判断有无storage
//     localStorage.removeItem('weekList');
    $scope.hasStorage = function () {
        if(!!localStorage.getItem("weekList")){
            return true;
        }else {
            return false;
        }
    };

    //设置时间
    $scope.initDateList = function () {
        //判断时间是否过期
        var now = new Date();
        if($scope.hasStorage()){
            $scope.getStorage();
            var sunday = $scope.dataList[6].date;
            var sundayDate = new Date();
            sundayDate.setFullYear(sunday.split('/')[0],sunday.split('/')[1] - 1,sunday.split('/')[2]);
            console.log(sundayDate);
            if((now - sundayDate) > 0){
                var isUpdate = window.confirm('日期已经过期，现在要更新数据吗？');
                if(isUpdate){
                    $scope.updateList();
                }
            }
        }else {
            $scope.updateList();
        }

    };

    //获取今日日期
    $scope.setToday = function () {
        var todayIndex = new Date();
        var todayIndex = todayIndex.getDay() - 1;
        if(todayIndex == -1){
            todayIndex = 6;
        }
        $.each($scope.dataList, function (index, item) {
            if(index == todayIndex){
                console.log(todayIndex);
                item.isToday = true;
            }else {
                item.isToday = false;
            }
        })
    };
    $scope.initDateList();
    $scope.setToday();




});