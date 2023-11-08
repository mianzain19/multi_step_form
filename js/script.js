const stepContainer = document.querySelector('.steps-container');
const stepBtns = document.querySelectorAll('.step-btn');
const formContainer = document.querySelector('.form-container');
const formContent = document.querySelectorAll('.form-content');
const emailInp = document.getElementById('email');
const nameInp = document.getElementById('fullName');
const fileInput = document.getElementById('fileInput');
const nextBtn = document.querySelectorAll('.nextBtn');
const prevBtn = document.querySelectorAll('.prevBtn');
const submitBtn = document.querySelector('.submit');
const dataContainer = document.querySelector('.data-container');



// next button
nextBtn.forEach(function (button, index) {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    if (!validateStep(index)) {
      return;
    }
    formContent.forEach((t) => t.classList.remove('form-content-active'));
    const currentStep = document.querySelector('.step-btn.active');
    currentStep.classList.remove('active');
    currentStep.innerHTML = '<i class="fa-solid fa-check"></i>';
    currentStep.nextElementSibling.classList.add('active');
    this.closest('.form-content').nextElementSibling.classList.add(
      'form-content-active'
    );
  });
});

// prev button
prevBtn.forEach(function (button) {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    formContent.forEach((t) => t.classList.remove('form-content-active'));
    const currentStep = document.querySelector('.step-btn.active');
    currentStep.classList.remove('active');
    currentStep.previousElementSibling.classList.add('active');
    this.closest('.form-content').previousElementSibling.classList.add(
      'form-content-active'
    );
  });
});

// image upload
const imagePreview = document.getElementById('imagePreview');
let imageUrl;
fileInput.addEventListener('change', function () {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageUrl = e.target.result;
      imagePreview.src = imageUrl;
      console.log(imageUrl);
      document.querySelector('.avatar-img').style.display = 'none';
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});
// handle check box

const termsCheckbox = document.getElementById('terms');
termsCheckbox.addEventListener('change', function () {
  if (this.checked) {
    submitBtn.style.display = 'inline';
  } else {
    submitBtn.style.display = 'none';
  }
});

// handle submit

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const name = nameInp.value;
  const email = emailInp.value;
  const image = imageUrl;

  sessionStorage.setItem('name', name);
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('imageURL', image);

  formContainer.style.display = 'none';
  stepContainer.parentElement.style.display = 'none';
  dataContainer.style.display = 'block';

  const storedName = sessionStorage.getItem('name');
  const storedEmail = sessionStorage.getItem('email');
  const storedImageURL = sessionStorage.getItem('imageURL');
  console.log(storedName);
  console.log(storedEmail);
  console.log(storedImageURL);

  document.getElementById('nameData').textContent = storedName;
  document.getElementById('emailData').textContent = storedEmail;
  document.getElementById('imgData').src = storedImageURL;
});

// validations

function validateStep(stepIndex) {
  let errContainer = document.querySelector('.err-container');
  let errMsg = document.querySelector('.err-msg');
  errMsg.textContent = '';

  if (stepIndex === 0) {
    const inputFieldStep1 = document.querySelectorAll('.gen-info-inp');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (let i = 0; i < inputFieldStep1.length; i++) {
      if (inputFieldStep1[i].value === '') {
        errMsg.textContent = '*Please fill out all fields';
        errContainer.style.display = 'block';
        return false;
      }
      if (inputFieldStep1[i].name === 'email') {
        if (!emailRegex.test(inputFieldStep1[i].value)) {
          errMsg.textContent = '*Please enter email in correct format';
          errContainer.style.display = 'block';
          return false;
        }
      }
    }

    return true;
  } else if (stepIndex === 1) {
    const imageFile = fileInput.files[0];

    if (!imageFile) {
      errMsg.textContent = '*Please upload an image';
      errContainer.style.display = 'block';
      return false;
    } else {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxFileSize = 2 * 1024 * 1024;

      if (!allowedTypes.includes(imageFile.type)) {
        errMsg.textContent = '*Please upload a PNG or JPG file';
        errContainer.style.display = 'block';
        return false;
      }

      if (imageFile.size > maxFileSize) {
        errMsg.textContent =
          '*Please upload an image with a size less than 2MB';
        errContainer.style.display = 'block';
        return false;
      }
    }
    return true;
  }
}
