class ReminderForm extends HTMLElement {
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
    form?.addEventListener("submit", (e) => {
      e.preventDefault();

      const titleField = this.shadowRoot?.querySelector("#reminder-title") as HTMLInputElement;
      const descriptionField = this.shadowRoot?.querySelector("#reminder-description") as HTMLTextAreaElement;

      if (titleField && descriptionField) {
        const reminderData = {
          title: titleField.value.trim(),
          description: descriptionField.value.trim(),
        };

        if (reminderData.title) {
          const event = new CustomEvent("reminder-created", {
            bubbles: true,
            composed: true,
            detail: reminderData,
          });

          this.dispatchEvent(event);
          form.reset();
        }
      }
    });
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
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
          --border-radius: 15px;
        }
        
        form {
          padding: 30px;
          background: var(--cream-white);
          border-radius: var(--border-radius);
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
        
        input, textarea {
          width: 100%;
          padding: 15px 20px;
          border: 3px solid var(--lavender-mist);
          border-radius: var(--border-radius);
          font-family: 'Comic Neue', cursive;
          font-size: 15px;
          transition: all 0.3s ease;
          box-sizing: border-box;
          background: var(--cream-white);
          color: var(--text-brown);
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--cozy-orange);
          box-shadow: 0 0 0 4px rgba(255, 217, 61, 0.2);
          background: #FFFFFE;
        }
        
        textarea {
          min-height: 120px;
          resize: vertical;
          line-height: 1.6;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 30px;
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
        
        .cute-button:active {
          transform: translateY(0);
        }
        
        ::placeholder {
          color: var(--soft-gray);
          opacity: 0.8;
        }
      </style>
      
      <form>
        <div class="input-group">
          <label for="reminder-title">Título del recordatorio</label>
          <input type="text" id="reminder-title" required placeholder="¿Qué quieres recordar? 🌟">
        </div>
        
        <div class="input-group">
          <label for="reminder-description">Detalles</label>
          <textarea id="reminder-description" placeholder="Describe los detalles de tu recordatorio... 🐣"></textarea>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="cute-button">
            Crear Recordatorio ✨
          </button>
        </div>
      </form>
    `;
  }
}

export default ReminderForm;