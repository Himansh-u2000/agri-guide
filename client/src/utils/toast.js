import "../styles/Toast.css"; // Add your own styles here

const toastContainer = document.createElement("div");
toastContainer.id = "toast-container";
document.body.appendChild(toastContainer);

const showToast = (message, type = "success") => {
  const toastId = `toast-${Date.now()}`;

  const removeToast = () => {
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
      toastElement.classList.add("toast-hide");
      setTimeout(() => {
        toastElement.remove();
      }, 300); // Matches the hide animation duration
    }
  };

  const toastElement = document.createElement("div");
  toastElement.id = toastId;
  toastElement.className = `toast toast-${type}`;
  toastElement.innerHTML = `
    <p>${message}</p>
  `;

  // Automatically remove the toast after 3 seconds
  setTimeout(removeToast, 3000);

  toastElement.addEventListener("click", removeToast); // Close toast on click
  toastContainer.appendChild(toastElement);
};

const toast = {
  success: (message) => showToast(message, "success"),
  error: (message) => showToast(message, "error"),
  warning: (message) => showToast(message, "warning"),
  info: (message) => showToast(message, "info"),
};

export default toast;
