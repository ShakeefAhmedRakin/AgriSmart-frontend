import { useEffect, useState } from "react";
import { BsMoisture } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";

const Seeds = () => {
  const nagivate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);

  // STATES
  const [seeds, setSeeds] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://bitsandbuild.vercel.app/seeds/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setSeeds(data);
        setLoading(false);
        setReloadData(false);
      });
  }, [user, reloadData]);

  const increase = (id, amount, name) => {
    const item = seeds.find((item) => item._id === id);

    const updatedVolume = item.volume + amount;
    if (updatedVolume > item.capacity) {
      toast.error("Capacity limit reached");
      return;
    }

    fetch(
      `https://bitsandbuild.vercel.app/seeds/${user.email}/${id}/increase/${amount}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setReloadData(true);
          toast.success("Updated.");

          // ADDING TO HISTORY
          const currentDate = new Date();
          const transaction = {
            type: "increase",
            itemId: id,
            name: name,
            email: user.email,
            amount: amount,
            timestamp: {
              date: currentDate.toDateString(),
              time: currentDate.toTimeString(),
            },
          };

          fetch("https://bitsandbuild.vercel.app/history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the content type according to your data
              // Add any additional headers if required
            },
            body: JSON.stringify(transaction), // Convert data to JSON string
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json(); // Parse the JSON response
            })
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          toast.error("An Error Occurred");
        }
      });
  };

  const onIncreaseSubmit = (e, id, name) => {
    e.preventDefault();
    const amount = parseInt(e.target.elements.amount.value);

    if (!isNaN(amount) && amount > 0) {
      increase(id, amount, name);
      e.target.elements.amount.value = "";
    } else {
      toast.error("Amount must be greater than zero");
      return;
    }
  };

  const decrease = (id, amount, name) => {
    const item = seeds.find((item) => item._id === id);

    const updatedVolume = item.volume - amount;
    if (updatedVolume < 0) {
      toast.error("Volume cannot be less than zero");
      return;
    }

    fetch(
      `https://bitsandbuild.vercel.app/seeds/${user.email}/${id}/decrease/${amount}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setReloadData(true);
          toast.success("Updated.");

          // ADDING TO HISTORY
          const currentDate = new Date();
          const transaction = {
            type: "decrease",
            itemId: id,
            name: name,
            email: user.email,
            amount: amount,
            timestamp: {
              date: currentDate.toDateString(),
              time: currentDate.toTimeString(),
            },
          };

          fetch("https://bitsandbuild.vercel.app/history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the content type according to your data
              // Add any additional headers if required
            },
            body: JSON.stringify(transaction), // Convert data to JSON string
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json(); // Parse the JSON response
            })
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          toast.error("An Error Occurred");
        }
      });
  };

  const onDecreaseSubmit = (e, id, name) => {
    e.preventDefault();
    const amount = parseInt(e.target.elements.amount.value);
    if (!isNaN(amount) && amount > 0) {
      decrease(id, amount, name);
      e.target.elements.amount.value = "";
    } else {
      toast.error("Amount must be greater than zero");
      return;
    }
  };

  // ADD SEED
  const addSeed = (e) => {
    e.preventDefault();

    // Accessing form elements
    const form = e.target;
    const name = form.elements["name"].value;
    const temperature = form.elements["temperature"].value;
    const moisture = form.elements["moisture"].value;
    const volume = form.elements["volume"].value;
    const capacity = form.elements["capacity"].value;
    const warehouse = form.elements["warehouse"].value;

    if (parseInt(volume) > parseInt(capacity)) {
      toast.error("Capacity Exceeded");
      return;
    }

    const data = {
      email: user.email,
      name: name,
      temperature: parseInt(temperature),
      moisture: parseInt(moisture),
      volume: parseInt(volume),
      capacity: parseInt(capacity),
      warehouse: warehouse,
    };

    fetch("https://bitsandbuild.vercel.app/seeds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type according to your data
        // Add any additional headers if required
      },
      body: JSON.stringify(data), // Convert data to JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        toast.success("Seed Added!");
        setReloadData(true);
        document.getElementById("addseedmodal").close();
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
            <span className="loading loading-bars loading-lg text-black"></span>
          </div>
        </>
      ) : (
        <>
          {seeds.length > 0 ? (
            <>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <button
                    className="btn bg-primary hover:bg-primary border-none text-white"
                    onClick={() =>
                      document.getElementById("addseedmodal").showModal()
                    }
                  >
                    Add Seed
                  </button>
                  <h1>
                    Total Seeds:{" "}
                    <span className="font-bold">{seeds.length}</span>
                  </h1>
                  <h1>
                    Low Volume Seeds:{" "}
                    <span className="font-bold">
                      {
                        seeds.filter(
                          (item) => item.volume / item.capacity < 0.3
                        ).length
                      }
                    </span>
                  </h1>
                </div>
                <hr className="my-2" />
                {/* DATA */}
                {seeds.map((item) => (
                  <div className="flex gap-4" key={item._id}>
                    <div className=" bg-secondary text-white font-bold text-2xl flex items-center justify-center w-56 shadow-xl rounded-xl">
                      {item.name}
                    </div>
                    <div className="flex-1 border-2 rounded-xl shadow-xl p-3">
                      <hr className="mb-2" />
                      {/* SENSOR DATA */}
                      <div className="flex items-center gap-2">
                        <div className="bg-cyan-500 text-white font-bold p-3 flex items-center gap-2 rounded-xl">
                          <BsMoisture className="text-3xl"></BsMoisture>
                          <span>{item.moisture} g/m³</span>
                        </div>
                        <div className="bg-red-500 text-white font-bold p-3 flex items-center gap-2 rounded-xl">
                          <CiTempHigh className="text-3xl"></CiTempHigh>
                          <span>{item.temperature} °C</span>
                        </div>
                      </div>
                      {/* BAR/CAPACITY */}
                      <progress
                        className={`progress ${
                          item.volume / item.capacity < 0.3
                            ? "progress-error"
                            : ""
                        } h-7 mt-2 progress-success w-[100%]`}
                        value={item.volume}
                        max={item.capacity}
                      ></progress>
                      <hr className="my-2" />
                      {/* INFORMATION */}
                      <div>
                        <h1 className="my-1 font-medium">
                          Warehouse:{" "}
                          <span className="font-bold">{item.warehouse}</span>
                        </h1>
                        <h1 className="my-1 font-medium">
                          Max Capacity:{" "}
                          <span className="font-bold">{item.capacity} kg</span>
                        </h1>
                        <h1 className="my-1 font-medium">
                          Current Capacity:{" "}
                          <span className="font-bold">{item.volume} kg</span>
                        </h1>
                        <div className="flex items-center gap-3">
                          <form
                            onSubmit={(e) =>
                              onIncreaseSubmit(e, item._id, item.name)
                            }
                          >
                            <input
                              type="number"
                              className="input input-bordered rounded-r-none w-32"
                              placeholder="Amount"
                              required
                              name="amount"
                            />
                            <button className="btn text-white bg-secondary hover:bg-secondary border-none uppercase mt-1 rounded-l-none">
                              Add
                            </button>
                          </form>
                          <form
                            onSubmit={(e) =>
                              onDecreaseSubmit(e, item._id, item.name)
                            }
                          >
                            <input
                              type="number"
                              className="input input-bordered rounded-r-none w-32"
                              placeholder="Amount"
                              required
                              name="amount"
                            />
                            <button className="btn text-white bg-secondary hover:bg-secondary border-none uppercase mt-1 rounded-l-none">
                              Remove
                            </button>
                          </form>
                          <button
                            className="btn bg-primary text-white hover:bg-primary border-none"
                            onClick={() => nagivate(`/history/${item._id}`)}
                          >
                            History
                          </button>
                        </div>
                      </div>
                      <hr className="mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="h-screen flex flex-col gap-4 items-center justify-center">
                <h1 className="text-2xl">No Seeds Added Yet!</h1>
                <button
                  className="btn bg-primary hover:bg-primary border-none text-white"
                  onClick={() =>
                    document.getElementById("addseedmodal").showModal()
                  }
                >
                  Add Seed
                </button>
              </div>
            </>
          )}
        </>
      )}
      <dialog id="addseedmodal" className={`modal`}>
        <div className="modal-box  overflow-y-scroll">
          <form className="space-y-4" onSubmit={addSeed}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Seed Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Seed Name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Warehouse Name
                </label>
                <input
                  type="text"
                  name="warehouse"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Warehouse Name"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Temperature
                </label>
                <input
                  type="number"
                  name="temperature"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  placeholder="°C"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Moisture
                </label>
                <input
                  type="number"
                  name="moisture"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  placeholder="g/m³"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Current Volume
                </label>
                <input
                  type="number"
                  name="volume"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  placeholder="kg"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Max Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  placeholder="kg"
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

export default Seeds;
