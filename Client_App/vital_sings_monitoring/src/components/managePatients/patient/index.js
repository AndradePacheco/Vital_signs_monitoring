import { useEffect, useState } from "react";
import socket from "../../socket/socket";

function Patient({ patientId }) {
    const [data, setData] = useState({});

    useEffect(() => {
        socket.emit('join', patientId);
        socket.on('dados', (dados) => {
            setData((prevData) => ({ ...prevData, [patientId]: dados}))
            console.log(dados);
        });

        return () => {
            socket.off('dados')
        };
    }, [patientId])

    const patientData = data[patientId] || {};

    return (
        <>
            <td>
               {patientData.id === patientId ? patientData["heart-rate"] : ""} <span className='patientsMeasure'>BPM</span>
            </td>
            <td>
            {patientData.id === patientId ? patientData.oxygenation : ""}<span className='patientsMeasure'>%</span>
            </td>
            <td>
            {patientData.id === patientId ? patientData.oxygenation : ""}<span className='patientsMeasure'>º</span>
            </td>
        </>
    )
}

export default Patient;