import Category from '#models/category'
import { DateTime } from 'luxon'

export default class CategoryService {
  /**
   * Lista todas as categorias ativas de um usuário
   */
  async index(userId: number) {
    return await Category.query()
      .where('userId', userId)
      .whereNull('deletedAt')
      .orderBy('createdAt', 'desc')
      .preload('tasks')
  }

  /**
   * Busca uma categoria específica de um usuário
   */
  async show(userId: number, categoryId: number) {
    return await Category.query()
      .where('id', categoryId)
      .where('userId', userId)
      .whereNull('deletedAt')
      .preload('tasks')
      .firstOrFail()
  }

  /**
   * Cria uma nova categoria
   */
  async store(
    userId: number,
    data: {
      name: string
      color: string
      icon: string
    }
  ) {
    console.log('DATA RECEBIDA:', data)
    const category = await Category.query()
      .where('name', data.name)
      .where('userId', userId)
      .whereNull('deletedAt')
      .first()
    if (category) return category

    return await Category.create({
      ...data,
      userId,
    })
  }

  /**
   * Atualiza uma categoria
   */
  async update(
    userId: number,
    categoryId: number,
    data: {
      name?: string
      color?: string
      icon?: string
    }
  ) {
    const category = await Category.query()
      .where('id', categoryId)
      .where('userId', userId)
      .whereNull('deletedAt')
      .firstOrFail()
    category.merge(data)
    await category.save()

    return category
  }

  /**
   * Remove uma categoria logicamente
   */
  async destroy(userId: number, categoryId: number) {
    const category = await Category.query()
      .where('id', categoryId)
      .where('userId', userId)
      .whereNull('deletedAt')
      .firstOrFail()
    category.deletedAt = DateTime.now()
    await category.save()

    return category
  }
}
