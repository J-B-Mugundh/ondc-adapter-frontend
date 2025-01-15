import React from 'react'

export default function Portal_StepThree({
  businessName,
  setBusinessName,
  businessRegistrationNumber,
  setBusinessRegistrationNumber,
  gstin,
  setGstin,
  proofOfId,
  setProofOfId
}) {
  return (
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
  )
}
