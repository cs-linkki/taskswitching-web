if (!ts) {
    alert("LOAD TASKSWITCHING-INIT.JS FIRST");
}

ts.authentication = {
    authenticate: function(form) {
        var data = form.serialize();
        console.log(data);

        $.ajax({
            url: 'app/login',
            data: form.serialize(),
            beforeSend: function(request) {
                request.setRequestHeader("window-width", $(window).width());
                request.setRequestHeader("window-height", $(window).height());
                request.setRequestHeader("document-width", $(document).width());
                request.setRequestHeader("document-height", $(document).height());
            },
            success: function(data, textStatus) {
                console.log("in success function: " + data);
                if (data.status) {
                    ts.authentication.ready();
                } else {
                    $("#entry-info").html("Authentication failed: " + data.error);
                }
            },
            dataType: "json",
            type: "POST",
            async: false});
    },
    ready: function() {

        $("#entry").hide();

        $("#guide").html("Welcome!<br/>First, you get to practice a bit. Press any key to continue.");
        $("#guide").show();
        $(document).one('keydown', function(e) {
            $("#guide").hide();
            ts.program.init("practice");
        });
    }
}; 