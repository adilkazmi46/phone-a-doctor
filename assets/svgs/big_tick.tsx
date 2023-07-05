import React from 'react';
import Svg, {Circle, ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const BigTick = () => {
  return (
    <Svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <Circle opacity="0.1" cx="60" cy="60" r="60" fill="#27AD80" />
      <Circle cx="60" cy="60" r="45" fill="#27AD80" />
      <G clip-path="url(#clip0_0_1)">
        <Path
          d="M58.0117 74.2282C56.1075 76.1324 53.0178 76.1324 51.1145 74.2282L40.4282 63.5419C38.5239 61.6386 38.5239 58.5489 40.4282 56.6456C42.3314 54.7414 45.4212 54.7414 47.3254 56.6456L53.6923 63.0116C54.173 63.4913 54.9532 63.4913 55.4348 63.0116L72.6746 45.7718C74.5779 43.8676 77.6676 43.8676 79.5718 45.7718C80.4863 46.6862 81 47.9269 81 49.2199C81 50.513 80.4863 51.7537 79.5718 52.6681L58.0117 74.2282Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_0_1">
          <Rect
            width="42"
            height="42"
            fill="white"
            transform="translate(39 39)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default BigTick;
