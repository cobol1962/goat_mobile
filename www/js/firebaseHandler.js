
var p = null;
var c = null;
function authentificate(pid, callback) {

    if (pid == "facebook") {
      var provider = new firebase.auth.FacebookAuthProvider();
    }
    if (pid == "google") {
        var provider = new firebase.auth.GoogleAuthProvider();
    }
    if (pid == "twitter") {
        var provider = new firebase.auth.TwitterAuthProvider();
    }
//    provider.setCustomParameters({ prompt: 'select_account' });
  firebase.auth().signInWithPopup(provider).then(function(result) {

      var user = result.user;

		   localStorage.currentUser = JSON.stringify(user);
       callback(user.providerData);


    }).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function showRegister(user) {

    var html = "<table><tr><td rowspan='2'>" + ((user.photoURL != null) ? "<img style='max-width:200px;width:200px;' src='" + user.photoURL + "' />" : "&nbsp;") + "</td><td style='max-width:250px;width:250px;padding:10px;font-size:20px;font-weight:bold;vertical-align:top;'>" + ((user.displayName != null) ? user.displayName : "");
    html += "</td></tr><tr><td style='padding:10px;font-size:18px;font-weight:bold;vertical-align:bottom;'>U are not registered on broadcastriver</td></tr></table>";
    swal({
        title: 'Welcome',
        html: html,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Register'
    }).then(function(isConfirm) {
        if (isConfirm) {
            $.ajax({
                url: "ajax.php",
                type: "POST",
                data: {
                    action: "adduser",
                    fbid: user.uid,
                    displayname: user.displayName
                },
                success: function(res) {
                    $("#btns").hide();
                    $("#lgn").html(((user.displayName != null) ? user.displayName : user.email) + " " + "<a href='javascript:logout();'>Logout</a>");
                    $("ttw").show();
                    window.mp = "null";
                    window.currVideo -= 1;
                    sessionStorage.uid = user.uid;
                    sessionStorage.displayName = user.displayName;
                    swal(
                        'Success!',
                        'You are register now.',
                        'success'
                    );
                }
            });
        }
    });
}

function authentemail() {

    var html = "<div style='display:inline-block;margin10px auto;'><table><tr><td style='padding:10px;text-align:right;'><label for='email'>Email: </label>&nbsp;<input id='email' type='email' /></td></tr><tr><td style='padding:10px;text-align:right;'>";
    html += "<label for='pass'>Password: </label>&nbsp;<input id='pass' type='password' /></td></tr>";
    html += "<tr><td style='text-align:center;'></td></tr>";
    html += "</table><span id='msg' style='width:100%;color:red;'><span></div>";
    swal({
        title: 'Please login',
        html: html,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Login / register",
        allowOutsideClick: false,
        allowEscapeKey: false,
        closeOnConfirm: false
    }).then(function(confirm) {
        if (confirm) {
            handleSignUp();
        }
    });
}

function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;

    $("#msg").html('');
    $(".sweet-confirm").unbind("click");
    $(".sweet-confirm").bind("click", function() {
        handleSignUp();
    });

    if (email.length < 4) {
        $("#msg").html('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        $("#msg").html('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {

        $("#btns").hide();
        $("#lgn").html(email);
        $("#btns").hide();
        window.mp = "null";
        $("ttw").show();
        sessionStorage.uid = result.uid;
        sessionStorage.displayName = email;
        swal.close();
    }).catch(function(error) {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;

        // [START_EXCLUDE]
		console.log(error);
        if (errorCode === 'auth/wrong-password') {
            $("#msg").html('Wrong password or u have been registered with this email using other provider such google, facebook or twitter.');
            return;
        } else {
            swal({
                title: email,
                text: 'Please register',
                type: 'warning',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: "Register",
                allowOutsideClick: false,
                allowEscapeKey: false,
                closeOnConfirm: false
            }).then(function(confirm) {
                if (confirm) {
                    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // [START_EXCLUDE]
                        if (errorCode == 'auth/weak-password') {
                            $("#msg").html('The password is too weak.');
                            return;
                        } else {
                            $("#msg").html(errorMessage);
                            return;
                        }
                        console.log(error);
                    }).then(function(result) {
                        $.ajax({
                            url: "ajax.php",
                            type: "POST",
                            data: {
                                action: "adduser",
                                fbid: result.uid,
                                displayname: email
                            },
                            success: function(res) {
                                $("#btns").hide();
                                $("ttw").show();
                                window.mp = "null";
                                window.currVideo -= 1;
                                window.currVideo -= 1;
                                $("#lgn").html(email + " " + "<a href='javascript:logout();'>Logout</a>");
                                swal(
                                    'Success!',
                                    'You are register now.',
                                    'success'
                                );
                            }
                        });

                    });
                }
            });

        }

    });

}
