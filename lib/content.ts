import fs from "node:fs";
import path from "node:path";

const postsDirectory = path.join(process.cwd(), "content", "insights");

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  linkedinUrl?: string;
  body: string;
};

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    return { meta: {}, body: raw };
  }

  const meta = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const index = line.indexOf(":");
        const key = line.slice(0, index).trim();
        const value = line
          .slice(index + 1)
          .trim()
          .replace(/^["']|["']$/g, "");
        return [key, value];
      })
  );

  return { meta, body: match[2].trim() };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(postsDirectory, file), "utf8");
      const { meta, body } = parseFrontmatter(raw);

      return {
        slug,
        title: String(meta.title || slug),
        description: String(meta.description || ""),
        category: String(meta.category || "Executive Leadership"),
        date: String(meta.date || new Date().toISOString()),
        linkedinUrl: meta.linkedinUrl ? String(meta.linkedinUrl) : undefined,
        body
      };
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}
