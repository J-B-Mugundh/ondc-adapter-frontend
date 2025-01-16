import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditSeller = () => {
  const { type,id } = useParams(); // Get seller ID and platform from URL params
  const navigate = useNavigate(); // For navigation after update
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [shopLink, setShopLink] = useState("");
  const [accessKey, setAccessKey] = useState("");

  const [consumerKey, setConsumerKey] = useState("");  
  const [consumerSecret, setConsumerSecret] = useState("");

  const [authToken, setAuthToken] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [status,setStatus] = useState("Under Verification");
  const [documents,setDocuments] = useState([]);
  const [documentBlobUrl, setDocumentBlobUrl] = useState([]);
  // Fetch seller data on component mount
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/ondc/${type}/${id}`
        );
        setSeller(response.data);
        setShopLink(response.data.shopLink || "");
        setAccessKey(response.data.accessKey || "");
        setConsumerKey(response.data.consumerKey || "");
        setConsumerSecret(response.data.consumerSecret || "");
        setAuthToken(response.data.authToken || "");
        setBusinessName(response.data.businessDetails.businessName || "");
        setBusinessRegistrationNumber(response.data.businessDetails.businessRegistrationNumber || "");
        setGSTIN(response.data.businessDetails.GSTIN || "");
        setStatus(response.data.status || "Under Verification");
        setDocuments(response.data.documents || []);
      } catch (err) {
        setError(err.message || "Failed to fetch seller details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [id, type]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const handleReset = () => {
    setShopLink(seller.shopLink || "");
    setAccessKey(seller.accessKey || "");
    setConsumerKey(seller.consumerKey || "");
    setConsumerSecret(seller.consumerSecret || "");
    setAuthToken(seller.authToken || "");
    // setProofOfId(seller.proofOfId || []);
    setBusinessName(seller.businessDetails.businessName || "");
    setBusinessRegistrationNumber(seller.businessDetails.businessRegistrationNumber || "");
    setGSTIN(seller.businessDetails.GSTIN || "");
    setStatus(seller.status || "Under Verification");
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("shopLink", shopLink);
      formData.append("accessKey", accessKey);
      formData.append("consumerKey", consumerKey);
      formData.append("consumerSecret", consumerSecret);
      formData.append("authToken", authToken);
      // formData.append("proofOfId", proofOfId);
      const businessDetails = JSON.stringify({
        businessName: businessName,
        businessRegistrationNumber: businessRegistrationNumber,
        GSTIN: GSTIN,
      });
      formData.append("businessDetails", businessDetails);
      formData.append("status", status);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/ondc/${type}/${id}`,
        formData
      );
      console.log(response.data);
      alert("Seller updated successfully!");
      navigate(`/sellers`);
    } catch (err) {
      setError(err.message || "Failed to update the seller.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          MANAGE SELLER
        </h2>
        {seller ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Business Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Registration Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    name="businessRegistrationNumber"
                    value={businessRegistrationNumber}
                    onChange={(e) => setBusinessRegistrationNumber(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* GSTIN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    GSTIN
                  </label>
                  <input
                    type="text"
                    name="GSTIN"
                    value={GSTIN}
                    onChange={(e) => setGSTIN(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Shop Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Shop Link
                  </label>
                  <input
                    type="text"
                    name="shopLink"
                    value={shopLink}
                    onChange={(e) => setShopLink(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Conditional Fields */}
                {seller.accessKey && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Access Key
                    </label>
                    <input
                      type="text"
                      name="accessKey"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {seller.consumerKey && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Consumer Key
                    </label>
                    <input
                      type="text"
                      name="consumerKey"
                      value={consumerKey}
                      onChange={(e) => setConsumerKey(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {seller.consumerSecret && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Consumer Secret
                    </label>
                    <input
                      type="text"
                      name="consumerSecret"
                      value={consumerSecret}
                      onChange={(e) => setConsumerSecret(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {seller.authToken && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Auth Token
                    </label>
                    <input
                      type="text"
                      name="authToken"
                      value={authToken}
                      onChange={(e) => setAuthToken(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full mt-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Under Verification">Under Verification</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-500">No seller found.</p>
        )}
      </div>
    </div>
  );
};


export default EditSeller;
