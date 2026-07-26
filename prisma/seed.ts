import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Import static data
import { projects } from "../src/data/projects";
import { blogs } from "../src/data/blogs";
import { profile } from "../src/config/profile";

const prisma = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL) {
    console.warn(
      "⚠️ WARNING: No DATABASE_URL environment variable found. Skipping database seeding."
    );
    return;
  }
  console.log("Start seeding...");

  // Clean up existing data before re-seeding to prevent unique constraint errors
  await prisma.projectMetric.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.project.deleteMany();
  await prisma.contentBlock.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.supportLink.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.contactMessage.deleteMany();

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash("S@marth$2008", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@samarth.dev" },
    update: {},
    create: {
      email: "admin@samarth.dev",
      name: "Samarth Patil",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log(`Created admin user with id: ${admin.id}`);

  // 2. Create SiteSettings
  await prisma.siteSettings.create({
    data: {
      url: profile.site.url,
      title: "Samarth Patil | Portfolio",
      description: profile.personal.tagline,
      seoKeywords: ["Developer", "Portfolio", "Samarth"],
    },
  });

  // 3. Create Profile
  const dbProfile = await prisma.profile.create({
    data: {
      name: profile.personal.name,
      tagline: profile.personal.tagline,
      email: profile.personal.email,
      resumeUrl: profile.personal.resumeUrl,
      avatar: profile.personal.avatar,
      location: profile.personal.location,
      timezone: profile.personal.timezone,
      availability: profile.personal.availability,
      responseTime: profile.personal.responseTime,
    },
  });

  // 4. Create Social Links
  for (const [key, value] of Object.entries(profile.social)) {
    await prisma.socialLink.create({
      data: {
        platform: key,
        label: value.label,
        url: value.url,
        icon: value.icon,
      },
    });
  }

  // 5. Create Support Links
  await prisma.supportLink.create({
    data: {
      type: "buyMeACoffee",
      url: profile.support.buyMeACoffee,
    },
  });

  if (profile.support.crypto) {
    for (const crypto of profile.support.crypto) {
      await prisma.supportLink.create({
        data: {
          type: "crypto",
          label: crypto.label,
          address: crypto.address,
          network: crypto.network,
          qrCode: crypto.qrCode,
        },
      });
    }
  }

  // 6. Create Projects & Case Studies
  for (const project of projects) {
    const dbProject = await prisma.project.create({
      data: {
        slug: project.slug,
        title: project.title,
        category: project.category,
        description: project.description,
        techStack: project.techStack,
        status: project.status,
        role: project.role,
        timeline: project.timeline,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        previewImage: project.previewImage,
        featured: project.featured,
      },
    });

    if (project.metrics) {
      for (const metric of project.metrics) {
        await prisma.projectMetric.create({
          data: {
            label: metric.label,
            value: metric.value,
            projectId: dbProject.id,
          },
        });
      }
    }

    if (project.caseStudy) {
      await prisma.caseStudy.create({
        data: {
          projectId: dbProject.id,
          overview: project.caseStudy.overview,
          problem: project.caseStudy.problem,
          goals: project.caseStudy.goals,
          research: project.caseStudy.research,
          architecture: project.caseStudy.architecture,
          developmentProcess: project.caseStudy.developmentProcess,
          technicalChallenges: project.caseStudy.technicalChallenges,
          keyDecisions: project.caseStudy.keyDecisions,
          results: project.caseStudy.results,
          lessonsLearned: project.caseStudy.lessonsLearned,
          futureImprovements: project.caseStudy.futureImprovements,
        },
      });
    }
  }

  // 7. Create Blogs & Content Blocks
  for (const blog of blogs) {
    const dbBlog = await prisma.blogPost.create({
      data: {
        slug: blog.slug,
        title: blog.title,
        description: blog.description,
        publishedDate: blog.publishedDate,
        readingTime: blog.readingTime,
        category: blog.category,
        tags: blog.tags,
        coverImage: blog.coverImage,
        featured: blog.featured,
        draft: blog.draft,
        authorName: blog.author.name,
        authorAvatar: blog.author.avatar,
        authorRole: blog.author.role,
      },
    });

    if (blog.content) {
      for (let i = 0; i < blog.content.length; i++) {
        const block = blog.content[i];
        await prisma.contentBlock.create({
          data: {
            blogId: dbBlog.id,
            type: block.type,
            text: block.text,
            level: block.level,
            url: block.url,
            caption: block.caption,
            language: block.language,
            code: block.code,
            items: block.items || [],
            style: block.style,
            orderIndex: i,
          },
        });
      }
    }
  }

  // 8. Create a placeholder Contact Message
  await prisma.contactMessage.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      subject: "Hello!",
      message: "Just testing the contact form.",
    },
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
