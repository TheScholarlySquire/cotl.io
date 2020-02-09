/*Toggle sidebar panel width/visibility*/
    function toggleNav() {
        $("#leftNavPanel").toggle("slide", {direction: "left"}, 5000);
    }

    /*Set filter panel width to 0px (close it)*/
    function closeNav() {
        $("#leftNavPanel").hide("slide", {direction: "left"}, 5000);
    }

    $('#navOpenBtn').on('click',function(e){
        $("#leftNavPanel").toggle("slide", {direction: "left"}, 5000);
    })

$(function () {

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#contact-form').validator();

    /*IN GENERAL:
     * When the form with the #contact-form id is submitted
     * we make the POST request to the contact.php script.
     */

    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }
            });
            /*return false to prevent usual form submitting after displaying message and resetting form inputs*/
            return false;
        }
    })
});
