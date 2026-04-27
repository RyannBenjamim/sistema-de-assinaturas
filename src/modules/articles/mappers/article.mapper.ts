import { Article } from "@prisma/client";
import { ArticleResponse } from "../interfaces/ArticleResponse";
import { ArticleSummary } from "../interfaces/ArticleSummary";

export class ArticleMapper {
  static toResponse(article: Article): ArticleResponse {
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      content: article.content,
      isPremium: article.isPremium,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    }
  }

   static toSummary(article: Pick<Article, 'id' | 'title' | 'description'>): ArticleSummary {
    return {
      id: article.id,
      title: article.title,
      description: article.description,
      shortDescription: article.description.length > 100 
      ? `${article.description.slice(0, 100)}...` 
      : article.description,
    }
  }
}