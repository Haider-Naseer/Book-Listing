"use client";
import React, { useEffect, useContext, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import Image from "next/image";
import * as bookListApi from "../../services/api/book-list";
import { AppContext } from "../../utils/store";
import styles from "./page.module.css";
import { CiSearch } from "react-icons/ci";
import {
  AiTwotoneStar,
  AiOutlineStar,
  AiOutlineHeart,
  AiTwotoneHeart,
} from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import Modal from "react-modal";
import Link from "next/link";

export default function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [bookDetailModule, setBookDetailModule] = useState(false);
  const [filterBookData, setFilterBookData] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [bookDetail, setBookDetail] = useState(null);

  useEffect(() => {
    FetchBooks();
  }, []);

  const FetchBooks = async () => {
    let {
      response: { status },
      data: { data },
    } = await bookListApi?.getBooks();
    if (status == 200) {
      dispatch({ type: "Book_List", payload: data });
    }
  };

  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };

  function truncateSentence(sentence, characterCount) {
    if (sentence.length <= characterCount) {
      return sentence;
    } else {
      return sentence.slice(0, characterCount) + "...";
    }
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
    },
  };

  const BookCard = ({ bookItem }) => {
    return (
      <div className={styles.book_list_container}>
        {bookItem?.length != 0 ? (
          bookItem?.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.book_container}
                onClick={() => {
                  setBookDetail(item);
                  setBookDetailModule(true);
                }}
              >
                <div className={styles.book_image}>
                  <div className={styles.book_status}>
                    {item?.is_liked ? (
                      <AiTwotoneHeart color="#D80000" size={25} />
                    ) : (
                      <AiOutlineHeart color="#D80000" size={25} />
                    )}
                  </div>
                  <Image
                    loader={imageLoader}
                    src={item?.imageLink}
                    alt="Picture of the author"
                    width={275}
                    height={391}
                  />
                </div>
                <div className={styles.book_detail}>
                  <p>{truncateSentence(item?.title, 18)}</p>
                  <div className={styles.rating_container}>
                    {Array(5)
                      ?.fill(0)
                      ?.map((mapItem, index) => {
                        return item?.rating <= index ? (
                          <div key={index}>
                            <AiOutlineStar />
                          </div>
                        ) : (
                          <div key={index}>
                            <AiTwotoneStar color="#DF9401" />
                          </div>
                        );
                      })}
                  </div>
                  <span>$ {item?.pages}</span>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className={styles.bookError}> No Book Found</h1>
        )}
      </div>
    );
  };

  const CustomButton = ({ link, title }) => {
    return (
      <Link href={link}>
        <button>
          {title} <FiExternalLink />
        </button>
      </Link>
    );
  };

  const SearchBook = (e) => {
    e.target.value ? setFilterApplied(true) : setFilterApplied(false);
    let response = state?.bookList?.filter((obj) =>
      obj.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterBookData(response);
  };
  return (
    <>
      <Modal
        isOpen={bookDetailModule}
        onRequestClose={() => setBookDetailModule(false)}
        style={customStyles}
      >
        <div className={styles.detail_container}>
          <Image
            loader={imageLoader}
            src={bookDetail?.imageLink}
            alt="Picture of the author"
            width={300}
            height={500}
          />
          <div className={styles.book_detail_content}>
            <h1>{bookDetail?.title}</h1>
            <div className={styles.book_summary}>
              <div className={styles.summary_section}>
                <h5>Rating</h5>
                <div className={styles.container_inline_style}>
                  {Array(5)
                    ?.fill(0)
                    ?.map((mapItem, index) => {
                      return bookDetail?.rating <= index ? (
                        <div key={index}>
                          <AiOutlineStar />
                        </div>
                      ) : (
                        <div key={index}>
                          <AiTwotoneStar color="#DF9401" />
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className={styles.summary_section}>
                <h5>Reviews</h5>
                <span>( {bookDetail?.reviews} )</span>
              </div>
              <div className={styles.summary_section}>
                <h5>Price</h5>
                <span>( {bookDetail?.price} )</span>
              </div>
            </div>

            <div
              className={`${styles.book_detail_summary} ${styles.container_inline_style}`}
            >
              <h3>Author:</h3>
              <span>{bookDetail?.author}</span>
            </div>
            <div
              className={`${styles.book_detail_summary} ${styles.container_inline_style}`}
            >
              <h3>Country:</h3>
              <span>{bookDetail?.country}</span>
            </div>
            <div
              className={`${styles.book_detail_summary} ${styles.container_inline_style}`}
            >
              <h3>language:</h3>
              <span>{bookDetail?.language}</span>
            </div>
            <div
              className={`${styles.book_detail_summary} ${styles.container_inline_style}`}
            >
              <h3>Year:</h3>
              <span>{bookDetail?.year}</span>
            </div>
            <div
              className={`${styles.book_detail_summary} ${styles.container_inline_style}`}
            >
              <h3>Page:</h3>
              <span>{bookDetail?.pages}</span>
            </div>
            <div className={styles.button_container}>
              <CustomButton link={bookDetail?.link} title={"View Detail"} />
            </div>
          </div>
        </div>
      </Modal>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <div className={styles.header}>
            <Image
              loader={imageLoader}
              src={"/assets/Images/logo.png"}
              alt="Picture of the author"
              width={51}
              height={56}
            />
            <div className={styles.search_container}>
              <CiSearch size={20} />
              <input
                placeholder="Search By Book Tittle"
                onChange={(e) => SearchBook(e)}
              />
            </div>
            <Image
              loader={imageLoader}
              src={"/assets/Images/profile.png"}
              alt="Picture of the author"
              width={51}
              height={56}
            />
          </div>
          <div className={styles.hero_section}>
            <div className={styles.hero_section_text}>
              <h1>Lorem ipsum dolor sit amet consectetur.</h1>
              <h2>
                Lorem ipsum dolor sit amet consectetur. Viverr scelerisqu.
              </h2>
            </div>
            <div className={styles.hero_section_image}>
              <Image
                loader={imageLoader}
                src={"/assets/Images/hero_image.png"}
                alt="Picture of the author"
                width={650}
                height={301}
              />
            </div>
          </div>

          {state?.bookList?.length == 0 ? (
            <div className={styles.book_list_loader}>
              <MoonLoader color={"#4C7EA8"} loading={true} size={50} />
            </div>
          ) : (
            <>
              {filterApplied ? (
                <BookCard bookItem={filterBookData} />
              ) : (
                <BookCard bookItem={state?.bookList} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
