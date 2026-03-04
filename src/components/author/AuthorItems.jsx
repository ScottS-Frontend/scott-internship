import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ authorId }) => {
  const [nftCollection, setNftCollection] = useState([]);
  const [authorImage, setAuthorImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        const data = await response.json();
        setAuthorImage(data.authorImage);
        setNftCollection(data.nftCollection);
      } catch (error) {
        console.error("Failed to fetch author items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthorItems();
    }
  }, [authorId]);

  if (loading) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {new Array(8).fill(0).map((_, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "#e0e0e0",
                        animation: "pulse 1.5s infinite",
                      }}
                    ></div>
                  </div>
                  <div className="nft__item_wrap">
                    <div
                      style={{
                        width: "100%",
                        paddingTop: "100%",
                        background: "#e0e0e0",
                        borderRadius: "8px",
                        animation: "pulse 1.5s infinite",
                      }}
                    ></div>
                  </div>
                  <div className="nft__item_info">
                    <div
                      style={{
                        width: "60%",
                        height: "16px",
                        background: "#e0e0e0",
                        borderRadius: "4px",
                        margin: "12px 0 8px",
                        animation: "pulse 1.5s infinite",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "40%",
                        height: "14px",
                        background: "#e0e0e0",
                        borderRadius: "4px",
                        animation: "pulse 1.5s infinite",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map((nft) => (
            <div
              key={nft.id}
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
            >
              <div className="nft__item">
                {/* ✅ Author image from API data */}
                <div className="author_list_pp">
                  <Link to={`/author/${authorId}`}>
                    <img className="lazy" src={authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${nft.nftId}`}>
                    <img
                      src={nft.nftImage}
                      className="lazy nft__item_preview"
                      alt={nft.title}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${nft.nftId}`}>
                    <h4>{nft.title}</h4>
                  </Link>
                  <div className="nft__item_price">{nft.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
