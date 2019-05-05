/*
File containing helper functions for updating various elements, specifically likes, dislikes, and comments,
on each of the game pages in our app.
*/


//the folliwing is a boolean value that would help make sure 
//the like/dislike buttons can only be effective once

let clicked = false;
function disableButtons(){
	document.getElementById("thumbs-up").style.cursor='not-allowed';
	document.getElementById("thumbs-down").style.cursor='not-allowed';
}
function updateLikes(){
	if(clicked == false){
		console.log("updating likes----");
		var likes = document.getElementById("likes").innerHTML;
		var likes_int = parseInt(likes);
		likes_int++;
		console.log(likes_int);
		var url ='http://localhost:3000/tictactoe/addlikes'+'?likes='+likes_int;
	      $.ajax({url:url}).then(function(data) {
	      	console.log(data);
	      });
		document.getElementById("likes").innerHTML = likes_int;
		document.getElementById("likes2").innerHTML = likes_int;
		document.getElementById("thumbs-up").style.color = 'green';
		disableButtons();
		document.body.removeEventListener('click', updateDislikes);
		
		
	}
	clicked = true;
	return false;
}


function updateDislikes(){
	if(clicked == false){
		console.log("updating dislikes----");
		var dislikes = document.getElementById("dislikes").innerHTML;
		var dislikes_int = parseInt(dislikes);
		dislikes_int++;
		var url ='http://localhost:3000/tictactoe/addlikes'+'?dislikes='+dislikes_int;
	      $.ajax({url:url}).then(function(data) {
	      	console.log(data);
	      });
		document.getElementById("dislikes").innerHTML = dislikes_int;
		document.getElementById("dislikes2").innerHTML = dislikes_int;

		document.getElementById('thumbs-down').style.color = 'red';
		document.body.removeEventListener('click', updateDislikes);
		disableButtons();
		
	}
	clicked = true;
	return false;
}

//this updates the review tab to thank the user
//for submitting their review
function changeReview(){
	console.log("in change review function");
	var comment = document.getElementById("message").value;
	console.log("the message is " + comment+" in changereview function.");
	var string = "<h2> Thank you for reviewing the game!</h2><br><br><br>";
	var comment_url ='https://nostalgia-games.herokuapp.com/tictactoe/updatecomments'+'?message='+comment;
	      $.ajax({url:comment_url}).then(function(data) {
	      	console.log(data);
	      });
	document.getElementById("review").innerHTML = string;
}
//the following do the same thing as the above functions but for snake game
//for submitting their review
function changeReviewSnake(){
	console.log("in change review function");
	var comment = document.getElementById("message").value;
	console.log("the message is " + comment+" in changereview function.");
	var string = "<h2> Thank you for reviewing the game!</h2><br><br><br>";
	var comment_url ='https://nostalgia-games.herokuapp.com/snake/updatecomments'+'?message='+comment;
	      $.ajax({url:comment_url}).then(function(data) {
	      	console.log(data);
	      });
	document.getElementById("review").innerHTML = string;
}

function updateLikesSnake(){
	if(clicked == false){
		console.log("updating likes----");
		var likes = document.getElementById("likes").innerHTML;
		var likes_int = parseInt(likes);
		likes_int++;
		console.log(likes_int);
		var url ='https://nostalgia-games.herokuapp.com/snake/addlikes'+'?likes='+likes_int;
	      $.ajax({url:url}).then(function(data) {
	      	console.log(data);
	      });
		document.getElementById("likes").innerHTML = likes_int;
		document.getElementById("likes2").innerHTML = likes_int;
		document.getElementById("thumbs-up").style.color = 'green';
		disableButtons();
		document.body.removeEventListener('click', updateDislikes);
		
		
	}
	clicked = true;
	return false;
}


function updateDislikesSnake(){
	if(clicked == false){
		console.log("updating dislikes----");
		var dislikes = document.getElementById("dislikes").innerHTML;
		var dislikes_int = parseInt(dislikes);
		dislikes_int++;
		var url ='https://nostalgia-games.herokuapp.com/snake/addlikes'+'?dislikes='+dislikes_int;
	      $.ajax({url:url}).then(function(data) {
	      	console.log(data);
	      });
		document.getElementById("dislikes").innerHTML = dislikes_int;
		document.getElementById("dislikes2").innerHTML = dislikes_int;

		document.getElementById('thumbs-down').style.color = 'red';
		document.body.removeEventListener('click', updateDislikes);
		disableButtons();
		
	}
	clicked = true;
	return false;
}


