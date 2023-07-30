import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CategoryResolver } from '../category/resolver.graphql';
import { CategoryRepository } from '../category/repository';
import { CategoryService } from '../category/service';
import { ProductService } from '../product/service';
import { ProductRepository } from '../product/repository';
import { ProductResolver } from '../product/resolver.graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      // installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },

    }),
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    CategoryResolver, 
    CategoryRepository, 
    CategoryService, 
    ProductService, 
    ProductRepository, 
    ProductResolver
  ],
})
export class AppModule {}
