import SvgIcon from "@mui/material/SvgIcon";

export default function ClarkIcon() {
  return (
    <SvgIcon sx={{ height: 21, width: 100, mr: 2 }}>
      <svg
        viewBox="0 0 280 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8"
      >
        <path d="M15 30L25 10L22 28H32L22 50L25 32H15Z" fill="#16a34a" />

        <text
          x="38"
          y="42"
          fill="#007af2"
          style={{ font: "bold 32px sans-serif", letterSpacing: "-1px" }}
        >
          CLARK
        </text>

        <text
          x="145"
          y="42"
          fill="#16a34a"
          style={{ font: "normal 32px sans-serif", letterSpacing: "-1px" }}
        >
          ENERGY
        </text>
      </svg>
    </SvgIcon>
  );
}
