import React from 'react';

export default function Spinner () {
  return (
    <>
      <div id='spinner'></div>

      <style>
        {`
          #spinner {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.5);
          }

          #spinner::after {
            content: '';
            width: 75px;
            height: 75px;
            border: 15px solid gray;
            border-top-color: #ffd100;
            border-radius: 50%;
            animation: loading 0.75s ease infinite;
          }

          @keyframes loading {
            from{
              transform: rotate(0turn);
            }
            to {
              transform: rotate(1turn)
            }
          }
        `}
      </style>
    </>
  );
}
