import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/default.css'
import {visit} from 'unist-util-visit'
import {s} from 'hastscript'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { promises as fs } from 'fs'

import PanZoomSlide from '../components/PanZoomSlide'
import MenuList from '../components/MenuList'

const components = { PanZoomSlide }

const content = s(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: 16,
      height: 16,
      fill: 'black',
      viewBox: '0 0 16 16',
      class: 'icon'
    },
    s('path', {
      d: 'M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z'
    })
  )

export default function RemotePage({ source,headings }) {
  console.log(headings)
  return (
    <>
      {source.frontmatter.title&&
      <title>{source.frontmatter.title}</title>
      }
      <MenuList pages={headings}/>
      <MDXRemote {...source} components={components} scope={source.frontmatter}/>
    </>
  )
}

let headings = []
function rehypeHeadings() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'].includes(node.tagName)) {
        const text_element = node.children.find(element => (element.type == "text"))
        if(text_element){
          headings.push({level:Number(node.tagName.charAt(1)),text:text_element.value,href:node.properties.id})
        }
      }
    })
  }
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  headings = []
  const source = await fs.readFile("public/toc.mdx");
  const mdxSource = await serialize(
        source,
        {
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkToc,remarkRehype],
                rehypePlugins: [rehypeSlug, rehypeHighlight,rehypeHeadings,
                    [
                        rehypeAutolinkHeadings,
                        {
                          behavior: 'append',
                          content: content
                        }
                      ]
                ]
            },
            parseFrontmatter: true
        }
    )
  return { props: { source: mdxSource, headings:headings } }
}
