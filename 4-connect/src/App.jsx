import {StateProvider} from "./context/./StateContext.jsx";
import MainPage from "./components/MainPage.jsx";

function App() {

      return (
          <StateProvider>
              <MainPage/>
          </StateProvider>
  )
}

export default App
