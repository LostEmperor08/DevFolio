import { prisma } from "@/lib/prisma";

export class ProjectService {
  /**
   * Retrieves all projects including metrics and case studies.
   */
  static async getAllProjects() {
    return prisma.project.findMany({
      include: {
        metrics: true,
        caseStudy: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Example of a robust transaction to safely create a project and its nested relations.
   */
  static async createProjectWithCaseStudy(projectData: any, metrics: any[], caseStudyData: any) {
    return prisma.$transaction(async (tx) => {
      // 1. Create the base project
      const project = await tx.project.create({
        data: {
          ...projectData,
        },
      });

      // 2. Create metrics if provided
      if (metrics && metrics.length > 0) {
        await tx.projectMetric.createMany({
          data: metrics.map((m) => ({ ...m, projectId: project.id })),
        });
      }

      // 3. Create case study if provided
      if (caseStudyData) {
        await tx.caseStudy.create({
          data: {
            ...caseStudyData,
            projectId: project.id,
          },
        });
      }

      return project;
    });
  }
}
