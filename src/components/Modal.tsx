import React from 'react';

type ModalProps = {
  open: boolean;
  clickHandler: () => void;
  text: string;
};

export const Modal: React.FC<ModalProps> = ({ open, clickHandler, text }) => {
  return (
    <div className={`overlay animated ${open ? 'show' : ''}`}>
      <div className="message">
        <svg height="200" viewBox="0 0 200 200" width="200" onClick={clickHandler}>
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
        <p>{text}</p>
        <button className="btn btn-primary" onClick={clickHandler}>
          OK
        </button>
      </div>
    </div>
  );
};
