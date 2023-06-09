import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Event from 'components/Event';
import SearchFlters from '../components/SearchFlters';
// import User from 'components/User';
// import SearchGroupResult from 'components/SearchGroupResult';
import styles from '../assets/seacrhPage.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
// import SideSearchFilter from 'components/sideSearchFilter';
import SearchGroupContainer from '../components/SearchGroupContainer';
import SearchUserContainer from '../components/SearchUserContainer';
import EventSearchContainer from '../components/EventSearchContainer';
import NewSearchContainer from '../components/NewSearchContainer';
import searchCall from '../../src/API/searchCall';
// import { getValueFromCookie } from '../assets/helpers/helperFunctions';
import WebContext from '../../src/Context/WebContext';
import JournalSearchContainer from '../components/JournalSearchContainer';
import CaseStudySearchContainer from './CaseStudySearchContainer';
import SearchALLConatiner from '../components/SearchALLConatiner';
import HashtagContainer from '../components/HashtagContainer';
import BlogContainer from '../components/BlogContainer';
// import PollConatiner from 'components/PollConatiner';
import ToastNotification from '../components/ToastNotification';
import ThemeSwitcher from '../components/ThemeSwitcher';

const SearchResults = () => {
  const router = useRouter();

  const { query, type } = router?.query;

  const [showNotification, setShowNofitication] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();

  // const [query, setQuery] = useState(router?.query?.query);
  // const [type, setType] = useState(router?.query?.type);

  const filter = [
    {
      type: 'ALL',
      value: 'All',
    },
    // {
    //   type: 'GROUP',
    //   value: 'Groups',
    // },
    {
      type: 'USER',
      value: 'User',
    },
    {
      type: 'EVENT',
      value: 'Events',
    },
    {
      type: 'HASHTAG',
      value: 'Hashtags',
    },
    {
      type: 'NEWS',
      value: 'News',
    },
    {
      type: 'JOURNAL',
      value: 'Journals',
    },
    // {
    //   type: 'ARTICLE',
    //   value: 'Articles',
    // },
    {
      type: 'CASESTUDY',
      value: 'Case Study',
    },
    {
      type: 'BLOG',
      value: 'Blog',
    },
    // {
    //   type: 'POLL',
    //   value: 'POLL',
    // },
  ];

  const [activeState, setActiveState] = useState(type);

  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
  };

  const handleClick = (type: any, query: any) => {
    if (type === 'ALL' && query != undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(
        [
          'description',
          'blog.heading',
          'blog.description',
          'firstName',
          'lastName',
          'objectId',
          'createdBy.firstName',
          'createdBy.lastName',
          'createdBy.objectId',
          'ShortDescription',
          'Title',
        ],
        type,
        query
      );
    }
    if (type === 'USER' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(['firstName', 'lastName', 'objectId'], type, query);
    }
    if (
      type === 'EVENT' &&
      query !== undefined &&
      type !== undefined &&
      query !== null &&
      type !== null
    ) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);
      searchCallFunction(
        [
          'description',
          'blog.heading',
          'blog.description',
          'firstName',
          'lastName',
          'objectId',
          'createdBy.firstName',
          'createdBy.lastName',
          'createdBy.objectId',
          'ShortDescription',
          'Title',
        ],
        type,
        query
      );
    }
    if (type === 'HASHTAG' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(['description', 'blog.heading', 'blog.description'], type, query);
    }
    if (type === 'NEWS' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(
        [
          'description',
          'createdBy.firstName',
          'firstName',
          'objectId',
          'ShortDescription',
          'Title',
        ],
        type,
        query
      );
    }
    if (type === 'JOURNAL' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(
        [
          'description',
          'createdBy.firstName',
          'firstName',
          'objectId',
          'ShortDescription',
          'Title',
        ],
        type,
        query
      );
    }
    if (type === 'ARTICLE' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(['description', 'blog.heading', 'blog.description'], type, query);
    }
    if (type === 'GROUP' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(['description', 'blog.heading', 'blog.description'], type, query);
    }
    if (type === 'BLOG' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);
      searchCallFunction(['description', 'blog.heading', 'blog.description'], type, query);
    }
    if (type === 'CASESTUDY' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);
      searchCallFunction(
        [
          'description',
          'createdBy.firstName',
          'firstName',
          'objectId',
          'ShortDescription',
          'Title',
        ],
        type,
        query
      );
    }
    if (type === 'POLL' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);
      searchCallFunction(['description', 'blog.heading', 'blog.description'], type, query);
    }
    setActiveState(type);
  };
  const { userToken, darkMode } = {
    ...useContext(WebContext),
  };

  // useEffect(() => {
  //   if (userToken == '') {
  //     let token = getValueFromCookie('UserToken');
  //     if (typeof document !== 'undefined' && token != '' && token != null) {
  //       if (setUserToken != undefined) {
  //         setUserToken(token);
  //       }
  //     } else {
  //       router.push('/login');
  //     }
  //   }
  // }, []);

  const [success, setSuccess] = useState(true);
  const [searchedData, setSearchedData] = useState<any>([]);

  const searchCallFunction = (filter: any, type: any, searchData: any) => {
    searchCall(searchData, type, userToken, filter).then((response: any) => {
      if (response?.data?.success === true) {
        if (response?.data?.data !== null && response?.data?.data !== undefined) {
          if (
            response?.data?.data?.totalHits !== null &&
            response?.data?.data?.totalHits !== undefined &&
            response?.data?.data?.totalHits?.value > 0
          ) {
            setSearchedData(response?.data?.data?.hits);
          } else {
            setSearchedData([]);
          }
        }
        setSuccess(false);
      } else {
        setToastMessage('Something Went Wrong please try again later');
        setToastError(true);
        setShowNofitication(true);
      }
    });
  };

  // useEffect(() => {
  //   setActiveState(type);
  //   handleClick(type, query);
  //   // setSearch(query);
  // }, [query, type]);

  useEffect(() => {
    setActiveState(type);
    // handleClick(type, query);
    // setSearch(query);
  }, [query, type]);
  useEffect(() => {
    if (query !== undefined && query !== null && userToken !== undefined && userToken !== null) {
      searchCallFunction(
        [
          'description',
          'blog.heading',
          'blog.description',
          'firstName',
          'lastName',
          'objectId',
          'createdBy.firstName',
          'createdBy.lastName',
          'createdBy.objectId',
          'ShortDescription',
          'Title',
        ],
        type,
        query
      );
    }
  }, [query]);

  // const [searchData, setSearch] = useState<any>('');

  // const onSearch = (e: any) => {
  //   e.preventDefault();
  //   router.push(`/search?query=${searchData}&type=${type}`);
  //   console.log('searchData', searchData);
  //   searchCallFunction(
  //     [
  //       'description',
  //       'blog.heading',
  //       'blog.description',
  //       'firstName',
  //       'lastName',
  //       'objectId',
  //       'createdBy.firstName',
  //       'createdBy.lastName',
  //       'createdBy.objectId',
  //     ],
  //     'ALL',
  //     searchData
  //   );
  // };

  // useEffect(() => {
  //   const getData = setTimeout(() => {
  //     searchCallFunction(
  //       [
  //         'description',
  //         'blog.heading',
  //         'blog.description',
  //         'firstName',
  //         'lastName',
  //         'objectId',
  //         'createdBy.firstName',
  //         'createdBy.lastName',
  //         'createdBy.objectId',
  //       ],
  //       'ALL',
  //       searchData
  //     );
  //     router.push(`/search?query=${searchData}&type=${type}`);
  //   }, 2000);

  //   return () => clearTimeout(getData);
  // }, [searchData]);

  return (
    <div className={`${styles.container} ${darkMode && darkModeCss.grey_1}`}>
      <div className={styles.ThemeSwitcher}>
        <ThemeSwitcher />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.pageHeadingContainer}>
          {/* <div className={styles.pageHeading}>
          <form>
            <input
              type="text"
              placeholder="Search"
              value={searchData}
              onChange={(e: any) => setSearch(e.target.value)}
              className={`${darkMode && darkModeCss.darkMode_textColor}`}
            />{' '}
            <input onClick={onSearch} type="submit" hidden />
          </form>
        </div> */}
        </div>
        {/* {console.log(
        '=====================================>>>>>>>>>>>>>>>>>>>>>>>>>>>',
        searchedData
      )} */}
        <SearchFlters activeState={activeState} filter={filter} handleClick={handleClick} />
        {activeState === 'ALL' ? (
          <SearchALLConatiner query={query} success={success} searchedData={searchedData} />
        ) : activeState === 'GROUP' ? (
          <SearchGroupContainer query={query} searchedData={searchedData} success={success} />
        ) : activeState === 'USER' ? (
          <SearchUserContainer query={query} searchedData={searchedData} success={success} />
        ) : activeState === 'EVENT' ? (
          <EventSearchContainer query={query} searchedData={searchedData} success={success} />
        ) : activeState === 'NEWS' ? (
          <NewSearchContainer searchedData={searchedData} success={success} />
        ) : activeState === 'JOURNAL' ? (
          <JournalSearchContainer searchedData={searchedData} query={query} success={success} />
        ) : activeState === 'CASESTUDY' ? (
          <CaseStudySearchContainer query={query} searchedData={searchedData} success={success} />
        ) : activeState === 'HASHTAG' ? (
          <HashtagContainer query={query} success={success} searchedData={searchedData} />
        ) : activeState === 'BLOG' ? (
          <BlogContainer success={success} query={query} searchedData={searchedData} />
        ) : activeState === 'POLL' ? (
          ''
        ) : (
          // <PollConatiner success={success} searchedData={searchedData} />

          ''
        )}
        {showNotification && (
          <ToastNotification
            showNotification={showNotification}
            success={toastSuccess}
            error={toastError}
            message={toastMessage}
            handleCallback={resetToastState}
          />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
