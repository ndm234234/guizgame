import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import { forwardRef, useImperativeHandle, useRef } from 'react';

import Spinner from 'react-bootstrap/Spinner';
import "bootstrap/dist/css/bootstrap.css";

import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading_screen">
      <div className="text-center">
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: '4rem', height: '4rem' }}
        />
        <h4 className="mt-3">Загрузка приложения ...</h4>
      </div>
    </div>
  );
};

export default LoadingScreen;