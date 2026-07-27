import { projects } from "@/data/projects";

export class ProjectService {
  /**
   * Retrieves all projects from static data including metrics and case studies.
   */
  static async getAllProjects() {
    return projects.map((p) => ({
      ...p,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  /**
   * Retrieves a single project by slug from static data.
   */
  static async getProjectBySlug(slug: string) {
    const project = projects.find((p) => p.slug === slug);
    if (!project) return null;
    return {
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Placeholder for admin compatibility.
   */
  static async createProjectWithCaseStudy(projectData: any, metrics: any[], caseStudyData: any) {
    return { ...projectData, id: "static-id", metrics, caseStudy: caseStudyData };
  }
}
