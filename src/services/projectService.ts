import { supabase } from '../lib/supabase'
import { Project } from '../types/Project'

export class ProjectService {
  // Get all projects
  static async getProjects(): Promise<Project[]> {
    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
        return []
      }

      return projects?.map(this.transformDatabaseProject) || []
    } catch (error) {
      console.error('Error in getProjects:', error)
      return []
    }
  }

  // Get a single project by ID
  static async getProjectById(id: string): Promise<Project | null> {
    try {
      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching project by ID:', error)
        return null
      }

      return project ? this.transformDatabaseProject(project) : null
    } catch (error) {
      console.error('Error in getProjectById:', error)
      return null
    }
  }

  // Transform database project to our Project type
  private static transformDatabaseProject(dbProject: any): Project {
    return {
      id: dbProject.id,
      title: dbProject.title || 'Untitled Project',
      subheader: dbProject.subheader || '',
      date: dbProject.date || '',
      tags: dbProject.tags || [],
      external_url: dbProject.external_url || '',
      created_at: dbProject.created_at,
      updated_at: dbProject.updated_at
    }
  }
}