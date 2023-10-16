import { Fragment, useEffect, useRef, useState } from 'react';
import { ScrollArea, Button, Stack, Drawer, Box } from '@mantine/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import useLayoutContext from '../../../../hooks/useLayoutContext';
import useAuth from '../../../../hooks/useAuth';
import { sectionData } from '../../../data';

import { Icons } from '../../../data/icons/icons';
import { PATH_CLIENT } from '../../../path/path-frontend';
import { ProfilePopover } from '../../../components/navigation/ProfilePopover';
import { useCookieContext } from '../../../context/CookieContext';
import { NavbarVerticalItem } from './NavbarVerticalItem';
// import classesM from './navbarStyle.module.css';
import { ColorSchemeToggle } from '../../../components/color-schemeToggle/ColorSchemeToggle';
import LogoutButton from './LogoutButton';
import OrganizationSpaceSelect from '../../../components/select-custom/OrganizationSpaceSelect';
import classesM from './NavbarVertical.module.css';
import { useCustomMQuery } from '../../../../hooks/useCustomMQuery';

// type NavbarConfig = { link: string; label: string; icon: TablerIcon };
// const navBarConfig: NavbarConfig[] = [];

// Object.keys(sectionData).forEach((key: string): void => {
//   const typedKey = key as Sections;
//   const config: NavbarConfig = {
//     link: sectionData[typedKey].link,
//     label: sectionData[typedKey].navbarTitle,
//     icon: /*  Icons[sectionData[typedKey].slice as IconsType] || Icons, */ Icons.home,
//   };
//   navBarConfig.push(config);
// });

export function NavbarVertical() {
  // const { classesM, cx } = navbarVerticalStyle();
  const { user, logout } = useAuth();
  const [active, setActive] = useState('');
  const { isOpen, closeBar } = useLayoutContext();
  const { asPath, query } = useRouter();
  const isMediaScreen = useMediaQuery('(max-width: 750px)');
  const isSuperAdmin = user?.role === 'super_admin';
  const { isMobile } = useCustomMQuery();
  const chooseText = isSuperAdmin ? 'Organization' : 'Space';
  // const isMobile = useMediaQuery('(max-width: 600px)');

  const chooseHref = isSuperAdmin ? PATH_CLIENT.chooseOrganization : PATH_CLIENT.chooseRootSpace;

  if (!user) return null;
  const links = sectionData.map((section, i) => {
    return (
      <Fragment key={section.name}>
        {section.roles?.includes(user.role) && !section.hide && (
          <>
            <p>{section.name}</p>
            {/* contents are sections: Top, posts,,, */}
            {section.contents.map((navbarContent) => (
              <NavbarVerticalItem
                key={navbarContent.navbarTitle}
                navbarContent={navbarContent}
                active={active}
              />
            ))}
          </>
        )}
      </Fragment>
    );
  });

  return (
    <>
      <nav className={classesM.navbar}>
        <ScrollArea>
          <div className={classesM.navbarMain}>
            <ProfilePopover />
          </div>
          {links.map((navbarData) => navbarData)}

          <div className={classesM.footer}>
            <Stack>
              <LogoutButton />
              {isMediaScreen && (
                <>
                  <Button
                    className={`${classesM.button} ${classesM.link}`}
                    component={Link}
                    href={chooseHref}
                  >
                    Choose {chooseText}
                  </Button>
                  <ColorSchemeToggle /* size="lg" */ /*  style={{ alignSelf: 'end' }} */ />
                </>
              )}
            </Stack>
          </div>
        </ScrollArea>
      </nav>

      {isMobile && (
        <Box className={`${classesM.invBox} ${isOpen ? classesM.fadeIn : ''}`} onClick={closeBar} />
      )}
    </>
  );
}
