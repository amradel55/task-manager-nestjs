import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors =  require("cors");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
  await app.listen(8000);
}
bootstrap();
