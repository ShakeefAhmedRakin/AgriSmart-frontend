import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { CiTempHigh } from "react-icons/ci";
import { IoWaterOutline } from "react-icons/io5";
import { IoIosWater } from "react-icons/io";
import { toast } from "sonner";

const Soils = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [soils, setSoils] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/soils/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setSoils(data);
        setLoading(false);
        setReloadData(false);
      });
  }, [user, reloadData]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
  }

  // ADD SOIL
  const addSoil = (e) => {
    e.preventDefault();

    // Accessing form elements
    const form = e.target;
    const name = form.elements["name"].value;
    const type = form.elements["type"].value;

    const data = {
      email: user.email,
      name: name,
      type: type,
      sensorData: {
        moistureLevel: getRandomInt(0, 100),
        temperature: getRandomFloat(10, 40),
        pHLevel: getRandomFloat(0, 14),
        nutrientLevels: {
          nitrogen: getRandomInt(10, 30),
          phosphorus: getRandomInt(20, 30),
          potassium: getRandomInt(15, 30),
        },
      },
    };

    fetch("http://localhost:5000/soils", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Seed Added!");
        setReloadData(true);
        document.getElementById("addsoilmodal").close();
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {/* CONTAINER */}
      {loading ? (
        <>
          <div className="h-screen flex items-center justify-center">
            <span className="loading loading-bars loading-xl text-black"></span>
          </div>
        </>
      ) : (
        <>
          {soils.length > 0 ? (
            <>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    className="btn bg-primary hover:bg-primary border-none text-white"
                    onClick={() =>
                      document.getElementById("addsoilmodal").showModal()
                    }
                  >
                    Add Soil
                  </button>
                </div>
                <hr className="my-2" />
                {/* DATA */}
                <div className="space-y-2 gap-4">
                  {soils.map((item) => (
                    <div className="border rounded-xl p-3" key={item._id}>
                      <div className="flex items-center gap-2">
                        <span className="bg-secondary text-white p-2 rounded-xl font-bold">
                          {item.name}
                        </span>
                        <span className="bg-primary text-primary bg-opacity-30 p-2 rounded-xl font-bold">
                          {item.type}
                        </span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex gap-2 flex-wrap my-2">
                        <div className="py-5 w-full max-w-xs px-8 rounded-xl border">
                          <h1 className="text-xl flex items-center gap-1 font-medium">
                            Temperature
                            <span className="text-gray-500 text-sm">
                              ~ 5 minutes ago
                            </span>
                          </h1>
                          <div className="flex justify-center items-center py-8">
                            <CiTempHigh className="text-6xl text-red-500"></CiTempHigh>
                            <span className="text-3xl font-medium">
                              {item.sensorData.temperature} °C
                            </span>
                          </div>
                        </div>
                        <div className="py-5 w-full max-w-xs px-8 rounded-xl border">
                          <h1 className="text-xl flex items-center gap-1 font-medium">
                            Moisture
                            <span className="text-gray-500 text-sm">
                              ~ 5 minutes ago
                            </span>
                          </h1>
                          <div className="flex justify-center items-center py-8">
                            <IoWaterOutline className="text-6xl text-blue-500"></IoWaterOutline>
                            <span className="text-3xl font-medium">
                              {item.sensorData.moistureLevel} g/m³
                            </span>
                          </div>
                        </div>
                        <div className="py-5 w-full max-w-xs px-8 rounded-xl border">
                          <h1 className="text-xl flex items-center gap-1 font-medium">
                            pH Level
                            <span className="text-gray-500 text-sm">
                              ~ 5 minutes ago
                            </span>
                          </h1>
                          <div className="flex justify-center items-center py-8">
                            <IoIosWater className="text-6xl text-orange-500"></IoIosWater>
                            <span className="text-3xl font-medium">
                              {item.sensorData.pHLevel} pH
                            </span>
                          </div>
                        </div>
                        <div className="py-5 px-8 rounded-xl border">
                          <h1 className="text-xl flex items-center gap-1 font-medium">
                            Nutrient Level
                            <span className="text-gray-500 text-sm">
                              ~ 5 minutes ago
                            </span>
                          </h1>
                          <div className="flex gap-5 flex-wrap">
                            <div className="flex justify-center items-center py-8 flex-col gap-2">
                              <span className="text-2xl font-bold text-gray-600">
                                Nitrogen
                              </span>
                              <span className="text-xl font-medium">
                                {item.sensorData.nutrientLevels.nitrogen} ppm
                              </span>
                            </div>
                            <div className="flex justify-center items-center py-8 flex-col gap-2">
                              <span className="text-2xl font-bold text-gray-600">
                                Phosphorus
                              </span>
                              <span className="text-xl font-medium">
                                {item.sensorData.nutrientLevels.phosphorus} ppm
                              </span>
                            </div>
                            <div className="flex justify-center items-center py-8 flex-col gap-2">
                              <span className="text-2xl font-bold text-gray-600">
                                Potassium
                              </span>
                              <span className="text-xl font-medium">
                                {item.sensorData.nutrientLevels.potassium} ppm
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="h-screen flex flex-col gap-4 items-center justify-center">
                <h1 className="text-2xl">No Seeds Added Yet!</h1>
                <button
                  className="btn bg-primary hover:bg-primary border-none text-white"
                  onClick={() =>
                    document.getElementById("addsoilmodal").showModal()
                  }
                >
                  Add Soil
                </button>
              </div>
            </>
          )}
        </>
      )}
      <dialog id="addsoilmodal" className={`modal`}>
        <div className="modal-box  overflow-y-scroll">
          <form className="space-y-4" onSubmit={addSoil}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Container Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Container Name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Soil Type
                </label>
                <input
                  type="text"
                  name="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Soil Type"
                  required
                />
              </div>
            </div>

            <button className="btn w-full bg-primary text-white hover:bg-primary">
              Add
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Soils;
