const fbLink = "https://www.facebook.com/profile.php?id=100007712806834";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#ffd500" }}>
      <div
        className="py-3 d-flex flex-column justify-content-center align-items-center"
        style={{ gap: 8 }}
      >
        <p className="text-center fw-bold mb-0">Copyright © 2023 ShopMacs</p>
        <p className="text-center mb-0" style={{ fontSize: 13 }}>
          0988113999
        </p>
        <div className="d-flex align-items-center" style={{ gap: 5 }}>
          <img
            src="/map.png"
            style={{ width: 450, cursor: "pointer", borderRadius: 8 }}
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/49+P.+V%C4%83n+H%E1%BB%99i,+%C4%90%C3%B4ng+Ng%E1%BA%A1c,+T%E1%BB%AB+Li%C3%AAm,+H%C3%A0+N%E1%BB%99i,+Vietnam/@21.0787715,105.7735528,18.36z/data=!4m5!3m4!1s0x31345536cd0ea337:0xd9bcd386380979fd!8m2!3d21.0785615!4d105.7740164"
              )
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
