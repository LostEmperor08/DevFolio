import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const blogs = await prisma.blogPost.findMany();
  console.log("TOTAL BLOGS:", blogs.length);
  console.log(blogs);
  const projects = await prisma.project.findMany();
  console.log("TOTAL PROJECTS:", projects.length);
  await prisma.$disconnect();
}
main();
