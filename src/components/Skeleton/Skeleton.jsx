import React, { useState, useEffect } from "react";

// Base skeleton primitives
export const SkeletonBox = ({ className = "", style = {} }) => (
  <div className={`skeleton skeleton-box ${className}`} style={style} />
);

export const SkeletonCircle = ({ className = "", style = {} }) => (
  <div className={`skeleton skeleton-circle ${className}`} style={style} />
);

export const SkeletonText = ({ className = "", style = {}, lines = 1 }) => {
  if (lines === 1) {
    return (
      <div className={`skeleton skeleton-text ${className}`} style={style} />
    );
  }
  return (
    <div className="skeleton-text-lines">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`skeleton skeleton-text ${className}`}
          style={{ ...style, width: i === lines - 1 ? "60%" : style.width }}
        />
      ))}
    </div>
  );
};

// Custom hook for loading delay (prevents flickering on fast loads)
export const useLoadingDelay = (isLoading, delay = 300) => {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => setShowSkeleton(true), delay);
    } else {
      setShowSkeleton(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return showSkeleton;
};

// Reusable Layout Components

// Hot Collections Skeleton Layout
export const HotCollectionsSkeleton = ({ count = 4 }) => (
  <div className="row">
    <div className="col-lg-12 text-center">
      <h2>Hot Collections</h2>
      <div className="small-border bg-color-2"></div>
    </div>
    {Array.from({ length: count }).map((_, index) => (
      <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
        <div className="nft_coll">
          <div className="nft_wrap">
            <SkeletonBox style={{ height: "200px" }} />
          </div>
          <div className="nft_coll_pp">
            <SkeletonCircle style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="nft_coll_info text-center">
            <SkeletonText
              style={{ width: "60%", height: "20px", marginBottom: "8px" }}
            />
            <SkeletonText style={{ width: "40%", height: "16px" }} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// New Items Skeleton Layout
export const NewItemsSkeleton = ({ count = 4 }) => (
  <div className="row">
    <div className="col-lg-12">
      <div className="text-center">
        <h2>New Items</h2>
        <div className="small-border bg-color-2"></div>
      </div>
    </div>
    {Array.from({ length: count }).map((_, index) => (
      <div className="col-lg-3 col-md-6 col-xs-12" key={index}>
        <div className="nft__item">
          <div className="author_list_pp">
            <SkeletonCircle className="w-50 h-50" />
          </div>
          <SkeletonBox className="de_countdown w-80 h-20" />
          <div className="nft__item_wrap">
            <SkeletonBox className="h-200 w-100" />
          </div>
          <div className="nft__item_info">
            <SkeletonText className="w-60 mb-2" />
            <SkeletonText className="w-40" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Top Sellers Skeleton Layout
export const TopSellersSkeleton = ({ count = 12 }) => (
  <div className="row">
    <div className="col-lg-12 text-center">
      <h2>Top Sellers</h2>
      <div className="small-border bg-color-2"></div>
    </div>
    <div className="col-md-12">
      <ol className="author_list">
        {Array.from({ length: count }).map((_, index) => (
          <li className="skeleton-item" key={index}>
            <div className="author_list_pp">
              <SkeletonCircle style={{ width: "50px", height: "50px" }} />
            </div>
            <div className="author_list_info">
              <SkeletonText
                style={{ width: "120px", height: "16px", marginBottom: "4px" }}
              />
              <SkeletonText style={{ width: "80px", height: "14px" }} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

// Explore Items Skeleton Layout
export const ExploreItemsSkeleton = ({ count = 8 }) => (
  <>
    <div>
      <select id="filter-items" defaultValue="" disabled>
        <option value="">Default</option>
        <option value="price_low_to_high">Price, Low to High</option>
        <option value="price_high_to_low">Price, High to Low</option>
        <option value="likes_high_to_low">Most liked</option>
      </select>
    </div>
    {Array.from({ length: count }).map((_, index) => (
      <div
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        key={index}
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <div className="nft__item">
          <div className="author_list_pp">
            <SkeletonCircle style={{ width: "50px", height: "50px" }} />
          </div>
          <SkeletonBox
            className="de_countdown"
            style={{ width: "100px", height: "24px" }}
          />
          <div className="nft__item_wrap">
            <SkeletonBox style={{ height: "200px", width: "100%" }} />
          </div>
          <div className="nft__item_info">
            <SkeletonText
              style={{ width: "60%", height: "20px", marginBottom: "8px" }}
            />
            <SkeletonText style={{ width: "40%", height: "16px" }} />
          </div>
        </div>
      </div>
    ))}
  </>
);

// Section wrapper with consistent styling
export const SkeletonSection = ({ children, id, className = "" }) => (
  <section id={id} className={className}>
    <div className="container">{children}</div>
  </section>
);

export default {
  SkeletonBox,
  SkeletonCircle,
  SkeletonText,
  useLoadingDelay,
  HotCollectionsSkeleton,
  NewItemsSkeleton,
  TopSellersSkeleton,
  ExploreItemsSkeleton,
  SkeletonSection,
};
