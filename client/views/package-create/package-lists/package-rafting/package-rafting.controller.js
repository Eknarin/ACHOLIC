'use strict';

angular.module('acholic')
  .controller('PackageRaftingCtrl',['$scope','packageData','PackageItem','$location',function ($scope ,packageData, PackageItem ,$location) {
    $scope.packages = packageData;
    $scope.images = [];
    $scope.packages.info = {};
    $scope.packages.type = "PackageRafting";

    $scope.onSubmit = function(){
        console.log($scope.packages);
        $scope.packages.$save().then(function(){
             $location.path("/package");
        });
    };

    // add Price template
    var price_next = 1;
    $scope.addPrice = function(e){
        console.log("add");
        var $template = $('#priceTemplate'),
        $clone    = $template
                        .clone()
                        .removeClass('hide')
                        .removeAttr('id')
                        .attr('price-index', price_next)
                        .insertBefore($template);
        // Update the name attributes
        $clone
            .find('[name="price"]').attr('name', 'price'+price_next).end()
            .find('[name="people"]').attr('name', 'people'+price_next).end()
            .find('[name="distance"]').attr('name', 'distance'+price_next).end()
            .find('[name="duration"]').attr('name', 'duration'+price_next).end()
            .find('[name="boat"]').attr('name', 'boatZ'+price_next).end();
    };
    // delete Price template
    $scope.removePrice = function(e){
         console.log("remove");
         var $row  = $(this).parents('.form-group');
            // index = $row.attr('price-index');
            $row.remove();
    };


    // Add more input box
    var stage_next = 1;
    var boat_next = 1;
    $scope.addMore = function(e){
        //e.preventDefault();
        var id_button = "";
        if(e == "stage"){
            console.log("SSSS");
            id_button = "stage";

            var addto = "#stage" + stage_next;
            var addRemove = "#stage" + (stage_next);
            stage_next = stage_next + 1;
            var newIn = '<input autocomplete="off" class="package-create-inputbox-style" style="width:80%;" id="stage' + stage_next + '" name="stage' + stage_next + '" type="text">';
            var newInput = $(newIn);
            var removeBtn = '<button id="remove_stage' + (stage_next - 1) + '" class="btn btn-danger remove-stage package-create-add-delete-button-style">-</button>';
            var removeButton = $(removeBtn);
            $(addto).after(newInput);
            $(addRemove).after(removeButton);
            $("#stage" + stage_next).attr('data-source',$(addto).attr('data-source'));
            $("#count").val(stage_next);  
            
            $('.remove-stage').click(function(e){
                e.preventDefault();
                var fieldNum = this.id.substring(12);
                var fieldID = "#stage" + fieldNum;
                console.log(fieldID);
                $(this).remove();
                $(fieldID).remove();
            });
        }
        else if(e == "boat"){
            console.log("BBBB");
            id_button = "boat";

            var addto = "#boat" + boat_next;
            var addRemove = "#boat" + (boat_next);
            boat_next = boat_next + 1;
            var newIn = '<input autocomplete="off" class="package-create-inputbox-style" style="width:80%;" id="boat' + boat_next + '" name="boat' + boat_next + '" type="text">';
            var newInput = $(newIn);
            var removeBtn = '<button id="remove_boat' + (boat_next - 1) + '" class="btn btn-danger remove-boat package-create-add-delete-button-style">-</button>';
            var removeButton = $(removeBtn);
            $(addto).after(newInput);
            $(addRemove).after(removeButton);
            $("#boat" + boat_next).attr('data-source',$(addto).attr('data-source'));
            $("#count").val(boat_next);  
            
            $('.remove-boat').click(function(e){
                e.preventDefault();
                var fieldNum = this.id.substring(11);
                console.log(fieldNum);
                var fieldID = "#boat" + fieldNum;
                // console.log(fieldID);
                $(this).remove();
                $(fieldID).remove();
            });
        }
    };

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

  $scope.levels = [
    {name: 'Level1'},
    {name: 'Level2'},
    {name: 'Level3'},
    {name: 'Level4'},
    {name: 'Level5'},
    {name: 'Level6'}
  ];
  $scope.selectedLevel = " Level ";
  $scope.setLevel = function(value){
    console.log(value);
    $scope.selectedLevel = value;
  };

  }]);

