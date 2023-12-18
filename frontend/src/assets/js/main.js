/*=============================================
=            Visualizar Contraseña            =
=============================================*/

$(document).ready(function () {
    const passwordField = $('#password');
    const togglePassword = $('#togglePassword');

    togglePassword.click(function () {
        const passwordFieldType = passwordField.attr('type');

        // Toggle password visibility and update eye icon
        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            togglePassword.removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            passwordField.attr('type', 'password');
            togglePassword.removeClass('fa-eye').addClass('fa-eye-slash');
            
        }
    });
});

$(document).ready(function () {
    const passwordField = $('#repeat-password');
    const togglePassword = $('#repeatTogglePassword');

    togglePassword.click(function () {
        const passwordFieldType = passwordField.attr('type');

        // Toggle password visibility and update eye icon
        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            togglePassword.removeClass('fa-eye-slash').addClass('fa-eye');
        } else {
            passwordField.attr('type', 'password');
            togglePassword.removeClass('fa-eye').addClass('fa-eye-slash');
            
        }
    });
});