export default interface Repository {
  index: (params: object) => object
  create: (payload: object) => Promise<any>
  get: (id: number) => Promise<object>
  update: (payload: object, id: number) => Promise<any>
  delete: object
}
