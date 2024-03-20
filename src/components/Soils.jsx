import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { CiTempHigh } from "react-icons/ci";
import { IoWaterOutline } from "react-icons/io5";
import { IoIosWater } from "react-icons/io";
import { toast } from "sonner";
import { Tooltip } from "react-tooltip";

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
        fetch("http://localhost:5000/crops", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            isEmpty: true,
            name: name,
            type: type,
          }),
        });
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
                              ~ {getRandomInt(0, 5)} minutes ago
                            </span>
                          </h1>
                          <div
                            className="flex justify-center items-center py-8"
                            data-tooltip-id="temp-soil-tip"
                            data-tooltip-html="Monitor soil temperature, aiming for an ideal range suitable for plant growth. Warm-season crops prefer warmer soil, while cool-season crops thrive in slightly cooler soil. Consider using mulch to regulate soil temperature and protect roots from extreme fluctuations.</p>"
                          >
                            <CiTempHigh className="text-6xl text-red-500"></CiTempHigh>
                            <span className="text-3xl font-medium">
                              {item.sensorData.temperature} °C
                            </span>
                            <Tooltip id="temp-soil-tip" className="max-w-xs" />
                          </div>
                        </div>
                        <div className="py-5 w-full max-w-xs px-8 rounded-xl border">
                          <h1 className="text-xl flex items-center gap-1 font-medium">
                            Moisture
                            <span className="text-gray-500 text-sm">
                              ~ {getRandomInt(0, 5)} minutes ago
                            </span>
                          </h1>
                          <div
                            className="flex justify-center items-center py-8"
                            data-tooltip-id="moisture-soil-tip"
                            data-tooltip-html="Ensure the soil maintains adequate moisture levels, as it's crucial for plant health. Check soil moisture regularly by inserting your finger into the soil; if it feels dry about an inch below the surface, it's time to water. Avoid overwatering, which can lead to root rot, and under-watering, which can stress plants. Consider using mulch to retain moisture and reduce evaporation.</p>"
                          >
                            <IoWaterOutline className="text-6xl text-blue-500"></IoWaterOutline>
                            <span className="text-3xl font-medium">
                              {item.sensorData.moistureLevel} g/m³
                            </span>
                            <Tooltip
                              id="moisture-soil-tip"
                              className="max-w-xs"
                            />
                          </div>
                        </div>
                        <div className="py-5 w-full max-w-xs px-8 rounded-xl border">
                          <h1 className="text-xl flex items-center gap-1 font-medium">
                            pH Level
                            <span className="text-gray-500 text-sm">
                              ~ {getRandomInt(0, 5)} minutes ago
                            </span>
                          </h1>
                          <div
                            className="flex justify-center items-center py-8"
                            data-tooltip-id="ph-soil-tip"
                            data-tooltip-html="Monitor and adjust soil pH to ensure optimal nutrient availability for plants. To raise pH (make soil less acidic), add lime. To lower pH (make soil more acidic), add sulfur or acidic compost. Regularly check soil pH to maintain a healthy growing environment for your plants.</p>"
                          >
                            <IoIosWater className="text-6xl text-orange-500"></IoIosWater>
                            <span className="text-3xl font-medium">
                              {item.sensorData.pHLevel} pH
                            </span>
                            <Tooltip id="ph-soil-tip" className="max-w-xs" />
                          </div>
                        </div>
                        <div className="py-5 px-8 rounded-xl border">
                          <h1 className="text-xl flex items-center gap-1 font-medium">
                            Nutrient Level
                            <span className="text-gray-500 text-sm">
                              ~ {getRandomInt(0, 5)} minutes ago
                            </span>
                          </h1>
                          <div
                            className="flex gap-5 flex-wrap"
                            data-tooltip-id="nut-soil-tip"
                            data-tooltip-html="Ensure your soil has adequate levels of nutrients. Nitrogen promotes leafy growth and overall plant vigor, phosphorus supports root development, flowering, and fruiting, while potassium aids in disease resistance and overall plant health. Amend soil as needed using organic fertilizers or compost rich in these essential nutrients.</p>"
                          >
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
                            <Tooltip id="nut-soil-tip" className="max-w-xs" />
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
