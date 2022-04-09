import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { promises as fs } from 'fs'

import PanZoomSlide from '../components/PanZoomSlide'

const components = { PanZoomSlide }

export default function RemotePage({ source }) {
  return (
    <>
      <MDXRemote {...source} components={components} />
    </>
  )
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const source = await fs.readFile("public/remote.mdx");
  const mdxSource = await serialize(source)
  return { props: { source: mdxSource } }
}
