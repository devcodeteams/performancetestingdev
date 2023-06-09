import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import userProfileCss from '../assets/userProfile.module.css';
import WebContext from '../Context/WebContext';
import React, { useContext, useState } from 'react';
import { Button, CloseButton, Dropdown, Modal } from 'react-bootstrap';
import LogoutImage from '../assets/images/Logout.png';
import Community from '../assets/images/community.png';
import { useRouter } from 'next/router';
import logoutUserCall from 'src/API/logoutUserCall';
import { getValueFromCookie } from 'assets/helpers/helperFunctions';
import Link from 'next/link';
import FirebaseContext from 'src/Context/FirebaseContext';
import AxiosRequest from 'src/API/AxiosRequest';
import darkModeCss from '../assets/darkTheme.module.css';

type UserProfileProps = ComponentProps & {
  fields: {
    Image: ImageField;
    LogoURL: {
      value: {
        href: string;
      };
    };
  };
};

const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { setIsLoggedIn, setUserToken, userObject } = { ...useContext(WebContext) };
  const { deleteTokenFromFirebase, getFcmTokenFromLocalStorage } = {
    ...useContext(FirebaseContext),
  };
  const { darkMode } = {
    ...useContext(WebContext),
  };
  // console.log('profile', props);
  const router = useRouter();

  const [showLogoutPopUp, setLogoutPopUp] = useState(false);

  const LogoutPopup = () => {
    return (
      <>
        <Modal
          className={`modalContent ${darkMode ? darkModeCss.darkModeModal : ''}`}
          show={showLogoutPopUp}
          onHide={() => setLogoutPopUp(false)}
          backdrop="static"
          keyboard={false}
          centered
          scrollable={true}
        >
          <div>
            <Modal.Header className={`modalHeader ${darkMode ? darkModeCss.grey_3 : ''}`}>
              <Modal.Title className={`modalTitle ${darkMode ? darkModeCss.text_green : ''}`}>{'Logout'}</Modal.Title>
              <CloseButton
                variant="default"
                className={`modalClose ${darkMode ? darkModeCss.invertFilter : ''}`}
                onClick={() => {
                  setLogoutPopUp(false);
                }}
              ></CloseButton>
            </Modal.Header>
            <Modal.Body className={`${darkMode ? darkModeCss.grey_3 : ''} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>
              <div className='modalBody'>{`Do you want to logout ?`}</div>
            </Modal.Body>
            <Modal.Footer className={`${darkMode ? darkModeCss.grey_3 : ''} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>
              <Button
                className='footerBtnCancel'
                variant="default"
                onClick={() => {
                  setLogoutPopUp(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className='footerBtnDefault'
                variant="secondary"
                onClick={() => {
                  logOutUser();
                }}
              >
                Logout
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </>
    );
  };

  const unMapFirebaseTokenFromCurrentUser = (fcm_token: string) => {
    AxiosRequest({
      method: 'POST',
      url: `https://accelerator-api-management.azure-api.net/graph-service/api/v1/unmap-uuid?uuid=${fcm_token}`,
    })
      .then((response: any) => {
        // console.log('APIResponseFCM', response);
        response;
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const logOutUser = async () => {
    let response = await logoutUserCall();
    if (
      response?.data?.code == 200 &&
      response?.data?.success &&
      setUserToken != undefined &&
      setIsLoggedIn != undefined
    ) {
      const fcmToken = getFcmTokenFromLocalStorage();
      if (fcmToken) {
        unMapFirebaseTokenFromCurrentUser(fcmToken);
      }
      let token = getValueFromCookie('UserToken');
      if (token != null) {
        document.cookie = `UserToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
      if (typeof localStorage !== 'undefined' && localStorage.getItem('UserToken')) {
        setLogoutPopUp(false);
        localStorage.clear();
        setUserToken('');
        setIsLoggedIn(false);
        router.push('/login');
      }
      deleteTokenFromFirebase();
    }
  };

  return (
    <div className={userProfileCss.userProfileContainer}>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" className={userProfileCss.userProfileDropdownBtn}>
          <img
            src={
              userObject?.profilePictureUrl
                ? userObject?.profilePictureUrl
                : props?.fields?.Image?.value?.src
            }
            width={32}
            height={32}
            style={{ borderRadius: '50%' }}
            title="Profile page"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className={userProfileCss.userProfileDropdownMenu}>
          <Dropdown.Item className={userProfileCss.userProfileDropdownItem}>
            <Link href={props.fields.LogoURL.value.href} passHref={true}>
              <div className={userProfileCss.userProfileOverlayItem}>
                <div className={userProfileCss.userProfileDropdownImage}>
                  <img
                    src={
                      userObject?.profilePictureUrl
                        ? userObject?.profilePictureUrl
                        : props?.fields?.Image?.value?.src
                    }
                    width={20}
                    height={20}
                    style={{ borderRadius: '50%' }}
                    title="Profile page"
                  />
                </div>
                <div className={userProfileCss.userProfileBtn}> Edit Profile</div>
              </div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className={userProfileCss.userProfileDropdownItem}>
            <Link href={'/explorecommunity'} passHref={true}>
              <div className={userProfileCss.userProfileOverlayItem}>
                <div className={userProfileCss.userProfileDropdownImage}>
                  <img
                    src={Community.src}
                    width={20}
                    height={20}
                    style={{ borderRadius: '50%' }}
                    title="Profile page"
                  />
                </div>
                <div className={userProfileCss.userProfileBtn}>Explore Community</div>
              </div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className={userProfileCss.userProfileDropdownItem}>
            <Link href={'/bookmarklisting'} passHref={true}>
              <div className={userProfileCss.userProfileOverlayItem}>
                <div className={userProfileCss.userProfileDropdownImage}>
                  <img
                    src={Community.src}
                    width={20}
                    height={20}
                    style={{ borderRadius: '50%' }}
                    title="Profile page"
                  />
                </div>
                <div className={userProfileCss.userProfileBtn}>My Bookmarks</div>
              </div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item
            className={userProfileCss.userProfileDropdownItem}
            onClick={() => setLogoutPopUp(true)}
          >
            <div className={userProfileCss.userProfileOverlayItem}>
              <div className={userProfileCss.userProfileDropdownImage}>
                <NextImage field={LogoutImage} editable={true} />
              </div>
              <div className={userProfileCss.userProfileBtn}>Logout</div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {<LogoutPopup />}
    </div>
  );
};

export default UserProfile;
