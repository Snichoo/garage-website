import type { MetadataRoute } from "next";
import { suburbs } from "@/data/suburbs";
import { posts } from "@/data/posts";
import { siteConfig } from "@/lib/site";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const staticPages: {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/garage-doors", priority: 0.9, changeFrequency: "monthly" },
  { path: "/sectional-garage-doors", priority: 0.9, changeFrequency: "monthly" },
  { path: "/roller-doors", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tilt-doors", priority: 0.9, changeFrequency: "monthly" },
  { path: "/emergency-repairs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/openers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/springs", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cables", priority: 0.8, changeFrequency: "monthly" },
  { path: "/automated-gates", priority: 0.8, changeFrequency: "monthly" },
  { path: "/smart-kits", priority: 0.8, changeFrequency: "monthly" },
  { path: "/locations", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    ...staticPages.map((page) => ({
      url: url(page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...suburbs.map((suburb) => ({
      url: url(`/suburbs/${suburb.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
