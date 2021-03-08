export function displaySuccess() {
    $('.alert').show().fadeTo(2000, 500).slideUp(500, function(){
        $(".alert-success").slideUp(500);
    });
}