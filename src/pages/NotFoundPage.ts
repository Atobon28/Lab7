class NotFoundPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
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
          --border-radius: 20px;
          --soft-shadow: 0 10px 30px rgba(255, 235, 156, 0.3);
        }
        
        .error-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 80vh;
          text-align: center;
          padding: 0 25px;
        }
        
        .error-container {
          background: var(--cream-white);
          border-radius: var(--border-radius);
          padding: 50px 40px;
          box-shadow: var(--soft-shadow);
          border: 3px solid var(--soft-yellow);
          max-width: 600px;
        }
        
        h1 {
          font-size: 6rem;
          color: var(--cozy-orange);
          margin: 0;
          line-height: 1;
          font-weight: 700;
        }
        
        h2 {
          font-size: 2.2rem;
          color: var(--text-brown);
          margin: 20px 0 30px;
          font-weight: 600;
        }
        
        p {
          color: var(--soft-gray);
          margin-bottom: 35px;
          font-size: 1.2rem;
          line-height: 1.6;
        }
        
        .cute-button {
          font-family: 'Comic Neue', cursive;
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
        }
        
        .cute-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(255, 217, 61, 0.4);
        }
      </style>
      
      <div class="error-page">
        <div class="error-container">
          <h1>404</h1>
          <h2>¡Oops! Página no encontrada 🐣</h2>
          <p>Parece que esta página se fue a pasear. ¡Volvamos al inicio donde Ana te está esperando!</p>
          <button id="home-button" class="cute-button">Volver al Inicio 🌟</button>
        </div>
      </div>
    `;
    
    const homeButton = this.shadowRoot.querySelector("#home-button");
    homeButton?.addEventListener("click", () => {
      const event = new CustomEvent("navigate-to", {
        bubbles: true,
        composed: true,
        detail: { route: "/" },
      });
      this.dispatchEvent(event);
    });
  }
}

export default NotFoundPage;