"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  type SiteData,
  type ProfileData,
  type BlogPostData,
} from "@/lib/content";
import {
  updateProfileContent,
  savePostContent,
  deletePostContent,
} from "@/app/actions/admin.actions";
import {
  Save,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  FileText,
  User,
  ArrowLeft,
  Loader2,
} from "lucide-react";

interface Props {
  initialData: SiteData;
}

export function AdminDashboardClient({ initialData }: Props) {
  const [activeTab, setActiveTab] = useState<"profile" | "blogs">("profile");
  const [profile, setProfile] = useState<ProfileData>(initialData.profile);
  const [posts, setPosts] = useState<BlogPostData[]>(initialData.posts);

  // Profile save state
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Blog editing state
  const [editingPost, setEditingPost] = useState<BlogPostData | null>(null);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  // Handlers for Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const res = await updateProfileContent(profile);
      if (res.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(res.error || "Failed to update profile");
      }
    } catch {
      toast.error("An error occurred while saving profile");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handlers for Blog
  const handleStartCreate = () => {
    const newPost: BlogPostData = {
      slug: "",
      title: "",
      date: new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date()),
      category: "Engineering",
      description: "",
      content: [
        "Write your article thoughts here...",
        "### 1. Section Title",
        "- Bullet point 1\n- Bullet point 2",
      ],
    };
    setEditingPost(newPost);
    setOriginalSlug(null);
    setIsEditing(true);
  };

  const handleStartEdit = (post: BlogPostData) => {
    setEditingPost({ ...post });
    setOriginalSlug(post.slug);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setOriginalSlug(null);
    setIsEditing(false);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (!editingPost.title.trim() || !editingPost.slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }

    setIsSavingPost(true);
    try {
      const res = await savePostContent(editingPost, originalSlug || undefined);
      if (res.success) {
        toast.success(originalSlug ? "Post updated!" : "Post published!");
        // Update local list
        const cleanSlug = editingPost.slug.trim().toLowerCase().replace(/\s+/g, "-");
        const finalPost = { ...editingPost, slug: cleanSlug };
        if (originalSlug && originalSlug !== cleanSlug) {
          setPosts((prev) => [finalPost, ...prev.filter((p) => p.slug !== originalSlug)]);
        } else {
          setPosts((prev) => {
            const index = prev.findIndex((p) => p.slug === cleanSlug);
            if (index >= 0) {
              const updated = [...prev];
              updated[index] = finalPost;
              return updated;
            }
            return [finalPost, ...prev];
          });
        }
        setIsEditing(false);
        setEditingPost(null);
        setOriginalSlug(null);
      } else {
        toast.error(res.error || "Failed to save post");
      }
    } catch {
      toast.error("An error occurred while saving post");
    } finally {
      setIsSavingPost(false);
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete post "${slug}"?`)) return;

    setDeletingSlug(slug);
    try {
      const res = await deletePostContent(slug);
      if (res.success) {
        toast.success("Post deleted successfully");
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
        if (editingPost?.slug === slug) {
          setIsEditing(false);
          setEditingPost(null);
        }
      } else {
        toast.error(res.error || "Failed to delete post");
      }
    } catch {
      toast.error("An error occurred while deleting post");
    } finally {
      setDeletingSlug(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Section / Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Site Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Edit biography, headlines, and publish minimalist editorial writings.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800/80 p-1 rounded-xl">
          <button
            onClick={() => {
              setActiveTab("profile");
              setIsEditing(false);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "profile"
                ? "bg-zinc-800 text-white font-medium border border-zinc-700"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <User className="h-3.5 w-3.5 text-red-400" />
            <span>Profile & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === "blogs"
                ? "bg-zinc-800 text-white font-medium border border-zinc-700"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-red-400" />
            <span>Writings ({posts.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Profile & Bio */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-400">
                Personal Information
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-zinc-500">Profile Logo</span>
                <div className="relative h-9 w-9 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  <Image
                    src="/images/profile-logo.jpg"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                  GitHub Handle
                </label>
                <input
                  type="text"
                  value={profile.handle}
                  onChange={(e) => setProfile({ ...profile, handle: e.target.value })}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                  Home Greeting / Headline
                </label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  required
                  placeholder="Hey, I'm Samarth."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                  Role / Subheadline
                </label>
                <input
                  type="text"
                  value={profile.subheadline}
                  onChange={(e) => setProfile({ ...profile, subheadline: e.target.value })}
                  required
                  placeholder="ISE student building scalable software systems."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                Biography (Introductory Statement)
              </label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors resize-y leading-relaxed font-light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                  Public Contact Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                  X (Twitter) URL
                </label>
                <input
                  type="url"
                  value={profile.x || ""}
                  onChange={(e) => setProfile({ ...profile, x: e.target.value })}
                  placeholder="https://x.com/lostemperor_08"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={profile.instagram || ""}
                  onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                  placeholder="https://instagram.com/lostemperor_08"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={profile.linkedin || ""}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                placeholder="https://in.linkedin.com/in/samarth-raghuram-patil-835596361"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSavingProfile}
              className="group bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 inline-flex items-center gap-2 font-mono text-xs font-semibold rounded-full px-6 py-2.5 text-white shadow-[0_0_20px_rgba(239,68,68,0.15)] disabled:opacity-50 transition-all"
            >
              {isSavingProfile ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-red-400" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5 text-red-400" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: Writings / Blog Manager */}
      {activeTab === "blogs" && (
        <div className="space-y-6">
          {!isEditing ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white tracking-tight">
                    Published Articles
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Minimalist essays displayed on the public site and accessible at /posts/[slug].
                  </p>
                </div>

                <button
                  onClick={handleStartCreate}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 inline-flex items-center gap-1.5 font-mono text-xs font-semibold rounded-full px-4 py-2 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all"
                >
                  <Plus className="h-3.5 w-3.5 text-red-400" />
                  <span>New Post</span>
                </button>
              </div>

              <div className="divide-y divide-zinc-900 bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden">
                {posts.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500 font-mono text-xs">
                    No articles published yet. Click "New Post" above to write one.
                  </div>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post.slug}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/30 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-100 text-base">
                            {post.title}
                          </span>
                          <span className="text-red-400 font-mono text-[10px] bg-red-950/40 border border-red-900/50 px-2 py-0.5 rounded">
                            {post.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
                          <span>{post.date}</span>
                          <span>·</span>
                          <span className="text-zinc-600">/posts/{post.slug}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <a
                          href={`/posts/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                          title="View on site"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>

                        <button
                          onClick={() => handleStartEdit(post)}
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeletePost(post.slug)}
                          disabled={deletingSlug === post.slug}
                          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete post"
                        >
                          {deletingSlug === post.slug ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-red-400" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            /* Post Editor Form */
            editingPost && (
              <form onSubmit={handleSavePost} className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="inline-flex items-center gap-1 font-mono text-xs text-zinc-500 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to list</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white font-mono text-xs transition-colors"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSavingPost}
                      className="group bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 inline-flex items-center gap-2 font-mono text-xs font-semibold rounded-full px-5 py-1.5 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)] disabled:opacity-50 transition-all"
                    >
                      {isSavingPost ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin text-red-400" />
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <>
                          <span>Save & Publish</span>
                          <span className="text-red-400 group-hover:translate-x-0.5 transition-transform">
                            →
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                        Post Title
                      </label>
                      <input
                        type="text"
                        value={editingPost.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          const slugCandidate = title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)+/g, "");
                          setEditingPost({
                            ...editingPost,
                            title,
                            slug: originalSlug ? editingPost.slug : slugCandidate,
                          });
                        }}
                        placeholder="e.g. Approaching code reviews as a first year student"
                        required
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={editingPost.slug}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, slug: e.target.value })
                        }
                        placeholder="e.g. approaching-code-reviews"
                        required
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                        Date
                      </label>
                      <input
                        type="text"
                        value={editingPost.date}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, date: e.target.value })
                        }
                        placeholder="e.g. March 2025"
                        required
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                        Category
                      </label>
                      <input
                        type="text"
                        value={editingPost.category}
                        onChange={(e) =>
                          setEditingPost({ ...editingPost, category: e.target.value })
                        }
                        placeholder="e.g. Engineering / Systems / Design"
                        required
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-zinc-400 mb-1.5">
                      Excerpt / Summary
                    </label>
                    <textarea
                      rows={2}
                      value={editingPost.description}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, description: e.target.value })
                      }
                      placeholder="Brief one or two sentence summary shown on home page..."
                      required
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-sm text-white focus:border-red-500/70 focus:outline-none transition-colors leading-relaxed font-light"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-mono text-[11px] text-zinc-400">
                        Article Content
                      </label>
                      <span className="font-mono text-[10px] text-zinc-500">
                        Separate paragraphs with blank lines. Use "### Header" or "- List item".
                      </span>
                    </div>
                    <textarea
                      rows={12}
                      value={editingPost.content.join("\n\n")}
                      onChange={(e) => {
                        const raw = e.target.value;
                        const split = raw.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
                        setEditingPost({ ...editingPost, content: split });
                      }}
                      required
                      placeholder="Write your article body here..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-3 text-sm text-zinc-200 font-mono leading-relaxed focus:border-red-500/70 focus:outline-none transition-colors resize-y"
                    />
                  </div>
                </div>
              </form>
            )
          )}
        </div>
      )}
    </div>
  );
}
