const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

try {
  const formDataFromLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (formDataFromLS !== null) {
    formData = formDataFromLS;

    const formDataFromLSKeys = Object.keys(formDataFromLS);

    formDataFromLSKeys.forEach(key => {
      refs.feedbackForm.elements[key].value = formDataFromLS[key];
    });
  }
} catch (err) {
  console.log(err);
}

const onFeedbackFormFieldChange = ({ target: formFieldEl }) => {
  const formFieldName = formFieldEl.name;
  const formFieldValue = formFieldEl.value.trim();

  formData[formFieldName] = formFieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  const formDataValues = Object.values(formData);

  if (formDataValues.includes('')) {
    alert('Усі поля мають бути заповнені!');

    return;
  }

  console.log(formData);

  localStorage.removeItem('feedback-form-state');
  refs.feedbackForm.reset();
  formData = {
    email: '',
    message: '',
  };
};

refs.feedbackForm.addEventListener('input', onFeedbackFormFieldChange);
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
