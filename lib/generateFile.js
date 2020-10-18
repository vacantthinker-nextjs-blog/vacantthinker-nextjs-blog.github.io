const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const remark = require('remark')
const html = require('remark-html')
const markdown = require('remark-parse')
const unified = require('unified')

// console.log("process.cwd()\n",process.cwd())
const getRootDir = () => path.parse(process.cwd()).dir
// console.log("getRootDir()\n",getRootDir()) // C:\___Code\_nextjs_lesson\07_deploying_your_next.js_app\nextjs-blog
const postsDirectory = path.join(getRootDir(), 'posts')

const postsData = getSortedPostsData()
let s = JSON.stringify(postsData);
fs.writeFileSync(path.join(getRootDir(), 'libdata', 'allPostsData.js'), `
const allPostsData = ${s}
export {allPostsData}

`, function (err) {

})
postsData.map(post=>{
  // console.log("post\n", post)
})

const postIds = getAllPostIds()
postIds.map(postId=>{
  // console.log("postId\n", postId.params)
  const {id} = postId;
  const postData = getPostData(id)
  const {title, date, contentHtml} = postData
  // console.log("postData\n", postData)
  console.log("contentHtml\n", contentHtml)

  const fileId = id.replace("-","_");
  const filePath = path.join(getRootDir(), 'pages', 'posts', `${id}.js`)
  const fileData = `
import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import React from "react";

export default function ${fileId}Post() {
  return (
    <Layout>
      <Head>
        <title>'${postData.title}'</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>'${postData.title}'</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={'${postData.date}'} />
        </div>
        <div>
          ${contentHtml}
        </div>
      </article>
    </Layout>
  )
}

`
  fs.writeFileSync(filePath,fileData, function (err) {

  })
})

function getSortedPostsData() {
  // Get file names under /postsData
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort postsData by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
        id: fileName.replace(/\.md$/, '')
    }
  })
}

/**
 *
 * @param id
 * @returns {{[p: string]: any, matterResult: (*|matter.GrayMatterFile<string>), id: *, contentHtml: string}}
 */
 function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  let contentHtml = ''
  unified()
    .use(markdown)
    .use(html)
    .process(matterResult.content, function (err, file) {
      contentHtml += file.contents;
      // console.log(file.contents)
    })

  // Use remark to convert markdown into HTML string
  // const processedContent = remark()
  //   .use(html)
  //   .process(matterResult.content)
  // const contentHtml = processedContent.toString()

  // console.log("contentHtml\n", contentHtml)
  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    matterResult,
    ...matterResult.data
  }
}

// export async function getStaticPaths() {
//   const paths = getAllPostIds()
//   return {
//     paths,
//     fallback: false
//   }
// }

// export async function getStaticProps({ params }) {
//   const postData = await getPostData('${id}')
//   return {
//     props: {
//       postData
//     }
//   }
// }