import Chat from "./pages/chat/Chat";
import { ThemeProvider } from "@emotion/react";
import ThemeOptions from "./components/ThemeOptions.js"

function App() {
  return (
    <ThemeProvider theme={ThemeOptions}>
      <Chat/>
    </ThemeProvider>
  );
}

export default App;
