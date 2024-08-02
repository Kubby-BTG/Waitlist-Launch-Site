// import React from "react";

// export default function Modal() {
//   const [showModal, setShowModal] = React.useState(false);
//   return (
//     <>
//       <button
//         className="bg-pink-500 active:bg-pink-600 shadow hover:shadow-lg mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none"
//         type="button"
//         onClick={() => setShowModal(true)}
//       >
//         Open regular modal
//       </button>
//       {showModal ? (
//         <>
//           <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
//             <div className="relative mx-auto my-6 w-auto max-w-3xl">
//               {/*content*/}
//               <div className="shadow-lg relative flex w-full flex-col rounded-lg border-0 bg-white outline-none focus:outline-none">
//                 {/*header*/}
//                 <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
//                   <h3 className="text-3xl font-semibold">Modal Title</h3>
//                   <button
//                     className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
//                       ×
//                     </span>
//                   </button>
//                 </div>
//                 {/*body*/}
//                 <div className="relative flex-auto p-6">
//                   <p className="text-blueGray-500 my-4 text-lg leading-relaxed">
//                     I always felt like I could do anything. That is the main
//                     thing people are controlled by! Thoughts- their perception
//                     of themselves! They are slowed down by their perception of
//                     themselves. If you are taught you cannot do anything, you
//                     wont do anything. I was taught I could do everything.
//                   </p>
//                 </div>
//                 {/*footer*/}
//                 <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
//                   <button
//                     className="text-red-500 background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase outline-none transition-all duration-150 ease-linear focus:outline-none"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Close
//                   </button>
//                   <button
//                     className="bg-emerald-500 active:bg-emerald-600 shadow hover:shadow-lg mb-1 mr-1 rounded px-6 py-3 text-sm font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none"
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
//         </>
//       ) : null}
//     </>
//   );
// }
