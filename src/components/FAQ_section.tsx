import FAQ from './FAQ';

const FAQSection = () => {
  // Sample FAQ data
  const faqItems = [
    {
      question: "What areas do you serve?",
      answer: "We serve the Honolulu community, especially the Chinatown area and nearby neighborhoods. Locals and visitors alike love our authentic Taiwanese dishes."
    },
    {
      question: "Where are you located?",
      answer: "We’re located on Floor 1 of the Chinatown Cultural Plaza in Honolulu, Hawaii. Come find us near the heart of Chinatown!"
    },
    {
      question: "What are your opening hours?",
      answer: "We’re open daily from 10:30 AM to 2:30 PM for lunch and from 4:30 PM to 8:30 PM for dinner. No dinner on Sundays",
    },
    {
      question: "Do you offer takeaway or delivery services?",
      answer: "As of right now, we’re only offering takeout services to our customers."
    },
    {
      question: "Do I need a reservation, or do you accept walk-ins?",
      answer: "Walk-ins are welcome! Reservations are only needed for large groups or special events."
    },
    {
      question: "Is parking available nearby?",
      answer: "Yes, parking is available at the Cultural Plaza and nearby street parking is usually easy to find."
    }
  ];

  return (
    <div className="">
      <FAQ faqItems={faqItems} />
    </div>
  );
};

export default FAQSection;