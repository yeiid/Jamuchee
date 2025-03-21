import React from "react";
import Image from "next/image";

const Card = ({ title, subtitle, imageUrl, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        {subtitle && <h3 className="card-subtitle">{subtitle}</h3>}
      </div>

      {imageUrl && (
        <div className="card-image">
          <Image 
            src={imageUrl} 
            alt={title} 
            width={500} 
            height={300} 
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {children && <div className="card-content">{children}</div>}
    </div>
  );
};

export default Card;
