import React from 'react'

export default function Portal_StepFour({
  platform,
  shopLink,
  accessKey,
  consumerKey,
  consumerSecret,
  authToken,
  businessName,
  businessRegistrationNumber,
  gstin,
  proofOfId,
  termsAccepted,
  setTermsAccepted,
  handlePrev,
  handleSubmit,
  activeStep // Receive activeStep as a prop
}) {
  return (
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
  )
}
