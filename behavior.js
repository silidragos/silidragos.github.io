function showModal(className) {
    var els = document.getElementsByClassName(className);
    els[0].style.display = 'block';

    return false;
}
function hideModal(className) {
    var els = document.getElementsByClassName(className);
    els[0].style.display = 'none';
}

function hideAndShowModal(classNameHide, classNameShow) {
    var els = document.getElementsByClassName(classNameHide);
    els[0].style.display = 'none';

    els = document.getElementsByClassName(classNameShow);
    els[0].style.display = 'block';
}

let currentView = undefined;
function switchView(className) {
    if (currentView !== undefined) {
        currentView.style.display = 'none';
    }

    if (className !== 'sdk-reference') {
        hideOtherDropDowns();
    }

    currentView = document.getElementsByClassName(className)[0];
    currentView.style.display = 'block';
}

function hideOtherDropDowns() {
    let dropdown = document.getElementById('unity-sdk-dropdown');
    dropdown.style.display = 'none';
}
function onUnitySDKClick() {
    let dropdown = document.getElementById('unity-sdk-dropdown');
    dropdown.style.display = 'block';

    switchView('sdk-reference');
}

function onSendContact(event, formId, hideModal, showModal, hasBody = true) {
    event.preventDefault();
    const el = document.getElementById(formId);
    document.getElementById('loading-overlay').style.display = 'block';
    var template_params = {
        user_name: el.querySelector('.name_input').value,
        user_email: el.querySelector('.email_input').value,
        company: el.querySelector('.company_input').value
    };

    template_params.message = hasBody ? el.querySelector('.body_textarea').value : '-';

    emailjs.send('gmail', 'contactinsidar', template_params).then(
        function(response) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById('loading-overlay').style.display = 'none';
            hideAndShowModal(hideModal, showModal);
        },
        function(error) {
            console.log('FAILED', error);
            document.getElementById('loading-overlay').style.display = 'none';
            hideAndShowModal(hideModal, 'modal-error');
        }
    );
}

document.getElementById('contact_form').addEventListener('submit', e => {
    onSendContact(e, 'contact_form', 'modal-contact', 'modal-success-contact');
});

document.getElementById('request_form').addEventListener('submit', e => {
    onSendContact(e, 'request_form', 'modal-request', 'modal-success-request', false);
});
