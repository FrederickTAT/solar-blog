import debounce from '@material-ui/utils/debounce';
import { throttle } from 'lodash';
import { FC, useEffect, useRef } from 'react';
import Styles from './index.module.less';

const NavBar: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const minHeight = 50;
  const maxHeight = 600;
  const getNavbarHeight = () => {
    const scrollTop = document.documentElement.scrollTop;
    if (ref.current) {
      const newHeight = maxHeight - scrollTop;
      return Math.max(minHeight, newHeight);
    }
  };
  const setNavbarRef = useRef(
    throttle((height = minHeight) => {
      if (!ref.current) {
        return;
      }
      if (height) {
        ref.current.style.height = `${height}px`;
      }
    }, 10)
  );
  const initHeightRef = useRef(
    debounce(() => {
      setNavbarRef.current(getNavbarHeight());
    }, 100)
  );

  useEffect(() => {
    initHeightRef.current();
    window.addEventListener('scroll', () => {
      setNavbarRef.current(getNavbarHeight());
    });
  }, []);

  const Planet: FC<{ name: string; size: number; distance: string }> = ({ size, name, distance }) => {
    return (
      <div className={Styles.planet} style={{ left: distance }}>
        <div className={Styles.global} style={{ width: size, height: size }}></div>
        <div className={Styles.tagName}>{name}</div>
      </div>
    );
  };

  return (
    <div ref={ref} className={Styles.navbar} id="navbar">
      <div className={Styles.stars}>
        <div className={Styles.solar}></div>
        <div className={Styles.planets}>
          <Planet name="Mercury" size={50} distance="5%"></Planet>
          <Planet name="Venus" size={70} distance="19%"></Planet>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
