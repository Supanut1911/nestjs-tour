import { Todo } from "../todo.entity"

export class PaginatedProductsResultDto {
  data: Todo[]
  page: number
  limit: number
  totalCount: number
}
