'use strict';

angular.module('acholic')
  .controller('PackageRaftingCtrl',['$scope','packageData','PackageItem','$location',function ($scope ,packageData, PackageItem ,$location) {
    $scope.packages = packageData;
    $scope.images = [];
    $scope.packages.info = {};
    $scope.packages.info.stages = [];
    $scope.packages.info.equipments_provide = [];
    $scope.packages.type = "PackageRafting";

    $scope.provide = "";
    $scope.require = "";
    $scope.skill = "";

    $scope.onSubmit = function(){
        //provide
        $scope.packages.info.equipments_provide = $scope.provide.split(",");
        //require
        $scope.packages.info.equipments_require = $scope.require.split(",");
        //skill
        $scope.packages.info.skills_require = $scope.skill.split(",");

        //province
        $scope.packages.info.location.province = $scope.selected;

        //season
        $scope.packages.info.season = $scope.seas+$scope.month1+$scope.month2;

        //stage type
        $scope.packages.info.stage_type = $scope.stageType;

        // console.log("stages="+$scope.stageType);
        console.log($scope.packages);
        $scope.packages.$save().then(function(){
             $location.path("/package");
        });
    };

    // $scope.nStage = "";

    // // Add more input box
    // var stage_next = 1;
    // var boat_next = 1;
    // $scope.addMoreStage = function(){
    //     //e.preventDefault();
    //     var id_button = "";
    //     // if(e == "stage"){
    //         console.log($scope.nStage);
    //         id_button = "stage";

    //         var addto = "#stage" + stage_next;
    //         var addRemove = "#stage" + (stage_next);
    //         stage_next = stage_next + 1;
    //         var newIn = '<input autocomplete="off" class="package-create-inputbox-style" style="width:80%;" id="stage' + stage_next + '" name="stage' + stage_next + '" type="text">';
    //         var newInput = $(newIn);
    //         var removeBtn = '<button id="remove_stage' + (stage_next - 1) + '" class="btn btn-danger remove-stage package-create-add-delete-button-style">-</button>';
    //         var removeButton = $(removeBtn);
    //         $(addto).after(newInput);
    //         $(addRemove).after(removeButton);
    //         $("#stage" + stage_next).attr('data-source',$(addto).attr('data-source'));
    //         $("#count").val(stage_next);  
            
    //         $('.remove-stage').click(function(e){
    //             e.preventDefault();
    //             var fieldNum = this.id.substring(12);
    //             var fieldID = "#stage" + fieldNum;
    //             console.log(fieldID);
    //             $(this).remove();
    //             $(fieldID).remove();
    //         });
    //         $scope.packages.info.stages.push($scope.nStage);
    // }

    // var stageIndex = 1;
    // $scope.addStage = function(e){
    //     console.log("add");
    //     var $template = $('#stage-template'),
    //         $clone = $template
    //                     .clone()
    //                     .removeClass('hide')
    //                     .removeAttr('id')
    //                     .attr('stage-index', stageIndex)
    //                     .insertBefore($template);
    //          $clone
    //             .find('[id="stage"]').attr('id', 'stage' + stageIndex).end()
    //             .find('[id="deleteStage"]').attr('id', 'deleteStage' + stageIndex).end();
                
    //         stageIndex += 1;
    // };
    // $scope.removeStage = function(e){
    //     console.log("delete");
    //     var $row  = $(this).parents('.form-group'),
    //         index = $row.attr('stage-index');
    //     $row.remove();
    // };
    $scope.stageType = [];

    $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
  
    $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length+1;
        $scope.choices.push({'id':'choice'+newItemNo});
    };
        
    $scope.removeChoice = function() {
        var lastItem = $scope.choices.length-1;
        $scope.choices.splice(lastItem);
    };

        // $scope.addMoreBoat = function(e){
        // // else if(e == "boat"){
        //     console.log("BBBB");
        //     id_button = "boat";

        //     var addto = "#boat" + boat_next;
        //     var addRemove = "#boat" + (boat_next);
        //     boat_next = boat_next + 1;
        //     var newIn = '<input autocomplete="off" class="package-create-inputbox-style" style="width:80%;" id="boat' + boat_next + '" name="boat' + boat_next + '" type="text">';
        //     var newInput = $(newIn);
        //     var removeBtn = '<button id="remove_boat' + (boat_next - 1) + '" class="btn btn-danger remove-boat package-create-add-delete-button-style">-</button>';
        //     var removeButton = $(removeBtn);
        //     $(addto).after(newInput);
        //     $(addRemove).after(removeButton);
        //         $("#boat" + boat_next).attr('data-source',$(addto).attr('data-source'));
        //         $("#count").val(boat_next);  
                
        //         $('.remove-boat').click(function(e){
        //             e.preventDefault();
        //             var fieldNum = this.id.substring(11);
        //             console.log(fieldNum);
        //             var fieldID = "#boat" + fieldNum;
        //             // console.log(fieldID);
        //             $(this).remove();
        //             $(fieldID).remove();
        //         });

        //     }

        // var addto = "#"+id_button+"field" + next;
        // var addRemove = "#"+id_button+"field" + (next);
        // next = next + 1;
        // var newIn = '<input autocomplete="off" class="package-create-inputbox-style" style="width:80%;" id='+id_button+'"-field' + next + '" name="field' + next + '" type="text">';
        // var newInput = $(newIn);
        // var removeBtn = '<button id='+id_button+'"remove' + (next - 1) + '" class="btn btn-danger remove-me package-create-add-delete-button-style">-</button></div><div id="field">';
        // var removeButton = $(removeBtn);
        // $(addto).after(newInput);
        // $(addRemove).after(removeButton);
        // $("#"+id_button+"field" + next).attr('data-source',$(addto).attr('data-source'));
        // $("#"+id_button+"count").val(next);  
        
        // $('.remove-me').click(function(e){
        //     e.preventDefault();
        //     var fieldNum = this.id.charAt(this.id.length-1);
        //     var fieldID = "#"+id_button+"field" + fieldNum;
        //     $(this).remove();
        //     $(fieldID).remove();
        // });
    // }

    // menu-bar function
 	var navListItems = $('ul.setup-panel li a'),
    allWells = $('.setup-content');

    allWells.hide();

    navListItems.click(function(e)
    {
        e.preventDefault();
        var $target = $($(this).attr('href')),
            $item = $(this).closest('li');
        
        if (!$item.hasClass('disabled')) {
            navListItems.closest('li').removeClass('active');
            $item.addClass('active');
            allWells.hide();
            $target.show();
        }
    });
    
    $('ul.setup-panel li.active a').trigger('click');
    
   
    //next and previous tab
    var state = [0, 1, 2, 3];
    var currenstate = 0;     
    $scope.activeNextTab = function(){
        $('ul.setup-panel li:eq('+ (state[currenstate+1]) +')').removeClass('disabled');  
        $('ul.setup-panel li a[href=\"#step-' + state[currenstate+1] + '\"]').trigger('click'); 
        currenstate += 1;
    }
    $scope.previousTab = function(){
        $('ul.setup-panel li a[href=\"#step-' + state[currenstate-1] + '\"]').trigger('click'); 
        currenstate -= 1;
    }

    $scope.provinces = [
    {name: 'กรุงเทพมหานคร'},
    {name: 'กระบี่'},
    {name: 'กาญจนบุรี'},
    {name: 'กาฬสินธุ์'},
    {name: 'กำแพงเพชร'},
    {name: 'ขอนแก่น'},
    {name: 'จันทบุรี'},
    {name: 'ฉะเชิงเทรา'},
    {name: 'ชลบุรี'},
    {name: 'ชัยนาท'},
    {name: 'ชัยภูมิ'},
    {name: 'ชุมพร'},
    {name: 'เชียงราย'},
    {name: 'เชียงใหม่'},
    {name: 'ตรัง'},
    {name: 'ตราด'},
    {name: 'ตาก'},
    {name: 'นครนายก'},
    {name: 'นครปฐม'},
    {name: 'นครพนม'},
    {name: 'นครราชสีมา'},
    {name: 'นครศรีธรรมราช'},
    {name: 'นครสวรรค์'},
    {name: 'นนทบุรี'},
    {name: 'นราธิวาส'},
    {name: 'น่าน'},
    {name: 'บึงกาฬ'},
    {name: 'บุรีรัมย์'},
    {name: 'ปทุมธานี'},
    {name: 'ประจวบคีรีขันธ์'},
    {name: 'ปราจีนบุรี'},
    {name: 'ปัตตานี'},
    {name: 'พระนครศรีอยุธยา'},
    {name: 'พังงา'},
    {name: 'พัทลุง'},
    {name: 'พิจิตร'},
    {name: 'พิษณุโลก'},
    {name: 'เพชรบุรี'},
    {name: 'เพชรบูรณ์'},
    {name: 'แพร่'},
    {name: 'พะเยา'},
    {name: 'ภูเก็ต'},
    {name: 'มหาสารคาม'},
    {name: 'มุกดาหาร'},
    {name: 'แม่ฮ่องสอน'},
    {name: 'ยะลา'},
    {name: 'ยโสธร'},
    {name: 'ร้อยเอ็ด'},
    {name: 'ระนอง'},
    {name: 'ระยอง'},
    {name: 'ราชบุรี'},
    {name: 'ลพบุรี'},
    {name: 'ลำปาง'},
    {name: 'ลำพูน'},
    {name: 'เลย'},
    {name: 'ศรีสะเกษ'},
    {name: 'สกลนคร'},
    {name: 'สงขลา'},
    {name: 'สตูล'},
    {name: 'สมุทรปราการ'},
    {name: 'สมุทรสงคราม'},
    {name: 'สมุทรสาคร'},
    {name: 'สระแก้ว'},
    {name: 'สระบุรี'},
    {name: 'สิงห์บุรี'},
    {name: 'สุโขทัย'},
    {name: 'สุพรรณบุรี'},
    {name: 'สุราษฎร์ธานี'},
    {name: 'สุรินทร์'},
    {name: 'หนองคาย'},
    {name: 'หนองบัวลำภู'},
    {name: 'อ่างทอง'},
    {name: 'อุดรธานี'},
    {name: 'อุทัยธานี'},
    {name: 'อุตรดิตถ์'},
    {name: 'อุบลราชธานี'},
    {name: 'อำนาจเจริญ'}
  ];
  $scope.selected = "Province";
  $scope.setProvince = function(value){
    console.log(value);
    $scope.selected = value;
  };

  $scope.seas = "Whole year";
  $scope.month1 = "Start Month";
  $scope.month2 = "End Month";

  $scope.months = [
    {name: 'January'},
    {name: 'February'},
    {name: 'March'},
    {name: 'May'},
    {name: 'April'},
    {name: 'June'},
    {name: 'July'},
    {name: 'August'},
    {name: 'September'},
    {name: 'October'},
    {name: 'November'},
    {name: 'December'}
  ];
  $scope.setMonth1 = function(value){
    console.log("Month1 ="+value);
    $scope.month1 = " "+value;
  };
  $scope.setMonth2 = function(value){
    console.log("Month2 ="+value);
    $scope.month2 = " to "+value;
  };


  }]);
