import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    currentProject: null,
    savedProjects: [],
    loading: false,
    error: null
  }),

  getters: {
    hasActiveProject: (state) => !!state.currentProject,
    projectCount: (state) => state.savedProjects.length
  },

  actions: {
    updateProject(project) {
      this.currentProject = { ...project }
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem('currentProject', JSON.stringify(this.currentProject))
      } catch (error) {
        console.error('Error saving project to localStorage:', error)
        this.error = 'Failed to save project data'
      }
    },

    loadFromLocalStorage() {
      try {
        const saved = localStorage.getItem('currentProject')
        if (saved) {
          this.currentProject = JSON.parse(saved)
          return this.currentProject
        }
      } catch (error) {
        console.error('Error loading project from localStorage:', error)
        this.error = 'Failed to load saved project'
      }
      return null
    },

    async saveProject() {
      this.loading = true
      this.error = null
      
      try {
        // Add project to saved projects list
        const projectToSave = {
          ...this.currentProject,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        }
        
        this.savedProjects.push(projectToSave)
        
        // Save to localStorage
        localStorage.setItem('savedProjects', JSON.stringify(this.savedProjects))
        
        // Clear current project
        this.currentProject = null
        localStorage.removeItem('currentProject')
        
        return projectToSave
      } catch (error) {
        console.error('Error saving project:', error)
        this.error = 'Failed to save project'
        throw error
      } finally {
        this.loading = false
      }
    },

    async loadSavedProjects() {
      this.loading = true
      this.error = null
      
      try {
        const saved = localStorage.getItem('savedProjects')
        if (saved) {
          this.savedProjects = JSON.parse(saved)
        }
      } catch (error) {
        console.error('Error loading saved projects:', error)
        this.error = 'Failed to load saved projects'
        throw error
      } finally {
        this.loading = false
      }
    },

    clearCurrentProject() {
      this.currentProject = null
      localStorage.removeItem('currentProject')
    },

    setError(error) {
      this.error = error
    },

    clearError() {
      this.error = null
    }
  }
})