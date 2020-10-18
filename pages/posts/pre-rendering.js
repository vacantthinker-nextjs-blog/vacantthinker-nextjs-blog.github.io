
import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import React from "react";

export default function pre_renderingPost() {
  return (
    <Layout>
      <Head>
        <title>Two Forms of Pre-rendering</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>'Two Forms of Pre-rendering'</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={'2020-01-01'} />
        </div>
        <div>
          <p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p>
<ul>
<li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li>
<li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li>
</ul>
<p>Importantly, Next.js lets you <strong>choose</strong> which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>

        </div>
      </article>
    </Layout>
  )
}

