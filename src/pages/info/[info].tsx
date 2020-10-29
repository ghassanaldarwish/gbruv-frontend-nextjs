// #region Global Imports
import React from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

import { InfoPageEnum } from '../../components/Layout/Navbar/Navbar.types';
import { withTranslation } from '../../utils/with-i18next';

const Layout = dynamic(import('../../components/Layout/Layout'));

const Info = (props: any) => {
  const { page, path, currentPath } = props;
  const about = () => {
    const About = dynamic(import('./about/about'));
    return <About page={page} />;
  };

  const infoContainer = () => {
    const InfoContainer = dynamic(import('./container/container'));
    return <InfoContainer page={page} />;
  };

  const contact = () => {
    const Contact = dynamic(import('./contact/contact'));
    return <Contact page={page} />;
  };
  const faq = () => {
    const Faq = dynamic(import('./faq/faq'));
    return <Faq page={page} />;
  };

  const ourTeam = () => {
    const OurTeam = dynamic(import('./OurTeam'));
    return <OurTeam page={page} />;
  };

  const renderInfoPage = () => {
    if (currentPath == InfoPageEnum.About) {
      return about();
    }
    if (currentPath == InfoPageEnum.Contact) {
      return contact();
    }
    if (currentPath == InfoPageEnum.QAndA) {
      return faq();
    }
    if (currentPath == InfoPageEnum.OurTeam) {
      return ourTeam();
    }
    return infoContainer();
  };
  return !!page && <Layout page={page}>{page && renderInfoPage()}</Layout>;
};

export async function getServerSideProps(props: any) {
  const {
    asPath,
    query: { info },
  } = props;

  const { backendApiURL } = process.env;
  const { frontendURL } = process.env;

  try {
    const pageData = await axios(`${backendApiURL}info/${info}`);
    // console.log("pageData now==>", pageData);
    return {
      props: {
        namespacesRequired: ['common'],
        page: pageData.data,
        path: `${frontendURL}${asPath || null}`,
        currentPath: asPath || null,
      },
    };
  } catch (ex) {
    console.log('ex ==> ', ex);
    return { props: { namespacesRequired: ['common'] } };
  }
}
Info.defaultProps = {
  namespacesRequired: ['common'],
};

export default withTranslation('common')(Info);