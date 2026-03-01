import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  TopSellersSkeleton, 
  SkeletonSection,
  useLoadingDelay 
} from "../Skeleton/Skeleton";

const TopSellers = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const showSkeleton = useLoadingDelay(loading, 300); // 300ms delay

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load top sellers.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (showSkeleton) {
    return (
      <SkeletonSection id="section-popular" className="pb-5">
        <TopSellersSkeleton count={12} />
      </SkeletonSection>
    );
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Top Sellers</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">
              {items.slice(0, 12).map((item) => (
                <li key={item.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="pp-author"
                        src={item.authorImage}
                        alt={item.authorName}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>
                      {item.authorName}
                    </Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};   

export default TopSellers;