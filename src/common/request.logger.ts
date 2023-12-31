import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { randomUUID } from 'crypto';

@Injectable({ scope: Scope.REQUEST })
export class RequestLogger {
  protected requestId;

  constructor(@Inject(REQUEST) private request) {
    this.requestId = randomUUID(); // generate id for each request.
  }

  log(message: any) {
    // TODO: implement real logger function
    console.log(this.requestId, message);
  }
}
