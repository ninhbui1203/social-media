function Carousel({ images, idPost }) {
  const isActive = (index) => {
    if (index === 0) return "active";
  };
  const idName = `#carousel-${idPost}`;
  return (
    <div
      id={`carousel-${idPost}`}
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${isActive(index)}`}>
            <img
              src={image.url}
              className="d-block w-100"
              alt={image.public_id}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <ol className="carousel-indicators">
            {images.map((image, index) => (
              <li
                key={index}
                data-target={idName}
                data-slide-to={index}
                className={isActive(index)}
              ></li>
            ))}
          </ol>
          <a
            className="carousel-control-prev"
            href={idName}
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href={idName}
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </>
      )}
    </div>
  );
}

export default Carousel;
