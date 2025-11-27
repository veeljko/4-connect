import ConnectTable from "./components/ConnectTable.jsx";
import {TableProvider} from "./context/TableContext.jsx";

function App() {


  return (
      <TableProvider >
        <div className="flex justify-center h-screen items-center">
            <ConnectTable/>
        </div>
      </TableProvider>
  )
}

export default App
