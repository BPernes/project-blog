import React from "react";

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet/CodeSnippet";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo/CircularColorsDemo";

import { MDXRemote } from "next-mdx-remote/rsc";

import styles from "./postSlug.module.css";

import { loadBlogPost } from "@/helpers/file-helpers";

import { BLOG_TITLE } from "@/constants";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const blogPostData = await loadBlogPost(postSlug);

  if (!blogPostData) {
    return null;
  }

  const { frontmatter } = blogPostData;

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;

  const blogPostData = await loadBlogPost(postSlug);

  if (!blogPostData) {
    notFound();
  }

  const { frontmatter, content } = blogPostData;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
