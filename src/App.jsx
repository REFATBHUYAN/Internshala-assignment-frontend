import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://internshala-backend-ivm0ukach-refatbhuyan.vercel.app/data?page=${currentPage}&search=${searchQuery}`
        );
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="mx-auto max-w-7xl m-10">
      <div className="max-w-5xl mx-auto ">
        <h1 className="text-4xl font-bold text-center mb-16">
          User Informations
        </h1>

        {/* search filed */}

        <div className="max-w-md mx-auto">
          <div className="form-control">
            <div className="">
              <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
                type="text"
                placeholder="Search by name..."
                className="input input-ghost w-full max-w-xs"
              />
            </div>
          </div>
        </div>

        {/* user data table */}

        <div className="w-full">
          {data.slice(0, 3).map((user, i) => (
            <div
              key={user.id}
              className="bg-slate-200 m-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-10 rounded-md"
            >
              <h1>{user.name}</h1>
              <div>
                <h1 className="font-bold text-green-700">Email</h1>
                <p>{user.email}</p>
              </div>
              <div>
                <h1 className="font-bold text-green-700">Phone</h1>
                <p>{user.phone}</p>
              </div>
              <div>
                <h1 className="font-bold text-green-700">website</h1>
                <p>{user.website}</p>
              </div>
              <button className="rounded-lg bg-green-700 text-white px-4 py-2 hover:bg-green-900">
                <button
                  className=""
                  onClick={() =>
                    document.getElementById(`my_modal_${i}`).showModal()
                  }
                >
                  Details
                </button>
              </button>
              {/* modal */}
              <div>
                <dialog id={`my_modal_${i}`} className="modal">
                  <div className="modal-box bg-slate-200 text-black">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <p className="py-4">
                      <span className="font-semibold text-green-600">
                        Email
                      </span>
                      : {user.email}
                    </p>
                    <p className="py-4">
                      <span className="font-semibold text-green-600">
                        Phone
                      </span>
                      : {user.phone}
                    </p>
                    <p className="py-4">
                      <span className="font-semibold text-green-600">
                        Website
                      </span>
                      : {user.website}
                    </p>
                    <p className="py-4">
                      <span className="font-semibold text-green-600">
                        Address
                      </span>
                      :{" "}
                      <ul className="pl-6">
                        <li>{`Street: ${user.address.street}`}</li>
                        <li>{`Suite: ${user.address.suite}`}</li>
                        <li>{`City: ${user.address.city}`}</li>
                      </ul>
                    </p>
                  </div>
                </dialog>
              </div>
            </div>
          ))}
          {/* pagination */}
          <div className="w-full mx-auto">
            <div className="join flex justify-center items-center gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="join-item btn btn-outline"
              >
                Previous page
              </button>
              <span className="mx-6">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="join-item btn btn-outline"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
