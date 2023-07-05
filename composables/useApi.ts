export const useApi = async (
  url: string,
  method:
    | 'GET'
    | 'HEAD'
    | 'PATCH'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'get'
    | 'head'
    | 'patch'
    | 'post'
    | 'put'
    | 'delete'
    | 'connect'
    | 'options'
    | 'trace'
    | undefined,
  body: any | null = null,
  query: any | null = null
) => {
  const helperStore = await useHelperStore()

  interface IResponse {
    success: boolean
    message: string
    result: any
    count?: number
    pageLength?: number
  }
  try {
    const response: IResponse = await $fetch(url, {
      method,
      body,
      query,
    })

    helperStore.setNotify(
      true,
      response.success ? 'SUCCESS' : 'FAILED',
      response.message,
      response.success ? 'success' : 'error'
    )

    return response
  } catch (error: unknown) {
    helperStore.setAlert(true, (error as Error).name, (error as Error).message, 'error')
    return {
      success: false,
      count: 0,
      pageLength: 0,
      message: (error as Error).message,
      result: [],
    }
  }
}
