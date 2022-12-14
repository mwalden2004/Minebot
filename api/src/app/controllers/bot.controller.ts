import { Context, Get, HttpResponseOK } from '@foal/core';
import { PendingVerifications } from '../entities';

export class BotController {

  @Get('/verify/:uuid/:verificationCode')
  async getPendingVerification(ctx: Context) {
    const {uuid, verificationCode} = ctx.request.params;

    const foundVerification = await PendingVerifications.findOne({
      where: {
        uuid: uuid.split('-').join(''),
        verificationCode: verificationCode
      }
    });

    if (foundVerification){
      foundVerification.verified = true;
      await foundVerification.save();
      return new HttpResponseOK('Successfully verified!')
    }
    return new HttpResponseOK('We were not able to verify your identity, please try again.')
  }

}
