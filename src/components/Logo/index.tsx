import React from 'react';
import { Image, Link } from '@chakra-ui/react';

import logo from '../../assets/logo.png';

const Logo = (): React.ReactElement => {
  return (
    <Link href="http://wcs.illinois.edu">
      <Image src={logo} alt="wcs logo" />
    </Link>
  );
};

export default Logo;
