import http from "../http";

export namespace ClientService {
  export async function getClient() {
    return http.get("/client")
  }

  // export async function filterClients(name: any) {
  //   return http.get(`/client/findby/${name}`)
  // }


  export async function ClientForm(props: any) {
    return http.post("/client", props)
  }

}
