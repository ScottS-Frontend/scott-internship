import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import {
  AuthorSkeleton,
  SkeletonSection,
  useLoadingDelay,
} from "../components/Skeleton/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const showSkeleton = useLoadingDelay(loading, 300);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAuthor = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
        );
        const data = await response.json();
        setAuthor(data);
      } catch (error) {
        console.error("Failed to fetch author:", error);
      } finally {
        setLoading(false);
      }
    };

    if (showSkeleton) {
      return (
        <SkeletonSection id="section-items" className="no-bottom">
          <AuthorSkeleton count={4} />
        </SkeletonSection>
      );
    }

    fetchAuthor();
  }, [authorId]);

  const handleCopy = () => {
    if (author?.address) {
      navigator.clipboard.writeText(author.address);
      alert("Wallet address copied!");
    }
  };

  const handleFollow = () => {
    setFollowed(!followed);
    setAuthor((prev) => ({
      ...prev,
      followers: followed ? prev.followers - 1 : prev.followers + 1,
    }));
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <>
                          <div
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                              background: "#e0e0e0",
                              animation: "pulse 1.5s infinite",
                            }}
                          ></div>
                          <div className="profile_name">
                            <h4>
                              <div
                                style={{
                                  width: "160px",
                                  height: "20px",
                                  background: "#e0e0e0",
                                  borderRadius: "4px",
                                  marginBottom: "8px",
                                  animation: "pulse 1.5s infinite",
                                }}
                              ></div>
                              <div
                                style={{
                                  width: "100px",
                                  height: "14px",
                                  background: "#e0e0e0",
                                  borderRadius: "4px",
                                  animation: "pulse 1.5s infinite",
                                }}
                              ></div>
                            </h4>
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={author?.authorImage}
                            alt={author?.authorName}
                          />
                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author?.authorName}
                              <span className="profile_username">
                                @{author?.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author?.address}
                              </span>
                              <button
                                id="btn_copy"
                                title="Copy Text"
                                onClick={handleCopy}
                              >
                                Copy
                              </button>
                            </h4>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <div
                          style={{
                            width: "80px",
                            height: "16px",
                            background: "#e0e0e0",
                            borderRadius: "4px",
                            marginBottom: "10px",
                            animation: "pulse 1.5s infinite",
                          }}
                        ></div>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {author?.followers} followers
                          </div>
                          <button onClick={handleFollow} className="btn-main">
                            {followed ? "Unfollow" : "Follow"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
