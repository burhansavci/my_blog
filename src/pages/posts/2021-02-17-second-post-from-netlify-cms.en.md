---
language: en
title: Second Post From Netlify CMS
slug: second-post-from-netlify-cms
date: 2021-02-17T11:46:56.391Z
author: Burhan Savcı
tag: Netlify
---


Second Post From Netlify CMS TEST 2

![Test img 2](/images/uploads/test_img_2.jpg "Test img 2")

```javascript
import React from 'react';
import { graphql } from 'gatsby';
import TitlePage from '../components/TitlePage';
import SEO from '../components/seo';

import * as S from '../components/Content/styled';

const Page = props => {
  const post = props.data.markdownRemark;

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
      />
      <TitlePage text={post.frontmatter.title} />
      <S.Content>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </S.Content>
    </>
  );
};

export const query = graphql`
  query Page($locale: String!, $title: String!) {
    markdownRemark(
      frontmatter: { title: { eq: $title } }
      fields: { locale: { eq: $locale } }
    ) {
      frontmatter {
        title
        description
        image
      }
      html
    }
  }
`;

export default Page;
```



![Test img 1](/images/uploads/test_img_1.jpg "Test img 1")



![Test img 3](/images/uploads/test_img_3.jpg "Test img 3")