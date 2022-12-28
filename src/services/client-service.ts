import http from "../http";

export namespace ClientService {
  export async function getClient() {
    return http.get("/client")
  }

  export async function ClientForm(props: any) {
    return http.post("/client", props)
  }


}
