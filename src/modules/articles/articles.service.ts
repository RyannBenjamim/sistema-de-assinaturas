import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../infra/database/prisma.service";
import { CreateArticleDto } from "./dto/create-articles.dto";
import { Article, Prisma } from "@prisma/client";
import { UpdateArticleDto } from "./dto/update-articles.dto";

const articleSummarySelect = Prisma.validator<Prisma.ArticleSelect>()({
  id: true,
  title: true,
  description: true,
});

type ArticleSummaryFromPrisma = Prisma.ArticleGetPayload<{
  select: typeof articleSummarySelect;
}>;

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.prisma.article.create({ data: {
      ...createArticleDto,
      isPremium: createArticleDto.isPremium ?? false
    } });
  }

  async findAll(): Promise<ArticleSummaryFromPrisma[]> {
    return this.prisma.article.findMany({ 
      orderBy: { createdAt: 'desc' },
      select: articleSummarySelect
    });
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) throw new NotFoundException('Article not found.');
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
    return this.prisma.article.update({ 
      where: { id },
      data: updateArticleDto
    })
  }

  async remove(id: string): Promise<Article> {
    return this.prisma.article.delete({ where: { id } });
  }
}