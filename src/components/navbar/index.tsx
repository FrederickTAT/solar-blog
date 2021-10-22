import debounce from '@material-ui/utils/debounce';
import { throttle, transform } from 'lodash';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Styles from './index.module.less';

const NavBar: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const minHeight = 60;
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

  const Planet: FC<{ name: string; radius: number }> = ({ radius, name }) => {
    const fontSize = 18;
    const labelWidth = fontSize * name.length;
    const unitSize = 9;
    const planetRef = useRef<HTMLDivElement>(null);
    const globalRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      window.addEventListener('scroll', () => {
        const planetHeight = planetRef.current?.getBoundingClientRect().height;
        if (!planetHeight) return;
        const ratio = (planetHeight - 60) / 540 < 0.01 ? 0 : (planetHeight - 60) / 540;
        console.log(ratio);
        const globalStyle = globalRef.current?.style;
        if (sphereRef.current && tagRef.current) {
          sphereRef.current.style.opacity = `${ratio}`;
          sphereRef.current.style.transform = `translateY(-${50 * (1 - ratio)}%)`;
          tagRef.current.style.opacity = `${1 - ratio}`;
          tagRef.current.style.bottom = `calc(${50 * (1 - ratio)}% + ${8 * (1 - ratio)}px)`;
        }
      });
    }, []);
    return (
      <div ref={planetRef} className={Styles.planet} style={{ minWidth: labelWidth }}>
        <div className={Styles.oribit} />
        <div ref={globalRef} className={Styles.global} style={{ width: labelWidth }}>
          <div
            className={Styles.sphere}
            ref={sphereRef}
            style={{ width: radius * unitSize, height: radius * unitSize }}
          ></div>{' '}
          <div className={Styles.tag} ref={tagRef} style={{ fontSize }}>
            {name}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className={Styles.navbar} id="navbar">
      <div className={Styles.axis} />
      <div className={Styles.stars} style={{ left: -1000 }}>
        <div className={Styles.solar}>
          <span className={Styles.tag}>SOLAR</span>
        </div>
        <div className={Styles.planets}>
          <Planet name="MERCURY" radius={0.38}></Planet>
          <Planet name="VENUS" radius={0.94}></Planet>
          <Planet name="EARTH" radius={1}></Planet>
          <Planet name="MARS" radius={0.53}></Planet>
          <Planet name="JUPITER" radius={11.21}></Planet>
          <Planet name="SATURN" radius={9.45}></Planet>
          <Planet name="URANUS" radius={4.01}></Planet>
          <Planet name="NEPTUNE" radius={3.88}></Planet>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
