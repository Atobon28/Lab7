import AnasAssistantApp from "./root/AnasAssistantApp";
import WelcomePage from "./pages/WelcomePage";
import AccessForm from "./components/AccessForm";
import CreateAccountForm from "./components/CreateAccountForm";
import ReminderCard from "./components/ReminderCard";
import ReminderForm from "./components/ReminderForm";
import RemindersList from "./components/RemindersList";
import NotFoundPage from "./pages/NotFoundPage";
import RemindersPage from "./pages/RemindersPage";

customElements.define("anas-assistant-app", AnasAssistantApp);
customElements.define("welcome-page", WelcomePage);
customElements.define("access-form", AccessForm);
customElements.define("create-account-form", CreateAccountForm);
customElements.define("reminder-card", ReminderCard);
customElements.define("reminder-form", ReminderForm);
customElements.define("reminders-list", RemindersList);
customElements.define("not-found-page", NotFoundPage);
customElements.define("reminders-page", RemindersPage);