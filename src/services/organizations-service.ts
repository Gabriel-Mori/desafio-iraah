import http from "../http";

export namespace OrganizationService {
  // export async function getClient(searchTerm?: any) {
  //   return http.get(`/customer?searchTerm=${searchTerm}`)
  // }

  export async function getClient(searchTerm?: any, pageSize?: any, pageNumber?: any) {
    return http.get(`/customer/v2?searchTerm=${searchTerm}&pageSize=${pageSize}&pageNumber=${pageNumber - 1}`)

  }

  export async function ClientForm(props: any) {
    return http.post("/customer", props)
  }


  // export async function getCollaborator(searchTerm?: any) {
  //   return http.get(`/employee?searchTerm=${searchTerm}`)
  // }

  export async function getCollaborator(searchTerm?: any, pageSize?: any, pageNumber?: any) {
    return http.get(`/employee/v2?searchTerm=${searchTerm}&pageSize=${pageSize}&pageNumber=${pageNumber - 1}`)
  }


  export async function CollaboratorForm(props: any) {
    return http.post("/employee", props)
  }


  export async function getProject(searchTerm?: any, pageSize?: any, pageNumber?: any) {
    return http.get(`/project/v2?searchTerm=${searchTerm}&pageSize=${pageSize}&pageNumber=${pageNumber - 1}`)
  }

  export async function formProjectSubmit(props: any) {
    return http.post("/project", props)
  }

  export async function getTimeSheet(pageSize?: any, pageNumber?: any) {
    return http.get(`/timesheet?pageSize=${pageSize}&pageNumber=${pageNumber - 1}`)
  }

  export async function timeSheetSubmit(props: any) {
    return http.post("/timesheet", props)
  }


  export async function getCompany(searchTerm?: any, pageSize?: any, pageNumber?: any) {
    return http.get(`/company/v2?searchTerm=${searchTerm}&pageSize=${pageSize}&pageNumber=${pageNumber - 1}`)
  }

  export async function companySubmit(props: any) {
    return http.post("/company", props)
  }
}
