// DOM elements
const form = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const result = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');
const togglePass = document.getElementById('togglePass');

// Validation functions
function validateEmail(value) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value.trim());
}

function validatePassword(value) {
  if (value.length < 8) return {ok:false, msg:'Password must be at least 8 characters.'};
  const hasNumber = /[0-9]/.test(value);
  const hasLetter = /[A-Za-z]/.test(value);
  if (!hasNumber || !hasLetter) return {ok:false, msg:'Password should contain both letters and numbers.'};
  return {ok:true};
}

// Show error
function showError(el, message) {
  el.textContent = message || '';
}

function clearErrors() {
  showError(emailError, '');
  showError(passwordError, '');
  result.innerHTML = '';
}

// Form submit
form.addEventListener('submit', function(e){
  e.preventDefault();
  clearErrors();

  const emailVal = email.value;
  const pwdVal = password.value;

  let valid = true;

  if (!emailVal.trim()) {
    showError(emailError, 'Email is required.');
    valid = false;
  } else if (!validateEmail(emailVal)) {
    showError(emailError, 'Invalid email format.');
    valid = false;
  }

  const pwdCheck = validatePassword(pwdVal);
  if (!pwdVal) {
    showError(passwordError, 'Password is required.');
    valid = false;
  } else if (!pwdCheck.ok) {
    showError(passwordError, pwdCheck.msg);
    valid = false;
  }

  if (!valid) {
    if (emailError.textContent) email.focus();
    else password.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Checking...';

  setTimeout(()=>{
    submitBtn.disabled = false;
    submitBtn.textContent = 'Login';
    result.innerHTML = '<div class="success-banner" role="status">Login successful (simulation)</div>';
    form.reset();
  }, 800);
});

// Live validation
email.addEventListener('input', function(){
  if (!email.value) { showError(emailError, ''); return; }
  if (!validateEmail(email.value)) showError(emailError, 'Invalid email format.');
  else showError(emailError, '');
});

password.addEventListener('input', function(){
  if (!password.value) { showError(passwordError, ''); return; }
  const check = validatePassword(password.value);
  if (!check.ok) showError(passwordError, check.msg);
  else showError(passwordError, '');
});

// Toggle password
togglePass.addEventListener('click', function(){
  const isPass = password.getAttribute('type') === 'password';
  password.setAttribute('type', isPass ? 'text' : 'password');
  togglePass.textContent = isPass ? 'Hide' : 'Show';
  togglePass.setAttribute('aria-pressed', String(isPass));
});
