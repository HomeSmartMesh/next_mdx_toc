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

import {Stack, Box } from '@mui/material';
import PanZoomSlide from '../components/PanZoomSlide'
import MenuTree from '../components/MenuTree'

const components = { PanZoomSlide }

const content = s(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: 64,
      height: 16,
      fill: 'black',
      viewBox: '16 0 16 16',
      class: 'icon'
    },
    s('path', {
      d: 'M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z'
    })
  )

//const headings = [{"level":1,"text":"Cluster 1 - Level 1","href":"cluster-1---level-1","id":"0","children":[{"level":2,"text":"Cluster 1 - Level 2","href":"cluster-1---level-2","id":"1","children":[{"level":3,"text":"Cluster 1 - Level 3","href":"cluster-1---level-3","id":"2"}]},{"level":2,"text":"Cluster 1 - back to 2","href":"cluster-1---back-to-2","id":"3","children":[{"level":3,"text":"Cluster 1 - b2 - Level 3","href":"cluster-1---b2---level-3","id":"4"}]},{"level":2,"text":"long list section test","href":"long-list-section-test","id":"5"}]},{"level":1,"text":"More Headings Level 1","href":"more-headings-level-1","id":"6","children":[{"level":2,"text":"More Headings Level 2","href":"more-headings-level-2","id":"7"},{"level":2,"text":"long list section test","href":"long-list-section-test-1","id":"8"},{"level":2,"text":"More Headings Level 2","href":"more-headings-level-2-1","id":"9"}]}]
export default function RemotePage({ source,headings }) {
  return (
    <>
      {source.frontmatter.title&&
      <title>{source.frontmatter.title}</title>
      }
        <MenuTree nodes={headings}/>
        <MDXRemote {...source} components={components} scope={source.frontmatter}/>
    </>
  )
}

let headings = []
function rehypeHeadings() {
  let count = 0
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'].includes(node.tagName)) {
        const text_element = node.children.find(element => (element.type == "text"))
        if(text_element){
          headings.push(
            {
              level:Number(node.tagName.charAt(1)),
              text:text_element.value,
              href:node.properties.id,
              id:String(count++)
            })
        }
      }
    })
  }
}


function find_parent(index){
  const element_level = headings[index].level
  if(index == 0){
    return null
  }else{
    for(let rev_i = index-1;rev_i>=0;rev_i--){
      if(headings[rev_i].level<element_level){
        return headings[rev_i]
      }
    }
  }
}

function heading_list_to_tree(headings){
  for(let element of headings){
    element.children =[]
  }

  let tree = []
  
  for(let index=0; index<headings.length;index++){
    let element = headings[index]
    let parent = find_parent(index)
    if(parent){
      parent.children.push(element)
    }else{
      tree.push(element)
    }
  }

  for(let element of headings){
    if (element.children.length == 0){
      delete element.children
    }
  }
  return tree
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  headings = []
  const source = await fs.readFile("public/toc_tree.mdx");
  const mdxSource = await serialize(
        source,
        {
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkRehype],
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
  const heading_tree = heading_list_to_tree(headings)
  return { props: { source: mdxSource, headings:heading_tree } }
}
