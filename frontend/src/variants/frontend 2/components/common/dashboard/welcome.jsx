import React, { useState, useEffect } from "react";

const Welcome = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation when component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="dashboard">
      {/* Top Banner with slide-in effect from top */}
      <section
        className={`bg-[#F3D67D] text-brown-700 rounded-[18px] px-7 py-5 flex flex-col gap-1.5 shadow-lg w-full items-start mb-5 transition-all duration-1000 ease-in-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <h1 className="m-0 text-[30px] text-black font-extrabold transition-transform duration-1000 ease-out">
          Welcome Back Registrar!
        </h1>
        <p className="m-0 text-[rgba(30,30,30,0.6)] font-semibold transition-all duration-1000 ease-out delay-100">
          Here is what's happening at Gymnazo Christian Academy - Novaliches now
        </p>
      </section>
    </div>
  );
};

export default Welcome;
