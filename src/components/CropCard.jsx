import { useState } from "react";
import { CiTempHigh } from "react-icons/ci";
import { IoWaterOutline } from "react-icons/io5";
import { toast } from "sonner";
import { FaPlantWilt } from "react-icons/fa6";
import { MdPestControl } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { BsBug } from "react-icons/bs";

const CropCard = ({ item, setReloadData }) => {
  const [showaddUI, setShowAddUI] = useState(false);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomFloat(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
  }

  const addCrop = (e) => {
    e.preventDefault();

    if (parseInt(e.target.number.value) <= 0) {
      toast.error("Crop number must be greater than zero");
      return;
    }

    const data = {
      name: e.target.name.value,
      number: parseInt(e.target.number.value),
    };

    fetch(`http://localhost:5000/crop/addcrop/${item._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Crop has been added successfully.");
          setReloadData(true);
        }
      });
  };

  const info = [];

  const plantStage = [
    [{ name: "Germination", color: "text-blue-600" }],
    [{ name: "Vegetative", color: "text-green-600" }],
    [{ name: "Flowering", color: "text-yellow-600" }],
    [{ name: "Fruiting", color: "text-orange-600" }],
    [{ name: "Maturation", color: "text-red-600" }],
    [{ name: "Harvesting", color: "text-purple-600" }],
  ];

  // Using a for loop to generate JSX elements
  for (let i = 0; i < item.number; i++) {
    const randomIndex = getRandomInt(0, 5);
    const hasPest = getRandomInt(0, 1);
    const hasLight = getRandomInt(0, 1);
    const moisture = getRandomFloat(50, 100);
    const temp = getRandomFloat(20, 30);

    info.push(
      <>
        <div className="grid grid-cols-3 gap-2 border rounded-2xl p-2 relative">
          {/* VIDEO FEED */}
          <img
            src="/plantgif.gif"
            className="object-cover w-full rounded-2xl h-full"
          />
          {/* STATS */}
          <div className="space-y-2 col-span-2">
            <div className="py-3 w-full px- rounded-xl border flex gap-6 justify-center">
              <div className="flex justify-center items-center py-4 gap-1 min-w-28">
                <CiTempHigh className="text-4xl text-red-500"></CiTempHigh>
                <span className="text-base font-medium">{temp} °C</span>
              </div>
              <div className="flex justify-center items-center py-4 gap-1 min-w-28">
                <IoWaterOutline className="text-3xl text-blue-500"></IoWaterOutline>
                <span className="text-base font-medium">{moisture} g/m³</span>
              </div>
              <h1 className="ml-2 text-xs flex items-center gap-1 min-w-28 font-medium justify-center">
                <span className="text-gray-500">
                  ~ {getRandomInt(0, 5)} minutes ago
                </span>
              </h1>
            </div>
            <div className="py-3 w-full px- rounded-xl border flex gap-6 justify-center">
              <div className="flex justify-center items-center py-4 gap-2  min-w-28">
                <FaPlantWilt
                  className={`text-3xl ${plantStage[randomIndex][0].color}`}
                ></FaPlantWilt>
                <span
                  className={`text-[11px] font-bold ${plantStage[randomIndex][0].color}`}
                >
                  {plantStage[randomIndex][0].name}
                </span>
              </div>
              <div className="flex justify-center items-center py-4 gap-2  min-w-28">
                <MdPestControl
                  className={`text-3xl ${
                    hasPest ? "text-red-500" : "text-green-500"
                  }`}
                ></MdPestControl>
                <span
                  className={`text-[11px] font-bold ${
                    hasPest ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {hasPest ? "Detected" : "None"}
                </span>
              </div>
              <div className="flex justify-center items-center py-4 gap-2  min-w-28">
                <FaLightbulb
                  className={`text-3xl text-yellow-400`}
                ></FaLightbulb>
                <span
                  className={`text-[11px] font-bold ${
                    hasLight ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {hasLight ? "Low" : "Optimum"}
                </span>
              </div>
            </div>
          </div>
          {/* ALERTS */}
          <div className="absolute -right-1 -top-2 flex gap-1">
            {moisture < 65 && (
              <div className="bg-red-500 p-1.5 rounded-full border-0">
                <IoWaterOutline className="text-white text-xl"></IoWaterOutline>
              </div>
            )}
            {temp < 22 && (
              <div className="bg-blue-300 p-1.5 rounded-full border-0">
                <CiTempHigh className="text-white text-2xl"></CiTempHigh>
              </div>
            )}
            {temp > 28 && (
              <div className="bg-red-500 p-1.5 rounded-full border-0">
                <CiTempHigh className="text-white text-2xl"></CiTempHigh>
              </div>
            )}
            {hasPest === 1 && (
              <div className="bg-red-500 p-1.5 rounded-full border-0">
                <BsBug className="text-white text-xl"></BsBug>
              </div>
            )}
            {hasLight === 1 && (
              <div className="bg-red-500 p-1.5 rounded-full border-0">
                <FaLightbulb className="text-white text-xl"></FaLightbulb>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="border rounded-xl p-3" key={item._id}>
        <div className="flex items-center gap-2">
          <span className="bg-secondary text-white p-2 rounded-xl font-bold">
            {item.name}
          </span>
          <span className="bg-primary text-primary bg-opacity-30 p-2 rounded-xl font-bold">
            {item.type}
          </span>
          <span className="bg-yellow-700 text-yellow-700 bg-opacity-30 p-2 rounded-xl font-bold">
            {item?.crop_name}
          </span>
        </div>
        <hr className="my-2" />
        {item.isEmpty ? (
          <>
            {!showaddUI ? (
              <>
                <div className="flex justify-center items-center py-5">
                  <button
                    onClick={() => {
                      setShowAddUI(!showaddUI);
                    }}
                    className="btn bg-primary hover:bg-primary border-none text-white"
                  >
                    Add Crop
                  </button>
                </div>
              </>
            ) : (
              <>
                <form
                  className="space-y-4 max-w-sm mx-auto pt-5"
                  onSubmit={addCrop}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Crop Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Crop Name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Number of Crops
                      </label>
                      <input
                        type="number"
                        name="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Number of crops"
                        required
                      />
                    </div>
                  </div>
                  <button className="btn w-full bg-primary text-white hover:bg-primary">
                    Add
                  </button>
                </form>
                <div className="flex justify-center items-center mt-2 max-w-sm mx-auto pb-5">
                  <button
                    onClick={() => {
                      setShowAddUI(!showaddUI);
                    }}
                    className="btn bg-red-500 hover:bg-red-600 border-none text-white w-full"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">{info}</div>
          </>
        )}
      </div>
    </>
  );
};

export default CropCard;
