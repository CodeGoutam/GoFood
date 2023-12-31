const Carousel = () => {
    return (
        <>
            <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade mb-1 "
                style={{ marginTop: "65px", marginLeft: "10px", marginRight: "10px" }}
            >
                <div className="carousel-inner p-1">
                    <div className="carousel-item active">
                        <img
                            src="https://source.unsplash.com/random/200×300/?pizza"
                            className="d-block w-100"
                            alt="..."
                            style={{
                                height: "260px",
                                objectFit: "fill",
                                backgroundSize: "auto"
                            }}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://source.unsplash.com/random/200×300/?burger"
                            className="d-block w-100"
                            alt="..."
                            style={{
                                height: "260px",
                                objectFit: "fill",
                                backgroundSize: "auto",
                            }}
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src="https://source.unsplash.com/random/200×300/?sandwich"
                            className="d-block w-100"
                            alt="..."
                            style={{
                                height: "260px",
                                objectFit: "fill",
                                backgroundSize: "auto",
                            }}
                        />
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
};
export default Carousel;
// https://source.unsplash.com/random/200×300/?pizza
// https://source.unsplash.com/random/200×300/?burger
// https://source.unsplash.com/random/200×300/?mango
