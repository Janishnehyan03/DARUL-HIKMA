import React from "react";

function Notifications() {
  return (
    <div>
      <div className="text-4xl text-green-600 mb-2 text-center">
        NOTIFICATIONS
      </div>
      <div className="max-w-md ml-auto mr-auto bg-white mb-4 rounded content-center	 shadow-lg">
        <div className="px-6 py-4">
          <div
            class="p-2 bg-gray-100 items-center text-indigo-100 leading-none rounded-md	 flex lg:inline-flex"
            role="alert"
          >
            <span class="flex rounded-full bg-red-300 uppercase px-2 py-1 text-xs font-bold mr-3">
              New
            </span>
            <span class="text-black mr-2 text-left flex-auto">
              Get the coolest t-shirts from our brand new store
            </span>
            <svg
              class="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
