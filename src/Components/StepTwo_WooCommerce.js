import React from 'react'

export default function StepTwo_WooCommerce({ consumerKey, setConsumerKey, consumerSecret, setConsumerSecret }) {
  return (
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
  )
}
