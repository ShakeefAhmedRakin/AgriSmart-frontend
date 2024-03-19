import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import CropCard from "./CropCard";

const Crop = () => {
  const [loading, setLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const { user } = useAuth();
  const [crops, setCrops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/crops/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setLoading(false);
        setReloadData(false);
      });
  }, [user, reloadData]);

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
          {crops.length > 0 ? (
            <>
              <div className="space-y-4">
                <hr className="my-2" />
                {/* DATA */}
                <div className="space-y-2 gap-4">
                  {crops.map((item) => (
                    <CropCard
                      key={item._id}
                      item={item}
                      setReloadData={setReloadData}
                    ></CropCard>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="h-screen flex flex-col gap-4 items-center justify-center">
                <h1 className="text-2xl">No Soil For Your Crops!</h1>
                <button
                  className="btn bg-primary hover:bg-primary border-none text-white"
                  onClick={() => navigate("/soils")}
                >
                  Add Soil
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Crop;
