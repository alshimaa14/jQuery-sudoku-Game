$(function(){

    var tableElmArr1 =[1,2,3,4];
    var tableElmArr2 =[1,2,3,4,5,6,7,8,9];
    var tableIndexArr1 = [0,1,2,3];
    var tableIndexArr2 = [0,1,2,3,4,5,6,7,8];
    var keyCodeMin = 49;
    var keyCodeMax1 = 52; 
    var keyCodeMax2 = 57;
    var i=0;
    var interval;
    var intervalID;

    var tblSize;
    $("#mySelect").change(function(){
        if ($("#mySelect").val() == "4") {
            var i = 0;
            setTimer(1);
            tblSize = 4;
            createTable(tblSize,tableElmArr1);
            moveArrow(keyCodeMin,keyCodeMax1);
            findRandomCellVal(tableIndexArr1,tableElmArr1); 
            interval = setInterval(function(){
                i++;
                SolvePart(4);                    
            },100);                  
        } //end of selected first option if condition

        else if($("#mySelect").val() == "9"){
            setTimer(6);
            tblSize = 9;
            createTable(tblSize,tableElmArr2);
            moveArrow(keyCodeMin,keyCodeMax2);
            findRandomCellVal(tableIndexArr2,tableElmArr2);
            interval = setInterval(function(){
                i++;
                SolvePart(4);
                        
            },100);
        }//end of selected second option if condition

    });//end of selected option change function


    function createTable(size , arr) {
        var tbl = $("<table></table>");
        var tblDiv = $("#tblDiv");
        for(var i=0 ; i<size ; i++){
            var tr =$("<tr></tr>");
            for(var j=0 ; j<size ; j++){
                var td =("<td><input type=text id=c"+i+"r"+j+"></input></td>");
                tr.append(td);
            }//end of first for
            tbl.append(tr);
        }//end of second for
        tblDiv.html("");
        tblDiv.append(tbl);
    }//End of createTable Function

    function shuffleArr(array) {
        var tmp, current, top = array.length;
        if(top) while(--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array;
    };//End of shuffel array

    function setTimer (timeD){
        var minutes=(timeD-1);
        var seconds=60;
        intervalID=setInterval(function(){
            seconds--;
            if(seconds==-1){
                seconds=59;
                minutes--;
            }
            $("#timer").html(minutes+" : "+seconds).attr("background-color","lightgray").attr("color","white");
        },1000)
        setTimeout(function(){
            clearInterval(intervalID);
            solveGame(4);
        },(60*1000*timeD+1000));
    };//End of timerFunction

    function moveArrow(min,max){
        $('#c0r0').trigger('focus');
        $('input').keyup(function(e){
            if(e.which == 39){ //right arrow
                // $('#c0r'+(i++)).trigger('focus');
                $(this).closest('td').next().find('input').focus().select();
            } else if(e.which == 37){ // left arrow
                $(this).closest('td').prev().find('input').focus().select();
            } else if (e.which == 40) { // down arrow
                $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus().select();
            } else if (e.which == 38) { // up arrow
                $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus().select();
            }                            
        });//End of keyUp function

        //allow numbers only
        $("input").attr('maxlength','1');
        $("input").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8]) !== -1 ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if (e.shiftKey || (e.keyCode < min || e.keyCode > max) ) {
                e.preventDefault();
            }
        });//end of keydown function

    }//End of move Arrow function

    function findRandomCellVal(arr1,arr2){
        var arrF = shuffleArr(arr1);
        var arrS = shuffleArr(arr2);
        for(var i = 0 ;i < arr1.length ; i++){
            $("#c"+i+"r"+arrF[i]).val(arrS[i]).css("background-color","gray").attr('readonly', true);
        }
    }// End of find random cell value 

    function solveGame(size){
        var isValid = true;
        $('input[type="text"]').each(function() {
            if (($(this).val()) == "") {
                isValid = false;
            }   
        });
        if (isValid != false){
            var rowUnique = isUniqueRow(size);
            var colUnique = isUniqueCol(size);
            var sumRowCol = isCorrectRowColSum(size);
            if(rowUnique== true && colUnique == true && sumRowCol == true){
                setLightBox("Congratulation, you Solve it<br>Do you want to play again !");
                clearInterval(interval);
                clearInterval(intervalID);
            }
            else{
                clearInterval(interval);
                clearInterval(intervalID);
                setLightBox("Sorry, you failed<br>Do you want to play again !");
            }
                    
        }//End of if
        else{
            setLightBox("Sorry, you failed<br>Do you want to play again !");
        }
    }//End of SolveGame function

    function SolvePart(size){
        var isValid = true;
        $('input[type="text"]').each(function() {
            if (($(this).val()) == '') {
                isValid = false;
            }   
        });
        var rowUnique = isUniqueRow(size);
        var colUnique = isUniqueCol(size);
        var sumRowCol = isCorrectRowColSum(size);
        if (isValid != false &&rowUnique== true && colUnique == true && sumRowCol == true){
            setLightBox("Congratulation, you Solve it<br>Do you want to play again !");
            clearInterval(interval);
            clearInterval(intervalID);                   
        }
    }//End of Solve Part Function

    function isUniqueRow(size){
        for(var i =0 ; i<size ; i++){
            for(var j =0;j<= i ;j++){
                var num = $("#c"+i+"r"+j).val();
                for(var k=(j+1) ; k<size ; k++){
                    if(num == $("#c"+i+"r"+k).val())
                        return false;
                }
            }
        }
        return true;
    }//End of isEqualRow Function

    function isUniqueCol(size){
        for(var i =0 ; i<size ; i++){
            for(var j =0;j<= i ;j++){
                var num = $("#c"+j+"r"+i).val();
                for(var k=(j+1) ; k<size ; k++){
                    if(num == $("#c"+k+"r"+i).val())
                        return false;
                }
            }
        }
        return true;
    }//End of isEqualCol Function

    function isCorrectRowColSum(size){
        var fact ;
        var rowSum;
        var colSum;
        for(var i=0; i < size ; i++){
            fact =0;
            rowSum = 0;
            colSum = 0;
            for(var j=0; j <size ; j++){
                fact +=(j+1);
                rowSum += parseInt($("#c"+i+"r"+j).val());   
                colSum += parseInt($("#c"+j+"r"+i).val());    
            }
            if(rowSum == fact && colSum == fact)
                return true;
        }
        return false;
    }// End of isCorrectRowColSum

    function setLightBox(textOut){
        $("#mainDiv").css("opacity",0.3);
        $("#tblDiv").hide();
        $("#lightBox").css({
                'visibility ': 'visible',
                'color': 'white'
            });
        $("#sub").html(textOut);
        $("#lightBox").show().fadeIn("slow");
        $("#playAgain").click(function(){
            location.reload();
        });//End of click play again button
        $("#close").click(function(){
            window.close();
            });
    }//End Of setLightBox Function

});//End of load function
