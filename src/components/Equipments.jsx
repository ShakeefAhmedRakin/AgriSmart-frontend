import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

const Equipments = () => {
  const [loaned, setLoaned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch(`https://bitsandbuild.vercel.app/equipments/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setEquipments(data);
        setLoading(false);
        setReloadData(false);
      });
  }, [user, reloadData]);

  const addMachine = (e) => {
    e.preventDefault();

    // Accessing form elements
    const form = e.target;
    const name = form.elements["name"].value;
    const quantity = form.elements["quantity"].value;
    const status = form.elements["status"].value;
    const availability = form.elements["availability"].value;
    const loandate = form.elements["loandate"]
      ? form.elements["loandate"].value
      : null;
    const returndate = form.elements["returndate"]
      ? form.elements["returndate"].value
      : null;
    const location = form.elements["location"]
      ? form.elements["location"].value
      : null;

    const loaned = status === "owned" ? false : true;

    const data = {
      email: user.email,
      name: name,
      loaned: loaned,
      loandetails: {
        taken: loandate,
        return: returndate,
        location: location,
      },
      availability: availability,
      quantity: quantity,
    };
    fetch("https://bitsandbuild.vercel.app/equipments", {
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
        toast.success("Equipment Added!");
        setReloadData(true);
        document.getElementById("machinemodal").close();
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="">
        <div className="rounded-lg shadow-lg border-2 p-3">
          <h1 className="text-center font-bold uppercase text-xl rounded-t-md bg-primary text-white p-2 relative">
            Equipments{" "}
            <button
              onClick={() =>
                document.getElementById("machinemodal").showModal()
              }
              className="absolute btn right-[5px] top-[13%] btn-sm bg-white text-secondary border-none hover:bg-white"
            >
              Add <IoMdAdd />
            </button>
          </h1>
          <hr className="my-2" />
          {loading ? (
            <>
              <div className="h-screen flex items-center justify-center">
                <span className="loading loading-bars loading-lg text-black"></span>
              </div>
            </>
          ) : (
            <>
              {equipments.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
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
                        {equipments.map((machine) => (
                          <tr key={machine._id}>
                            <td>{machine.name}</td>
                            <td>{machine.quantity}</td>
                            <td className="whitespace-nowrap">
                              {!machine.loaned ? (
                                <span className="text-green-500 font-bold">
                                  Owned
                                </span>
                              ) : (
                                <p className="text-red-500 font-bold">
                                  Loaned:{" "}
                                  <span className="text-black">
                                    {machine.loandetails.taken}
                                  </span>{" "}
                                  <br />
                                  Return By:{" "}
                                  <span className="text-black">
                                    {machine.loandetails.return}
                                  </span>{" "}
                                  <br />
                                  Location:{" "}
                                  <span className="text-black">
                                    {machine.loandetails.location}
                                  </span>
                                </p>
                              )}
                            </td>
                            <td
                              className={`font-bold ${
                                machine.availability === "In Use"
                                  ? "text-orange-400"
                                  : ""
                              } ${
                                machine.availability === "Maintenance"
                                  ? "text-red-400"
                                  : ""
                              } ${
                                machine.availability === "Idle"
                                  ? "text-green-400"
                                  : ""
                              }`}
                            >
                              {machine.availability}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-screen flex text-center text-2xl justify-center items-center">
                    No Equipments Added Yet! <br />
                    Add One!
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <dialog id="machinemodal" className="modal">
        <div className="modal-box">
          <form className="space-y-4" onSubmit={addMachine}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Machine Name
              </label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Machine Name"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  placeholder="Machine Quantity"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Status
                </label>
                <select
                  name="status"
                  onChange={(e) => {
                    if (e.target.value === "loaned") {
                      setLoaned(true);
                    } else {
                      setLoaned(false);
                    }
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                >
                  <option value="owned" defaultValue>
                    Owned
                  </option>
                  <option value="loaned">Loaned</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Availability
                </label>
                <select
                  name="availability"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 d"
                >
                  <option value="In Use" defaultValue>
                    In Use
                  </option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Idle">Idle</option>
                </select>
              </div>
            </div>
            {loaned ? (
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Loaned Date
                  </label>
                  <input
                    type="date"
                    name="loandate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Return Date
                  </label>
                  <input
                    type="date"
                    name="returndate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Location"
                    required
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
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

export default Equipments;
