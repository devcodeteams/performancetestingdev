import { Field, ImageField, NextImage, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import ArticlesListCss from '../assets/ArticlesList.module.css';
import sourceImage from '../assets/images/source.svg';
import calendarImage from '../assets/images/calendar.svg';
import bookmarkImage from '../assets/images/bookmark.svg';
import activeBookmarkImage from '../assets/images/BookmarActive.svg';
import shareImage from '../assets/images/share.svg';
import linkedin from '../assets/images/linkedin.png';
import twitter from '../assets/images/twitter.png';
import whatsapp from '../assets/images/whatsapp.png';
import bookmark from '../../src/API/bookmarks';
import { useContext, useEffect, useState } from 'react';
import WebContext from 'src/Context/WebContext';
// import { useRouter } from 'next/router';
import facebook from '../assets/images/facebook.svg';
import FilterByDate from './FilterByDate';
import SideBar from './SideBar';

type ArticlesListProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type Item = {
  id: string;
  url: {
    url: string;
  };
  title: {
    jsonValue: Field<string>;
  };
  shortDescription: {
    jsonValue: RichTextField;
  };
  image: {
    jsonValue: ImageField;
  };
  date: {
    jsonValue: Field<string>;
  };
  authorName: {
    jsonValue: Field<string>;
  };
  
  tags: {
    targetItems: [
      {
        name: Field<string>;
      }
    ];
  };
  contentType: {
    targetItems: [
      {
        name: Field<string>;
      }
    ];
  };
};
type Content = {
  name_f18b1a9ad1ff4c13ad6080a2f710e438: {
    jsonValue: Field<string>;
  };
};
type DataSource = {
  articlesList: {
    targetItems: Item[];
  };
  articleContentType: {
    targetItems: Content[];
  };
};

const getFormatedDate = (stringDate: string) => {
  const date = new Date(stringDate);

  // Get month abbreviation
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

  // Get day with leading zero if necessary
  const day = String(date.getDate()).padStart(2, '0');

  // Get full year
  const year = date.getFullYear();

  // Combine into formatted string
  const formattedDate = `${month} ${day} ${year}`;

  return formattedDate;
};

const ArticlesList = (props: ArticlesListProps): JSX.Element => {
  const dataum = props?.fields?.data?.datasource?.articleContentType?.targetItems;

  const { userToken, setUserToken } = { ...useContext(WebContext) };

  const setTokenFromLocalStorage = () => {
    if (userToken === undefined || userToken === '') {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let token = localStorage.getItem('UserToken');
        if (token != null && setUserToken != undefined) {
          setUserToken(token);
        }
      }
    }
  };

  const [bookmarkTYpeClicked, setbookmarkTYpeClicked] = useState<any>(['all']);


  const userIdTemp = 'a@gmail.com';

  // const router = useRouter();

  const { targetItems } = props?.fields?.data?.datasource?.articlesList;

  const [bookmarkLists, setBookmarkLists] = useState<any>(targetItems);
  const [completeList] = useState<any>(targetItems);

  const [selectedArticle, setSelectedArticle] = useState<any>([]);
  const [shareArticle, setShareArticle] = useState<any>([]);

  // Change the bookmark image with active bookmark image
  const handleSelectedArticle = (id: any) => {
    if (selectedArticle.includes(id)) {
      const index = selectedArticle.indexOf(id);

      if (index > -1) {
        selectedArticle.splice(index, 1);
      }
    } else {
      setSelectedArticle([...selectedArticle, id]);
    }
  };

  const handleShareClick = (id: any) => {
    // if (clicked) {
    //   setShowPopup(false);
    // } else {
    //   setShowPopup(true);
    // }
    // setClicked(!clicked);
    if (shareArticle.includes(id)) {
      setShareArticle([]);
    } else {
      setShareArticle(id);
    }
  };

  const twoFilters = (nowDateArticle: any) => {
    let doubleFilter = nowDateArticle?.filter((item: any) => {
      return item?.contentType?.targetItem?.name === bookmarkTYpeClicked;
    });
    console.log(doubleFilter);
    setBookmarkLists(doubleFilter);
  };

  const pastArticle = () => {
    let nowDateArticle = completeList?.filter((item: any) => {
      return item?.date?.jsonValue?.value < new Date().toJSON();
    });
    if (bookmarkTYpeClicked[0] === 'all') {
      setBookmarkLists(nowDateArticle);
    } else {
      setBookmarkLists(nowDateArticle);
      twoFilters(nowDateArticle);
    }

    console.log(bookmarkLists);
  };
  const nowArticles = () => {
    let nowDateArticle = completeList?.filter((item: any) => {
      return item?.date?.jsonValue?.value === new Date().toJSON();
    });
    if (bookmarkTYpeClicked[0] === 'all') {
      setBookmarkLists(nowDateArticle);
    } else {
      setBookmarkLists(nowDateArticle);
      twoFilters(nowDateArticle);
    }
  };

  const upComingArticle = () => {
    let nowDateArticle = completeList?.filter((item: any) => {
      return item?.date?.jsonValue?.value > new Date().toJSON();
    });
    if (bookmarkTYpeClicked[0] === 'all') {
      setBookmarkLists(nowDateArticle);
    } else {
      setBookmarkLists(nowDateArticle);
      twoFilters(nowDateArticle);
    }
  };
  const bookmarkApi = async (
    userIdTemp: string,
    contentId: string,
    title: string,
    comment: string | undefined,
    userToken: string | undefined
  ) => {
    let response = await bookmark(userIdTemp,contentId, title, comment, userToken);
    // url,
    console.log(response);
  };
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window !== undefined) {
        setScroll(window.scrollY > 45);
      }
    });
  }, []);

  const handleClick = (name: any) => {
    let data: any[] = [];
    setbookmarkTYpeClicked(name);
    if (completeList.length > 0) {
      data = completeList?.filter((item: any) => {
        return item?.contentType?.targetItem?.name === name;
      });
    }
    setBookmarkLists(data);
  };
  const handleAllClick = () => {
    setbookmarkTYpeClicked(['all']);

    setBookmarkLists(completeList);
  };
  const submitBookmark = (
    userIdTemp: string,
    contentId: string,
    // url: string,
    title: string,
    comment: string | undefined
  ) => {
    setTokenFromLocalStorage();
    bookmarkApi(userIdTemp,contentId, title, comment, userToken);
    // , url:string
    // handleClick();
    handleSelectedArticle(contentId);
  };
  console.log(
    new URL(
      'https://twitter.com/Betclic/status/1382074820628783116?s=20'
    ).pathname
  );
  return (
    
    <div className={ArticlesListCss.mainwrapper}>
      <SideBar
        buttonTypes={dataum}
        handleAllClick={handleAllClick}
        handleClick={handleClick}
        scroll={scroll}
        bookmarkTYpeClicked={bookmarkTYpeClicked}
      />
      <div>
        {bookmarkLists?.map((l: any, i: any) => {
          return (
            <div key={i} className={ArticlesListCss.wrapper}>
              <div className={ArticlesListCss.leftSection}>
                <NextImage
                  className={ArticlesListCss.leftSectionImage}
                  field={l?.image?.jsonValue?.value}
                  editable={true}
                />
              </div>
              <div className={ArticlesListCss.rightSection}>
                <div className={ArticlesListCss.title}>{l?.title?.jsonValue?.value}</div>
                <div className={ArticlesListCss.cardDescription}>
                  <p>
                    {l?.shortDescription?.jsonValue?.value}
                    {/* <Link href="/readMorePage">Read More </Link> */}
                  </p>
                </div>
                <div className={ArticlesListCss.cardTags}>
                  {l?.tags?.targetItems?.map((m: any, j: any) => {
                    return (
                      <div key={j} className={ArticlesListCss.cardTag}>
                        <Link key={j} href={'/#'}>
                          {m?.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className={ArticlesListCss.infoWrapper}>
                  <div className={ArticlesListCss.infoWrapperTag}>
                    <NextImage
                      className={ArticlesListCss.infowrapperImage}
                      field={sourceImage}
                      editable={true}
                    />
                    <div className={ArticlesListCss.infoWrapperTagData}>
                      {l?.authorName?.jsonValue?.value}{' '}
                    </div>
                  </div>
                  <div className={ArticlesListCss.infoWrapperTag}>
                    <NextImage
                      className={ArticlesListCss.infowrapperImage}
                      field={calendarImage}
                      editable={true}
                    />
                    <div className={ArticlesListCss.infoWrapperTagData}>
                      {getFormatedDate(l?.date?.jsonValue?.value)}
                    </div>
                  </div>
                </div>

                <div className={ArticlesListCss.buttons}>
                  <button
                    className={ArticlesListCss.button}
                    onClick={() =>
                      submitBookmark(
                        userIdTemp,
                        l?.id,
                        // l.title?.jsonValue.value, //This is for URL or Image value
                        l?.title?.jsonValue?.value,
                        l?.description?.jsonValue?.value
                      )
                    }
                  >
                    <NextImage
                      field={selectedArticle?.includes(l?.id) ? activeBookmarkImage : bookmarkImage}
                      id="bookamrksImage"
                      editable={true}
                      title="Add To My Collection"
                    />
                  </button>
                  <button
                    className={ArticlesListCss.button}
                    onClick={() => handleShareClick(l?.id)}
                  >
                    <NextImage field={shareImage} editable={true} title="Share" />
                  </button>
                </div>

                {shareArticle.includes(l?.id) && (
                  <div className={ArticlesListCss.sharePopups}>
                    <div className={ArticlesListCss.sharePopup}>
                      <NextImage
                        className={ArticlesListCss.whatsappImage}
                        field={whatsapp}
                        editable={true}
                        width={25}
                        height={25}
                      />
                      <Link
                        href={
                          'https://wa.me/?text=Check%20out%20this%20article%20I%20found%3A%20' +
                          l?.title?.jsonValue?.value +
                          'utm_source=whatsapp&utm_medium=social&utm_term=' +
                          l?.title?.jsonValue?.value
                        }
                      >
                        <a  className={ArticlesListCss.targetIcon} target='_blank' >WhatsApp</a>
                      </Link>
                    </div>

                    <div className={ArticlesListCss.sharePopup}>
                      <NextImage
                        className={ArticlesListCss.whatsappImage}
                        field={twitter}
                        editable={true}
                        width={25}
                        height={25}
                      />
                      <Link
                        href={
                          'https://twitter.com/intent/tweet?url=' +
                          l?.url?.url +
                          '&text=' +
                          l?.title?.jsonValue?.value +
                          'utm_source=twitter&utm_medium=social&utm_term=' +
                          l?.title?.jsonValue?.value
                        }
                      >
                        <a className={ArticlesListCss.targetIcon} target='_blank' >Twitter</a>
                        
                      </Link>
                    </div>

                    <div className={ArticlesListCss.sharePopup}>
                      <NextImage
                        className={ArticlesListCss.whatsappImage}
                        field={linkedin}
                        editable={true}
                        width={25}
                        height={25}
                      />
                      <Link
                        href={
                          'https://www.linkedin.com/sharing/share-offsite/?url=' +
                          l?.url?.url +
                          'utm_source=linkedin&utm_medium=social&utm_term=' +
                          l?.title?.jsonValue?.value
                        }
                      >
                        <a className={ArticlesListCss.targetIcon} target='_blank'>LinkedIn</a>
                        
                      </Link>
                    </div>
                    <div className={ArticlesListCss.sharePopup}>
                      <NextImage
                        className={ArticlesListCss.whatsappImage}
                        field={facebook}
                        editable={true}
                        width={25}
                        height={25}
                      />
                      <Link
                        href={
                          'https://www.facebook.com/sharer/sharer.php?u=' +
                          l?.url?.url +
                          '&t=' +
                          l?.title?.jsonValue?.value +
                          'utm_source=facebook&utm_medium=social&utm_term=' +
                          l?.title?.jsonValue?.value
                        }
                      >
                        <a className={ArticlesListCss.targetIcon} target='_blank'>Facebook</a>
                      
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={ArticlesListCss.filterConatiner}>
        <FilterByDate
          nowArticles={nowArticles}
          pastArticle={pastArticle}
          upComingArticle={upComingArticle}
        />
      </div>
    </div>
  );
};

export default ArticlesList;
