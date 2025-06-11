import { useParams } from 'react-router-dom'
import CategoryForm from '../../components/category/CategoryForm'

export default function EditCategory() {
  const { id } = useParams<{ id: string }>()

  return (
    <CategoryForm categoryId={id} />
  )
}
