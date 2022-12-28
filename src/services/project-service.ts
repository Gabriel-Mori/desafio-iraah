import http from "../http";

export namespace ProjectService {
  export async function getProject() {
    return http.get("/project")
  }

  // export async function ClientForm(props: any) {
  //   return http.post("/client", props)
  // }


}
