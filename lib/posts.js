// // import fs from 'fs'
// // import path from 'path'
// // import matter from 'gray-matter'
// // import remark from 'remark'
// // import html from 'remark-html'
//
// const fs = require('fs')
// const path = require('path')
// const matter = require('gray-matter')
// const remark = require('remark')
// const html = require('remark-html')
// const markdown = require('remark-parse')
// const unified = require('unified')
//
//
// const postsDirectory = path.join(process.cwd(), 'posts')
// // console.log("process.cwd()\n", process.cwd())
// // console.log("postsDirectory\n", postsDirectory)
//
// module.exports = {
//   getSortedPostsData() {
//     // Get file names under /posts
//     const fileNames = fs.readdirSync(postsDirectory)
//
//     const allPostsData = fileNames.map(fileName => {
//       // Remove ".md" from file name to get id
//       const id = fileName.replace(/\.md$/, '')
//
//       // Read markdown file as string
//       const fullPath = path.join(postsDirectory, fileName)
//       const fileContents = fs.readFileSync(fullPath, 'utf8')
//
//       // Use gray-matter to parse the post metadata section
//       const matterResult = matter(fileContents)
//
//       // Combine the data with the id
//       return {
//         id,
//         ...matterResult.data
//       }
//     })
//     // Sort posts by date
//     return allPostsData.sort((a, b) => {
//       if (a.date < b.date) {
//         return 1
//       } else {
//         return -1
//       }
//     })
//   },
//
//   getAllPostIds() {
//     const fileNames = fs.readdirSync(postsDirectory)
//     return fileNames.map(fileName => {
//       return {
//         params: {
//           id: fileName.replace(/\.md$/, '')
//         }
//       }
//     })
//   },
//
//   async getPostData(id) {
//     const fullPath = path.join(postsDirectory, `${id}.md`)
//     const fileContents = fs.readFileSync(fullPath, 'utf8')
//
//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents)
//
//     // Use remark to convert markdown into HTML string
//     const processedContent = await remark()
//       .use(html)
//       .process(matterResult.content)
//     const contentHtml = processedContent.toString()
//
//     // Combine the data with the id and contentHtml
//     return {
//       id,
//       contentHtml,
//       ...matterResult.data
//     }
//   },
//
// }
//
