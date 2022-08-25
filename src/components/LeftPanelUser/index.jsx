const LeftPanelUser = () => {
  return (
    <div className="left-panel__user clearfix">
      <div className="left-panel__user-photo">
        <img src="./images/avatar-128.jpg" alt="Avatar" />
      </div>
      <div className="left-panel__user-name">
        Петр <br />
        Васильевич
      </div>
    </div>
  );
};

export default LeftPanelUser;
