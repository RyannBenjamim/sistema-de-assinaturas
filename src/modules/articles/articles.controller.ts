import { ArticlesService } from './articles.service';
import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseUUIDPipe, 
  Patch, 
  Post 
} from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-articles.dto";
import { UpdateArticleDto } from './dto/update-articles.dto';
import { ApiResponse } from "../../common/interfaces/ApiResponse";
import { ArticleSummary } from './interfaces/ArticleSummary';
import { ArticleResponse } from './interfaces/ArticleResponse';
import { ArticleMapper } from './mappers/article.mapper';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(
    @Body() createArticleDto: CreateArticleDto
  ): Promise<ApiResponse<ArticleResponse>> {
    const article = await this.articlesService.create(createArticleDto);
    return {
      message: 'Article created successfully.',
      data: ArticleMapper.toResponse(article)
    }
  }

  @Get()
  async findAll(): Promise<ApiResponse<ArticleSummary[]>> {
    const articles = await this.articlesService.findAll();
    return {
      message: 'Articles listed successfully.',
      data: articles.map(ArticleMapper.toSummary)
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<ArticleResponse>> {
    const article = await this.articlesService.findOne(id);
    return {
      message: 'Article successfully searched.',
      data: ArticleMapper.toResponse(article)
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArticleDto: UpdateArticleDto
  ): Promise<ApiResponse<ArticleResponse>> {
    const updatedArticle = await this.articlesService.update(id, updateArticleDto);
    return {
      message: 'Article successfully updated.',
      data: ArticleMapper.toResponse(updatedArticle)
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<ArticleResponse>> {
    const deletedArticle = await this.articlesService.remove(id);
    return {
      message: 'Article successfully deleted.',
      data: ArticleMapper.toResponse(deletedArticle)
    }
  }
}