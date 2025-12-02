import FConnectCell from "./FConnectCell.jsx"

function FConnectTable({boardView, setBoardView}) {


    return (
        <table className="border-collapse border-2 border-t-0 bg-blue-500">
            <tbody>
            {[0, 1, 2, 3, 4, 5].map((r) => (
                <tr key={r}>
                    {[0, 1, 2, 3, 4, 5, 6].map((c) => {
                        return (<>
                            <FConnectCell indRow={r} indCol={c} boardView={boardView} setBoardView={setBoardView}/>
                        </>);
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default FConnectTable;
