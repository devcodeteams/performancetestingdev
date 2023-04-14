// import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Image from 'next/image';
import groupLogo from '../assets/images/groupLogo.svg';
import moreLogo from '../assets/images/moreLogo.svg';
import style from '../assets/groupList.module.css';
import { useState } from 'react';
import CreateGroup from './helperComponents/CreateGroup';
import { useRouter } from 'next/router';

type GroupListProps = ComponentProps & {
  fields: {
    heading: string;
  };
};

const list = [
  { img: groupLogo, name: 'First' },
  { img: groupLogo, name: 'Second' },
  { img: groupLogo, name: 'Third' },
];

const GroupList = (props: GroupListProps): JSX.Element => {
  const router = useRouter();
  console.log(props);
  const [isSelectedMoreOption, setIsSelectedMoreOption] = useState(-1);
  const [isSelectedGroup, setIsSelectedGroup] = useState(0);
  const [createGroupVisibel, setCreateGroupVisibel] = useState(false);
  const handleExploreOnClick = (name: string) => {
    router.push(`/group?groupName=${name}`);
  };
  return (
    <>
      <div>
        <div className={style.groupList}>
          <h3 className={style.groupListTitle}>Group List</h3>
          {list.map((ele, index: number) => (
            <>
              <div
                className={style.groupListHeading}
                style={isSelectedGroup == index ? { background: '#fff' } : {}}
              >
                <div
                  className={style.groupListHeadingLeft}
                  onClick={() => {
                    setIsSelectedGroup(index);
                    setIsSelectedMoreOption(-1);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <Image src={ele.img} alt={ele.name} className={style.groupListLogo} height={50} />
                  <h5 className={style.groupListName}>{ele.name}</h5>
                </div>
                <div>
                  <Image
                    src={moreLogo}
                    alt=""
                    className={style.groupListMoreLogo}
                    onMouseEnter={() => {
                      if (isSelectedMoreOption == index) {
                        setIsSelectedMoreOption(-1);
                      } else {
                        setIsSelectedMoreOption(index);
                      }
                    }}
                    onMouseLeave={() => {
                      if (isSelectedMoreOption == index) {
                        setIsSelectedMoreOption(-1);
                      } else {
                        setIsSelectedMoreOption(index);
                      }
                    }}
                  />
                  {isSelectedMoreOption == index && (
                    <div
                      className={style.moreOptionList}
                      onMouseEnter={() => {
                        setIsSelectedMoreOption(index);
                      }}
                      onMouseLeave={() => {
                        setIsSelectedMoreOption(-1);
                      }}
                    >
                      <button
                        className="btn btn-light"
                        onClick={() => handleExploreOnClick(ele.name)}
                      >
                        Explore the group
                      </button>
                      <button className="btn btn-light">Join Group</button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ))}
          <div className={style.createGroupHeading}>
            <button className="btn btn-primary btn-sm" onClick={() => setCreateGroupVisibel(true)}>
              {' '}
              + Create a Group
            </button>
          </div>
          {
            <CreateGroup
              createGroupVisibel={createGroupVisibel}
              setCreateGroupVisibel={setCreateGroupVisibel}
            />
          }
        </div>
      </div>
    </>
  );
};
// export default withDatasourceCheck()<GroupListProps>(GroupList);
export default GroupList;