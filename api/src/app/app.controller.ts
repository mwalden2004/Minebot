import { controller, IAppController } from '@foal/core';

import { ApiController, BotController } from './controllers';

export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/discord/api/bs16EZjG84OMLfa1Dx2JFkZ3MkKcyGNd8gOLiMwF3WVpGIE9gFfezGPYAL8', BotController)
  ];
}
