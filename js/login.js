/*
File containing helper functions for validating login information as well as validating new
user sign-up information. Display will change depending on whether the specificed criteria
are met.

Nostalgia Games does NOT take credit for the overall format or structure of the following code. It
was taken an adapated from HW3 of the Spring 2019 session of CSCI3308 at CU Boulder.
*/


function openModal() {
      
    var myInput = document.getElementById("psw");
    var confirmMyInput = document.getElementById("repsw");
	var letter = document.getElementById("letter");
	var capital = document.getElementById("capital");
	var number = document.getElementById("number");
	var length = document.getElementById("length");    
    var match = document.getElementById("match");
    var email=document.getElementById("email");



    email.onkeyup=function(){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 


        if(email.value.match(mailformat)){
            valid_email_format.classList.remove("invalid");
            valid_email_format.classList.add("valid");
        }else{
            valid_email_format.classList.remove("valid");
            valid_email_format.classList.add("invalid");
        }
    }
	// When the user starts to type something inside the password field
	myInput.onkeyup = function() {
       console.log('helllooo')
        
        var lowerCaseLetters = /[a-z]+/g; // : Fill in the regular experssion for lowerCaseLetters
        var upperCaseLetters = /[A-Z]+/g; // : Fill in the regular experssion for upperCaseLetters
        var numbers = /[0-9]+/g; // : Fill in the regular experssion for digits
        var minLength = 8; // : Change the minimum length to what what it needs to be in the question
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

        // Validate lowercase letters
        if(email.value.match(mailformat)){
            valid_email_format.classList.remove("invalid");
            valid_email_format.classList.add("valid");
        }else{
            valid_email_format.classList.remove("valid");
            valid_email_format.classList.add("invalid");
        }
        

        if(myInput.value.match(lowerCaseLetters)) {             
            letter.classList.remove("invalid"); 
            letter.classList.add("valid"); 
        } else {
            letter.classList.remove("valid"); 
            letter.classList.add("invalid"); 
        }

        // Validate capital letters        
        if(myInput.value.match(upperCaseLetters)) { 
            capital.classList.remove("invalid"); 
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers        
        if(myInput.value.match(numbers)) { 
            number.classList.remove("invalid"); 
            number.classList.add("valid"); 
        } else {
            number.classList.remove("valid"); 
            number.classList.add("invalid");
        }

        // Validate length
        if(myInput.value.length >= minLength) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }


        
    }
    confirmMyInput.onkeyup = function() {
                // Validate password and confirmPassword
                var passEqualsConfPass = (myInput.value==confirmMyInput.value); 
                if(passEqualsConfPass) { 
                    match.classList.remove("invalid"); 
                    match.classList.add("valid"); 
                } else {
                    match.classList.remove("valid"); 
                    match.classList.add("invalid"); 
                }        

                // Disable or Enable the button based on the elements in classList
                enableButton(letter, capital, number, length, match,valid_email_format);
    }
}


function enableButton(letter, capital, number, length, match) {   
    var button = document.getElementById('my_submit_button');
    var condition = (letter&&capital&&number&&length&&match);
    if(condition) {       
            button.disabled = false;
        }        
    } 
