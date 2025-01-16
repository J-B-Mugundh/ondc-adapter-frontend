import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const [seller, setSeller] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shopify,setShopify] = useState([]);
  const [woocommerce,setWoocommerce]=useState([]);
  const [saelor,setSaelor] =useState([]);
  const [usertype,setUserType] =useState("shopify");

  //GET ALL SELLERS
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        //await axios.post(`${process.env.REACT_APP_API_URL}/ondc/${platform.toLowerCase()}/create`, formData);
        // Fetch both APIs concurrently
        const [response1, response2, response3] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/ondc/shopify`),
          axios.get(`${process.env.REACT_APP_API_URL}/ondc/woocommerce`),
          axios.get(`${process.env.REACT_APP_API_URL}/ondc/saelor`)
        ]);
  
         // Combine data from all platforms and add platform identifiers
         const shopifySellers = response1.data.map((seller) => ({
          ...seller,
          platform: "shopify",
        }));
        const woocommerceSellers = response2.data.map((seller) => ({
          ...seller,
          platform: "woocommerce",
        }));
        const saelorSellers = response3.data.map((seller) => ({
          ...seller,
          platform: "saelor",
        }));
        setShopify(shopifySellers);
        setWoocommerce(woocommerceSellers);
        setSaelor(saelorSellers);
        setSeller([...shopifySellers, ...woocommerceSellers, ...saelorSellers]);
      } catch (error) {
        setError(error.message || "Failed to fetch the sellers.");
        console.error("Error Fetching Sellers:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSellers();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex">
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-4 shadow rounded-lg mb-6">
          <h1 className="text-xl font-bold">Welcome, Admin</h1>
        </header>

        {/* User Table */}
        <section className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">User List</h2>
            <input
              type="text"
              placeholder="Search users..."
              className="border p-2 rounded w-80"
            />
          </div>

          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Business Name</th>
                <th className="p-4">Registration No.</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {seller && seller.length > 0 ? (
                seller.map((user, index) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      {user.businessDetails?.businessName || "businessName"}
                    </td>
                    <td className="p-4">
                      {user.businessDetails?.businessRegistrationNumber ||
                        "businessRegNo"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded ${
                          user.status === "Verified"
                            ? "bg-green-100 text-green-800"
                            : user.status === "Under Verification"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status || "Under Verification"}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="border rounded px-2 py-1 mr-2 bg-green-400 text-white hover:bg-slate-400">
                        <Link
                        to={`/sellers/edit/${user.platform}/${user._id}`} 
                        > Manage</Link>
                      </button>
                    </td>
                  </tr>
                ))
              ) : loading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ):
              (
                <tr>
                <td colSpan="5" className="p-4 text-center">
                  No Sellers Found
                </td>
              </tr>
              )
              }
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default SellerDashboard;
