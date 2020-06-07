// // jQuery
// function menuHandler() {
//     const $sidebar = $('#leftNavPanel');
//     $('.openbtn').on('click', function () {
//         if ($sidebar.hasClass('sidebar--shown')) {
//             $sidebar.addClass('sidebar--shown');
//         }
//     });
//     $('.closebtn').on('click', function () {
//         if ($sidebar.hasClass('sidebar--shown')) {
//             $sidebar.removeClass('sidebar--shown');
//         }
//     });
// }

// ES6+
const menuHandler = () => {
    const sidebar = document.querySelector('#leftNavPanel');
    document.querySelector('.openbtn').addEventListener('click', () => {
        if (!sidebar.classList.contains('sidebar--shown')) {
            sidebar.classList.add('sidebar--shown');
        }
    });
    document.querySelector('.closebtn').addEventListener('click', () => {
        if (sidebar.classList.contains('sidebar--shown')) {
            sidebar.classList.remove('sidebar--shown');
        }
    });
};


$(function () {

    menuHandler();

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    // $('#contact-form').validator();

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
