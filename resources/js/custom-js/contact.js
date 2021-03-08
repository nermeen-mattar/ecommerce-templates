
import { httpPost
} from "./httpClient.js";
import { getFormValues, setFormValues } from "./utilities.js";
import { displaySuccess } from "./success_message.js";


$(document).ready(function () {
    $('#send_message').on('click', function () {
        httpPost('email/send', getFormValues('#contact_form')[0]).then(res => {
            displaySuccess();
            setFormValues('#contact_form', '');
        }).catch(err => {
            displaySuccess();
            setFormValues('#contact_form', '');
        });
    });
});
