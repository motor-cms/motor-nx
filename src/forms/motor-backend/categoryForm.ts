import axios from 'axios'
import baseForm from '@/forms/baseForm'
import * as yup from 'yup'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import modelRepository from '@/api/motor-backend/category'
import categoryTreeRepository from '@/api/motor-backend/categoryTree'
import { useStore } from 'vuex'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import categoryTree from '@/api/motor-backend/categoryTree'

export default function categoryForm() {
  // Load i18n module
  const { t, tm } = useI18n()

  const store = useStore()

  const toast = useToast()

  const router = useRouter()

  // Validation schema
  const schema = yup.object().shape({
    name: yup.string().required(),
  })

  // Record
  const model = ref({
    id: 0,
    name: '',
    previous_sibling_id: null,
    next_sibling_id: null,
    parent_id: null,
  })

  const search = (
    formData: any,
    tree: any,
    id: number,
    parent: any,
    index: number
  ): any => {
    if (tree.id === id) {
      // console.log('element', tree)
      formData.parent_id = parent.id
      // console.log('parent', parent)
      // console.log('index', index)
      if (index > 0) {
        formData.previous_sibling_id = parent.children[index - 1].id
        // console.log('found previous_sibling', parent.children[index - 1])
      }
      // get next sibling
      if (index < parent.children.length - 1) {
        formData.next_sibling_id = parent.children[index + 1].id
        // console.log('found next_sibling', parent.children[index + 1])
      }
      return tree
    }

    for (const { index, child } of tree.children.map(
      (child: any, index: number) => ({ index, child })
    )) {
      const res = search(formData, child, id, tree, index)

      if (res) {
        return res
      }
    }
  }

  // Sanitize dates
  const sanitizer = (formData: any) => {
    const foundYou = search(formData, treeData.value, model.value.id, {}, 0)
    console.log('found the thing', foundYou)
  }

  const repository = modelRepository(axios)

  // const getData = (id: string) => {}

  const categoryTree: string = router.currentRoute.value.params
    .category_tree as string

  const { onSubmit, getData } = baseForm(
    'motor-backend.categories',
    'admin.motor-backend.categories',
    modelRepository(axios),
    model,
    schema,
    sanitizer,
    null,
    { category_tree: categoryTree }
  )

  // // Get record from id and set values. Redirect back and show error if record was not found
  // const getData = async (
  //   id: number | string,
  //   categoryTree: number | string
  // ) => {
  //   store.commit('motor/setSpinner', true)
  //
  //   const response = await (<any>(
  //     repository
  //       .get({ id: <number>id, category_tree: <number>categoryTree })
  //       .catch((e: Error) => {
  //         toast.error(t('global.record_not_found'))
  //         router.replace({ name: 'admin.motor-backend.categories' })
  //       })
  //   ))
  //   model.value = response.data.data
  //   store.commit('motor/setSpinner', false)
  // }

  const treeData = ref({})

  categoryTreeRepository(axios)
    .get(categoryTree)
    .then((response: any) => {
      treeData.value = response.data.data
    })

  return {
    getData,
    onSubmit,
    model,
    treeData,
  }
}
