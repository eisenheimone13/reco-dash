import { COLORS } from "../../styles/colors";
import Logo from "../../assets/img/reco-logo.svg";
import { Link, useParams, useLocation } from "react-router";

const AppDrawer = () => {
  const location = useLocation();

  const navigationMenu = [
    {
      title: "Apps Discovery",
      path: "/",
    },
    {
      title: "Apps Inventory",
      path: "/inventory",
    },
    {
      title: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: COLORS.Serfice[1],
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={Logo} alt="logo" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
        {navigationMenu.map((menu, idx) => {
          const isActive = location.pathname === menu.path;

          return (
            <Link
              key={idx}
              to={menu.path}
              style={{
                padding: "10px 12px",
                textDecoration: "none",
                color: COLORS.white,
                borderLeft: isActive
                  ? "4px solid #B5E600"
                  : "4px solid transparent",
                backgroundColor: isActive ? COLORS.Serfice[2] : "transparent",
                fontWeight: 500,
                fontSize: 12,
              }}
            >
              {menu.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AppDrawer;
