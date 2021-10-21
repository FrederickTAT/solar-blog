import debounce from '@material-ui/utils/debounce';
import { throttle } from 'lodash';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Styles from './index.module.less';

const NavBar: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const minHeight = 50;
  const maxHeight = 600;
  const ER = 10; // EarthRadius
  const solarPos = -850;
  const solarRaduis = 1000;
  const [mode, setMode] = useState('fit');

  const getAU = () => {
    return (window.innerWidth - solarRaduis - solarPos) / 35;
  };

  const [AU, setAU] = useState<number>(getAU());
  const [abbr, setAbbr] = useState(window.innerWidth < 1000);

  const SolarySystem = useMemo(
    () =>
      [
        {
          name: 'MERCURY',
          oribit: 0.38709 * AU,
          radius: 0.3825 * ER,
        },
        {
          name: 'VENUS',
          oribit: 0.72332 * AU,
          radius: 0.9488 * ER,
        },
        {
          name: 'EARTH',
          oribit: AU,
          radius: ER,
        },
        {
          name: 'MARS',
          oribit: 1.52366 * AU,
          radius: 0.53226 * ER,
        },
        {
          name: 'JUPITER',
          oribit: 5.20336 * AU,
          radius: 11.209 * ER,
        },
        {
          name: 'SATURN',
          oribit: 9.53707 * AU,
          radius: 9.449 * ER,
        },
        {
          name: 'URANUS',
          oribit: 19.19126 * AU,
          radius: 4.007 * ER,
        },
        {
          name: 'NEPTUNE',
          oribit: 30 * AU,
          radius: ER,
        },
      ].map(planet => ({ ...planet, name: abbr ? planet.name.substr(0, 3) : planet.name })),
    [AU, abbr]
  );

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
    window.addEventListener('resize', () => {
      setAU(getAU());

      setAbbr(window.innerWidth < 1000);
    });
  }, []);

  const Planet: FC<{ name: string; radius: number; oribit: number }> = ({ radius, name, oribit }) => {
    return (
      <div className={Styles.planet} style={{ left: oribit - solarRaduis }}>
        <div
          className={Styles.oribit}
          style={{
            width: 2 * oribit,
            height: 2 * oribit,
            left: `calc(50% - ${oribit}px)`,
          }}
        />
        {/* <div
          className={Styles.boundary}
          style={{
            width: 65 + radius,
            height: 65 + radius,
          }}
        /> */}
        <div className={Styles.global}>
          <div className={Styles.sphere} style={{ width: radius, height: radius }}></div>
          <div className={Styles.tagName}>{name}</div>
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className={Styles.navbar} id="navbar">
      {/* <div className={Styles.axis} /> */}
      <div className={Styles.stars}>
        <div className={Styles.solar} style={{ left: solarPos, width: solarRaduis * 2, height: solarRaduis * 2 }}></div>
        <div className={Styles.planets} style={{ left: solarRaduis + solarPos + 6 }}>
          {SolarySystem.map((planet, index) => (
            <Planet
              key={planet.name}
              {...planet}
              oribit={mode === 'fit' ? solarRaduis + (index + 1) * AU * 4 : planet.oribit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
