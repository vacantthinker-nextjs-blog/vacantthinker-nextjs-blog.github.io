
import Layout from '../../components/layout'
// import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import React from "react";

export default function ssg_ssrPost() {
  return (
    <Layout>
      <Head>
        <title>'When to Use Static Generation v.s. Server-side Rendering'</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>'When to Use Static Generation v.s. Server-side Rendering'</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={'2020-01-02'} />
        </div>
        <div>
          <p>We recommend using <strong>Static Generation</strong> (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.</p>
<p>You can use Static Generation for many types of pages, including:</p>
<ul>
<li>Marketing pages</li>
<li>Blog posts</li>
<li>E-commerce product listings</li>
<li>Help and documentation</li>
</ul>
<p>You should ask yourself: "Can I pre-render this page <strong>ahead</strong> of a user's request?" If the answer is yes, then you should choose Static Generation.</p>
<p>On the other hand, Static Generation is <strong>not</strong> a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.</p>
<p>In that case, you can use <strong>Server-Side Rendering</strong>. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.</p>

        </div>
      </article>
    </Layout>
  )
}

