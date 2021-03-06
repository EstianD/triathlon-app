import React, { useEffect } from "react";
import { Row, Col, Media } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import parse from "html-react-parser";
import Image from "next/image";

// Import styles
import styles from "../../styles/Article.module.css";

// import article hook
import useGetArticle from "../hooks/useGetArticle";

function Article({ article }) {
  const { data } = article;

  // console.log(article);

  let count = 0;
  let countArr = [];
  let imageNum = 0;

  const renderBodyToHtml = (str) => {
    const articleArr = str.split("\n").filter((el) => {
      return el != "";
    });

    const newString = articleArr.map((item, i) => {
      // console.log(data.news_images_count);

      // Check if element is the last itteration of the array for the article
      let lastItteration = articleArr.length == i + 1;

      if (count == 2 && !lastItteration) {
        if (data.news_images_count > imageNum) {
          count = 0;
          imageNum++;
          return (
            <div key={imageNum - 1}>
              <p className={styles.articleSections} key={"p" + i}>
                {parse(item)}
              </p>
              <div className={styles.articleMoreImages}>
                <Image
                  height={500}
                  width={500}
                  src={data.news_images[imageNum - 1].image_url}
                />
              </div>
            </div>
          );
        }
      } else {
        count++;
        return (
          <p className={styles.articleSections} key={"p" + i}>
            {parse(item)}
          </p>
        );
      }
    });

    return newString;
  };

  // const getRandomImageNumber = () => {
  //   let randomNum = Math.floor(Math.random() * data.news_images_count);

  //   if (countArr.indexOf(randomNum) == -1) {
  //     countArr.push(randomNum);
  //     return randomNum;
  //   } else {
  //     getRandomImageNumber();
  //   }
  // };

  const renderArticleDate = () => {
    const articleDate = new Date(article.data.news_entry_date.substring(0, 10));
    const articleDay =
      articleDate.getDate() < 10
        ? "0" + articleDate.getDate()
        : articleDate.getDate();
    const articleMonth =
      articleDate.getMonth() < 10
        ? "0" + articleDate.getMonth()
        : articleDate.getMonth();
    return `${articleDate.getFullYear()}-${articleMonth}-${articleDay}`;
  };

  // console.log(article.data);

  return (
    <div className={styles.container}>
      <Col>
        <Row>
          <div>
            <h2 className={styles.articleHeading}>{article.data.news_title}</h2>
          </div>
        </Row>
        <Row>
          <Col xs={6}>
            <span className={styles.author}>By {article.data.author}</span>
            &nbsp; - &nbsp;
            <span className={styles.date}>{renderArticleDate()}</span>
          </Col>
        </Row>
        <Row>
          <div className={styles.articleImage}>
            <Image
              // alt={image.alt}
              src={article.data.news_thumbnail} // use normal <img> attributes as props
              height={2000}
              width={2000}
              // effect="blur"
              // onError={(e) => loadDefaultImage(e)}
            />
          </div>
        </Row>
        <Row>
          <Col xs={12}>
            {/* {parse(article.data.body)} */}

            {/* <p className={styles.articleBody}>{parse(article.data.body)}</p> */}
            <div className={styles.articleBody}>
              {renderBodyToHtml(data.body)}
            </div>
            {/* <p>{parse(article.data.body)}</p> */}
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default Article;
