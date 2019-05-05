var express = require('express');
require('dotenv').config();
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const session =  require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var pgp = require('pg-promise')();

mongoose.connect('mongodb+srv://dbUser:TeMK9H63o5MHtD8g@cluster0-drigk.mongodb.net/NGdevelopment?retryWrites=true', {useNewUrlParser: true})
	.then(() => {
		console.log("Connected to mongoDB");
	})
	.catch(error => {
		console.error(error);
	})

const sessiondb = mongoose.connection


const dbConfig = process.env.DATABASE_URL;
var db = pgp(dbConfig);

process.env.valid_friend=true;  //one for add friends
process.env.valid_user=true;  //one for sign in
process.env.valid_email=true;   // one for checking duplicate email
process.env.valid_username=true;  //one for sign up

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));
app.use(cookieParser());
app.use(session({
	secret: 'plans within plans within plans',
	resave: true,
	saveUninitialized: false,
	cookie: {maxAge: 1800000},
	store: new MongoStore({ mongooseConnection: sessiondb })
}));


app.get('/', function(req, res) {
	if (!req.session.currentUser) {
		req.session.currentUser = 1;
	}
	var user_data = "select * from player_info where id = " + req.session.currentUser;
	var all_games = "select * from gamelist order by id";
	var pop_games = "select * from gamelist order by (dislikes-likes);";
	var valid_friend=process.env.valid_friend;
	db.any(user_data)
		.then(rows => {
			var active_user = rows[0];
			var user_friends_query = "select username from player_info where ARRAY[" + rows[0].friends + "]::integer[] @> array[id];";
			db.any(user_friends_query)
				.then(rows => {
					var active_user_friends = rows;
					db.task('get-everything', task => {
						return task.batch([
							task.any(all_games),
							task.any(pop_games)
						]);
					})
					.then(info => {
						res.render('category', {
							my_title: "Home",
							current_user: active_user,
							current_user_friends: active_user_friends,
							all_game_data: info[0],
							pop_game_data: info[1].slice(0,3),
							valid_friend:  valid_friend
						})
						process.env.valid_friend=true;

					})
					.catch(error => {
						res.render('category', {
							my_title: "Home",
							all_game_data: '',
							pop_game_data: ''
						})
					});
				})
				.catch(error => {
					console.log(error)
				})
		})
		.catch(error => {
			console.log(error);
		})
});

app.get('/category', function(req, res) {
	if (!req.session.currentUser) {
		req.session.currentUser = 1;
	}
	var user_data = "select * from player_info where id = " + req.session.currentUser;
	var all_games = "select * from gamelist order by id";
	var pop_games = "select * from gamelist order by (dislikes-likes);";
	var valid_friend=process.env.valid_friend;
	db.any(user_data)
		.then(rows => {
			var active_user = rows[0];
			var user_friends_query = "select username from player_info where ARRAY[" + rows[0].friends + "]::integer[] @> array[id];";
			db.any(user_friends_query)
				.then(rows => {
					var active_user_friends = rows;
					db.task('get-everything', task => {
						return task.batch([
							task.any(all_games),
							task.any(pop_games)
						]);
					})
					.then(info => {
						res.render('category', {
							my_title: "Home",
							current_user: active_user,
							current_user_friends: active_user_friends,
							all_game_data: info[0],
							pop_game_data: info[1].slice(0,3),
							valid_friend:  valid_friend
						})
						process.env.valid_friend=true;

					})
					.catch(error => {
						res.render('category', {
							my_title: "Home",
							all_game_data: '',
							pop_game_data: ''
						})
					});
				})
				.catch(error => {
					console.log(error)
				})
		})
		.catch(error => {
			console.log(error);
		})
});

app.get('/category/search_game', function(req,res) {
	var game_name = req.query.gameInput;
	var check_game = "select count(*) from gamelist where name ='" + game_name + "';";
	db.any(check_game)
	.then(rows => {
		if (rows[0].count == 1) {
			res.redirect('/' + game_name);
		}
		else {
			res.redirect('/category');
		}
	})
	.catch(error => {
		console.log(error)
	})
})

app.get('/category/log_out', function(req, res) {
	req.session.currentUser = 1;
	res.redirect('/category');
});

app.get('/account', function(req, res) {
	var user=process.env.valid_user;
	var username=process.env.valid_username;
	var email=process.env.valid_email;
	res.render('account', {
		my_title: "Register Account",
		valid_user:user,  //user name for sign in
        valid_username:username,  //user name for sign up
        valid_email:email  // email for sign up
	});
	process.env.valid_email=true;
	process.env.valid_username=true;
	process.env.valid_user=true;
});

