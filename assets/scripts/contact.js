document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");

    const originalButtonText = submitButton.textContent;

    // Désactivation du bouton pendant l'envoi
    submitButton.disabled = true;
    submitButton.textContent = "Envoi en cours...";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire.");
      }

      // Formulaire envoyé avec succès
      form.reset();

      submitButton.textContent = "Message envoyé !";

      // Retour au bouton normal après quelques secondes
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }, 3000);
    } catch (error) {
      console.error("Erreur Web3Forms :", error);

      submitButton.disabled = false;
      submitButton.textContent = "Réessayer";

      setTimeout(() => {
        submitButton.textContent = originalButtonText;
      }, 5000);
    }
  });
});
