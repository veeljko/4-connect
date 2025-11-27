import ConnectCell from "./ConnectCell.jsx";
import { useTableContext } from "../hooks/useTableContext.jsx";

function ConnectTable() {
    const { cells } = useTableContext();

    return (
        <table className="border-collapse border-2">
            <tbody>
            {[0, 1, 2, 3].map((r) => (
                <tr key={r}>
                    {[0, 1, 2, 3].map((c) => {
                        const cell = cells[r * 4 + c];
                        return (
                            <ConnectCell
                                key={c}
                                indRow={r}
                                indCol={c}
                                cell={cell}
                            />
                        );
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default ConnectTable;