app.post('/category/friend',function(req,res){
	var friend_name=req.body.searchname;
	var check_username = "select 1 from player_info where username = '" + friend_name + "';";
	var check_username_duplicate=""
	var friend_id="select id from player_info where username='"+friend_name+"';";

	db.task('get-everything',task=>{
		return task.batch([
			task.any(friend_id),
			task.any(check_username)
			]);
	})
	.then(info=>{
		console.log(info[1][0]);
		if(info[1][0]==undefined){
			process.env.valid_friend=false;
			res.redirect('/category')
		}
		else if(req.session.currentUser == 1){
			res.redirect('/category')
		}
		else{
		var add_friend="update player_info set friends=array_append(friends,"+info[0][0].id+") where id="+req.session.currentUser+";";
		db.task('get-everything',task=>{
			return task.batch([
				task.any(add_friend),
				]);
		})
		.then(res.redirect('/category'))
		.catch(error => {
					console.log(error)
				})
		}
		
	})
	.catch(error=>{
		console.log(error)
	})
});

app.post('/account/reg_acct', function(req, res) {
	var pw = req.body.password;
	var cpw = req.body.repassword;
	var user_name = req.body.username;
	var first_name = req.body.firstname;
	var last_name = req.body.lastname;
	var email_addr = req.body.email;
	var check_username = "select COUNT(1) from player_info where username = '" + user_name + "';";
	var check_email = "select COUNT(1) from player_info where email = '" + email_addr + "';";
	var add_user = "INSERT INTO player_info(username, first_name, last_name, email, password, friends) VALUES('" + 
			user_name + "','" + first_name + "','" + last_name + "','" + email_addr + "','" + pw + "',ARRAY[]::integer[]);";
	var user_count = "select COUNT(*) from player_info";

	db.task('get-everything', task => {
		return task.batch([
			task.any(check_username),
			task.any(check_email)
		]);
	})
	.then(info => {

		if (info[0][0].count == 1) {   //duplicate username
      		process.env.valid_username=false;
		}
		if(info[1][0].count==1)  //email duplicate
		{
            process.env.valid_email=false;
		}

        if(info[1][0].count==1||info[0][0].count==1){
            console.log("888");
        	process.env.valid_user=true;
        	res.redirect('/account')
        }
        if(info[1][0].count==0&&info[0][0].count==0)
		 {
			db.task('get-everything', task => {
				return task.batch([
					task.any(add_user),
					task.any(user_count)
				]);
			})
			.then(info => {
				req.session.currentUser = info[1][0].count;
				process.env.valid_friend=true;
			    process.env.valid_user=true;
				res.redirect('/category')
			})
			.catch(error => {
				console.log(error)
			})
		}
	})
	.catch(error => {
		res.render('account', {
			my_title: "Register Account",
			pw_match: true,
			valid_username: true,
			valid_email: true
		})
	});
});

app.post('/account/login', function(req, res) {
	var user_name = req.body.username;
	var pw = req.body.password;
	var check_username = "select * from player_info where username = '" + user_name + "';";
	db.any(check_username)
		.then(rows => {
			if (rows.length == 0) {
				const query = querystring.stringify({
          			"valid_login_id": false
      			});
      			process.env.valid_user=false;
      			res.redirect('/account?' + query);
			}
			else {
				if (pw != rows[0].password) {
					const query = querystring.stringify({
						"valid_login_pw": false
					});
					process.env.valid_user=false;
					res.redirect('/account?' + query);
				}
				else {
					req.session.currentUser = rows[0].id;
					process.env.valid_friend=true;
					res.redirect('/category');
				}
			}
		})
		.catch(error => {
			console.log(error);
			res.render('account', {
				my_title: "Register Account",
				pw_match: true,
				valid_username: true,
				valid_email: true
			})
		});
});

app.post('/account/login_as_guest',function(req,res){
	req.session.currentUser=1;
	console.log("babababa");
	res.redirect('/category');
})

/*
SNAKE Requests
*/

