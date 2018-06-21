import React from "react";
import DocumentTitle from "react-document-title";
import { gql, graphql } from "react-apollo";
import Locale from "../../locale";

class Flatpage extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <div className="loading">Loading</div>;
    }
    let flatpage = this.props.data.flatpage;
    let title = flatpage.title;
    let content = flatpage.content;
    if (Locale.get() === "ru-RU") {
      title = flatpage.titleRu;
      content = flatpage.contentRu;
    }
    return (
      <DocumentTitle title={title}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </DocumentTitle>
    );
  }
}

const FLATPAGE_QUERY = gql`
  query getXflatpage($url: String) {
    flatpage: xflatpage(url: $url) {
      url
      title
      content
      titleRu
      contentRu
    }
  }
`;

const withFlatpage = graphql(FLATPAGE_QUERY, {
  options: () => {
    let url = document.location.pathname;
    if (url.substr(-1) !== "/") url += "/";
    return {
      variables: { url }
    };
  }
});

export default withFlatpage(Flatpage);
