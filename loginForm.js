function ValidateForm()
{
    var nameBox = document.getElementById ("name");
    if (nameBox.value.length == 0) {
        document.getElementById("error").innerHTML = "Error: Enter your full name.";
		document.getElementById("error").style.display = 'block';
        return false;
    }

    var pwBox = document.getElementById ("password");
    if (pwBox.value.length < 6){
        document.getElementById("error").innerHTML = "Error: Password is too short.";
		document.getElementById("error").style.display = 'block';
        return false;
    }

    // 6-16 non-white character
    re = /^\S{6,16}$/;
    if (!pwBox.value.match (re)){
         document.getElementById("error").innerHTML = "Error: Invalid password.";
		 document.getElementById("error").style.display = 'block';
        return false;
    }

    // Telephone may be empty or only 7-16 digits
    re = /^\d{7,16}$/;
    var telBox = document.getElementById ("telephone");
    if (telBox.value.length > 0){
        if (!telBox.value.match (re)){
            document.getElementById("error").innerHTML = "Error: Invalid telephone number.";
			document.getElementById("error").style.display = 'block';
            return false;
        }
    }

    // regular expression pattern of email
    re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // re = /^\w+([\.\-\+]\w+)*@\gmail.com;
    var emailBox = document.getElementById ("email");
    if (!emailBox.value.match (re))
    {
        document.getElementById("error").innerHTML = "Error: Invalid email address: " + emailBox.value;
		document.getElementById("error").style.display = 'block';
        return false;
    }
	
	document.getElementById("error").style.display = 'none';
    return true;
}