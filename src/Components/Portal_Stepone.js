import React, { useState } from "react";
import axios from 'axios';

export default function Portal_Stepone() {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [platform, setPlatform] = useState("");
  const [shopLink, setShopLink] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [consumerKey, setConsumerKey] = useState("");
  const [consumerSecret, setConsumerSecret] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [proofOfId, setProofOfId] = useState([]);
  // const [proofOfAddress, setProofOfAddress] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState("");
  const [gstin, setGstin] = useState("");


  const steps = [
    { id: 1, label: "Choose Platform" },
    { id: 2, label: "Platform Details" },
    { id: 3, label: "Business Verification" },
    { id: 4, label: "Preview & Submit" },
  ];

  const validateStep = () => {
    setError("");
    if (activeStep === 1 && !platform) {
      setError("Please choose a platform.");
      return false;
    }
    if (activeStep === 2) {
      if (!shopLink) {
        setError("Please provide the shop link.");
        return false;
      }
      if (platform === "Shopify" && !accessKey) {
        setError("Please provide the access key.");
        return false;
      }
      if (
        platform === "WooCommerce" &&
        (!consumerKey || !consumerSecret)
      ) {
        setError("Please provide the consumer key and consumer secret.");
        return false;
      }
      if (platform === "Saelor" && !authToken) {
        setError("Please provide the auth token.");
        return false;
      }
    }
    if (activeStep === 3) {
      if (!businessName || !businessRegistrationNumber || !gstin) {
        setError("Please fill all business details.");
        return false;
      }
      if (!proofOfId.length) {
        setError("Please upload at least one document.");
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep() && activeStep < steps.length) {
      setCompletedSteps((prev) =>
        prev.includes(activeStep) ? prev : [...prev, activeStep]
      );
      setActiveStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
      setCompletedSteps((prev) => prev.filter((step) => step !== activeStep - 1));
    }
  };
 
  const handleSubmit = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
  
     try {
      
      const formData = new FormData();
      alert("Form submitted successfully!");
      if (platform === "Saelor") {
      formData.append("shopLink", shopLink || "");
      formData.append("authToken", authToken || "");
      }
      if (platform === "WooCommerce") {
        formData.append("shopLink", shopLink || "");
        formData.append("consumerKey", consumerKey || "");
        formData.append("consumerSecret", consumerSecret || "");
      }
      if (platform === "Shopify") {
        formData.append("shopLink", shopLink || "");
        formData.append("accessKey", accessKey || "");
        
      }
      // Wrap business details into an object
      const businessDetails = JSON.stringify({
        businessName: businessName,
        businessRegistrationNumber: businessRegistrationNumber,
        GSTIN: gstin,
      });
      formData.append("businessDetails", businessDetails);
  
      
      if (proofOfId && proofOfId.length > 0) {
        proofOfId.forEach((file, index) => {
          formData.append(`documentType`,file.name);
          formData.append(`documents`, file);
        });
      }
      formData.append(`status`,"Under Verification");
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/ondc/${platform.toLowerCase()}/create`, formData);
  
      if (response.status === 200 && response.data && response.data.success) {
        alert("Form submitted successfully!");
        
      } 
    
    }
    catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
        Seller Onboarding Platform
      </h1>

      <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-6">
          {error && (
            <div className="text-red-500 text-center font-medium">{error}</div>
          )}

          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
            {steps.map((step) => (
              <div key={step.id} className="w-full">
                <div
                  className={`h-1 rounded-lg ${
                    completedSteps.includes(step.id)
                      ? "bg-green-500"
                      : activeStep === step.id
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                ></div>
                <div className="mt-3 flex items-center space-x-2">
                  <span
                    className={`shrink-0 ${
                      completedSteps.includes(step.id) || activeStep === step.id
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  >
                    {step.id === 1 && <span className="text-xl">🌐</span>}
                    {step.id === 2 && <span className="text-xl">🔧</span>}
                    {step.id === 3 && <span className="text-xl">📄</span>}
                    {step.id === 4 && <span className="text-xl">✅</span>}
                  </span>
                  <div>
                    <h6
                      className={`text-sm font-bold ${
                        completedSteps.includes(step.id) || activeStep === step.id
                          ? "text-green-500"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </h6>
                    {completedSteps.includes(step.id) && (
                      <p className="text-xs text-green-500">Completed</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            {activeStep === 1 && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-700 mb-4">
                  Choose Your Platform
                </h2>
                <select
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option value="" disabled>
                    Select a platform
                  </option>
                  <option value="Shopify">Shopify</option>
                  <option value="WooCommerce">WooCommerce</option>
                  <option value="Saelor">Saleor</option>
                </select>
              </div>
            )}

            {activeStep === 2 && platform && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-700 mb-6">
                  Platform Details
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="shopLink"
                    className="block text-gray-600 font-medium mb-2"
                  >
                    Shop Link
                  </label>
                  <input
                    id="shopLink"
                    type="text"
                    value={shopLink}
                    onChange={(e) => setShopLink(e.target.value)}
                    placeholder="Enter your shop link"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {platform === "Shopify" && (
                  <div className="mb-4">
                    <label
                      htmlFor="accessKey"
                      className="block text-gray-600 font-medium mb-2"
                    >
                      Access Key
                    </label>
                    <textarea
                      id="accessKey"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      placeholder="Enter your access key"
                      rows={3}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>
                )}

                {platform === "WooCommerce" && (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="consumerKey"
                        className="block text-gray-600 font-medium mb-2"
                      >
                        Consumer Key
                      </label>
                      <textarea
                        id="consumerKey"
                        value={consumerKey}
                        onChange={(e) => setConsumerKey(e.target.value)}
                        placeholder="Enter your consumer key"
                        rows={3}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="consumerSecret"
                        className="block text-gray-600 font-medium mb-2"
                      >
                        Consumer Secret
                      </label>
                      <textarea
                        id="consumerSecret"
                        value={consumerSecret}
                        onChange={(e) => setConsumerSecret(e.target.value)}
                        placeholder="Enter your consumer secret"
                        rows={3}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      ></textarea>
                    </div>
                  </>
                )}

                {platform === "Saelor" && (
                  <div className="mb-4">
                    <label
                      htmlFor="authToken"
                      className="block text-gray-600 font-medium mb-2"
                    >
                      Auth Token
                    </label>
                    <textarea
                      id="authToken"
                      value={authToken}
                      onChange={(e) => setAuthToken(e.target.value)}
                      placeholder="Enter your auth token"
                      rows={3}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>
                )}
              </div>
            )}

            {activeStep === 3 && (
  <div>
    <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-700 mb-6">
      Business Verification
    </h2>
    <div className="mb-4">
      <label
        htmlFor="businessName"
        className="block text-gray-600 font-medium mb-2"
      >
        Business Name
      </label>
      <input
        id="businessName"
        type="text"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        placeholder="Enter business name"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="businessRegistrationNumber"
        className="block text-gray-600 font-medium mb-2"
      >
        Business Registration Number
      </label>
      <input
        id="businessRegistrationNumber"
        type="text"
        value={businessRegistrationNumber}
        onChange={(e) => setBusinessRegistrationNumber(e.target.value)}
        placeholder="Enter business registration number"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="gstin"
        className="block text-gray-600 font-medium mb-2"
      >
        GSTIN
      </label>
      <input
        id="gstin"
        type="text"
        value={gstin}
        onChange={(e) => setGstin(e.target.value)}
        placeholder="Enter GSTIN"
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label
        htmlFor="proofOfId"
        className="block text-gray-600 font-medium mb-2"
      >
        Upload Proof of ID and Address (PDF only, multiple allowed)
      </label>
      <input
        type="file"
        id="proofOfId"
        accept=".pdf"
        multiple
        onChange={(e) => setProofOfId(Array.from(e.target.files))}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {proofOfId.length > 0 && (
        <ul className="mt-2 text-sm text-green-600">
          {proofOfId.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
)}


           
{activeStep === 4 && (
  <div>
    <h2 className="text-lg sm:text-xl font-semibold text-center text-gray-700 mb-6">
      Preview & Submit
    </h2>
    <div className="space-y-2">
      <p>
        <strong>Platform:</strong> <span className="break-words">{platform}</span>
      </p>
      <p>
        <strong>Shop Link:</strong> <span className="break-words">{shopLink}</span>
      </p>

      {platform === "Shopify" && (
        <p>
          <strong>Access Key:</strong>{" "}
          <span className="break-words">{accessKey}</span>
        </p>
      )}
      {platform === "WooCommerce" && (
        <>
          <p>
            <strong>Consumer Key:</strong>{" "}
            <span className="break-words">{consumerKey}</span>
          </p>
          <p>
            <strong>Consumer Secret:</strong>{" "}
            <span className="break-words">{consumerSecret}</span>
          </p>
        </>
      )}
      {platform === "Saelor" && (
        <p>
          <strong>Auth Token:</strong>{" "}
          <span className="break-words">{authToken}</span>
        </p>
      )}
      <p>
        <strong>Business Name:</strong>{" "}
        <span className="break-words">{businessName}</span>
      </p>
      <p>
        <strong>Business Registration Number:</strong>{" "}
        <span className="break-words">{businessRegistrationNumber}</span>
      </p>
      <p>
        <strong>GSTIN:</strong>{" "}
        <span className="break-words">{gstin}</span>
      </p>
      <div>
        <strong>Proof of ID:</strong>
        {proofOfId && proofOfId.length > 0 ? (
          <ul className="list-disc list-inside">
            {proofOfId.map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
        ) : (
          <span className="break-words">Not uploaded</span>
        )}
      </div>

      
    </div>

    <div className="mt-4">
      <input
        type="checkbox"
        id="terms"
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
        className="mr-2"
      />
      <label htmlFor="terms" className="text-gray-600">
        I agree to the Terms and Conditions
      </label>
    </div>
    <div className="flex justify-between mt-6">
      <button
        className={`px-4 py-2 rounded-md ${
          activeStep === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        onClick={handlePrev}
        disabled={activeStep === 1}
      >
        Previous
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          termsAccepted
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={!termsAccepted}
      >
        Submit
      </button>
    </div>
  </div>
)}


          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          {activeStep < 4 && (
            <>
              <button
                onClick={handlePrev}
                disabled={activeStep === 1}
                className={`px-6 py-2 rounded ${
                  activeStep === 1
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={
                  activeStep === 4 ||
                  (activeStep === 1 && !platform) ||
                  (activeStep === 2 &&
                    (!shopLink ||
                      (platform === "Shopify" && !accessKey) ||
                      (platform === "WooCommerce" &&
                        (!consumerKey || !consumerSecret)) ||
                      (platform === "Saelor" && !authToken))) ||
                  (activeStep === 3 && (!proofOfId ))
                }
                className="px-6 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


