import React, {} from 'react';

const Newsitems = (props)=> {

  let { title, description, imageurl, newsurl, date, author } = props;
  return (
    <div>
      
      <div className="card border border-light-subtle " style={{ width: "25rem", height: "30rem" }}>
        <img src={imageurl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}... <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">{author}</span></h5>
          <p className="card-text">{description}...</p>
          <p className="card-text text-danger-emphasis fw-semibold"> Pubslished On {new Date(date).toGMTString()}</p>
          <a href={newsurl} target='blank' className="btn btn-dark">more...</a>
        </div>
      </div>
    </div>
  );
}


export default Newsitems;






