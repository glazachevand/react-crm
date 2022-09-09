import logoImg from '../assets/img/avatar-128.jpg';

export const User: React.FC = () => {
  return (
    <div className="left-panel__user clearfix">
      <div className="left-panel__user-photo">
        <img src={logoImg} alt="Avatar" />
        {/* <img src="./images/avatar-128.jpg" alt="Avatar" /> */}
      </div>
      <div className="left-panel__user-name">
        Надежда <br />
        Глазачева
      </div>
    </div>
  );
};