app.get('/snake', (req, res)=>{
	console.log("in rating url now");
	var num_likes = "select likes from gamelist where name='Snake';";
	var num_dislikes = "select dislikes from gamelist where name='Snake';";
	var comment_query = "select comments from gamelist where name='Snake';";

	db.task('get likes and dislikes', task=>{
		return task.batch([
			task.any(num_likes),
			task.any(num_dislikes), 
			task.any(comment_query)
			]);
	})
	.then(info=>{
		res.render('snake', {
			likes: info[0][0].likes,
			dislikes: info[1][0].dislikes, 
			comments: info[2][0].comments

		})
		

		
	})
	 .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('snake', {
                title: 'Tic-Tac-Toe Page',
                data:'',
		        likes:'',
		        dislikes:'',
		        high_scores:'',
		        comments:''
            })
    });
})

/*Stuff the like/dislike button should do
*/
app.get('/snake/addlikes', function(req, res) {
	var likes = req.query.likes;
	var dislikes = req.query.dislikes;
	var query_likes = '';
	var query_dislikes = '';
	console.log('in server');
	console.log('likes '+likes);
	console.log('dislikes'+ dislikes);
	if(dislikes === undefined){
		console.log("dislikes is undefined !!");
		query_likes = "UPDATE gamelist set likes="+parseInt(likes)+" where name='Snake';";
		db.any(query_likes)



		
	}
	else {
		console.log("likes is undefined !!!");
		query_dislikes = "UPDATE gamelist set dislikes="+parseInt(dislikes)+" where name='Snake';";
		db.any(query_dislikes)
		
			
	}

	res.status(200).send("Success");

});


//the following function updates the comments array of a game 
//from a review that's submitted.
app.get('/snake/updatecomments', (req, res)=>{
	console.log("in updatecomments");
	var review = req.query.message;
	console.log("review is" + review);
	var insert_comment = "UPDATE gamelist set comments=array_append(comments,'"+review.toString()+"') where name='Snake';";
	var comment_query = "select comments from gamelist where name='Snake';";
	var num_likes = "select likes from gamelist where name='Snake';";
	var num_dislikes = "select dislikes from gamelist where name='Snake';";
	db.task('update comments', task=>{
		return task.batch([
			task.any(insert_comment), 
			task.any(comment_query), 
			task.any(num_likes),
			task.any(num_dislikes)
			]);
		})
		.then(info=>{
			res.render('snake', {
				comments: info[1][0].comments, 
				likes: info[2][0].likes,
				dislikes: info[3][0].dislikes, 

		})

		})
		.catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('snake', {
                title: 'Tic-Tac-Toe Page',
                data:'',
		        likes:'',
		        dislikes:'',
		        high_scores:'',
		        comments:''
            })
    })


});


app.get('/snake/updatecomments', (req, res)=>{
	var comment_query = "select comments from gamelist where name='Snake';";
	db.any(comment_query)
	.then(info=>{
			res.render('snake', {
				comments: info[0][0].comments

		})
	})
});

/*
Hangman server requests
*/

app.get('/hangman', (req, res)=>{
	console.log("in rating url now");
	var num_likes = "select likes from gamelist where name='Hangman';";
	var num_dislikes = "select dislikes from gamelist where name='Hangman';";
	var comment_query = "select comments from gamelist where name='Hangman';";

	db.task('get likes and dislikes', task=>{
		return task.batch([
			task.any(num_likes),
			task.any(num_dislikes), 
			task.any(comment_query)
			]);
	})
	.then(info=>{
		res.render('hangman', {
			likes: info[0][0].likes,
			dislikes: info[1][0].dislikes, 
			comments: info[2][0].comments

		})
		

		
	})
	 .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('hangman', {
                title: 'HangMan Page',
                data:'',
		        likes:'',
		        dislikes:'',
		        high_scores:'',
		        comments:''
            })
    });
})

/*Stuff the like/dislike button should do
*/
app.get('/hangman/addlikes', function(req, res) {
	var likes = req.query.likes;
	var dislikes = req.query.dislikes;
	var query_likes = '';
	var query_dislikes = '';
	console.log('in server');
	console.log('likes '+likes);
	console.log('dislikes'+ dislikes);
	if(dislikes === undefined){
		console.log("dislikes is undefined !!");
		query_likes = "UPDATE gamelist set likes="+parseInt(likes)+" where name='Hangman';";
		db.any(query_likes)




		
	}
	else {
		console.log("likes is undefined !!!");
		query_dislikes = "UPDATE gamelist set dislikes="+parseInt(dislikes)+" where name='Hangman';";
		db.any(query_dislikes)
		
			
	}

	res.status(200).send("Success");

});


