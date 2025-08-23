// // src/components/RedirectPopup.tsx (or .jsx)
// import React, { useState, useEffect } from 'react';
// // Ensure this path is correct for your project structure
// import { db } from '../firebaseConfig';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// // Simple SVG Close Icon
// const CloseIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>
// );

// // Props interface for the component
// export interface RedirectProps {
//     isOpen: boolean;
//     setIsOpen: (isOpen: boolean) => void; // Function to close the popup from parent if needed
//     targetUrl: string; // URL to redirect to after successful submission
// }

// const RedirectPopup: React.FC<RedirectProps> = ({ isOpen, setIsOpen, targetUrl }) => {

//     const [email, setEmail] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [noMarketing, setNoMarketing] = useState(false); // User's marketing preference
//     const [error, setError] = useState('');
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [hasMounted, setHasMounted] = useState(false); // Handles client-side mounting

//     useEffect(() => {
//         setHasMounted(true); // Component has mounted on the client
//         localStorage.setItem('alreadyopen', 'true'); 
//     }, []);

//     // Reset form state when popup is closed from parent or internally
//     useEffect(() => {
//         if (!isOpen) {
//             // Reset state when closed, except potentially isSubmitted to show message briefly
//             setTimeout(() => {
//                  setEmail('');
//                  setIsLoading(false);
//                  setNoMarketing(false);
//                  setError('');
//                  setIsSubmitted(false); 
//                 localStorage.setItem('alreadyopen', 'false'); 

//             }, 300);
//         }
//     }, [isOpen]);


//     const handleClose = (): void => {
//         setIsOpen(false); // Use the setter function passed from the parent
//         localStorage.setItem('alreadyopen', 'false'); 
//     };

//     const handleRedirect = (): void => {
//         if (targetUrl) {
//             localStorage.setItem('alreadyopen', 'false'); 
//             console.log("Redirecting to:", targetUrl); // For debugging
//             window.location.href = targetUrl;
//         } else {
//              console.warn("RedirectPopup: targetUrl prop is missing!");
//         }
//     };


//     const handleSubmit = async (e: React.FormEvent): Promise<void> => {
//         e.preventDefault();
//         if (!email || !/\S+@\S+\.\S+/.test(email)) {
//             setError('Please enter a valid email address.');
//             return;
//         }

//         setIsLoading(true);
//         setError('');
//         // Don't set isSubmitted to false here, only on success

//         try {
//             const subscribersCollectionRef = collection(db, 'subscribers');
//             // Include the noMarketing state when adding the document
//             await addDoc(subscribersCollectionRef, {
//                 email: email,
//                 subscribedAt: serverTimestamp(),
//                 noMarketing: noMarketing // Save the marketing preference
//             });

//             setIsSubmitted(true); 
//             localStorage.setItem('newsletterSubscribed', 'true'); 

//             setTimeout(() => {
//                 handleClose(); // Close the popup using the parent's state setter
//                 handleRedirect(); // Redirect to the target URL
//             }, 1000); // Reduced delay to 2 seconds after showing "Thank You"

//         } catch (err) {
//             console.error("Error adding document: ", err);
//             setError('Subscription failed. Please try again.');
//             setIsLoading(false); // Stop loading on error
//             setIsSubmitted(false); // Explicitly ensure submitted is false on error
//         }
//         // No finally block needed for setIsLoading if we handle it in success/error paths
//     };


//     // Render nothing if the popup shouldn't be open or hasn't mounted yet
//     if (!isOpen || !hasMounted) {
//         return null;
//     }

//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
//             onClick={handleClose} // Allow closing by clicking the overlay
//              style={{
//                 // Optional custom styling if needed
//                 // background: "var(--Site-Black-25, rgba(13, 13, 13, 0.25))",
//                 // backdropFilter: "blur(13px)",
//              }}
//         >
//             <div
//                 className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8 text-gray-800"
//                 onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
//             >
//                 {/* Close Button */}
//                 <button
//                     onClick={handleClose}
//                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100"
//                     aria-label="Close popup"
//                 >
//                     <CloseIcon />
//                 </button>

//                 {isSubmitted ? (
//                     // Success State
//                     <div className="text-center">
//                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-green-500 mb-4">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
//                         <p className="text-gray-600">Redirecting you now...</p>
//                     </div>
//                 ) : (
//                     // Form State
//                     <>
//                         {/* Use your desired text/styles */}
//                         <h2 className="text-primary-dark text-h5 sm:text-h4 font-semibold mb-3 text-center">WARNING!!!</h2>
//                         <p className="text-grey mb-6 text-center text-normal4 sm:text-normal3">
//                             Entering Your Email May Cause Serious Regular Cravings🫣😱😨
//                         </p>

//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div>
//                                 <label htmlFor="newsletter-email" className="sr-only">Email address</label>
//                                 <input
//                                     type="email"
//                                     id="newsletter-email"
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     placeholder="your.email@example.com"
//                                     required
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent transition-shadow"
//                                     disabled={isLoading}
//                                 />
//                             </div>
//                              <div className="flex items-start">
//                                 <div className="flex items-center h-5">
//                                     <input
//                                         id="no-marketing"
//                                         type="checkbox"
//                                         checked={noMarketing}
//                                         onChange={(e) => setNoMarketing(e.target.checked)}
//                                         className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-primary-dark"
//                                     />
//                                 </div>
//                                 <div className="ml-3 text-sm">
//                                     <label htmlFor="no-marketing" className="text-gray-600">
//                                         Do not use this email for marketing purposes.
//                                     </label>
//                                 </div>
//                             </div>

//                             {error && <p className="text-red-500 text-sm">{error}</p>}
//                             <button
//                                 type="submit"
//                                 disabled={isLoading}
//                                 className={`w-full px-5 py-2.5 rounded-full text-white font-medium text-normal2 transition-colors duration-200 ease-in-out flex items-center justify-center ${isLoading
//                                         ? 'bg-gray-400 cursor-not-allowed' // Adjusted disabled style
//                                         : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' // Use your theme colors
//                                     }`}
//                             >
//                                 {isLoading ? (
//                                     <>
//                                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Subscribing...
//                                     </>
//                                 ) : (
//                                     'Subscribe & Continue' // Updated button text
//                                 )}
//                             </button>
//                         </form>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default RedirectPopup;