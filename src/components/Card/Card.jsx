import React from "react";

const Card = ({ title, subtitle, imageUrl, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        {subtitle && <h3 className="card-subtitle">{subtitle}</h3>}
      </div>

      {imageUrl && (
        <div className="card-image">
          <img src={imageUrl} alt={title} />
        </div>
      )}

      {children && <div className="card-content">{children}</div>}
    </div>
  );
};

export default Card;
