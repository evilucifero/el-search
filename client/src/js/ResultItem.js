import React from 'react';

export default (props) => {
  const {title, url, summary} = props;

  return (
    <div className="result-item-container">
      <h4 className="result-item-title">
        <a href={url} target="_blank">{title}</a>
      </h4>
      <p className="result-item-summary" >...{summary}...</p>
      <p className="result-item-url">{url}</p>
    </div>
  );
}
