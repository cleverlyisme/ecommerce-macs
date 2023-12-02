const fbLink = "https://www.facebook.com/imcleverly/";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#ffd500" }}>
      <div
        className="py-3 d-flex flex-column justify-content-center align-items-center"
        style={{ gap: 8 }}
      >
        <p className="text-center fw-bold mb-0">Copyright © 2023 ShopMacs</p>
        <p className="text-center mb-0" style={{ fontSize: 13 }}>
          0337223434
        </p>
        <div className="d-flex align-items-center px-2" style={{ gap: 5 }}>
          <img
            src="/map.png"
            style={{
              width: 450,
              maxWidth: "100%",
              cursor: "pointer",
              borderRadius: 8,
            }}
            onClick={() =>
              window.open("https://maps.app.goo.gl/7hCq5mri4y8DwNFU7")
            }
          />
        </div>
        <div
          className="text-center mb-0"
          style={{ fontSize: 13, cursor: "pointer", fontWeight: 600 }}
          onClick={() => window.open("https://checkcoverage.apple.com/")}
        >
          Kiểm tra bảo hành
        </div>
        <div className="d-flex align-items-center" style={{ gap: 5 }}>
          <img
            src="/fb.png"
            alt="fb"
            width="16px"
            height="16px"
            style={{ cursor: "pointer" }}
            onClick={() => window.open(fbLink)}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
