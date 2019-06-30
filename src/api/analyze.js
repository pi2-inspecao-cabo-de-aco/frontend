import { netApi } from '.'

export default async function analyze (body) {
  return netApi
    .post('/analyze', body)
}
