import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from "@nestjs/sequelize";
import configuration from '../config/configuration';

@Module({
	imports: [ConfigModule.forRoot({
		isGlobal: true,
		load: [configuration],
	}),
	SequelizeModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: (configService: ConfigService) => ({
			dialect: 'postgres',
			host: configService.get('db_host'),
			port: configService.get('db_port'),
			username: configService.get('db_user'),
			password: configService.get('db_password'),
			database: configService.get('db_name'),
			synchronize: true,
			autoLoadModels: true,
			models: [],
		}),
		inject: [ConfigService],
	}),
		UserModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
