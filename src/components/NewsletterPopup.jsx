// // src/components/NewsletterPopup.jsx
// import React, { useState, useEffect } from 'react';
// import { db } from '../firebaseConfig';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// // Simple SVG Close Icon
// const CloseIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//     </svg>
// );

// // This component now triggers automatically after a delay
// function NewsletterPopup() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [email, setEmail] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [noMarketing, setNoMarketing] = useState(false); // User's marketing preference
//     const [error, setError] = useState('');
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [hasMounted, setHasMounted] = useState(false);

//     useEffect(() => {
//         localStorage.setItem('alreadyopen', 'true');
//         setHasMounted(true);
//     }, []);

//     useEffect(() => {
//         if (!hasMounted) return;

//         const timer = setTimeout(() => {
//             const alreadySubscribed = localStorage.getItem('newsletterSubscribed') || localStorage.getItem('alreadyopen');
//             if (!alreadySubscribed) {
//                 setIsOpen(true);
//                 setIsSubmitted(false);
//                 setError('');
//             } else {
//             }
//         }, 10000);

//         return () => clearTimeout(timer);

//     }, [hasMounted]); 


//     const handleClose = () => {
//         setIsOpen(false);
//         setError('');
//         localStorage.setItem('alreadyopen', 'false'); 
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!email || !/\S+@\S+\.\S+/.test(email)) {
//             setError('Please enter a valid email address.');
//             return;
//         }

//         setIsLoading(true);
//         setError('');
//         setIsSubmitted(false);

//         try {
//             const subscribersCollectionRef = collection(db, 'subscribers');
//             await addDoc(subscribersCollectionRef, {
//                 email: email,
//                 subscribedAt: serverTimestamp(),
//                 noMarketing: noMarketing
//             });

//             setIsSubmitted(true);
//             setEmail('');
//             localStorage.setItem('newsletterSubscribed', 'true');

//             setTimeout(() => {
//                 handleClose();
//             }, 1000);

//         } catch (err) {
//             console.error("Error adding document: ", err);
//             setError('Subscription failed. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     if (!isOpen || !hasMounted) {
//         return null;
//     }

//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
//             onClick={handleClose} 
//             style={{
//                 background: "var(--Site-Black-25, rgba(13, 13, 13, 0.25))",
//                 backdropFilter: "blur(13px)",
//             }}
//         >
//             <div
//                 className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8 text-gray-800"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {/* Close Button */}
//                 <button
//                     onClick={handleClose}
//                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100"
//                     aria-label="Close newsletter popup"
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
//                         <p className="text-gray-600">You've successfully subscribed to our newsletter.</p>
//                     </div>
//                 ) : (
//                     // Form State
//                     <>
//                         <h2 className="text-primary-dark text-h5 sm:text-h4 font-semibold mb-3 text-center">Stay Updated!</h2>
//                         <p className="text-grey mb-6 text-center text-normal4 sm:text-normal3">
//                             Subscribe to our newsletter for the latest news, updates, and offers.
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
//                             <div className="flex items-start">
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
//                                         ? 'bg-primary-dark cursor-not-allowed'
//                                         : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
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
//                                     'Subscribe Now'
//                                 )}
//                             </button>
//                         </form>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default NewsletterPopup;