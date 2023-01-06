import http from "../http";

export namespace OrganizationService {
  export async function getClient(searchTerm?: any) {
    return http.get(`/customer?searchTerm=${searchTerm}`)
  }

  export async function ClientForm(props: any) {
    return http.post("/customer", props)
  }


  export async function getCollaborator(searchTerm?: any) {
    return http.get(`/employee?searchTerm=${searchTerm}`)
  }


  export async function CollaboratorForm(props: any) {
    return http.post("/employee", props)
  }


  export async function getProject(searchTerm?: any) {
    return http.get(`/project?searchTerm=${searchTerm}`)
  }

  export async function formProjectSubmit(props: any) {
    return http.post("/project", props)
  }

  export async function getTimeSheet() {
    return http.get("/timesheet")
  }

  export async function timeSheetSubmit(props: any) {
    return http.post("/timesheet", props)
  }


  export async function getCompany(searchTerm?: any) {
    return http.get(`/company?searchTerm=${searchTerm}`)
  }

  export async function companySubmit(props: any) {
    return http.post("/company", props)
  }
}
