import React, { useState, useEffect } from "react";

const StatistikSection = () => {
  const stats = [
    { angka: 1000, label: "Mentee" },
    { angka: 1000, label: "Mentor" },
    { angka: 1000, label: "Kampus" },
    { angka: 1000, label: "Program" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // durasi animasi 2 detik
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const updatedCounts = stats.map((s) => Math.floor(s.angka * progress));
      setCounts(updatedCounts);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="flex justify-center items-center gap-14">
      {stats.map((item, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-[#013B35]">{counts[i]}+</h3>
            <p className="text-lg text-gray-700 mt-2">{item.label}</p>
          </div>
          {i !== stats.length - 1 && (
            <div className="w-[2px] h-12 bg-[#013B35]"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatistikSection;
