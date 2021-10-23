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
    const sphereBorderWidth = 2;
    const tagMargin = 8;
    const bottomOffset = (tagMargin + sphereBorderWidth) / 2;
    const labelWidth = fontSize * name.length;
    const unitSize = 9;
    const globalHeight = radius * unitSize + fontSize + tagMargin + 2 * sphereBorderWidth;

    const planetRef = useRef<HTMLDivElement>(null);
    const globalRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      window.addEventListener('scroll', () => {
        const planetHeight = planetRef.current?.getBoundingClientRect().height;
        if (!planetHeight) return;
        const _ratio = (planetHeight - minHeight) / (maxHeight - minHeight);
        const ratio = Math.max(_ratio - 0.01, 0);
        const globalStyle = globalRef.current?.style;
        if (globalStyle && sphereRef.current && tagRef.current) {
          sphereRef.current.style.opacity = `${ratio}`;
          globalStyle.height = `${ratio * globalHeight}px`;
          globalStyle.transform = `translateY(${ratio * bottomOffset + fontSize / 2}px)`;
        }
      });
    }, []);
    return (
      <div ref={planetRef} className={Styles.planet} style={{ minWidth: labelWidth }}>
        <div className={Styles.oribit} />
        <div
          ref={globalRef}
          className={Styles.global}
          style={{
            height: globalHeight,
            transform: `translateY(${fontSize / 2 + bottomOffset}px)`,
          }}
        >
          <div
            className={Styles.sphere}
            ref={sphereRef}
            style={{
              borderWidth: sphereBorderWidth,
              width: radius * unitSize,
              height: radius * unitSize,
              bottom: fontSize + tagMargin,
            }}
          ></div>
          <div className={Styles.divider} style={{ bottom: fontSize / 2 }}></div>
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
