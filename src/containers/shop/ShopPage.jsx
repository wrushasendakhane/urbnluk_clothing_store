import React, { useEffect, useState } from "react";
import CollectionOverview from "../../components/collection-overview/CollectionOverview";
import classes from "./ShopPage.module.css";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/CollectionPage";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  fetchCollectionsStartAsync,
  fetchCollectionsStart,
} from "../../redux/shop/shopActions";
import { selectIsFetching } from "../../redux/shop/shopSelector";

function ShopPage({ match, isFetching, fetchCollectionsStart }) {
  // const [loading, setLoading] = useState(true);

  /*
  useEffect(() => {
    const collectionRef = firestore.collection("collections");
    const unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        setLoading(false);
      }
    );
    return () => {
      unsubscribeFromSnapshot();
    };
  }, []);
  */

  useEffect(() => {
    fetchCollectionsStart();
  }, []);
  return (
    <div className={classes.shopPage}>
      <Route
        exact
        path={`${match.path}`}
        render={(props) => (
          <CollectionOverview isLoading={isFetching} {...props} />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={(props) => <CollectionPage isLoading={isFetching} {...props} />}
      />
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   updateCollections: (collectionsMap) =>
//     dispatch(updateCollections(collectionsMap)),
// });

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetching,
});
//This was for redux-thunk
// const mapDispatchToProps = (dispatch) => ({
//   fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
// });

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
