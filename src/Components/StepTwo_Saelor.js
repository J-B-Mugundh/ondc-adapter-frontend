import React from 'react'

export default function StepTwo_Saelor({ authToken, setAuthToken }) {
  return (
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
  )
}
