class AnasAssistantApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupNavigation();

    this.addEventListener("navigate-to", ((e: CustomEvent) => {
      if (e.detail && e.detail.route) {
        window.history.pushState({}, "", e.detail.route);
        this.handleNavigationChange();
      }
    }) as EventListener);
  }

  setupNavigation() {
    this.handleNavigationChange();
    window.addEventListener("popstate", () => this.handleNavigationChange());

    this.shadowRoot?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.hasAttribute("href")) {
        e.preventDefault();
        const href = target.getAttribute("href");
        if (href) {
          window.history.pushState({}, "", href);
          this.handleNavigationChange();
        }
      }
    });
  }

  handleNavigationChange() {
    if (!this.shadowRoot) return;
    const route = window.location.pathname;
    console.log("Navegando a:", route);
    const mainContent = this.shadowRoot.querySelector("#main-content");
    if (!mainContent) return;
    mainContent.innerHTML = "";

    switch (route) {
      case "/":
        mainContent.innerHTML = `<welcome-page></welcome-page>`;
        break;
      case "/access":
        mainContent.innerHTML = `<access-form></access-form>`;
        break;
      case "/signup":
        mainContent.innerHTML = `<create-account-form></create-account-form>`;
        break;
      case "/reminders":
        mainContent.innerHTML = `<reminders-page></reminders-page>`;
        break;
      default:
        mainContent.innerHTML = `<not-found-page></not-found-page>`;
        break;
    }
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
          --gentle-green: #D4F4DD;
          --cozy-orange: #FFD93D;
          --border-radius: 15px;
          --soft-shadow: 0 8px 25px rgba(255, 235, 156, 0.3);
          color: #5D4E37;
          background: linear-gradient(135deg, var(--chick-yellow) 0%, var(--cream-white) 100%);
          margin: 0;
          padding: 0;
          min-height: 100vh;
        }
        
        * {
          box-sizing: border-box;
        }
        
        .assistant-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .content-area {
          flex: 1;
          padding: 25px;
        }
        
        #main-content {
          padding: 20px;
        }
      </style>
      
      <div class="assistant-container">
        <div class="content-area">
          <main id="main-content">
          </main>
        </div>
      </div>
    `;
  }
}

export default AnasAssistantApp;