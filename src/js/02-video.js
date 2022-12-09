import Pleyer from '@vimeo/player';
import _throttle from 'lodash.throttle';

const LOCAL_TIME_PAUSE = 'videoplayer-current-time';

const player = new Pleyer('vimeo-player');

player.on('loaded', () => {
  const currentTime = localStorage.getItem(LOCAL_TIME_PAUSE) || 0;
  player.setCurrentTime(currentTime);
});

player.on(
  'timeupdate',
  _throttle(({ seconds }) => {
    localStorage.setItem(LOCAL_TIME_PAUSE, seconds);
  }, 1000)
);
