import LeftPanelLogo from "../LeftPanelLogo";
import LeftPanelNav from "../LeftPanelNav";
import LeftPanelUser from "../LeftPanelUser";
import "./style.css";

const LeftPanel = () => {
  return (
    <div className="left-panel blue-skin">
      <LeftPanelLogo />
      <LeftPanelUser />
      <LeftPanelNav />
    </div>
  );
};

export default LeftPanel;
