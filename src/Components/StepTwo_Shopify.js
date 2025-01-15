import React from 'react'

export default function StepTwo_Shopify({ accessKey, setAccessKey }) {
  return (
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
  )
}
