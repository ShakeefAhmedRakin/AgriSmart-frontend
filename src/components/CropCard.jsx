import { useState } from "react";
import { CiTempHigh } from "react-icons/ci";
import { IoWaterOutline } from "react-icons/io5";
import { toast } from "sonner";
import { FaPlantWilt } from "react-icons/fa6";
import { MdPestControl } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { BsBug } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { GiKiwiFruit } from "react-icons/gi";
import { IoIosLeaf } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";

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

    fetch(`https://agri-smart-backend.vercel.app/crop/addcrop/${item._id}`, {
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
        } else {
          toast.error("Error Occurred!");
        }
      });
  };

  const info = [];

  const plantStage = [
    [
      {
        name: "Germination",
        color: "text-blue-600",
        tooltip:
          "<p><strong>Germination:</strong> The stage where the seed sprouts. Keep the soil consistently moist but not waterlogged. Provide warmth and indirect sunlight.</p>",
      },
    ],
    [
      {
        name: "Vegetative",
        color: "text-green-600",
        tooltip:
          "<p><strong>Vegetative:</strong> Focus on providing ample water and nutrients. Ensure the plant receives plenty of sunlight. Watch out for pests and diseases.</p>",
      },
    ],
    [
      {
        name: "Flowering",
        color: "text-yellow-600",
        tooltip:
          "<p><strong>Flowering:</strong> Support the plant's growth with stakes or trellises if necessary. Ensure consistent watering and provide a balanced fertilizer to promote flower development.</p>",
      },
    ],
    [
      {
        name: "Fruiting",
        color: "text-orange-600",
        tooltip:
          "<p><strong>Fruiting:</strong> Continue regular watering and fertilization. Monitor the plant for pests and diseases, especially those that target fruits. Provide support for heavy fruiting.</p>",
      },
    ],
    [
      {
        name: "Maturation",
        color: "text-red-600",
        tooltip:
          "<p><strong>Maturation:</strong> Reduce watering slightly to prevent fruit splitting. Monitor ripeness indicators such as color and firmness. Harvest when fruits are fully mature.</p>",
      },
    ],
    [
      {
        name: "Harvesting",
        color: "text-purple-600",
        tooltip:
          "<p><strong>Harvesting:</strong> Harvest fruits when they are fully ripe. Use appropriate tools to avoid damage to the plant. Store harvested produce properly to maintain freshness.</p>",
      },
    ],
  ];

  // Using a for loop to generate JSX elements
  for (let i = 0; i < item.number; i++) {
    const randomIndex = getRandomInt(0, 5);
    const hasPest = getRandomInt(0, 1);
    const moisture = getRandomFloat(50, 100);
    const temp = getRandomFloat(20, 30);
    const isHealthy = getRandomInt(0, 1);

    info.push(
      <>
        <div className="space-y-2 border rounded-2xl p-2 relative">
          {/* VIDEO FEED */}
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <img
                src={`/` + getRandomInt(1, 5).toString() + ".PNG"}
                className="object-cover rounded-xl h-[300px] w-full"
              />
              <div className="absolute bottom-2 right-2 badge border-none bg-red-600 text-white">
                {getRandomInt(0, 2)}:{getRandomInt(0, 5)}
                {getRandomInt(0, 5)}
              </div>
              <div className="absolute top-2 left-2 badge border-none bg-black text-white">
                CROP CAM
              </div>
            </div>
            <div className="relative">
              <img
                src={`/leaf` + getRandomInt(1, 4).toString() + ".PNG"}
                className="object-cover rounded-xl h-[300px] w-full"
              />
              <div className="absolute bottom-2 right-2 badge border-none bg-red-600 text-white">
                {getRandomInt(1, 5)}:{getRandomInt(0, 5)}
                {getRandomInt(0, 5)}
              </div>
              <div className="absolute top-2 left-2 badge border-none bg-black text-white">
                LEAF CAM
              </div>
            </div>
          </div>
          <hr />
          {/* STATS */}
          <div className="space-y-2 relative">
            <div className="py-3 w-full px- rounded-xl flex gap-6 justify-center">
              <div
                className="flex justify-center items-center py-4 gap-1 min-w-28"
                data-tooltip-id="temp-tip"
                data-tooltip-html="Maintain optimal temperatures for plant growth. Use shade cloth or mulch to protect plants from extreme heat. Monitor temperature fluctuations, as sudden drops can harm tender plants.</p>"
              >
                <CiTempHigh className="text-4xl text-red-500"></CiTempHigh>
                <span className="text-base font-medium">{temp} °C</span>
                <Tooltip id="temp-tip" className="max-w-xs" />
              </div>
              <div
                className="flex justify-center items-center py-4 gap-1 min-w-28"
                data-tooltip-id="moisture-tip"
                data-tooltip-html="Ensure the soil remains consistently moist, but not waterlogged. Stick your finger into the soil; if it feels dry at a depth of about an inch, it's time to water. Overwatering can lead to root rot, while underwatering can stress the plant.</p>"
              >
                <IoWaterOutline className="text-3xl text-blue-500"></IoWaterOutline>
                <span className="text-base font-medium">{moisture} g/m³</span>
                <Tooltip id="moisture-tip" className="max-w-xs" />
              </div>
              <div
                className="flex justify-center items-center py-4 gap-1 min-w-28"
                data-tooltip-id="fruit-tip"
                data-tooltip-html="Expected yield detection is like predicting how many fruits or vegetables you'll get from your plants. It helps you plan and prepare for harvest by estimating how much produce you can expect. By knowing your expected yield, you can make informed decisions about planting, watering, and fertilizing to maximize your crop's productivity."
              >
                <GiKiwiFruit className="text-3xl text-red-500"></GiKiwiFruit>
                <span className="text-base font-medium">
                  {getRandomInt(3, 6)} Tomatoes
                </span>
                <Tooltip id="fruit-tip" className="max-w-xs" />
              </div>
              <div
                className="flex justify-center items-center py-4 gap-1 min-w-28"
                data-tooltip-id="leaf-tip"
                data-tooltip-html="Leaf detection is like using a magnifying glass to check your plant's leaves. It helps you spot any problems early, like bugs, diseases, or nutrient deficiencies. By paying attention to your leaves, you can keep your plants healthy and thriving!"
              >
                <IoIosLeaf className="text-3xl text-green-600"></IoIosLeaf>
                <span className="text-base font-medium">
                  {getRandomInt(1, 5)} Spots
                </span>
                <Tooltip id="leaf-tip" className="max-w-xs" />
              </div>
              <div
                className="flex justify-center items-center py-4 gap-1 min-w-28"
                data-tooltip-id="health-tip"
                data-tooltip-html="Plant health detection is like checking your plant's vital signs. It helps you monitor your plants' overall well-being by identifying any signs of stress, disease, or nutrient deficiencies. By keeping an eye on your plant's health, you can take proactive measures to keep them happy and thriving, ensuring a successful harvest."
              >
                <GiHealthNormal className="text-xl text-red-500"></GiHealthNormal>
                <span
                  className={`text-xs ${
                    isHealthy ? "text-green-500" : "text-red-500"
                  } font-bold`}
                >
                  {isHealthy ? "HEALTHY" : "UNHEALTHY"}
                </span>
                <Tooltip id="health-tip" className="max-w-xs" />
              </div>
            </div>
            <div className="py-3 w-full px- rounded-xl flex gap-6 justify-center">
              <div
                className="flex justify-center items-center py-4 gap-2  min-w-28"
                data-tooltip-id={plantStage[randomIndex][0].name}
                data-tooltip-html={plantStage[randomIndex][0].tooltip}
              >
                <FaPlantWilt
                  className={`text-3xl ${plantStage[randomIndex][0].color}`}
                ></FaPlantWilt>
                <span
                  className={`text-[11px] font-bold ${plantStage[randomIndex][0].color}`}
                >
                  {plantStage[randomIndex][0].name}
                </span>
                <Tooltip
                  id={plantStage[randomIndex][0].name}
                  className="max-w-xs"
                />
              </div>
              <div
                className="flex justify-center items-center py-4 gap-2  min-w-28"
                data-tooltip-id="bug-tip"
                data-tooltip-html="Regularly inspect plants for signs of pests such as holes in leaves, discoloration, or sticky residue. Avoid overusing chemical pesticides to maintain a healthy balance of beneficial insects in your garden.</p>"
              >
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
                <Tooltip id="bug-tip" className="max-w-xs" />
              </div>
              <div className="flex justify-center items-center py-4 gap-2  min-w-28">
                <FaLightbulb
                  className={`text-3xl text-yellow-400`}
                ></FaLightbulb>
                <span className={`text-[12px] font-bold text-green-500`}>
                  ON
                </span>
              </div>
              <h1 className="ml-2 text-xs flex items-center gap-1 min-w-28 font-medium justify-center">
                <span className="text-gray-500">
                  ~ {getRandomInt(0, 5)} minutes ago
                </span>
              </h1>
            </div>
            <div
              className="absolute top-0 right-2 text-xl text-gray-700"
              data-tooltip-id="info-tip"
              data-tooltip-html="Highlight over sensor information to understand them better!"
            >
              <FaInfoCircle></FaInfoCircle>
              <Tooltip id="info-tip" className="max-w-xs" />
            </div>
          </div>
          {/* ALERTS */}
          <div className="absolute -right-3 -top-6 flex gap-1">
            {moisture < 65 && (
              <div
                className="bg-red-500 p-1.5 rounded-full border-0 tooltip tooltip-error tooltip-left"
                data-tip="Low Moisture"
              >
                <IoWaterOutline className="text-white text-xl"></IoWaterOutline>
              </div>
            )}
            {temp < 22 && (
              <div
                className="bg-blue-300 p-1.5 rounded-full border-0 tooltip tooltip-error tooltip-left"
                data-tip="Low Temperature"
              >
                <CiTempHigh className="text-white text-2xl"></CiTempHigh>
              </div>
            )}
            {temp > 28 && (
              <div
                className="bg-red-500 p-1.5 rounded-full border-0 tooltip tooltip-error tooltip-left"
                data-tip="High Temperature"
              >
                <CiTempHigh className="text-white text-2xl"></CiTempHigh>
              </div>
            )}
            {hasPest === 1 && (
              <div
                className="bg-red-500 p-1.5 rounded-full border-0 tooltip tooltip-error tooltip-left"
                data-tip="Pests Detected"
              >
                <BsBug className="text-white text-xl"></BsBug>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="border rounded-xl p-3 even:bg-gray-100" key={item._id}>
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
          <span className="bg-yellow-700 text-yellow-700 bg-opacity-30 p-2 rounded-xl font-bold">
            {item?.number} Crops
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
      <hr />
    </>
  );
};

export default CropCard;
