import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [seeds, setSeeds] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [crops, setCrops] = useState([]);
  const [lowCount, setLowCount] = useState(0);

  const { user } = useAuth();

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function getRandomFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`https://agri-smart-backend.vercel.app/seeds/${user.email}`).then(
        (res) => res.json()
      ),
      fetch(
        `https://agri-smart-backend.vercel.app/equipments/${user.email}`
      ).then((res) => res.json()),
      fetch(`https://agri-smart-backend.vercel.app/crops/${user.email}`).then(
        (res) => res.json()
      ),
    ])
      .then(([seedsData, equipmentsData, cropsData]) => {
        setSeeds(seedsData);
        setEquipments(equipmentsData);
        setCrops(cropsData);
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
      <div className="space-y-4">
        <div className="border rounded-2xl p-2 flex-1">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Container Name</th>
                  <th>Number of Crops</th>
                  <th>Expected Yield</th>
                  <th>Bugs</th>
                  <th>Health</th>
                  <th>Soil Conditions</th>
                </tr>
              </thead>
              <tbody>
                {crops.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                    <td className="font-medium">{getRandomInt(3, 7)}</td>
                    <td className="font-medium text-xs">
                      {getRandomInt(0, 1) ? (
                        <span className="text-red-600">
                          DETECTED ({getRandomInt(1, 4)})
                        </span>
                      ) : (
                        <span className="text-green-600">NONE</span>
                      )}
                    </td>
                    <td className="font-medium text-xs">
                      {getRandomInt(0, 1) ? (
                        <span className="text-green-600">HEALTHY</span>
                      ) : (
                        <span className="text-red-600">
                          UNHEALTHY ({getRandomInt(1, 4)})
                        </span>
                      )}
                    </td>
                    <td className="font-medium text-xs">
                      {getRandomFloat(22, 28)}°C | {getRandomFloat(0, 100)} g/m³
                      | {getRandomInt(0, 14)} pH
                    </td>
                    <td className="font-medium text-xs">
                      ~ {getRandomInt(0, 5)} minutes ago
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
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
          <div className="border rounded-2xl p-2 flex-1">
            <h1 className="font-bold text-2xl text-center">
              Equipment Storage
            </h1>
            <div className="mt-2">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {equipments.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td className="font-medium text-xs">{item.quantity}</td>
                      <td className="font-medium text-xs">
                        {item.availability}
                      </td>
                      <td className="font-medium text-xs">
                        {item.loaned ? "LOANED" : "OWNED"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
