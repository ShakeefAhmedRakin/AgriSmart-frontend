import { useEffect, useState } from "react"; // Import useState
import useAuth from "../hooks/useAuth";

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [seeds, setSeeds] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [lowCount, setLowCount] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:5000/seeds/${user.email}`).then((res) =>
        res.json()
      ),
      fetch(`http://localhost:5000/equipments/${user.email}`).then((res) =>
        res.json()
      ),
    ])
      .then(([seedsData, equipmentsData]) => {
        setSeeds(seedsData);
        setEquipments(equipmentsData);
        setLowCount(
          seedsData.filter((item) => item.volume / item.capacity < 0.3).length
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-lg text-black"></span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 text-white font-heading">
        <div className="bg-[#D45052] py-10 flex justify-around items-center rounded-lg shadow-xl">
          <div className="text-right">
            <p className=" text-center text-3xl font-bold">{lowCount}</p>{" "}
            <p>Low Capacity Seeds</p>
          </div>
        </div>
        <div className="bg-[#02BCE9] py-10 flex justify-around items-center rounded-lg shadow-xl">
          <div className="text-right">
            <p className=" text-center text-3xl font-bold">
              {equipments.filter((item) => item.loaned).length}
            </p>
            <p>Loaned Equipments</p>
          </div>
        </div>
        <div className="bg-[#00A157] py-10 flex justify-around items-center rounded-lg shadow-xl">
          <div className="text-right">
            <p className=" text-center text-3xl font-bold">
              {
                equipments.filter((item) => item.availability === "Maintenance")
                  .length
              }
            </p>{" "}
            <p>Equipments Under Maintenance</p>
          </div>
        </div>
        <div className="bg-blue-500 py-10 flex justify-around items-center rounded-lg shadow-xl">
          <div className="text-right">
            <p className=" text-center text-3xl font-bold">4</p>
            <p>Crops Ready For Harvest</p>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between gap-4">
        <div className="border rounded-2xl p-2 flex-1"></div>
        <div className="border rounded-2xl p-2 flex-1">
          <h1 className="font-bold text-2xl text-center">Seed Storage</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            {seeds.map((item) => (
              <div key={item.id}>
                <hr className="my-2" />
                <div className="ml-1 flex flex-col lg:flex-row items-center gap-2 text-sm whitespace-nowrap">
                  <h1 className="font-bold">{item.name}</h1>
                  <h1>Current Volume: {item.volume} kg</h1>
                  <h1>Max Capacity: {item.capacity} kg</h1>
                </div>
                <progress
                  className={`progress ${
                    item.volume / item.capacity < 0.3 ? "progress-error" : ""
                  } h-3 mt-2 progress-success w-[100%]`}
                  value={item.volume}
                  max={item.capacity}
                ></progress>

                <hr className="my-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
