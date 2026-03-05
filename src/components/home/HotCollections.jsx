import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="nft_coll">
    <div className="nft_wrap">
      <div
        className="skeleton-box"
        style={{ height: "200px", width: "100%" }}
      ></div>
    </div>
    <div className="nft_coll_pp">
      <div
        className="skeleton-circle"
        style={{ width: "50px", height: "50px", margin: "0 auto" }}
      ></div>
    </div>
    <div className="nft_coll_info" style={{ textAlign: "center" }}>
      <div
        className="skeleton-text"
        style={{ width: "60%", height: "20px", margin: "0 auto 8px" }}
      ></div>
      <div
        className="skeleton-text"
        style={{ width: "40%", height: "16px", margin: "0 auto" }}
      ></div>
    </div>
  </div>
);
=======
import { owlCarouselOptions } from "../UI/carouselConfig";


const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const showSkeleton = useLoadingDelay(loading, 300);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (showSkeleton) {
    return (
      <SkeletonSection id="section-collections" className="no-bottom">
        <HotCollectionsSkeleton count={4} />
      </SkeletonSection>
    );
  }

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-in">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <OwlCarousel className="owl-theme" {...owlCarouselOptions}>
              {collections.map((collection) => (
                <div className="item" key={collection.id}
                data-aos="fade-in">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt={collection.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt={collection.authorName}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;