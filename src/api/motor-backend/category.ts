import { AxiosInstance } from 'axios'

export default ($axios: AxiosInstance) => ({
  index(params: any, categoryTree?: string) {
    const queryString = Object.keys(params)
      .reduce(function (a: any[], k: string) {
        a.push(k + '=' + params[k].toString())
        return a
      }, [])
      .join('&')

    return $axios.get(
      '/api/category_trees/' + categoryTree + '/categories?' + queryString
    )
  },

  create(payload: object) {
    return $axios.post(`/api/categories`, payload)
  },

  get(id: number, category_tree: number): Promise<object> {
    return $axios.get(`/api/category_trees/${category_tree}/categories/${id}`)
  },

  update(payload: object, id: number) {
    return $axios.put(`/api/categories/${id}`, payload)
  },

  delete(id: number) {
    return $axios.delete(`/api/categories/${id}`)
  },
})
