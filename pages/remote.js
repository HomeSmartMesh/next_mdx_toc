import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { promises as fs } from 'fs'
import {Typography} from '@mui/material';

import PanZoomSlide from '../components/PanZoomSlide'

const components = { PanZoomSlide }

export default function RemotePage({ source }) {
  return (
    <>
        <Typography variant="h3">{source.frontmatter.title}</Typography>
        <MDXRemote {...source} components={components} scope={source.frontmatter}/>
    </>
  )
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const source = await fs.readFile("public/remote.mdx");
  const mdxSource = await serialize(
        source,
        {
            parseFrontmatter: true
        }
    )
  return { props: { source: mdxSource } }
}
