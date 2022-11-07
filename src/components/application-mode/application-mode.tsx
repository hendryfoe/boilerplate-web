import { EnvironmentConstant } from 'constants/environment.constant';

import './application-mode.less';

const environment = EnvironmentConstant.VITE_MODE_ENV;
const isDevelopment = environment === 'development' || environment === 'testing';

function ApplicationMode() {
  if (isDevelopment) {
    return (
      <div className="ribbon">
        <span className="bg-success">{environment} MODE</span>
      </div>
    );
  }

  return null;
}

export { ApplicationMode };
