import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const History = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [allRecords, setAllRecords] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch(`https://bitsandbuild.vercel.app/history/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setAllRecords(data);
        setLoading(false);
      });
  }, [user]);

  const filteredRecords = allRecords.filter((record) => record.itemId === id);
  filteredRecords.sort((a, b) => {
    const timestampA = new Date(`${a.timestamp.date} ${a.timestamp.time}`);
    const timestampB = new Date(`${b.timestamp.date} ${b.timestamp.time}`);
    return timestampB - timestampA;
  });

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-lg text-black"></span>
      </div>
    );
  }

  if (filteredRecords.length <= 0) {
    return (
      <div className="flex justify-center h-screen items-center text-2xl font-bold text-red-500">{`No Records`}</div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th className="text-lg">Resource</th>
              <th className="text-lg">Date</th>
              <th className="text-lg">Time</th>
              <th className="text-lg">Type</th>
              <th className="text-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record._id}>
                <td className="text-lg">{record.name}</td>
                <td className="text-lg">{record.timestamp.date}</td>
                <td className="text-lg">{record.timestamp.time}</td>
                <td
                  className={`font-medium text-lg ${
                    record.type === "increase"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {record.type === "increase" ? "Increased" : "Decreased"}
                </td>
                <td className="font-bold text-lg">{record.amount} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default History;