//the following function updates the comments array of a game 
//from a review that's submitted.
app.get('/hangman/updatecomments', (req, res)=>{
	console.log("in updatecomments");
	var review = req.query.message;
	console.log("review is" + review);
	var insert_comment = "UPDATE gamelist set comments=array_append(comments,'"+review.toString()+"') where name='Hangman';";
	var comment_query = "select comments from gamelist where name='Hangman';";
	var num_likes = "select likes from gamelist where name='Hangman';";
	var num_dislikes = "select dislikes from gamelist where name='Hangman';";
	db.task('update comments', task=>{
		return task.batch([
			task.any(insert_comment), 
			task.any(comment_query), 
			task.any(num_likes),
			task.any(num_dislikes)
			]);
		})
		.then(info=>{
			res.render('hangman', {
				comments: info[1][0].comments, 
				likes: info[2][0].likes,
				dislikes: info[3][0].dislikes, 

		})

		})
		.catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('hangman', {
                title: 'HangMan Page',
                data:'',
		        likes:'',
		        dislikes:'',
		        high_scores:'',
		        comments:''
            })
    })


});


app.get('/hangman/updatecomments', (req, res)=>{
	var comment_query = "select comments from gamelist where name='Hangman';";
	db.any(comment_query)
	.then(info=>{
			res.render('hangman', {
				comments: info[0][0].comments

		})
	})
});

/*
Frogger server requests
*/

app.get('/frogger', (req, res)=>{
	console.log("in rating url now");
	var num_likes = "select likes from gamelist where name='Frogger';";
	var num_dislikes = "select dislikes from gamelist where name='Frogger';";
	var comment_query = "select comments from gamelist where name='Frogger';";

	db.task('get likes and dislikes', task=>{
		return task.batch([
			task.any(num_likes),
			task.any(num_dislikes), 
			task.any(comment_query)
			]);
	})
	.then(info=>{
		res.render('frogger', {
			likes: info[0][0].likes,
			dislikes: info[1][0].dislikes, 
			comments: info[2][0].comments

		})
		

		
	})
	 .catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('frogger', {
                title: 'Frogger',
                data:'',
		        likes:'',
		        dislikes:'',
		        high_scores:'',
		        comments:''
            })
    });
})

/*Stuff the like/dislike button should do
*/
app.get('/frogger/addlikes', function(req, res) {
	var likes = req.query.likes;
	var dislikes = req.query.dislikes;
	var query_likes = '';
	var query_dislikes = '';
	console.log('in server');
	console.log('likes '+likes);
	console.log('dislikes'+ dislikes);
	if(dislikes === undefined){
		console.log("dislikes is undefined !!");
		query_likes = "UPDATE gamelist set likes="+parseInt(likes)+" where name='Frogger';";
		db.any(query_likes)




		
	}
	else {
		console.log("likes is undefined !!!");
		query_dislikes = "UPDATE gamelist set dislikes="+parseInt(dislikes)+" where name='Frogger';";
		db.any(query_dislikes)
		
			
	}

	res.status(200).send("Success");

});


//the following function updates the comments array of a game 
//from a review that's submitted.
app.get('/frogger/updatecomments', (req, res)=>{
	console.log("in updatecomments");
	var review = req.query.message;
	console.log("review is" + review);
	var insert_comment = "UPDATE gamelist set comments=array_append(comments,'"+review.toString()+"') where name='Frogger';";
	var comment_query = "select comments from gamelist where name='Frogger';";
	var num_likes = "select likes from gamelist where name='Frogger';";
	var num_dislikes = "select dislikes from gamelist where name='Frogger';";
	db.task('update comments', task=>{
		return task.batch([
			task.any(insert_comment), 
			task.any(comment_query), 
			task.any(num_likes),
			task.any(num_dislikes)
			]);
		})
		.then(info=>{
			res.render('frogger', {
				comments: info[1][0].comments, 
				likes: info[2][0].likes,
				dislikes: info[3][0].dislikes, 

		})

		})
		.catch(error => {
        // display error message in case an error
            request.flash('error', err);
            response.render('frogger', {
                title: 'Frogger',
                data:'',
		        likes:'',
		        dislikes:'',
		        high_scores:'',
		        comments:''
            })
    })


});


app.get('/frogger/updatecomments', (req, res)=>{
	var comment_query = "select comments from gamelist where name='Frogger';";
	db.any(comment_query)
	.then(info=>{
			res.render('frogger', {
				comments: info[0][0].comments

		})
	})
});

/*
About Us/Contact Page requests
*/

app.get('/about_us', (req,res) => {
	res.render('about_us')
})

app.listen(process.env.PORT);