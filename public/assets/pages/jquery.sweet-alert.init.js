
/**
* Theme: Adminox Template
* Author: Coderthemes
* SweetAlert
*/

!function ($) {
    "use strict";

    var SweetAlert = function () {
    };

    //examples
    SweetAlert.prototype.init = function () {
        
        // delete alert
        $('.sa-params').click(function (e) {
            e.preventDefault();
            var key = $(this).attr('data-id');
            swal({
                title: 'Are you sure?',
                text: "You won't be able to delete this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger m-l-10',
                buttonsStyling: false
            }).then(function () {
                $('#delete-form-'+key).submit();
                swal(
                    'Deleted!',
                    'Record has been deleted.',
                    'success'
                )
            }, function (dismiss) {
                if (dismiss === 'cancel') {
                    swal(
                        'Cancelled',
                        'Your record is safe.',
                        'error'
                    )
                }
            })
        });
    },

    //init
    $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert

}(window.jQuery),

//initializing
function ($) {
    "use strict";
    $.SweetAlert.init()
}(window.jQuery);