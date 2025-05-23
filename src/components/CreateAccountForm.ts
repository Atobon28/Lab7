import { createUserAccount } from "../services/firebase/authentication-service";

class CreateAccountForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    const form = this.shadowRoot?.querySelector("form");
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const usernameField = this.shadowRoot?.querySelector("#username") as HTMLInputElement;
      const emailField = this.shadowRoot?.querySelector("#email") as HTMLInputElement;
      const passwordField = this.shadowRoot?.querySelector("#password") as HTMLInputElement;
      const confirmPasswordField = this.shadowRoot?.querySelector("#confirm-password") as HTMLInputElement;
      const errorDisplay = this.shadowRoot?.querySelector(".error-display");

      if (usernameField && emailField && passwordField && confirmPasswordField && errorDisplay) {
        const username = usernameField.value.trim();
        const email = emailField.value.trim();
        const password = passwordField.value.trim();
        const confirmPassword = confirmPasswordField.value.trim();

        if (!username || !email || !password || !confirmPassword) {
          errorDisplay.textContent = "Por favor, completa todos los campos 🐣";
          return;
        }

        if (password !== confirmPassword) {
          errorDisplay.textContent = "Las contraseñas no coinciden 🤔";
          return;
        }

        if (password.length < 6) {
          errorDisplay.textContent = "La contraseña debe tener al menos 6 caracteres 🔑";
          return;
        }

        const submitButton = this.shadowRoot?.querySelector("button[type='submit']") as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Creando cuenta... 🌟";
        }

        const result = await createUserAccount(email, password, username);

        if (result.success) {
          window.history.pushState({}, "", "/reminders");
          const event = new CustomEvent("navigate-to", {
            bubbles: true,
            composed: true,
            detail: { route: "/reminders" },
          });
          this.dispatchEvent(event);
        } else {
          errorDisplay.textContent = "Error al crear cuenta. El correo podría estar en uso 😅";

          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Crear Cuenta";
          }
        }
      }
    });

    const accessLink = this.shadowRoot?.querySelector(".access-link");
    accessLink?.addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState({}, "", "/access");
      const event = new CustomEvent("navigate-to", {
        bubbles: true,
        composed: true,
        detail: { route: "/access" },
      });
      this.dispatchEvent(event);
    });
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;600;700&display=swap');
        
        :host {
          display: block;
          font-family: 'Comic Neue', cursive;
          --chick-yellow: #FFF3CD;
          --soft-yellow: #FFEB9C;
          --warm-peach: #FFEAA7;
          --light-coral: #FFB3BA;
          --lavender-mist: #E6E6FA;
          --cream-white: #FFFEF7;
          --soft-gray: #8B8B8B;
          --cozy-orange: #FFD93D;
          --text-brown: #5D4E37;
          --border-radius: 20px;
          --soft-shadow: 0 10px 30px rgba(255, 235, 156, 0.3);
          --error-color: #FF6B6B;
        }
        
        .signup-container {
          max-width: 450px;
          margin: 0 auto;
          padding: 40px;
          background: var(--cream-white);
          border-radius: var(--border-radius);
          box-shadow: var(--soft-shadow);
          border: 3px solid var(--soft-yellow);
          position: relative;
        }
        
        .signup-container::before {
          content: '🌟';
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2.5rem;
          background: var(--cozy-orange);
          padding: 10px;
          border-radius: 50%;
          box-shadow: var(--soft-shadow);
        }
        
        h2 {
          text-align: center;
          color: var(--text-brown);
          margin-top: 20px;
          margin-bottom: 30px;
          font-size: 2rem;
          font-weight: 700;
        }
        
        .input-group {
          margin-bottom: 25px;
        }
        
        label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 15px;
          color: var(--text-brown);
        }
        
        input {
          width: 100%;
          padding: 15px 20px;
          border: 3px solid var(--lavender-mist);
          border-radius: 15px;
          font-family: 'Comic Neue', cursive;
          font-size: 15px;
          transition: all 0.3s ease;
          box-sizing: border-box;
          background: var(--cream-white);
          color: var(--text-brown);
        }
        
        input:focus {
          outline: none;
          border-color: var(--cozy-orange);
          box-shadow: 0 0 0 4px rgba(255, 217, 61, 0.2);
          background: #FFFFFE;
        }
        
        .cute-button {
          width: 100%;
          padding: 16px 35px;
          background: linear-gradient(45deg, var(--cozy-orange), var(--warm-peach));
          color: var(--text-brown);
          border: none;
          border-radius: 25px;
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(255, 235, 156, 0.3);
          font-family: 'Comic Neue', cursive;
        }
        
        .cute-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(255, 217, 61, 0.4);
        }
        
        .cute-button:disabled {
          background: var(--soft-gray);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .error-display {
          color: var(--error-color);
          font-size: 15px;
          margin-top: 20px;
          text-align: center;
          font-weight: 600;
        }
        
        .form-footer {
          margin-top: 25px;
          text-align: center;
          font-size: 15px;
          color: var(--text-brown);
        }
        
        .access-link {
          color: var(--cozy-orange);
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }
        
        .access-link:hover {
          text-decoration: underline;
        }
      </style>
      
      <div class="signup-container">
        <h2>Crear Nueva Cuenta 🐣</h2>
        
        <form>
          <div class="input-group">
            <label for="username">Tu nombre de usuario</label>
            <input type="text" id="username" required placeholder="Elige un nombre bonito">
          </div>
          
          <div class="input-group">
            <label for="email">Tu correo electrónico</label>
            <input type="email" id="email" required placeholder="ana@ejemplo.com">
          </div>
          
          <div class="input-group">
            <label for="password">Tu contraseña</label>
            <input type="password" id="password" required placeholder="Mínimo 6 caracteres">
          </div>
          
          <div class="input-group">
            <label for="confirm-password">Confirma tu contraseña</label>
            <input type="password" id="confirm-password" required placeholder="Repite tu contraseña">
          </div>
          
          <button type="submit" class="cute-button">Crear Cuenta</button>
          
          <div class="error-display"></div>
        </form>
        
        <div class="form-footer">
          ¿Ya tienes cuenta? <a class="access-link">Accede aquí 🌟</a>
        </div>
      </div>
    `;
  }
}

export default CreateAccountForm;