import React from 'react';
import Event from './Event';
import ImageConatiner from './ImageConatiner';
import TextPost from './TextPost';
import VideoContainer from './VideoContainer';
import DocumentContainer from './DocumentContainer';
import Blog from './Blog';
// import PollCard from './PollCard';
// import { voteInPollUrl } from 'assets/helpers/constants';
// import AxiosRequest from 'src/API/AxiosRequest';
import User from './User';
import styles from '../assets/searchFilterContainer.module.css';
import SearchedJournal from './SearchedJournal';
import SearchNews from './SearchNews';

const AllSearchResult = (props: any) => {
  // let [myAnotherArr, setMyAnotherArr] = useState<any>([]);

  // const voteInAPoll = async (pollId: any, pollOptionId: any) => {
  //   updatePollPost(pollId, pollOptionId);
  //   await AxiosRequest({
  //     method: 'PUT',
  //     url: `${voteInPollUrl}${pollId}/poll-option/${pollOptionId}`,
  //   });
  // };

  //Function to update with latest data of poll
  // function updatePollPost(pollId: any, pollOptionId: any) {
  //   const updatedPollPosts = myAnotherArr.map((pollPost: any) => {
  //     if (pollPost?.poll?.id === pollId) {
  //       const updatedPollOptions = pollPost?.poll?.pollOptions?.map((option: any) => {
  //         if (option?.id === pollOptionId) {
  //           const updatedOption = { ...option };
  //           updatedOption.responseCount = updatedOption.responseCount + 1 || 1;
  //           return updatedOption;
  //         } else {
  //           return option;
  //         }
  //       });
  //       return {
  //         ...pollPost,
  //         poll: {
  //           ...pollPost.poll,
  //           pollResponseCount: pollPost?.poll?.pollResponseCount
  //             ? pollPost?.poll?.pollResponseCount + 1
  //             : 1,
  //           pollOptions: updatedPollOptions,
  //           optedPollOptionID: pollOptionId,
  //         },
  //       };
  //     } else {
  //       return pollPost;
  //     }
  //   });
  //   setMyAnotherArr(updatedPollPosts);
  // }
  const fromALL = true;

  return (
    <div>
      {props?.searchedData?.length > 0 ? (
        props?.searchedData?.map((data: any) => {
          return data?.sourceAsMap?.postType === 'IMAGE' ? (
            <ImageConatiner fromALL={fromALL} events={data?.sourceAsMap} flag={false} />
          ) : data?.sourceAsMap?.postType === 'EVENT' ? (
            <Event fromALL={fromALL} events={data?.sourceAsMap} flag={false} />
          ) : data?.sourceAsMap?.postType === 'TEXT_POST' ? (
            <TextPost fromALL={fromALL} events={data?.sourceAsMap} flag={false} />
          ) : data?.sourceAsMap?.postType === 'VIDEO' ? (
            <VideoContainer fromALL={fromALL} events={data?.sourceAsMap} flag={false} />
          ) : data?.sourceAsMap?.postType === 'DOC' ? (
            <DocumentContainer fromALL={fromALL} events={data?.sourceAsMap} flag={false} />
          ) : data?.sourceAsMap?.postType === 'BLOG_POST' ? (
            <>
              <Blog
                fromALL={fromALL}
                success={props?.success}
                blog={data?.sourceAsMap?.blog}
                id={data?.sourceAsMap?.id}
              />
            </>
          ) : data?.index === 'accelerator-sitecore-journal' ? (
            <SearchedJournal fromALL={fromALL} journal={data?.sourceAsMap} flag={false} />
          ) : data?.index === 'accelerator-sitecore-news' ? (
            <SearchNews fromALL={fromALL} journal={data?.sourceAsMap} flag={false} />
          ) : data?.index === 'accelerator-user' ? (
            <User user={data?.sourceAsMap} />
          ) : data?.index === 'accelerator-sitecore-cs' ? (
            <SearchNews
              index={data?.index}
              fromALL={fromALL}
              journal={data?.sourceAsMap}
              flag={false}
            />
          ) : data?.index === 'accelerator-sitecore-event' ? (
            <Event fromALL={fromALL} events={data?.sourceAsMap} flag={false} />
          ) : (
            ''
          );
        })
      ) : (
        <div className={styles.forNoData}>No data found for your search</div>
      )}
    </div>
  );
};

export default AllSearchResult;
