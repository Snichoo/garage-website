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

  // Four main service categories
  { path: "/repairs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/garage-doors", priority: 0.9, changeFrequency: "monthly" },
  { path: "/gates", priority: 0.9, changeFrequency: "monthly" },
  { path: "/automation", priority: 0.9, changeFrequency: "monthly" },

  // Repairs
  { path: "/emergency-repairs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/garage-door-repairs", priority: 0.85, changeFrequency: "monthly" },
  { path: "/gate-repairs", priority: 0.85, changeFrequency: "monthly" },
  { path: "/springs", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cables", priority: 0.8, changeFrequency: "monthly" },
  { path: "/garage-door-off-track", priority: 0.8, changeFrequency: "monthly" },
  { path: "/garage-door-servicing", priority: 0.8, changeFrequency: "monthly" },
  {
    path: "/garage-door-safety-inspection",
    priority: 0.75,
    changeFrequency: "monthly",
  },

  // Garage doors
  { path: "/sectional-garage-doors", priority: 0.9, changeFrequency: "monthly" },
  { path: "/roller-doors", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tilt-doors", priority: 0.9, changeFrequency: "monthly" },

  // Gates
  { path: "/sliding-gates", priority: 0.85, changeFrequency: "monthly" },
  { path: "/swing-gates", priority: 0.85, changeFrequency: "monthly" },
  { path: "/gate-automation", priority: 0.85, changeFrequency: "monthly" },

  // Automation
  { path: "/openers", priority: 0.8, changeFrequency: "monthly" },
  {
    path: "/garage-door-motor-replacement",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: "/gate-motor-replacement", priority: 0.8, changeFrequency: "monthly" },
  { path: "/smart-systems", priority: 0.8, changeFrequency: "monthly" },

  // Contact
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/request-a-quote", priority: 0.7, changeFrequency: "yearly" },
  { path: "/book-a-service", priority: 0.7, changeFrequency: "yearly" },

  // Supporting pages
  { path: "/locations", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
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