//the following are function duplicates for hangman game
function updateDislikesHangman(){
	if(clicked == false){
		console.log("updating dislikes----");
		var dislikes = document.getElementById("dislikes").innerHTML;
		var dislikes_int = parseInt(dislikes);
		dislikes_int++;
		var url ='https://nostalgia-games.herokuapp.com/hangman/addlikes'+'?dislikes='+dislikes_int;
	      $.ajax({url:url}).then(function(data) {
	      	console.log(data);
	      });
		document.getElementById("dislikes").innerHTML = dislikes_int;
		document.getElementById("dislikes2").innerHTML = dislikes_int;

		document.getElementById('thumbs-down').style.color = 'red';
		document.body.removeEventListener('click', updateDislikes);
		disableButtons();
		
	}
	clicked = true;
	return false;
}

//this updates the review tab to thank the user
//for submitting their review
function changeReviewHangman(){
	console.log("in change review function");
	var comment = document.getElementById("message").value;
	console.log("the message is " + comment+" in changereview function.");
	var string = "<h2> Thank you for reviewing the game!</h2><br><br><br>";
	var comment_url ='https://nostalgia-games.herokuapp.com/hangman/updatecomments'+'?message='+comment;
	      $.ajax({url:comment_url}).then(function(data) {
	      	console.log(data);
	      });
	document.getElementById("review").innerHTML = string;
}

function updateLikesHangman(){
	if(clicked == false){
		console.log("updating likes----");
		var likes = document.getElementById("likes").innerHTML;
		var likes_int = parseInt(likes);
		likes_int++;
		console.log(likes_int);
		var url ='https://nostalgia-games.herokuapp.com/hangman/addlikes'+'?likes='+likes_int;
	      $.ajax({url:url}).then(function(data) {
	      	console.log(data);
	      });
		document.getElementById("likes").innerHTML = likes_int;
		document.getElementById("likes2").innerHTML = likes_int;
		document.getElementById("thumbs-up").style.color = 'green';
		disableButtons();
		document.body.removeEventListener('click', updateDislikes);
		
		
	}
	clicked = true;
	return false;
}

function updateLikesFrogger(){
	if(clicked == false){
		console.log("updating likes----");
		var likes = document.getElementById("likes").innerHTML;
		var likes_int = parseInt(likes);
		likes_int++;
		console.log(likes_int);
		var url ='https://nostalgia-games.herokuapp.com/frogger/addlikes'+'?likes='+likes_int;
	      $.ajax({url:url}).then(function(data) {
	      	console.log(data);
	      });
		document.getElementById("likes").innerHTML = likes_int;
		document.getElementById("likes2").innerHTML = likes_int;
		document.getElementById("thumbs-up").style.color = 'green';
		disableButtons();
		document.body.removeEventListener('click', updateDislikes);
		
		
	}
	clicked = true;
	return false;
}


function updateDislikesFrogger(){
	if(clicked == false){
		console.log("updating dislikes----");
		var dislikes = document.getElementById("dislikes").innerHTML;
		var dislikes_int = parseInt(dislikes);
		dislikes_int++;
		var url ='https://nostalgia-games.herokuapp.com/frogger/addlikes'+'?dislikes='+dislikes_int;
	      $.ajax({url:url}).then(function(data) {
	      	console.log(data);
	      });
		document.getElementById("dislikes").innerHTML = dislikes_int;
		document.getElementById("dislikes2").innerHTML = dislikes_int;

		document.getElementById('thumbs-down').style.color = 'red';
		document.body.removeEventListener('click', updateDislikes);
		disableButtons();
		
	}
	clicked = true;
	return false;
}

//this updates the review tab to thank the user
//for submitting their review
function changeReviewFrogger(){
	console.log("in change review function");
	var comment = document.getElementById("message").value;
	console.log("the message is " + comment+" in changereview function.");
	var string = "<h2> Thank you for reviewing the game!</h2><br><br><br>";
	var comment_url ='https://nostalgia-games.herokuapp.com/frogger/updatecomments'+'?message='+comment;
	      $.ajax({url:comment_url}).then(function(data) {
	      	console.log(data);
	      });
	document.getElementById("review").innerHTML = string;
}