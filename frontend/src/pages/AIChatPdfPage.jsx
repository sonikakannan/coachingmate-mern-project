import React from 'react';
import { IoSend } from "react-icons/io5";

const AIChatPdfPage = () => {
  return (
    <div className="flex h-[calc(100vh-5rem)]"> {/* Subtract navbar height (4rem = 64px) */}
      {/* Chat Section (Left) */}
      <div className="w-1/2 border border-gray-300 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {/* Chat messages would go here */}
          <div className="text-gray-500">Chat messages will appear here...</div>
        </div>
        <div className="p-4 flex gap-3 items-center border-t border-gray-300">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full px-4 py-3 rounded-md"
          />
<div className='bg-indigo-700 text-white rounded-full p-3  flex items-center justify-center'>
<IoSend className='text-2xl cursor-pointer'/>

</div>
        </div>
      </div>

      {/* PDF Upload & Preview (Right) */}
      <div className="w-1/2 flex flex-col">
        <div className="p-4 flex justify-end border border-gray-300">
          <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded">
            + Upload PDF
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {/* PDF layout preview area */}
          <div className="text-gray-500">PDF preview will appear here...</div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPdfPage;