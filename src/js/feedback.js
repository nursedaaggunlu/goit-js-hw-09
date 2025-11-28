const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");

form.addEventListener("input", event => {
  const formData = new FormData(form);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value.trim();
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formObject));
});

const fillForm = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.elements.email.value = email || "";
    form.elements.message.value = message || "";
  }
};

fillForm();

form.addEventListener("submit", event => {
  event.preventDefault();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email && message) {
    console.log({ email, message });
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
  } else {
    alert("Please fill in all fields.");
  }
});