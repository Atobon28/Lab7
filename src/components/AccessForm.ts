import { authenticateUser } from "../services/firebase/authentication-service";

class AccessForm extends HTMLElement {
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

      const emailField = this.shadowRoot?.querySelector("#email") as HTMLInputElement;
      const passwordField = this.shadowRoot?.querySelector("#password") as HTMLInputElement;
      const errorDisplay = this.shadowRoot?.querySelector(".error-display");

      if (emailField && passwordField && errorDisplay) {
        const email = emailField.value.trim();
        const password = passwordField.value.trim();

        if (!email || !password) {
          errorDisplay.textContent = "Por favor, completa todos los campos 🐣";
          return;
        }

        const submitButton = this.shadowRoot?.querySelector("button[type='submit']") as HTMLButtonElement;
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Accediendo... 🌟";
        }

        const result = await authenticateUser(email, password);

        if (result.success) {
          window.history.pushState({}, "", "/reminders");
          const event = new CustomEvent("navigate-to", {
            bubbles: true,
            composed: true,
            detail: { route: "/reminders" },
          });
          this.dispatchEvent(event);
        } else {
          errorDisplay.textContent = "Error al acceder. Verifica tus datos 🤔";

          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Acceder";
          }
        }
      }
    });

    const signupLink = this.shadowRoot?.querySelector(".signup-link");
    signupLink?.addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState({}, "", "/signup");
      const event = new CustomEvent("navigate-to", {
        bubbles: true,
        composed: true,
        detail: { route: "/signup" },
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
          --gentle-green: #D4F4DD;
          --cozy-orange: #FFD93D;
          --text-brown: #5D4E37;
          --border-radius: 20px;
          --soft-shadow: 0 10px 30px rgba(255, 235, 156, 0.3);
          --error-color: #FF6B6B;
        }
        
        .access-container {
          max-width: 450px;
          margin: 0 auto;
          padding: 40px;
          background: var(--cream-white);
          border-radius: var(--border-radius);
          box-shadow: var(--soft-shadow);
          border: 3px solid var(--soft-yellow);
          position: relative;
        }
        
        .access-container::before {
          content: '🔑';
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
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
          box-shadow: 0 6px 20px rgba(255, 235, 156, 0.3);
          font-family: 'Comic Neue', cursive;
        }
        
        .cute-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(255, 217, 61, 0.4);
        }
        
        .cute-button:active {
          transform: translateY(0);
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
        
        .signup-link {
          color: var(--cozy-orange);
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
        }
        
        .signup-link:hover {
          text-decoration: underline;
        }
      </style>
      
      <div class="access-container">
        <h2>Acceder a mi Asistente 🐣</h2>
        
        <form>
          <div class="input-group">
            <label for="email">Tu correo electrónico</label>
            <input type="email" id="email" required placeholder="ana@ejemplo.com">
          </div>
          
          <div class="input-group">
            <label for="password">Tu contraseña</label>
            <input type="password" id="password" required placeholder="Tu contraseña secreta">
          </div>
          
          <button type="submit" class="cute-button">Acceder</button>
          
          <div class="error-display"></div>
        </form>
        
        <div class="form-footer">
          ¿No tienes cuenta? <a class="signup-link">Créala aquí 🌟</a>
        </div>
      </div>
    `;
  }
}

export default AccessForm;