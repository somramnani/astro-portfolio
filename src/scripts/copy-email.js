const copyWithFallback = (value) => {
  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.append(textArea);
  textArea.select();
  const copied = document.execCommand("copy");
  textArea.remove();
  return copied;
};

const copyEmail = async (email) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(email);
      return true;
    } catch {
      return copyWithFallback(email);
    }
  }

  return copyWithFallback(email);
};

const status = document.querySelector("[data-email-copy-status]");
let statusTimeout;
let activeButtonTimeout;

document.querySelectorAll("[data-copy-email]").forEach((button) => {
  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail;
    if (!email) return;

    const defaultLabel = button.dataset.defaultLabel ?? "Copy email address";
    const successLabel = button.dataset.successLabel ?? "Copied!";
    const visibleLabel = button.querySelector("[data-copy-email-label]");

    window.clearTimeout(activeButtonTimeout);
    document.querySelectorAll("[data-copy-email]").forEach((copyButton) => {
      const copyButtonLabel = copyButton.querySelector("[data-copy-email-label]");
      const copyButtonDefaultLabel = copyButton.dataset.defaultLabel ?? "Copy email address";
      if (copyButtonLabel) {
        copyButtonLabel.textContent = copyButtonDefaultLabel;
      } else {
        copyButton.setAttribute("aria-label", copyButtonDefaultLabel);
        copyButton.setAttribute("title", copyButtonDefaultLabel);
      }
    });

    try {
      const copied = await copyEmail(email);
      if (!copied) throw new Error("Copy command was unavailable.");

      if (visibleLabel) {
        visibleLabel.textContent = successLabel;
      } else {
        button.setAttribute("aria-label", successLabel);
        button.setAttribute("title", successLabel);
      }
      if (status) status.textContent = "Email copied to your clipboard.";
    } catch {
      if (status) status.textContent = `Couldn’t copy automatically. My email is ${email}.`;
    }

    status?.classList.add("email-copy-toast-visible");
    window.clearTimeout(statusTimeout);
    activeButtonTimeout = window.setTimeout(() => {
      if (visibleLabel) {
        visibleLabel.textContent = defaultLabel;
      } else {
        button.setAttribute("aria-label", defaultLabel);
        button.setAttribute("title", defaultLabel);
      }
    }, 2400);
    statusTimeout = window.setTimeout(() => {
      status?.classList.remove("email-copy-toast-visible");
    }, 2400);
  });
});
