
/*
*Interactive form by using jQuery
*FullStack JavaScript Tech Degree Unit 3
*Gerardo Bilbatua
*/



//Validation function-Regex
function validate(field){
const email = $('#mail').val();
const creditnumber = parseInt($('#cc-num').val());
const zip = parseInt($('#zip').val());
const cvv = parseInt($('#cvv').val());

const regex = /^(\w*@\w*.com)$/ //email
const regex2 = /^(\d{13,16})$/ //creditcard number
const regex3 = /^(\d{5})$/ //ZIP
const regex4 = /^(\d{3})$/ //CVV

let valid;

    if(field === 'email'){
        valid = regex.test(email)
        }
    else if(field ==='creditnumber'){
        valid = regex2.test(creditnumber);
    }
    else if(field ==='zip'){
        valid = regex3.test(zip);
    }
    else if(field ==='cvv'){
        valid = regex4.test(cvv);
    }

return valid;

}


// Set focus on first input when the page loads
$('#name').focus();

//............................... Job Role Section.......................................................//

//Hide 'other' text field
$('#other-title').hide();
// Show 'other' text field if 'other' option is selected
$('#title').change(function(){
    const  selectedOption = $(this).val();
    if (selectedOption === 'other' ){
        $('#other-title').show();
    }
    else{
        $('#other-title').hide();
 }
});

//.................................T-Shirt info section...................................................//
//Hide 'Select Theme Option' from drop down
$('#design option').first().hide();

//hide color options and display 'Please select a T-shirt theme'
$('#color option').hide();
//once a design has been selected then show its correct options only
$('#design').change(function(){
    //show first 3 color and hide the remaining color
    const  selectedOption = $(this).val();
    if (selectedOption === 'js puns' ){
        $('#color').children().slice(1,4).show().first().attr("selected",true);
        $('#color').children().slice(4,7).hide().attr("selected",false);;
    }
    //show reamining color and hide first 3 colors
    else if(selectedOption === 'heart js' ){
        $('#color').children().slice(4,7).show().first().attr("selected",true);
        $('#color').children().slice(1,4).hide().attr("selected",false);;   
    }
    //Hide all the when no design has been selected
    else {
        $('#color').children().hide();
        
       }
});


//.................................Register for activities...................................................//


let total = 0;
var checkedBoxes = 0;
$('.activities').append('<label></label>'); // append label element for tottal count

// do not allow selections with same date and time---Deactive checkbox
$( ".activities input" ).change(function() {
    //get date/time on every click
    const selectedDate = $(this).attr('data-day-and-time');
    const selectName = $(this).attr('name');
    const checked = $(this).is(':checked')
    var cost = $(this).attr('data-cost');
     
    

    
   
    // iterate trough list of checkboxes
   $(".activities input").each(function(index, item) {
      let eachDate = $(this).attr('data-day-and-time');
      let eachName = $(this).attr('name'); 
      
      


      // disable checkbox with same date/time
    if( (eachDate === selectedDate) && (eachName !== selectName) && ( checked === true) ){
        $(this).attr("disabled", true);
        $(this).parent().css('color','grey');//Change color when checkbox is disabled
        
       
          
    }
    // Activate checkbox again when  unselected 
   else if( (eachDate === selectedDate) && (eachName !== selectName) && ( checked === false) ){
        $(this).attr("disabled", false);
        $(this).parent().css('color','black'); //Change color when checkbox is enabled
        
        
    }

    
   });
 
   // Total cost counter
   if( checked === true ){
    total = total + parseInt(cost);  
    checkedBoxes += 1;
   }
   else if(checked === false){
   total = total - parseInt(cost);
   checkedBoxes -= 1;
   }
   $(".activities label").last().html(`<label> Total: $${total} </label> `);
   
   //set check box to normal color
   if(checkedBoxes > 0){
      $('.activities').css('color','#083F57');
   }
  
  });

 


//..................................Payment Info" section....................................................//
//Default
let selected;
$('#paypal').hide();
$('#bitcoin').hide();
$('#payment option').first().hide();

//Display select payment and hide unselected paymenys -- Unobtrusive Javascript method
$('#payment').change(function(){
selected = $(this).val();
if( selected === 'paypal'){
    $('#bitcoin').hide();
    $('#credit-card').hide();
    $('#paypal').show();
}
else if(selected === 'credit card'){
    $('#bitcoin').hide();
    $('#credit-card').show();
    $('#paypal').hide();
}
else if(selected === 'bitcoin'){
    $('#bitcoin').show();
    $('#credit-card').hide();
    $('#paypal').hide();
}

 

})



//....................................Form validation Section- Regex................................................//
// validaiton rules on inputs
// valdiaiton rule on blank
// if register is clicked and valdiations rules are not completed, then display erro messages for each validation ruele

$('button').on('click', (e) =>{
e.preventDefault(); // Default submition was crashing


// ........Validation Rule- prevent submission when input fields are empty.............................
var submit = false;

// get list of all inputs
let inputs = $('input')
inputs.each(function(index, item) {
 
length = $(this).val().length;

//allow submition on inputs with data(filter will be applied by using validate rule)
if(length > 0 ){
    submit = true;
}
//Red indicator on blank inputs
else{
submit = false;
$(this).css('border-color','red'); // highlight indicator
   $(this).attr('placeholder','Required');
   $('#other-title').css('border-color','#6F9DDC'); //normalize color because this input is not mandatory
  
}
// Activities checkbox validation
if (  checkedBoxes <= 0 ){  
    $('.activities').css('color','red');
    submit = false;
}

//.......... Validate input format by using valaidation function..................

//email 
if (validate('email') ===  false){
$('#mail').css('border-color','red');
submit = false;
}
//creditcardnumber
if (validate('creditnumber') ===  false){
    $('#cc-num').css('border-color','red');
    submit = false;
   }
 //ZIP  
if (validate('zip') ===  false){
    $('#zip').css('border-color','red');
    submit = false;
  }
 //CVV 
if (validate('cvv') ===  false){
    $('#cvv').css('border-color','red');
    submit = false;
   }

});

  // Submit only when everything has been completed correctly
  if(submit === true){
    location.reload(); // resfresh on submittion
}

})


//.............................Indicates that the input has been validated ...............................

//Listens to keyboard on input elements
$("input").keyup(function(){
    if (validate('email') ===  true){
        $('#mail').css('border-color','#6F9DDC');
        }
        //creditcardnumber
        if (validate('creditnumber') ===  true){
            $('#cc-num').css('border-color','#6F9DDC');
           }
         //ZIP  
        if (validate('zip') ===  true){
            $('#zip').css('border-color','#6F9DDC');
          }
         //CVV 
        if (validate('cvv') ===  true){
            $('#cvv').css('border-color','#6F9DDC');
           }
        if($('#name').val().length > 0 ){
            $('#name').css('border-color','#6F9DDC');
        }
        
  });




